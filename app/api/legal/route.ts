import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const doc = searchParams.get('doc');
  const locale = searchParams.get('locale');

  if (!doc || !locale) {
    return new NextResponse('Missing doc or locale', { status: 400 });
  }

  try {
    // Try requested locale
    let filePath = path.join(process.cwd(), 'content', 'legal', locale, `${doc}.md`);
    if (!fs.existsSync(filePath)) {
      // Fallback to English
      filePath = path.join(process.cwd(), 'content', 'legal', 'en', `${doc}.md`);
    }

    if (!fs.existsSync(filePath)) {
      return new NextResponse('Document not found', { status: 404 });
    }

    const content = fs.readFileSync(filePath, 'utf8');
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