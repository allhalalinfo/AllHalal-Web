/**
 * MDX Components
 * Custom React components for MDX rendering
 */

export const mdxComponents = {
  h1: (props: any) => <h1 className="text-4xl font-bold mb-6 mt-8" {...props} />,
  h2: (props: any) => <h2 className="text-3xl font-bold mb-4 mt-8" {...props} />,
  h3: (props: any) => <h3 className="text-2xl font-semibold mb-3 mt-6" {...props} />,
  p: (props: any) => <p className="text-lg leading-relaxed mb-4 text-neutral-700 dark:text-neutral-300" {...props} />,
  ul: (props: any) => <ul className="list-disc list-inside mb-4 space-y-2" {...props} />,
  ol: (props: any) => <ol className="list-decimal list-inside mb-4 space-y-2" {...props} />,
  li: (props: any) => <li className="text-lg text-neutral-700 dark:text-neutral-300" {...props} />,
  a: (props: any) => <a className="text-primary hover:underline" {...props} />,
  blockquote: (props: any) => (
    <blockquote className="border-l-4 border-primary pl-4 italic my-4 text-neutral-600 dark:text-neutral-400" {...props} />
  ),
  code: (props: any) => (
    <code className="bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded text-sm font-mono" {...props} />
  ),
  pre: (props: any) => (
    <pre className="bg-neutral-900 dark:bg-neutral-950 rounded-lg p-4 overflow-x-auto my-6" {...props} />
  ),
};
