"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import ParticleBarcode from "@/components/three/ParticleBarcode";

const quickStats = [
  { label: "Products", value: "2M+" },
  { label: "Languages", value: "11" },
  { label: "Live tools", value: "Prayer + finance" },
];

export default function HeroSection() {
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
        <div className="grid min-h-[100svh] items-start gap-12 pb-10 pt-28 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)] lg:gap-10 lg:pb-14 lg:pt-32">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: "easeOut" }}
            className="relative max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(47,37,30,0.08)] bg-white/70 px-4 py-2 text-[0.72rem] font-bold uppercase tracking-[0.24em] text-text-secondary shadow-[0_12px_28px_rgba(43,34,24,0.08)] backdrop-blur-xl">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              Muslim portal & halal scanner
            </div>

            <h1 className="mt-6 max-w-5xl text-[clamp(3.6rem,11vw,8rem)] font-black font-display leading-[0.9] tracking-[-0.05em] text-text-primary">
              <motion.span
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.05, ease: "easeOut" }}
                className="block"
              >
                scan.
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.12, ease: "easeOut" }}
                className="block"
              >
                check.
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.2, ease: "easeOut" }}
                className="block bg-[linear-gradient(135deg,#9b7747_0%,#2f5458_38%,#59714d_72%,#b6925b_100%)] bg-clip-text text-transparent"
              >
                trust.
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.18, ease: "easeOut" }}
              className="mt-6 max-w-2xl text-lg leading-relaxed text-text-secondary md:text-xl"
            >
              Verify halal status instantly with the world's most advanced scanner. Scan barcodes, check ingredients, and discover alternatives—all powered by AI and trusted Islamic rulings.
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
                Download for iPhone
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </motion.a>

              <motion.a
                href="#portal-home"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.99 }}
                className="inline-flex items-center justify-center gap-2 rounded-[1.35rem] border border-[rgba(47,37,30,0.1)] bg-white/72 px-6 py-4 text-base font-semibold text-text-primary shadow-[0_16px_40px_rgba(43,34,24,0.08)] backdrop-blur-xl"
              >
                Explore portal
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
              className="relative mx-auto flex min-h-[30rem] max-w-[42rem] items-center justify-center overflow-hidden rounded-[2.4rem] lg:min-h-[42rem]"
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(244,185,66,0.12),transparent_24%),radial-gradient(circle_at_84%_16%,rgba(67,118,122,0.1),transparent_22%),radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.5),transparent_68%)]" />
              <div className="pointer-events-none absolute inset-x-[10%] top-[16%] h-[44%] opacity-90">
                <ParticleBarcode
                  className="opacity-78 [mask-image:linear-gradient(180deg,transparent,black_12%,black_88%,transparent)]"
                />
              </div>
              <div className="pointer-events-none absolute inset-x-[18%] top-[42%] h-px bg-[linear-gradient(90deg,transparent,rgba(244,185,66,0.22),transparent)]" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
