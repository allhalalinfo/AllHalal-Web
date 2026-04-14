import { getCustomArticlesApiBase } from '@/lib/customArticles';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';
export const revalidate = 0;

// Test version of the function
async function testFetchArticles() {
  const base = getCustomArticlesApiBase();
  const fullUrl = `${base}/articles?page=1&limit=5`;
  
  try {
    const res = await fetch(fullUrl, {
      cache: 'no-store',
      headers: { Accept: 'application/json' },
    });
    
    if (!res.ok) {
      return { error: `HTTP ${res.status}`, data: null };
    }
    
    const text = await res.text();
    const data = JSON.parse(text);
    
    // Try both keys
    const rawList =
      (Array.isArray(data.articles) && data.articles) ||
      (Array.isArray(data.items) && data.items) ||
      [];
    
    return {
      error: null,
      data,
      rawListLength: rawList.length,
      hasArticlesKey: 'articles' in data,
      hasItemsKey: 'items' in data,
      articlesIsArray: Array.isArray(data.articles),
      itemsIsArray: Array.isArray(data.items),
    };
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err), data: null };
  }
}

export default async function APIDiagPage() {
  const result = await testFetchArticles();
  
  return (
    <html>
      <body style={{ padding: '2rem', fontFamily: 'monospace', whiteSpace: 'pre-wrap', background: '#000', color: '#0f0' }}>
        <h1>🔍 Detailed API Test</h1>
        
        <div style={{ marginTop: '1rem', padding: '1rem', background: '#111', border: '1px solid #0f0' }}>
          {result.error ? (
            <p style={{ color: 'red' }}><strong>Error:</strong> {result.error}</p>
          ) : (
            <>
              <p><strong>rawListLength:</strong> {result.rawListLength}</p>
              <p><strong>hasArticlesKey:</strong> {String(result.hasArticlesKey)}</p>
              <p><strong>hasItemsKey:</strong> {String(result.hasItemsKey)}</p>
              <p><strong>articlesIsArray:</strong> {String(result.articlesIsArray)}</p>
              <p><strong>itemsIsArray:</strong> {String(result.itemsIsArray)}</p>
              
              <p style={{ marginTop: '1rem' }}><strong>data.items?.length:</strong> {result.data?.items?.length || 0}</p>
              <p><strong>data.total:</strong> {result.data?.total || 0}</p>
              
              <p style={{ marginTop: '1rem' }}><strong>All keys:</strong> {JSON.stringify(Object.keys(result.data || {}))}</p>
            </>
          )}
        </div>
      </body>
    </html>
  );
}
