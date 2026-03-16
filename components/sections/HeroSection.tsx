"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  ArrowRight,
  BarChart3,
  Clock3,
  Globe2,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const floatingCards = [
  {
    title: "Prayer rhythm",
    value: "Dhuhr in 28m",
    detail: "A calmer daily command center",
    icon: Clock3,
    className:
      "left-0 top-10 w-[14rem] md:left-4 md:top-14 lg:left-0 lg:top-16 xl:left-10 xl:top-20",
    delay: 0.15,
  },
  {
    title: "Finance signal",
    value: "USD / SAR 3.75",
    detail: "Live rates for zakat and travel",
    icon: BarChart3,
    className:
      "right-0 top-0 w-[15rem] md:right-6 md:top-8 lg:right-0 lg:top-2 xl:right-10 xl:top-8",
    delay: 0.28,
  },
  {
    title: "Trusted checker",
    value: "AI + methodology",
    detail: "From barcode to ingredient clarity",
    icon: ShieldCheck,
    className:
      "left-6 bottom-4 w-[15rem] md:left-16 md:bottom-10 lg:left-8 lg:bottom-6 xl:left-20 xl:bottom-10",
    delay: 0.42,
  },
  {
    title: "Muslim world",
    value: "Fresh curated news",
    detail: "Faith, finance and community in one feed",
    icon: Globe2,
    className:
      "right-4 bottom-0 w-[14rem] md:right-10 md:bottom-8 lg:right-2 lg:bottom-6 xl:right-16 xl:bottom-10",
    delay: 0.52,
  },
];

const quickStats = [
  { label: "Products", value: "2M+" },
  { label: "Languages", value: "11" },
  { label: "Live tools", value: "Prayer + finance" },
];

const spotlightItems = [
  "Halal verification that feels immediate",
  "Live Muslim utilities in one destination",
  "Modern UI with trust signals, not filler",
];

