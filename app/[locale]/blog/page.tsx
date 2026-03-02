import { blogPosts } from "@/data/blogPosts";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'allhalal.info Blog | Articles & Insights',
  description: 'Read the latest articles on halal food, finance, lifestyle, and updates from allhalal.info.',
};

export default async function BlogIndex(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  return (
    <div className="container py-32 min-h-screen">
      <div className="max-w-4xl mx-auto mb-16 text-center">
        <h1 className="text-5xl font-bold text-text-primary mb-6">allhalal.info Blog</h1>
        <p className="text-xl text-text-secondary">Insights on living a Halal lifestyle.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {blogPosts.map(post => (
          <Link key={post.slug} href={`/${params.locale}/blog/${post.slug}`} className="bg-bg-card border border-border p-8 rounded-3xl hover:border-primary transition-colors flex flex-col h-full shadow-sm">
            <div className="flex gap-2 mb-4">
              {post.tags.map(tag => (
                <span key={tag} className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full">{tag}</span>
              ))}
            </div>
            <h2 className="text-2xl font-bold text-text-primary mb-4">{post.title}</h2>
            <p className="text-text-secondary mb-6 flex-grow">{post.summary}</p>
            <div className="text-sm text-text-muted">{new Date(post.publishedAt).toLocaleDateString()}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}