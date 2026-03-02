"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";

interface SuggestProductFormProps {
  initialProductName?: string;
  locale?: string;
}

export default function SuggestProductForm({ initialProductName = "", locale = "en" }: SuggestProductFormProps) {
  const pathname = usePathname();
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const formData = new FormData(e.currentTarget);
    const data = {
      productName: formData.get("productName"),
      productBrand: formData.get("productBrand"),
      category: formData.get("category"),
      userEmail: formData.get("userEmail"),
      message: formData.get("message"),
      sourcePath: pathname,
      locale: locale,
    };

    try {
      const res = await fetch("/api/suggest-product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (res.ok && result.ok) {
        setStatus("success");
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus("error");
        setErrorMessage(result.error || "Something went wrong. Please try again later.");
      }
    } catch (err) {
      setStatus("error");
      setErrorMessage("Network error. Please try again later.");
    }
  };

  if (status === "success") {
    return (
      <div className="bg-green-50/50 dark:bg-green-900/10 border border-green-200 dark:border-green-900/30 rounded-2xl p-6 text-center">
        <div className="w-12 h-12 bg-green-100 dark:bg-green-800/30 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-text-primary mb-2">Thank you!</h3>
        <p className="text-text-secondary text-sm">
          Your suggestion has been received. Our team will review and add it to AllHalal soon.
        </p>
        <button 
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm font-medium text-primary hover:underline"
        >
          Suggest another product
        </button>
      </div>
    );
  }

  return (
    <div className="bg-bg-card border border-border rounded-2xl p-6 text-left max-w-xl mx-auto w-full">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-text-primary mb-2">Didn't find your product?</h3>
        <p className="text-text-secondary text-sm">
          Suggest it below and we'll verify and add it to the AllHalal database.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="productName" className="block text-sm font-medium text-text-primary mb-1">
            Product Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="productName"
            name="productName"
            required
            defaultValue={initialProductName}
            minLength={2}
            maxLength={200}
            className="w-full px-4 py-3 bg-bg-primary border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-text-primary transition-all"
            placeholder="e.g. Takis Blue Heat"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="productBrand" className="block text-sm font-medium text-text-primary mb-1">
              Brand <span className="text-text-muted font-normal">(optional)</span>
            </label>
            <input
              type="text"
              id="productBrand"
              name="productBrand"
              className="w-full px-4 py-3 bg-bg-primary border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-text-primary transition-all"
              placeholder="e.g. Barcel"
            />
          </div>
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-text-primary mb-1">
              Category <span className="text-text-muted font-normal">(optional)</span>
            </label>
            <select
              id="category"
              name="category"
              className="w-full px-4 py-3 bg-bg-primary border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-text-primary transition-all appearance-none"
            >
              <option value="">Select a category...</option>
              <option value="snack">Snack & Sweets</option>
              <option value="drink">Drink</option>
              <option value="additive">Additive (E-code)</option>
              <option value="fast-food">Fast Food / Restaurant</option>
              <option value="cosmetics">Cosmetics</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-text-primary mb-1">
            Additional Info <span className="text-text-muted font-normal">(optional)</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={3}
            className="w-full px-4 py-3 bg-bg-primary border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-text-primary transition-all resize-none"
            placeholder="Tell us more or paste a link to the product..."
          />
        </div>

        <div>
          <label htmlFor="userEmail" className="block text-sm font-medium text-text-primary mb-1">
            Your Email <span className="text-text-muted font-normal">(optional)</span>
          </label>
          <input
            type="email"
            id="userEmail"
            name="userEmail"
            className="w-full px-4 py-3 bg-bg-primary border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-text-primary transition-all"
            placeholder="For updates when we add it"
          />
        </div>

        {status === "error" && (
          <div className="text-red-500 text-sm py-2 px-3 bg-red-500/10 rounded-lg">
            {errorMessage}
          </div>
        )}

        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full bg-primary text-bg-elevated px-6 py-3.5 rounded-xl font-semibold hover:bg-primary-dark transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {status === "loading" ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-bg-elevated" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Sending...
            </>
          ) : (
            "Submit Product"
          )}
        </button>
      </form>
    </div>
  );
}