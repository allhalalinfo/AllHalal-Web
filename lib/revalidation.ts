/**
 * On-Demand ISR Revalidation Utilities
 * 
 * Invalidates Next.js cache for specific paths when content changes.
 * This ensures sitemap.xml and article pages are regenerated immediately.
 */

/**
 * Revalidates sitemap.xml and optionally specific article pages
 * @param articleId - Optional article ID to revalidate its page
 */
export async function revalidateAfterArticleChange(articleId?: string): Promise<void> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://allhalal.info';
    const revalidateSecret = process.env.REVALIDATE_SECRET;
    
    if (!revalidateSecret) {
      console.warn('REVALIDATE_SECRET not set - skipping ISR revalidation');
      return;
    }

    const pathsToRevalidate = [
      '/sitemap.xml',  // Always revalidate sitemap
      '/news',         // News page with custom articles
      '/finance',      // Finance category page
      '/travel',       // Travel category page
      '/learn',        // Learn/Blog page
    ];

    // Add specific article page if provided
    if (articleId) {
      pathsToRevalidate.push(`/read/${articleId}`);
    }

    // Revalidate all paths in parallel
    const revalidatePromises = pathsToRevalidate.map(async (path) => {
      try {
        const url = `${baseUrl}/api/revalidate?secret=${revalidateSecret}&path=${encodeURIComponent(path)}`;
        const response = await fetch(url, { method: 'POST' });
        
        if (!response.ok) {
          console.error(`Failed to revalidate ${path}: ${response.status}`);
        } else {
          console.log(`✓ Revalidated: ${path}`);
        }
      } catch (error) {
        console.error(`Error revalidating ${path}:`, error);
      }
    });

    await Promise.all(revalidatePromises);
    console.log(`ISR revalidation completed for ${pathsToRevalidate.length} paths`);
  } catch (error) {
    console.error('ISR revalidation failed:', error);
  }
}
