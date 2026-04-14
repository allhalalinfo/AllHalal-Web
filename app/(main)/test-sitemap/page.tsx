import { fetchCustomArticlesList } from '@/lib/customArticles';

export const dynamic = 'force-dynamic';

export default async function TestSitemapPage() {
  const startTime = Date.now();
  
  try {
    const result = await fetchCustomArticlesList({ page: 1, limit: 200 });
    const duration = Date.now() - startTime;
    
    return (
      <div style={{ padding: '2rem', fontFamily: 'monospace' }}>
        <h1>Sitemap Debug Test</h1>
        
        <div style={{ marginTop: '1rem', padding: '1rem', background: '#f0f0f0' }}>
          <h2>API Response:</h2>
          <p><strong>Duration:</strong> {duration}ms</p>
          <p><strong>Total articles:</strong> {result.total}</p>
          <p><strong>Returned articles:</strong> {result.articles.length}</p>
          <p><strong>Page:</strong> {result.page}</p>
          <p><strong>Limit:</strong> {result.limit}</p>
        </div>
        
        <div style={{ marginTop: '1rem', padding: '1rem', background: '#e8f5e9' }}>
          <h2>First 10 Article IDs:</h2>
          <ul>
            {result.articles.slice(0, 10).map(a => (
              <li key={a.id}>
                {a.id} - {a.title}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div style={{ padding: '2rem', fontFamily: 'monospace', color: 'red' }}>
        <h1>ERROR</h1>
        <pre>{error instanceof Error ? error.message : String(error)}</pre>
      </div>
    );
  }
}
