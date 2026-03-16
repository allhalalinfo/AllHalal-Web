import { NextResponse } from 'next/server';
import { RateLimiter } from '@/lib/csrf';

const suggestionLimiter = new RateLimiter(5, 60_000);
const ALLOWED_ORIGINS = [
  'https://allhalal.info',
  'https://www.allhalal.info',
  'http://localhost:3000',
];

function isAllowedOrigin(request: Request): boolean {
  const origin = request.headers.get('origin');
  const referer = request.headers.get('referer');
  const requestOrigin = origin || (referer ? new URL(referer).origin : '');

  if (!requestOrigin) {
    return true;
  }

  return ALLOWED_ORIGINS.some((allowedOrigin) => requestOrigin.startsWith(allowedOrigin));
}

function normalizeOptionalField(value: unknown, maxLength: number): string {
  if (typeof value !== 'string') {
    return '';
  }

  return value.trim().slice(0, maxLength);
}

export async function POST(request: Request) {
  try {
    if (!isAllowedOrigin(request)) {
      return NextResponse.json(
        { ok: false, error: 'Invalid request origin.' },
        { status: 403 }
      );
    }

    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
    const rateLimit = await suggestionLimiter.checkLimit(ip);
    if (!rateLimit.success) {
      return NextResponse.json(
        { ok: false, error: 'Too many submissions. Please try again later.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { productName, productBrand, category, userEmail, message, sourcePath, locale } = body;
    const normalizedProductName =
      typeof productName === 'string' ? productName.trim() : '';

    // Validation
    if (
      !normalizedProductName ||
      normalizedProductName.length < 2 ||
      normalizedProductName.length > 200
    ) {
      return NextResponse.json(
        { ok: false, error: 'Product name must be between 2 and 200 characters.' },
        { status: 400 }
      );
    }

    const logEntry = {
      timestamp: new Date().toISOString(),
      productName: normalizedProductName,
      productBrand: normalizeOptionalField(productBrand, 120),
      category: normalizeOptionalField(category, 60),
      userEmail: normalizeOptionalField(userEmail, 160),
      message: normalizeOptionalField(message, 2000),
      sourcePath: normalizeOptionalField(sourcePath, 200),
      locale: normalizeOptionalField(locale, 10) || 'en',
      ip,
    };

    const accessKey =
      process.env.WEB3FORMS_ACCESS_KEY || process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

    if (accessKey) {
      const web3FormsResponse = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `[Product Suggestion] ${logEntry.productName}`,
          from_name: 'allhalal.info Website',
          email: logEntry.userEmail || 'app@allhalal.info',
          message: [
            `Product: ${logEntry.productName}`,
            `Brand: ${logEntry.productBrand || 'N/A'}`,
            `Category: ${logEntry.category || 'N/A'}`,
            `Locale: ${logEntry.locale}`,
            `Source path: ${logEntry.sourcePath || 'N/A'}`,
            '',
            logEntry.message || 'No additional message provided.',
          ].join('\n'),
        }),
      });

      const web3FormsResult = await web3FormsResponse.json();
      if (!web3FormsResponse.ok || !web3FormsResult.success) {
        throw new Error(web3FormsResult.message || 'Failed to submit suggestion');
      }
    } else {
      console.info('Product suggestion received without external sink configured', logEntry);
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Error in suggest-product API:', error);
    return NextResponse.json(
      { ok: false, error: 'Internal server error.' },
      { status: 500 }
    );
  }
}
