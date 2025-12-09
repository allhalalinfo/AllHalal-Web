"use client";

/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * CONTACT PAGE
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * Modern contact page with form and support information.
 * Features:
 * - Clean contact form
 * - Support categories
 * - FAQ quick links
 * - Animated elements
 * 
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import { useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

// Support categories
const categories = [
  { value: "general", label: "General Inquiry" },
  { value: "technical", label: "Technical Support" },
  { value: "feedback", label: "Feedback & Suggestions" },
  { value: "bug", label: "Bug Report" },
  { value: "business", label: "Business Inquiry" },
  { value: "religious", label: "Religious Question" },
];

// Quick links
const quickLinks = [
  {
    title: "Privacy Policy",
    description: "Learn how we protect your data",
    href: "/legal/privacy-policy",
    icon: ShieldIcon,
  },
  {
    title: "Terms of Service",
    description: "Read our terms and conditions",
    href: "/legal/terms-of-service",
    icon: DocumentIcon,
  },
  {
    title: "Disclaimer",
    description: "Important religious accuracy info",
    href: "/legal/disclaimer",
    icon: AlertIcon,
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "general",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
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
        {/* Spacer for fixed header */}
        <div className="h-20" />

        <div className="section">
          <div className="container">
            {/* Page Header */}
            <motion.div
              className="text-center max-w-2xl mx-auto mb-16"
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
                Get in Touch
              </motion.span>
              
              <motion.h1
                className="text-display-2 font-bold text-text-primary mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Contact Us
              </motion.h1>
              
              <motion.p
                className="text-xl text-text-secondary"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Have a question or feedback? We'd love to hear from you. 
                Our team typically responds within 24-48 hours.
              </motion.p>
            </motion.div>

            <div className="grid lg:grid-cols-5 gap-12 max-w-6xl mx-auto">
              {/* Contact Form */}
              <motion.div
                className="lg:col-span-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                {!isSubmitted ? (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name Field */}
                    <div>
                      <label htmlFor="name" className="form-label">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="form-input"
                        placeholder="Your name"
                      />
                    </div>

                    {/* Email Field */}
                    <div>
                      <label htmlFor="email" className="form-label">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="form-input"
                        placeholder="your@email.com"
                      />
                    </div>

                    {/* Category Select */}
                    <div>
                      <label htmlFor="category" className="form-label">
                        Category
                      </label>
                      <select
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="form-input"
                      >
                        {categories.map((cat) => (
                          <option key={cat.value} value={cat.value}>
                            {cat.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Message Field */}
                    <div>
                      <label htmlFor="message" className="form-label">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        className="form-input form-textarea"
                        placeholder="How can we help you?"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn btn-primary btn-lg w-full disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <LoadingIcon className="w-5 h-5 animate-spin" />
                          Sending...
                        </span>
                      ) : (
                        "Send Message"
                      )}
                    </button>
                  </form>
                ) : (
                  <motion.div
                    className="text-center py-12"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
                      <CheckIcon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold text-text-primary mb-2">
                      Message Sent!
                    </h3>
                    <p className="text-text-secondary mb-6">
                      Thank you for reaching out. We'll get back to you soon.
                    </p>
                    <button
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormData({ name: "", email: "", category: "general", message: "" });
                      }}
                      className="btn btn-secondary"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                )}
              </motion.div>

              {/* Sidebar */}
              <motion.div
                className="lg:col-span-2 space-y-8"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                {/* Direct Contact */}
                <div className="p-6 rounded-xl bg-bg-card border border-border">
                  <h3 className="text-lg font-semibold text-text-primary mb-4">
                    Direct Contact
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

                {/* Quick Links */}
                <div>
                  <h3 className="text-lg font-semibold text-text-primary mb-4">
                    Helpful Links
                  </h3>
                  <div className="space-y-3">
                    {quickLinks.map((link) => (
                      <a
                        key={link.title}
                        href={link.href}
                        className="flex items-start gap-3 p-4 rounded-lg bg-bg-card border border-border hover:border-primary/30 transition-colors group"
                      >
                        <link.icon className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="font-medium text-text-primary group-hover:text-primary transition-colors">
                            {link.title}
                          </div>
                          <div className="text-sm text-text-muted">
                            {link.description}
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>

                {/* Response Time Note */}
                <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                  <p className="text-sm text-text-secondary">
                    <strong className="text-primary">Response Time:</strong> We typically 
                    respond to all inquiries within 24-48 business hours.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

// Icon Components
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

function LoadingIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83" />
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
