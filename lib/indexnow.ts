// lib/indexnow.ts
// IndexNow API for instant search engine indexing

const INDEXNOW_KEY = process.env.INDEXNOW_KEY || 'your-key-here';
const SITE_URL = 'https://allhalal.info';

/**
 * Submit URLs to IndexNow for instant indexing
 * Supported by Google, Bing, Yandex, and others
 */
export async function submitToIndexNow(urls: string | string[]) {
  const urlList = Array.isArray(urls) ? urls : [urls];
  
  try {
    const response = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        host: 'allhalal.info',
        key: INDEXNOW_KEY,
        keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
        urlList: urlList.map(url => url.startsWith('http') ? url : `${SITE_URL}${url}`),
      }),
    });

    if (response.ok) {
      console.log(`✅ Successfully submitted ${urlList.length} URLs to IndexNow`);
      return { success: true, count: urlList.length };
    } else {
      console.error(`❌ IndexNow submission failed: ${response.status}`);
      return { success: false, error: response.statusText };
    }
  } catch (error) {
    console.error('❌ IndexNow error:', error);
    return { success: false, error };
  }
}

/**
 * Submit a single URL immediately
 */
export async function submitUrlToIndexNow(url: string) {
  return submitToIndexNow([url]);
}

/**
 * Submit all halal items to IndexNow
 */
export async function submitAllHalalItemsToIndexNow() {
  const { halalItems } = await import('@/data/halalItems');
  const urls = halalItems.map(item => `/is-it-halal/${item.slug}`);
  
  // Submit in batches of 100 (IndexNow limit is 10,000 per request)
  const batchSize = 100;
  const results = [];
  
  for (let i = 0; i < urls.length; i += batchSize) {
    const batch = urls.slice(i, i + batchSize);
    const result = await submitToIndexNow(batch);
    results.push(result);
    
    // Small delay between batches to be polite
    if (i + batchSize < urls.length) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
  
  return results;
}
