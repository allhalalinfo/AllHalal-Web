import { getCustomArticlesApiBase } from '@/lib/customArticles';

export const dynamic = 'force-dynamic';

export default async function TestSitemapPage() {
  const apiBase = getCustomArticlesApiBase();
  const fullUrl = `${apiBase}/articles?page=1&limit=5`;
  
  let responseText = '';
  let error = '';
  
  try {
    const res = await fetch(fullUrl, {
      next: { revalidate: 0 },
      headers: { Accept: 'application/json' },
    });
    
    responseText = `HTTP ${res.status}`;
    
    if (res.ok) {
      const text = await res.text();
      const data = JSON.parse(text);
      responseText += `\n\nKeys: ${JSON.stringify(Object.keys(data))}\n`;
      responseText += `\nhas items: ${Array.isArray(data.items)}\n`;
      responseText += `items length: ${data.items?.length || 0}\n`;
      responseText += `\nFirst item ID: ${data.items?.[0]?.id || 'none'}\n`;
      responseText += `\n\nFull response:\n${text.substring(0, 1000)}`;
    } else {
      error = await res.text();
    }
  } catch (err) {
    error = err instanceof Error ? err.message : String(err);
  }
  
  return (
    <div style={{ padding: '2rem', fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
      <h1>API Debug Test</h1>
      
      <div style={{ marginTop: '1rem', padding: '1rem', background: '#f0f0f0' }}>
        <h2>API Base:</h2>
        <p>{apiBase}</p>
        
        <h2>Full URL:</h2>
        <p>{fullUrl}</p>
        
        <h2>Response:</h2>
        <p>{responseText}</p>
        
        {error && (
          <>
            <h2 style={{ color: 'red' }}>Error:</h2>
            <p style={{ color: 'red' }}>{error}</p>
          </>
        )}
      </div>
    </div>
  );
}
