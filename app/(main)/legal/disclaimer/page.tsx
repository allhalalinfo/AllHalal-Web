import fs from "fs";
import path from "path";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

function ArrowLeftIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
      />
    </svg>
  );
}

export default function DisclaimerPage() {
  const content = fs.readFileSync(
    path.join(process.cwd(), "content", "legal", "en", "disclaimer.md"),
    "utf8",
  );

  return (
    <article className="prose">
      <Link
        href="/legal"
        className="mb-8 inline-flex items-center gap-2 text-sm text-text-muted no-underline transition-colors hover:text-primary"
      >
        <ArrowLeftIcon className="h-4 w-4" />
        Back to legal documents
      </Link>

      <div className="mb-12">
        <p className="mb-2 text-sm font-medium uppercase tracking-wider text-primary">
          Last updated: March 15, 2025
        </p>
        <h1>Disclaimer</h1>
        <p className="text-xl leading-relaxed text-text-secondary">
          Important information about our services and limitations
        </p>
      </div>

      <div className="markdown-content">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </article>
  );
}
