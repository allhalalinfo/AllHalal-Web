import { NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import path from 'path';

const LEGAL_DOCS = new Set(['privacy', 'terms', 'disclaimer']);
const LEGAL_DIR = path.join(process.cwd(), 'content', 'legal');
const DEFAULT_LOCALE = 'en';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const doc = searchParams.get('doc');
  const locale = searchParams.get('locale') || DEFAULT_LOCALE;

  if (!doc) {
    return new NextResponse('Missing doc', { status: 400 });
  }

  if (!LEGAL_DOCS.has(doc)) {
    return new NextResponse('Document not found', { status: 404 });
  }

  try {
    const content = await readFile(path.join(LEGAL_DIR, DEFAULT_LOCALE, `${doc}.md`), 'utf8');

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
