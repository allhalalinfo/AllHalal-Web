import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  // Read robots.txt from public directory
  const filePath = path.join(process.cwd(), 'robots.txt');
  
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    
    return new NextResponse(content, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch (error) {
    // Fallback if file doesn't exist
    const fallbackContent = `# robots.txt for AllHalal / HalalScan
# https://allhalal.info/robots.txt

# Allow Google app-ads.txt crawler to access app-ads.txt file
User-agent: Google-adstxt
Disallow:

# Allow Mediapartners-Google crawler
User-agent: Mediapartners-Google
Disallow:

# Allow Googlebot crawler
User-agent: Googlebot
Disallow:

# Allow all search engines to crawl the entire site
User-agent: *
Allow: /

# Sitemap location
Sitemap: https://allhalal.info/sitemap.xml
`;
    
    return new NextResponse(fallbackContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  }
}
