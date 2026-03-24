"use client";

import { useState } from "react";
import Footer from "@/components/layout/Footer";
import Link from "next/link";

const categories = {
  general: "General inquiry",
  technical: "Technical support",
  feedback: "Feedback",
  bug: "Bug report",
  business: "Business inquiry",
  religious: "Religious question"
} as const;

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "general" as keyof typeof categories,
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
      
      if (!accessKey || accessKey === 'YOUR_ACCESS_KEY_HERE') {
        console.error('❌ Web3Forms access key not configured!');
        throw new Error('Contact form is not configured. Please contact app@allhalal.info directly.');
      }

      const payload = {
        access_key: accessKey,
        subject: `[Contact Form] ${formData.category} - ${formData.name}`,
        from_name: formData.name,
        email: formData.email,
        message: `Category: ${formData.category}\n\n${formData.message}`,
      };

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Failed to send message');
      }

      setIsSubmitted(true);
    } catch (err) {
      console.error('❌ Contact form error:', err);
      setError(err instanceof Error ? err.message : 'Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <>
        <main className="min-h-screen bg-bg-primary pt-32 pb-20">
          <div className="container max-w-2xl">
            <div className="text-center space-y-6">
              <div className="w-20 h-20 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-10 h-10 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className="text-4xl font-bold font-display text-text-primary">Message sent!</h1>
              <p className="text-xl text-text-secondary">
                We've received your message and will get back to you soon.
              </p>
              <Link
                href="/"
                className="inline-block mt-8 px-6 py-3 bg-primary text-white rounded-full font-semibold hover:bg-primary/90 transition-colors"
              >
                Back to home
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <main className="min-h-screen bg-bg-primary pt-32 pb-20">
        <div className="container max-w-2xl">
          <div className="mb-12">
            <p className="text-sm text-primary font-medium uppercase tracking-wider mb-2">
              Get in touch
            </p>
            <h1 className="text-4xl font-bold font-display text-text-primary mb-4">Contact us</h1>
            <p className="text-xl text-text-secondary leading-relaxed">
              Have a question or feedback? We're here to help.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 bg-bg-card border border-border rounded-3xl p-8">
            {error && (
              <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
                <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
              </div>
            )}

            <div>
              <label htmlFor="name" className="form-label">
                Your name
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="form-input"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="form-input"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label htmlFor="category" className="form-label">
                Category
              </label>
              <select
                id="category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as keyof typeof categories })}
                className="form-input"
              >
                {Object.entries(categories).map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="message" className="form-label">
                Message
              </label>
              <textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                rows={6}
                className="form-input resize-none"
                placeholder="Tell us what's on your mind..."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-6 py-4 bg-primary text-white font-semibold rounded-full hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Sending..." : "Send message"}
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}
