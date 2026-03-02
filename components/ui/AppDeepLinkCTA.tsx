import React from 'react';

interface AppDeepLinkCTAProps {
  itemName?: string;
  variant?: 'product' | 'blog';
}

export default function AppDeepLinkCTA({ itemName, variant = 'product' }: AppDeepLinkCTAProps) {
  const isBlog = variant === 'blog';
  
  return (
    <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 my-8 flex flex-col sm:flex-row items-center justify-between gap-6">
      <div className="flex-1">
        <h3 className="text-lg font-bold font-display text-text-primary mb-2">
          {isBlog 
            ? "Check your food before you eat it" 
            : `Want to check ${itemName ? `similar products to ${itemName}` : 'this product'} in real life?`
          }
        </h3>
        <p className="text-text-secondary text-sm">
          {isBlog
            ? "Scan barcodes and check exact E-codes instantly with the allhalal.info app. We verify against 2M+ products."
            : "Scan barcodes and check exact E-codes instantly with the allhalal.info app. We verify against 2M+ products."
          }
        </p>
      </div>
      <a
        href="https://apps.apple.com/us/app/allhalal-info-food-scanner/id6756242265"
        target="_blank"
        rel="noopener noreferrer"
            className="shrink-0 bg-gradient-gold text-[#4A3319] hover:bg-gradient-gold-hover px-6 py-3 rounded-full text-sm font-bold shadow-[0_4px_15px_rgba(176,144,98,0.3)] transition-all transform hover:-translate-y-0.5 text-center w-full sm:w-auto"
      >
        Scan in App
      </a>
    </div>
  );
}