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
        <h3 className="text-lg font-bold text-text-primary mb-2">
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
        className="shrink-0 bg-primary text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-primary-dark transition-colors text-center w-full sm:w-auto"
      >
        Scan in App
      </a>
    </div>
  );
}