export default function HeroSection() {
  const t = useTranslations("hero");

  return (
    <section className="relative overflow-hidden border-b border-[rgba(47,37,30,0.08)] bg-[linear-gradient(180deg,#f7f2e7_0%,#f5f1e8_18%,#eef1ec_52%,#f2f1e8_100%)]">
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(244,185,66,0.22),transparent_24%),radial-gradient(circle_at_78%_12%,rgba(73,110,112,0.2),transparent_26%),radial-gradient(circle_at_55%_78%,rgba(104,134,93,0.12),transparent_24%)]"
          animate={{
            opacity: [0.86, 1, 0.88],
            scale: [1, 1.02, 1],
          }}
          transition={{ duration: 14, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.45),transparent_26%,transparent_72%,rgba(255,255,255,0.18))]" />
        <div className="absolute left-[-10rem] top-[8rem] h-[24rem] w-[24rem] rounded-full bg-[rgba(244,185,66,0.18)] blur-3xl" />
        <div className="absolute right-[-10rem] top-[6rem] h-[24rem] w-[24rem] rounded-full bg-[rgba(75,110,112,0.16)] blur-3xl" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(180deg,transparent,rgba(242,241,232,0.92))]" />
      </div>

      <div className="container relative z-10">
        <div className="grid min-h-[100svh] items-center gap-12 pb-14 pt-32 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)] lg:gap-10 lg:pb-18 lg:pt-36">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: "easeOut" }}
            className="relative max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(47,37,30,0.08)] bg-white/70 px-4 py-2 text-[0.72rem] font-bold uppercase tracking-[0.24em] text-text-secondary shadow-[0_12px_28px_rgba(43,34,24,0.08)] backdrop-blur-xl">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              {t("subtitle")}
            </div>

            <h1 className="mt-6 max-w-5xl text-[clamp(3.6rem,11vw,8rem)] font-black font-display leading-[0.9] tracking-[-0.05em] text-text-primary">
              <motion.span
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.05, ease: "easeOut" }}
                className="block"
              >
                {t("title1")}
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.12, ease: "easeOut" }}
                className="block"
              >
                {t("title2")}
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.2, ease: "easeOut" }}
                className="block bg-[linear-gradient(135deg,#9b7747_0%,#2f5458_38%,#59714d_72%,#b6925b_100%)] bg-clip-text text-transparent"
              >
                {t("title3")}
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.18, ease: "easeOut" }}
              className="mt-6 max-w-2xl text-lg leading-relaxed text-text-secondary md:text-xl"
            >
              {t("description")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.28, ease: "easeOut" }}
              className="mt-8 flex flex-col gap-3 sm:flex-row"
            >
              <motion.a
                href="https://apps.apple.com/us/app/allhalal-info-food-scanner/id6756242265"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3, scale: 1.01 }}
                whileTap={{ scale: 0.985 }}
                className="group inline-flex items-center justify-center gap-2 rounded-[1.35rem] bg-[linear-gradient(135deg,#b89665,#e5d0a6_60%,#a9824f)] px-6 py-4 text-base font-bold text-[#4a3319] shadow-[0_20px_55px_rgba(176,144,98,0.32)]"
              >
                {t("ctaAppStore")}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </motion.a>

              <motion.a
                href="#portal-home"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.99 }}
                className="inline-flex items-center justify-center gap-2 rounded-[1.35rem] border border-[rgba(47,37,30,0.1)] bg-white/72 px-6 py-4 text-base font-semibold text-text-primary shadow-[0_16px_40px_rgba(43,34,24,0.08)] backdrop-blur-xl"
              >
                {t("ctaExplore")}
              </motion.a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.36, ease: "easeOut" }}
              className="mt-10 grid gap-3 sm:grid-cols-3"
            >
              {quickStats.map((item) => (
                <div
                  key={item.label}
                  className="rounded-[1.4rem] border border-[rgba(47,37,30,0.08)] bg-white/62 p-4 shadow-[0_14px_36px_rgba(43,34,24,0.06)] backdrop-blur-xl"
                >
                  <div className="text-[0.68rem] font-bold uppercase tracking-[0.22em] text-text-muted">
                    {item.label}
                  </div>
                  <div className="mt-2 text-xl font-bold font-display text-text-primary">
                    {item.value}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <div className="relative min-h-[30rem] lg:min-h-[42rem]">
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 18 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.15, ease: "easeOut" }}
              className="relative mx-auto max-w-[42rem] rounded-[2rem] border border-[rgba(47,37,30,0.08)] bg-[linear-gradient(180deg,rgba(255,255,255,0.88),rgba(248,244,236,0.76))] p-5 shadow-[0_30px_90px_rgba(43,34,24,0.12)] backdrop-blur-2xl md:p-6"
            >
              <div className="pointer-events-none absolute inset-0 rounded-[2rem] bg-[linear-gradient(135deg,rgba(255,255,255,0.34),transparent_40%,transparent_70%,rgba(255,255,255,0.15))]" />

              <div className="relative overflow-hidden rounded-[1.7rem] bg-[linear-gradient(180deg,#20333d,#142127)] px-5 pb-5 pt-4 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] md:px-6 md:pb-6">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(244,185,66,0.22),transparent_24%),radial-gradient(circle_at_84%_18%,rgba(116,228,199,0.18),transparent_26%),radial-gradient(circle_at_40%_100%,rgba(83,122,140,0.18),transparent_28%)]" />

                <div className="relative flex items-center justify-between gap-4 border-b border-white/10 pb-4">
                  <div>
                    <div className="text-[0.68rem] font-bold uppercase tracking-[0.26em] text-white/45">
                      allhalal.info Portal
                    </div>
                    <h2 className="mt-2 text-[2rem] font-bold font-display leading-tight text-white md:text-[2.6rem]">
                      Muslim life,
                      <br />
                      now with rhythm.
                    </h2>
                  </div>

                  <div className="rounded-full border border-white/10 bg-white/6 px-3 py-2 text-[0.72rem] font-bold uppercase tracking-[0.22em] text-white/62">
                    Live layer
                  </div>
                </div>

                <div className="relative mt-5 grid gap-4 md:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)]">
                  <div className="rounded-[1.6rem] border border-white/10 bg-white/6 p-4 backdrop-blur-md">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <div className="text-[0.68rem] font-bold uppercase tracking-[0.22em] text-white/42">
                          Daily command
                        </div>
                        <div className="mt-2 text-xl font-bold text-white">Today for you</div>
                      </div>
                      <div className="rounded-full bg-[#F4B942] px-3 py-1 text-[0.68rem] font-bold uppercase tracking-[0.22em] text-[#513718]">
                        Smooth
                      </div>
                    </div>

                    <div className="mt-5 grid gap-3">
                      <div className="rounded-[1.25rem] bg-black/15 p-4">
                        <div className="flex items-center justify-between text-sm text-white/64">
                          <span>Next prayer</span>
                          <span>Starts in 28m</span>
                        </div>
                        <div className="mt-2 text-3xl font-display font-black text-[#F4B942]">
                          Dhuhr
                        </div>
                      </div>

                      <div className="grid gap-3 sm:grid-cols-2">
                        <div className="rounded-[1.25rem] border border-white/8 bg-white/5 p-4">
                          <div className="text-[0.68rem] font-bold uppercase tracking-[0.22em] text-white/45">
                            Finance
                          </div>
                          <div className="mt-2 text-lg font-semibold text-white">USD / SAR 3.75</div>
                          <div className="mt-2 text-sm text-white/58">Live travel and zakat context</div>
                        </div>
                        <div className="rounded-[1.25rem] border border-white/8 bg-white/5 p-4">
                          <div className="text-[0.68rem] font-bold uppercase tracking-[0.22em] text-white/45">
                            News
                          </div>
                          <div className="mt-2 text-lg font-semibold text-white">Faith • Finance • Ummah</div>
                          <div className="mt-2 text-sm text-white/58">Curated across trusted Muslim sources</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-[1.6rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-4 backdrop-blur-md">
                    <div className="text-[0.68rem] font-bold uppercase tracking-[0.22em] text-white/42">
                      Why this feels different
                    </div>

                    <div className="mt-4 grid gap-3">
                      {spotlightItems.map((item, index) => (
                        <motion.div
                          key={item}
                          initial={{ opacity: 0, x: 18 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.55, delay: 0.35 + index * 0.08, ease: "easeOut" }}
                          className="rounded-[1.25rem] border border-white/8 bg-black/12 p-4 text-sm leading-relaxed text-white/76"
                        >
                          {item}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {floatingCards.map((card) => {
              const Icon = card.icon;

              return (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 22, scale: 0.96 }}
                  animate={{
                    opacity: 1,
                    y: [0, -10, 0],
                    scale: 1,
                  }}
                  transition={{
                    opacity: { duration: 0.55, delay: card.delay, ease: "easeOut" },
                    y: {
                      duration: 5.4 + card.delay * 3,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    },
                  }}
                  className={`pointer-events-none absolute hidden rounded-[1.35rem] border border-white/55 bg-white/74 p-4 shadow-[0_18px_42px_rgba(43,34,24,0.1)] backdrop-blur-xl lg:block ${card.className}`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-[0.64rem] font-bold uppercase tracking-[0.22em] text-text-muted">
                        {card.title}
                      </div>
                      <div className="mt-2 text-base font-semibold text-text-primary">{card.value}</div>
                      <div className="mt-1 text-sm text-text-secondary">{card.detail}</div>
                    </div>
                    <div className="rounded-full bg-[rgba(176,144,98,0.12)] p-2 text-primary">
                      <Icon className="h-4 w-4" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
