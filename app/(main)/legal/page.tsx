"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const legalDocuments = [
  {
    title: "Privacy Policy",
    description: "How we collect, use, and protect your personal information",
    href: `/legal/privacy-policy`,
    icon: ShieldIcon,
    lastUpdated: "March 15, 2025",
  },
  {
    title: "Terms of Service",
    description: "Rules and guidelines for using AllHalal services",
    href: `/legal/terms-of-service`,
    icon: DocumentIcon,
    lastUpdated: "March 15, 2025",
  },
  {
    title: "Disclaimer",
    description: "Important information about our services and limitations",
    href: `/legal/disclaimer`,
    icon: AlertIcon,
    lastUpdated: "March 15, 2025",
  },
];

export default function LegalPage() {
  return (
    <div>
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.span
          className="inline-block text-primary text-sm font-semibold uppercase tracking-widest mb-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Legal information
        </motion.span>

        <motion.h1
          className="text-display-1 font-bold font-display text-text-primary mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Legal documents
        </motion.h1>

        <motion.p
          className="text-xl text-text-secondary max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          Important legal information about our services, privacy, and terms of use
        </motion.p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {legalDocuments.map((doc, index) => {
          const Icon = doc.icon;
          return (
            <motion.div
              key={doc.href}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
            >
              <Link href={doc.href}>
                <div className="bg-bg-card border border-border rounded-2xl p-6 hover:border-primary/50 hover:shadow-lg transition-all cursor-pointer group h-full flex flex-col">
                  <div className="mb-4 p-3 bg-primary/10 rounded-xl inline-flex w-fit group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>

                  <h2 className="text-xl font-bold font-display text-text-primary mb-2 group-hover:text-primary transition-colors">
                    {doc.title}
                  </h2>

                  <p className="text-text-secondary mb-4 flex-grow">
                    {doc.description}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-border/50">
                    <span className="text-sm text-text-muted">
                      Updated {doc.lastUpdated}
                    </span>
                    <span className="text-primary group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        className="mt-16 p-6 bg-bg-card border border-border rounded-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <h3 className="font-semibold text-text-primary mb-2">Questions about our legal documents?</h3>
        <p className="text-text-secondary mb-4">
          If you have any questions about our legal policies, please don't hesitate to contact us.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors"
        >
          Contact our team
          <span>→</span>
        </Link>
      </motion.div>
    </div>
  );
}

function ShieldIcon(props: React.SVGProps<SVGSVGElement>) {
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
        d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
      />
    </svg>
  );
}

function DocumentIcon(props: React.SVGProps<SVGSVGElement>) {
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
        d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
      />
    </svg>
  );
}

function AlertIcon(props: React.SVGProps<SVGSVGElement>) {
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
        d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
      />
    </svg>
  );
}
