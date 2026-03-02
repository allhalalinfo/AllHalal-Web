import Link from 'next/link';

export default function AppPromoMini() {
  return (
    <div className="bg-primary/5 border border-primary/20 rounded-3xl p-6 my-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center shrink-0">
          <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm14 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
          </svg>
        </div>
        <div>
          <h4 className="text-xl font-bold text-text-primary mb-1">Scan & Verify Instantly</h4>
          <p className="text-text-secondary text-sm">
            Get the AllHalal app to scan barcodes, analyze ingredients, and find halal places nearby.
          </p>
        </div>
      </div>
      <a 
        href="https://apps.apple.com/us/app/allhalal-info-food-scanner/id6756242265" 
        target="_blank" 
        rel="noopener noreferrer"
        className="shrink-0 bg-primary text-bg-elevated px-8 py-3 rounded-full font-semibold hover:bg-primary-dark transition-colors shadow-glow-sm"
      >
        Get the App
      </a>
    </div>
  );
}