/**
 * IndexNow API Integration
 * 
 * Instantly notifies search engines (Google, Bing, Yandex, etc.) about new/updated URLs.
 * Much faster than waiting for sitemap crawls.
 * 
 * Docs: https://www.indexnow.org/documentation
 */

interface IndexNowSubmission {
  host: string;
  key: string;
  keyLocation: string;
  urlList: string[];
}

/**
 * Submits URLs to IndexNow API for instant indexing
 * @param urls - Array of full URLs to submit
 */
export async function submitToIndexNow(urls: string[]): Promise<void> {
  try {
    const indexNowKey = process.env.INDEXNOW_KEY;
    
    if (!indexNowKey) {
      console.warn('INDEXNOW_KEY not set - skipping IndexNow submission');
      return;
    }

    if (urls.length === 0) {
      console.log('No URLs to submit to IndexNow');
      return;
    }

    const host = 'allhalal.info';
    const keyLocation = `https://${host}/indexnow-key.txt`;

    const payload: IndexNowSubmission = {
      host,
      key: indexNowKey,
      keyLocation,
      urlList: urls.slice(0, 10000), // Max 10,000 URLs per request
    };

    // Submit to IndexNow (all search engines receive it)
    const response = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(payload),
    });

    if (response.ok || response.status === 202) {
      console.log(`✓ IndexNow: Successfully submitted ${urls.length} URL(s)`);
      urls.forEach(url => console.log(`  - ${url}`));
    } else {
      const text = await response.text();
      console.error(`IndexNow submission failed: ${response.status}`, text.slice(0, 200));
    }
  } catch (error) {
    console.error('IndexNow submission error:', error);
  }
}

/**
 * Notifies search engines about a new or updated article
 */
export async function notifyArticleChange(
  articleId: string,
  action: 'created' | 'updated' | 'deleted'
): Promise<void> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://allhalal.info';
  
  const urls: string[] = [];

  if (action === 'deleted') {
    // For deleted articles, just resubmit sitemap
    urls.push(`${baseUrl}/sitemap.xml`);
  } else {
    // For created/updated, submit the article page + sitemap
    urls.push(
      `${baseUrl}/read/${articleId}`,
      `${baseUrl}/sitemap.xml`
    );
  }

  await submitToIndexNow(urls);
  console.log(`Search engines notified: Article ${articleId} ${action}`);
}
