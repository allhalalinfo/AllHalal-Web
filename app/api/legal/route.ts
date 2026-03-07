import { NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import path from 'path';
import { defaultLocale, locales, type Locale } from '@/i18n/config';

const LEGAL_DOCS = new Set(['privacy', 'terms', 'disclaimer']);
const LEGAL_DIR = path.join(process.cwd(), 'content', 'legal');

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const doc = searchParams.get('doc');
  const locale = searchParams.get('locale');

  if (!doc || !locale) {
    return new NextResponse('Missing doc or locale', { status: 400 });
  }

  if (!LEGAL_DOCS.has(doc)) {
    return new NextResponse('Document not found', { status: 404 });
  }

  const normalizedLocale: Locale = locales.includes(locale as Locale)
    ? (locale as Locale)
    : defaultLocale;

  try {
    let content: string;

    try {
      content = await readFile(path.join(LEGAL_DIR, normalizedLocale, `${doc}.md`), 'utf8');
    } catch {
      content = await readFile(path.join(LEGAL_DIR, defaultLocale, `${doc}.md`), 'utf8');
    }

    return new NextResponse(content, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch (error) {
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
