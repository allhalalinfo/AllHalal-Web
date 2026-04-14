import { getCustomArticlesApiBase } from '@/lib/customArticles';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';
export const revalidate = 0;

export default async function APIDiagPage() {
  const apiBase = getCustomArticlesApiBase();
  const fullUrl = `${apiBase}/articles?page=1&limit=5`;
  
  let data: any = {};
  let error = '';
  let statusCode = 0;
  
  try {
    const res = await fetch(fullUrl, {
      cache: 'no-store',
      headers: { Accept: 'application/json' },
    });
    
    statusCode = res.status;
    
    if (res.ok) {
      const text = await res.text();
      data = JSON.parse(text);
    } else {
      error = await res.text();
    }
  } catch (err) {
    error = err instanceof Error ? err.message : String(err);
  }
  
  return (
    <html>
      <body style={{ padding: '2rem', fontFamily: 'monospace', whiteSpace: 'pre-wrap', background: '#000', color: '#0f0' }}>
        <h1>🔍 API Diagnostic</h1>
        
        <div style={{ marginTop: '1rem', padding: '1rem', background: '#111', border: '1px solid #0f0' }}>
          <p><strong>API Base:</strong> {apiBase}</p>
          <p><strong>Full URL:</strong> {fullUrl}</p>
          <p><strong>HTTP Status:</strong> {statusCode}</p>
          
          {error ? (
            <div>
              <p style={{ color: 'red' }}><strong>Error:</strong></p>
              <pre>{error}</pre>
            </div>
          ) : (
            <div>
              <p><strong>Response Keys:</strong> {JSON.stringify(Object.keys(data))}</p>
              <p><strong>has items:</strong> {String(Array.isArray(data.items))}</p>
              <p><strong>items length:</strong> {data.items?.length || 0}</p>
              <p><strong>total:</strong> {data.total || 0}</p>
              {data.items?.[0] && (
                <>
                  <p><strong>First article ID:</strong> {data.items[0].id}</p>
                  <p><strong>First article title:</strong> {data.items[0].title}</p>
                </>
              )}
            </div>
          )}
        </div>
      </body>
    </html>
  );
}
