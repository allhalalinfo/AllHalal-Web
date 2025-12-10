"use client";

/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * CONTACT PAGE - NO FLICKERING
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import { useState } from "react";
import { useTranslations } from "next-intl";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const categoryKeys = ["general", "technical", "feedback", "bug", "business", "religious"] as const;

export default function ContactPage() {
  const t = useTranslations("contact");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "general",
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
      
      // Debug: log if key is missing
      if (!accessKey || accessKey === 'YOUR_ACCESS_KEY_HERE') {
        console.error('❌ Web3Forms access key not configured!');
        throw new Error('Contact form is not configured. Please contact app@allhalal.info directly.');
      }

      console.log('📧 Sending contact form...', {
        name: formData.name,
        email: formData.email,
        category: formData.category,
      });

      const payload = {
        access_key: accessKey,
        subject: `[Contact Form] ${formData.category} - ${formData.name}`,
        from_name: formData.name,
        email: formData.email,
        message: `Category: ${formData.category}\n\n${formData.message}`,
      };

      // Web3Forms API endpoint
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      console.log('📬 Web3Forms response:', data);

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Failed to send message');
      }

      console.log('✅ Message sent successfully!');
      setIsSubmitted(true);
    } catch (err) {
      console.error('❌ Contact form error:', err);
      setError(err instanceof Error ? err.message : 'Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-bg-primary">
        <div className="h-20" />

        <div className="section">
          <div className="container">
            {/* Page Header */}
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="inline-block text-primary text-sm font-semibold uppercase tracking-widest mb-4">
                {t("subtitle")}
              </span>
              
              <h1 className="text-display-2 font-bold text-text-primary mb-4">
                {t("title")}
              </h1>
              
              <p className="text-xl text-text-secondary">
                {t("description")}
              </p>
            </div>

            <div className="grid lg:grid-cols-5 gap-12 max-w-6xl mx-auto">
              {/* Contact Form */}
              <div className="lg:col-span-3">
                {!isSubmitted ? (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="form-label">
                        {t("form.name")}
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="form-input"
                        placeholder={t("form.namePlaceholder")}
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="form-label">
                        {t("form.email")}
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="form-input"
                        placeholder={t("form.emailPlaceholder")}
                      />
                    </div>

                    <div>
                      <label htmlFor="category" className="form-label">
                        {t("form.category")}
                      </label>
                      <select
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="form-input"
                      >
                        {categoryKeys.map((key) => (
                          <option key={key} value={key}>
                            {t(`categories.${key}`)}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="message" className="form-label">
                        {t("form.message")}
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        className="form-input form-textarea"
                        placeholder={t("form.messagePlaceholder")}
                      />
                    </div>

                    {error && (
                      <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                        {error}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn btn-primary btn-lg w-full disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? t("form.sending") : t("form.submit")}
                    </button>
                  </form>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
                      <CheckIcon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold text-text-primary mb-2">
                      {t("success.title")}
                    </h3>
                    <p className="text-text-secondary mb-6">
                      {t("success.description")}
                    </p>
                    <button
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormData({ name: "", email: "", category: "general", message: "" });
                      }}
                      className="btn btn-secondary"
                    >
                      {t("success.button")}
                    </button>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-2 space-y-8">
                <div className="p-6 rounded-xl bg-bg-card border border-border">
                  <h3 className="text-lg font-semibold text-text-primary mb-4">
                    {t("sidebar.directContact")}
                  </h3>
                  <div className="space-y-4">
                    <a
                      href="mailto:app@allhalal.info"
                      className="flex items-center gap-3 text-text-secondary hover:text-primary transition-colors"
                    >
                      <MailIcon className="w-5 h-5 text-primary" />
                      app@allhalal.info
                    </a>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-text-primary mb-4">
                    {t("sidebar.helpfulLinks")}
                  </h3>
                  <div className="space-y-3">
                    <QuickLink href="/legal/privacy-policy" icon={ShieldIcon} title={t("sidebar.privacy")} desc={t("sidebar.privacyDesc")} />
                    <QuickLink href="/legal/terms-of-service" icon={DocumentIcon} title={t("sidebar.terms")} desc={t("sidebar.termsDesc")} />
                    <QuickLink href="/legal/disclaimer" icon={AlertIcon} title={t("sidebar.disclaimer")} desc={t("sidebar.disclaimerDesc")} />
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                  <p className="text-sm text-text-secondary">
                    <strong className="text-primary">{t("sidebar.responseTime")}:</strong> {t("sidebar.responseTimeDesc")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

function QuickLink({ href, icon: Icon, title, desc }: { href: string; icon: React.FC<{ className?: string }>; title: string; desc: string }) {
  return (
    <a href={href} className="flex items-start gap-3 p-4 rounded-lg bg-bg-card border border-border hover:border-primary/30 transition-colors group">
      <Icon className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
      <div>
        <div className="font-medium text-text-primary group-hover:text-primary transition-colors">{title}</div>
        <div className="text-sm text-text-muted">{desc}</div>
      </div>
    </a>
  );
}

function MailIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
}

function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  );
}

function DocumentIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  );
}

function AlertIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M5 13l4 4L19 7" />
    </svg>
  );
}
