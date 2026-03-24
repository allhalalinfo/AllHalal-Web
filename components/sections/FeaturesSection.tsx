"use client";

import Image from "next/image";

const features = [
  {
    key: "lifestyle",
    title: "Healthy choices made simple",
    description: "Scan any product and get instant halal verification with ingredient breakdown and alternatives.",
    image: "/app-screens/1.png",
    color: "from-primary/20"
  },
  {
    key: "scan",
    title: "Instant barcode scanning",
    description: "Point your camera at any barcode and receive immediate halal status with detailed reasoning.",
    image: "/app-screens/2.png",
    color: "from-amber-600/20"
  },
  {
    key: "ingredients",
    title: "Deep ingredient analysis",
    description: "Every ingredient explained with Islamic rulings, sources, and alternative suggestions.",
    image: "/app-screens/3.png",
    color: "from-orange-500/20"
  },
  {
    key: "cosmetics",
    title: "Beauty & cosmetics checker",
    description: "Verify makeup, skincare, and personal care products for halal compliance.",
    image: "/app-screens/4.png",
    color: "from-stone-500/20"
  },
  {
    key: "ecodes",
    title: "E-number database",
    description: "Comprehensive guide to E-codes with halal status and source information.",
    image: "/app-screens/5.png",
    color: "from-yellow-600/20"
  },
  {
    key: "restaurants",
    title: "Find halal restaurants",
    description: "Discover certified halal restaurants, reviews, and menus near you.",
    image: "/app-screens/6.png",
    color: "from-primary/20"
  },
  {
    key: "prayer",
    title: "Prayer times & Qibla",
    description: "Accurate prayer times for your location with Qibla direction and notifications.",
    image: "/app-screens/7.png",
    color: "from-amber-600/20"
  },
  {
    key: "authorities",
    title: "Trusted authorities",
    description: "Rulings backed by recognized Islamic scholars and certification bodies.",
    image: "/app-screens/8.png",
    color: "from-orange-500/20"
  },
  {
    key: "journey",
    title: "Track your halal journey",
    description: "Monitor your scans, favorites, and halal lifestyle progress over time.",
    image: "/app-screens/9.png",
    color: "from-stone-500/20"
  },
  {
    key: "status",
    title: "Real-time verification status",
    description: "Live updates on product verification with confidence scores and certifications.",
    image: "/app-screens/10.png",
    color: "from-yellow-600/20"
  }
];

export default function FeaturesSection() {
  const renderFeatureCard = (feature: typeof features[0], indexKey: string) => {
    return (
      <div
        key={indexKey}
        className="flex-none w-[260px] md:w-[300px] snap-center flex flex-col gap-6 transform-gpu"
      >
        <div className="relative mx-auto w-full">
          <div className={`absolute inset-0 bg-gradient-radial ${feature.color} to-transparent scale-125 opacity-40 pointer-events-none`} />

          <div className="relative bg-bg-card rounded-[2.5rem] p-2 border border-border shadow-xl">
            <div className="relative aspect-[9/19] rounded-[2rem] overflow-hidden bg-bg-tertiary">
              <Image
                src={feature.image}
                alt={feature.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 280px, 320px"
                priority
              />
            </div>
          </div>
        </div>

        <div className="text-center px-2">
          <h3 className="text-xl font-bold font-display text-text-primary mb-3">
            {feature.title}
          </h3>
          <p className="text-sm text-text-secondary leading-relaxed">
            {feature.description}
          </p>
        </div>
      </div>
    );
  };

  return (
    <>
      <section id="features" className="section-sm bg-bg-primary relative overflow-hidden">
        <div className="container relative z-10 mx-auto mb-10 max-w-3xl text-center md:mb-14">
          <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-widest text-primary">
            Everything you need
          </span>

          <h2 className="mb-4 font-display text-display-1 font-bold text-text-primary">
            Built for Muslim life
          </h2>

          <p className="text-lg text-text-secondary md:text-xl">
            From instant barcode scanning to prayer times, halal restaurant discovery, and deep ingredient analysis—everything in one beautifully designed app.
          </p>
        </div>
      </section>

      <div style={{
        position: 'relative',
        left: '50%',
        right: '50%',
        marginLeft: '-50vw',
        marginRight: '-50vw',
        width: '100vw',
        maxWidth: '100vw'
      }} className="bg-bg-primary pb-16 md:pb-20">
        <div className="flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-12 pt-2 md:gap-10 md:px-12 md:pb-14 [scrollbar-width:none] [-ms-overflow-style:none] lg:hidden [&::-webkit-scrollbar]:hidden">
          {features.map((feature) => renderFeatureCard(feature, feature.key))}
        </div>

        <div className="hidden pb-12 pt-2 lg:block lg:pb-14">
          <div className="marquee-rail">
            <div className="marquee-track gap-10 xl:gap-12 pl-10 xl:pl-12 pr-10 xl:pr-12">
              {features.map((feature, index) => renderFeatureCard(feature, `primary-${feature.key}-${index}`))}
              {features.map((feature, index) => renderFeatureCard(feature, `secondary-${feature.key}-${index}`))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
