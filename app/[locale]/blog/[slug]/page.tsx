import { blogPosts } from "@/data/blogPosts";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import AppDeepLinkCTA from "@/components/ui/AppDeepLinkCTA";

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const params = await props.params;
  const post = blogPosts.find(p => p.slug === params.slug);
  if (!post) return { title: 'Not Found' };
  
  return {
    title: `${post.title} | AllHalal Blog`,
    description: post.summary,
  };
}

export default async function BlogPostPage(props: { params: Promise<{ locale: string, slug: string }> }) {
  const params = await props.params;
  const post = blogPosts.find(p => p.slug === params.slug);
  if (!post) notFound();

  return (
    <div className="container py-32 min-h-screen">
      <div className="max-w-3xl mx-auto">
        <Link href={`/${params.locale}/blog`} className="text-primary hover:underline mb-8 inline-block">&larr; Back to Blog</Link>
        
        <div className="mb-12">
          <div className="flex gap-2 mb-6">
            {post.tags.map(tag => (
              <span key={tag} className="px-3 py-1 bg-primary/10 text-primary text-sm font-bold rounded-full">{tag}</span>
            ))}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-6 leading-tight">{post.title}</h1>
          <div className="text-text-muted">{new Date(post.publishedAt).toLocaleDateString()}</div>
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-none text-text-secondary mb-12">
          {/* Extremely basic markdown rendering for the MVP */}
          {post.content.split('\n\n').map((paragraph, idx) => {
            if (paragraph.startsWith('## ')) {
              return <h2 key={idx} className="text-2xl font-bold text-text-primary mt-10 mb-4">{paragraph.replace('## ', '')}</h2>;
            }
            if (paragraph.startsWith('- ')) {
              const items = paragraph.split('\n').map(i => i.replace('- ', ''));
              return (
                <ul key={idx} className="list-disc pl-6 mb-6 space-y-2">
                  {items.map((i, iIdx) => {
                    const match = i.match(/\*\*(.*?)\*\*/);
                    if (match) {
                      return <li key={iIdx}><strong>{match[1]}</strong>{i.replace(`**${match[1]}**`, '')}</li>;
                    }
                    return <li key={iIdx}>{i}</li>;
                  })}
                </ul>
              );
            }
            return <p key={idx} className="mb-6">{paragraph}</p>;
          })}
        </div>

        <AppDeepLinkCTA variant="blog" />

        <hr className="border-border my-12" />
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-bg-card border border-border p-8 rounded-3xl shadow-sm">
            <h3 className="text-xl font-bold text-text-primary mb-3">Check if your food is halal</h3>
            <p className="text-text-secondary mb-4">Search our database of ingredients and products.</p>
            <Link href={`/${params.locale}/is-it-halal`} className="text-primary font-semibold hover:underline">Explore Halal Checker &rarr;</Link>
          </div>
          <div className="bg-bg-card border border-border p-8 rounded-3xl shadow-sm">
            <h3 className="text-xl font-bold text-text-primary mb-3">Explore Halal Finance</h3>
            <p className="text-text-secondary mb-4">Learn how to manage your wealth Islamically.</p>
            <Link href={`/${params.locale}/finance`} className="text-primary font-semibold hover:underline">View Finance Hub &rarr;</Link>
          </div>
        </div>
      </div>
    </div>
  );
}