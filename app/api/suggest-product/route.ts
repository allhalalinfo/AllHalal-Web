import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { productName, productBrand, category, userEmail, message, sourcePath, locale } = body;

    // Validation
    if (!productName || typeof productName !== 'string' || productName.length < 2 || productName.length > 200) {
      return NextResponse.json(
        { ok: false, error: 'Product name must be between 2 and 200 characters.' },
        { status: 400 }
      );
    }

    // Prepare log entry
    const logEntry = {
      timestamp: new Date().toISOString(),
      productName,
      productBrand: productBrand || '',
      category: category || '',
      userEmail: userEmail || '',
      message: message || '',
      sourcePath: sourcePath || '',
      locale: locale || 'en'
    };

    // Define log file path (in the root of the project)
    const logFilePath = path.join(process.cwd(), 'suggestions.log');

    // Append to log file
    fs.appendFileSync(logFilePath, JSON.stringify(logEntry) + '\n', 'utf8');

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Error in suggest-product API:', error);
    return NextResponse.json(
      { ok: false, error: 'Internal server error.' },
      { status: 500 }
    );
  }
}
