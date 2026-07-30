import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/learn/ramadan" },
  title: "Ramadan & Fasting Guide | Rules, Tips and Duas for the Holy Month",
  description:
    "Essential guidance for Ramadan including fasting rules, intentions, important duas and common questions answered.",
};

export default async function RamadanGuidePage() {
  const fastingBasics = [
    {
      title: "Intention (Niyyah)",
      content:
        "Make the intention to fast before Fajr each day. The intention can be in your heart and does not need to be spoken aloud.",
    },
    {
      title: "Abstinence",
      content:
        "Refrain from food, drink and intimate relations from dawn (Fajr) until sunset (Maghrib). This is the core physical aspect of the fast.",
    },
    {
      title: "Behavior & Speech",
      content:
        "Avoid gossip, arguments, lying and negative behavior. The Prophet (peace be upon him) said that if one does not abandon false speech and acting falsely, Allah has no need for him to give up his food and drink.",
    },
    {
      title: "Breaking the Fast",
      content:
        "Break your fast at Maghrib time with dates and water if possible, following the Sunnah. Make dua before breaking the fast, as this is a special time when duas are accepted.",
    },
  ];

  const commonMistakes = [
    {
      mistake: "Not making intention",
      fix: "Make niyyah before Fajr, even if just in your heart",
    },
    {
      mistake: "Eating too much at suhoor",
      fix: "Eat moderately to avoid discomfort and sluggishness during the day",
    },
    {
      mistake: "Delaying iftar unnecessarily",
      fix: "Break fast at Maghrib time. Delaying without reason goes against Sunnah",
    },
    {
      mistake: "Wasting time and energy",
      fix: "Use Ramadan for worship, Quran reading and good deeds, not just fasting",
    },
  ];

  const importantDuas = [
    {
      title: "Dua for Breaking Fast (Iftar)",
      arabic: "ذَهَبَ الظَّمَأُ وَابْتَلَّتِ الْعُرُوقُ، وَثَبَتَ الأَجْرُ إِنْ شَاءَ اللَّهُ",
      transliteration: "Dhahaba al-zama'u, wabtallatil-'urooqu, wathabata al-ajru insha'Allah",
      translation:
        "The thirst is gone, the veins are moistened, and the reward is confirmed, if Allah wills.",
    },
    {
      title: "Dua for Suhoor (Pre-dawn Meal)",
      arabic: "نَوَيْتُ صَوْمَ غَدٍ عَنْ أَدَاءِ فَرْضِ رَمَضَانَ",
      transliteration: "Nawaitu sauma ghadin 'an ada'i fardi Ramadan",
      translation: "I intend to fast tomorrow to fulfill the obligation of Ramadan.",
    },
  ];

  const faqs = [
    {
      question: "Does brushing my teeth break my fast?",
      answer:
        "No, brushing your teeth does not break the fast as long as you do not swallow the toothpaste or water. Many scholars recommend using a miswak (tooth stick) as it was the Sunnah of the Prophet.",
    },
    {
      question: "What if I eat or drink by mistake?",
      answer:
        "If you eat or drink genuinely out of forgetfulness, your fast is still valid. Stop as soon as you remember and continue your fast. Allah is the One who fed you and gave you drink, as stated in hadith.",
    },
    {
      question: "Can I taste food while cooking?",
      answer:
        "You can taste food on the tip of your tongue to check seasoning, but do not swallow it. Spit it out completely. If you swallow intentionally, the fast is broken.",
    },
    {
      question: "What breaks the fast?",
      answer:
        "Intentional eating, drinking, intimate relations, deliberate vomiting, menstruation or post-childbirth bleeding. Forgetful eating or unintentional vomiting does not break the fast.",
    },
    {
      question: "Can I make up missed fasts later?",
      answer:
        "Yes. If you miss fasts due to illness, travel or menstruation, you must make them up before the next Ramadan. If you cannot fast due to permanent illness, you should feed a needy person for each day missed.",
    },
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#f7f2e7] via-[#f9f6f1] to-[#f2f1e8]">
      {/* Ambient background */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute right-[-8rem] top-[8rem] h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(circle,rgba(139,123,186,0.06),transparent_65%)] blur-3xl" />
        <div className="absolute left-[-12rem] top-[28rem] h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(circle,rgba(122,82,59,0.08),transparent_68%)] blur-3xl" />
      </div>

      <div className="container relative z-10 mx-auto max-w-5xl px-6 py-32">
        {/* Breadcrumb */}
        <Link
          href="/learn"
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Learn
        </Link>

        {/* Page Header */}
        <div className="mb-12">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[rgba(122,82,59,0.08)] px-4 py-1.5">
            <svg
              className="h-4 w-4 text-[#7A523B]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              />
            </svg>
            <span className="text-xs font-bold uppercase tracking-wider text-[#7A523B]">
              Sacred Season
            </span>
          </div>

          <h1 className="mb-6 text-[clamp(2.5rem,7vw,4rem)] font-black font-display leading-[0.95] tracking-tight text-text-primary">
            Ramadan & Fasting Guide
          </h1>

          <p className="max-w-3xl text-lg leading-relaxed text-text-secondary">
            Essential guidance for the holy month. Fasting rules, intentions, important duas
            and answers to common questions.
          </p>
        </div>

        {/* Introduction */}
        <div className="mb-12 rounded-3xl border border-[rgba(47,37,30,0.08)] bg-white/60 p-8 shadow-[0_8px_32px_rgba(43,34,24,0.04)] backdrop-blur-sm md:p-10">
          <h2 className="mb-4 text-2xl font-bold font-display text-text-primary">
            The Month of Ramadan
          </h2>
          <p className="mb-4 leading-relaxed text-text-secondary">
            Ramadan is the ninth month of the Islamic calendar and the most blessed month of
            the year. It is a time of spiritual growth, self-discipline, reflection and
            increased devotion to Allah.
          </p>
          <p className="leading-relaxed text-text-secondary">
            Fasting during Ramadan is one of the Five Pillars of Islam and is obligatory for
            all adult Muslims who are physically able. The month ends with Eid al-Fitr, a
            joyful celebration and day of thanksgiving.
          </p>
        </div>

        {/* Fasting Basics */}
        <section className="mb-12">
          <div className="mb-6">
            <p className="mb-2 text-xs font-bold uppercase tracking-wider text-primary">
              Core Principles
            </p>
            <h2 className="text-3xl font-black font-display text-text-primary">
              Fasting Basics
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {fastingBasics.map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-[rgba(47,37,30,0.08)] bg-white/80 p-6 shadow-[0_4px_24px_rgba(43,34,24,0.04)] backdrop-blur-sm"
              >
                <h3 className="mb-3 text-xl font-bold text-text-primary">{item.title}</h3>
                <p className="leading-relaxed text-text-secondary">{item.content}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Important Duas */}
        <section className="mb-12">
          <div className="mb-6">
            <p className="mb-2 text-xs font-bold uppercase tracking-wider text-primary">
              Essential Supplications
            </p>
            <h2 className="text-3xl font-black font-display text-text-primary">
              Important Duas
            </h2>
          </div>

          <div className="space-y-6">
            {importantDuas.map((dua) => (
              <article
                key={dua.title}
                className="overflow-hidden rounded-3xl border border-[rgba(47,37,30,0.08)] bg-white/80 shadow-[0_4px_24px_rgba(43,34,24,0.04)] backdrop-blur-sm"
              >
                <div className="space-y-6 p-8">
                  <h3 className="text-lg font-bold text-text-primary">{dua.title}</h3>

                  {/* Arabic Text */}
                  <div
                    className="text-right text-3xl font-bold font-display leading-loose text-text-primary"
                    dir="rtl"
                  >
                    {dua.arabic}
                  </div>

                  {/* Transliteration */}
                  <div className="rounded-2xl border border-[rgba(122,82,59,0.1)] bg-[rgba(122,82,59,0.04)] p-4">
                    <p className="text-lg font-medium leading-relaxed text-[#7A523B]">
                      {dua.transliteration}
                    </p>
                  </div>

                  {/* Translation */}
                  <div>
                    <p className="text-base italic leading-relaxed text-text-secondary">
                      "{dua.translation}"
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Common Mistakes */}
        <section className="mb-12">
          <div className="mb-6">
            <p className="mb-2 text-xs font-bold uppercase tracking-wider text-[#B85450]">
              Avoid These
            </p>
            <h2 className="text-3xl font-black font-display text-text-primary">
              Common Mistakes
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {commonMistakes.map((item, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-[rgba(184,84,80,0.15)] bg-white/80 p-5 shadow-sm backdrop-blur-sm"
              >
                <div className="mb-3 flex items-start gap-3">
                  <svg
                    className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#B85450]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                  <div>
                    <p className="font-bold text-text-primary">{item.mistake}</p>
                  </div>
                </div>
                <div className="ml-8">
                  <p className="text-sm text-text-secondary">
                    <span className="font-semibold text-[#59714D]">Instead:</span> {item.fix}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-12">
          <div className="mb-6">
            <p className="mb-2 text-xs font-bold uppercase tracking-wider text-primary">
              Common Questions
            </p>
            <h2 className="text-3xl font-black font-display text-text-primary">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-2xl border border-[rgba(47,37,30,0.08)] bg-white/80 p-6 shadow-[0_2px_16px_rgba(43,34,24,0.04)] backdrop-blur-sm transition-all hover:shadow-[0_4px_24px_rgba(43,34,24,0.06)]"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-4 font-bold text-text-primary outline-none">
                  <span>{faq.question}</span>
                  <svg
                    className="h-5 w-5 flex-shrink-0 text-primary transition-transform group-open:rotate-180"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </summary>
                <p className="mt-4 leading-relaxed text-text-secondary">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        {/* App Continuation Block */}
        <div className="mb-12 overflow-hidden rounded-3xl border border-[rgba(244,185,66,0.15)] bg-gradient-to-br from-[rgba(244,185,66,0.06)] to-white/80 shadow-[0_8px_32px_rgba(43,34,24,0.06)] backdrop-blur-sm">
          <div className="p-8 md:p-10">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-wider text-primary">
                  During Ramadan
                </p>
                <h2 className="mb-4 text-2xl font-bold font-display text-text-primary md:text-3xl">
                  Need daily rhythm and reminders?
                </h2>
                <p className="max-w-2xl leading-relaxed text-text-secondary">
                  This page is useful for reading and reference. For daily use during Ramadan,
                  the app brings together prayer times, Islamic calendar context and fasting
                  reminders in one place.
                </p>
              </div>
            </div>

            <Link
              href="/app"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-gold px-6 py-3 font-bold text-[#4A3319] shadow-[0_8px_24px_rgba(176,144,98,0.25)] transition-transform hover:-translate-y-0.5"
            >
              Learn about the app
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </Link>
          </div>
        </div>

        {/* Related Pages */}
        <div className="rounded-3xl border border-[rgba(47,37,30,0.08)] bg-white/60 p-8 shadow-[0_4px_24px_rgba(43,34,24,0.04)] backdrop-blur-sm">
          <h3 className="mb-6 text-xl font-bold text-text-primary">Continue learning</h3>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {[
              {
                label: "Duas & Athkar",
                href: "/learn/duas",
                description: "Supplications for Ramadan and everyday",
              },
              {
                label: "Islamic Calendar",
                href: "/learn/islamic-calendar",
                description: "Check Ramadan dates and Hijri calendar",
              },
              {
                label: "Prayer Times",
                href: "/prayer-times",
                description: "Accurate prayer and iftar times",
              },
              {
                label: "Is it Halal?",
                href: "/is-it-halal",
                description: "Food checks while fasting prep",
              },
              {
                label: "Boycott Checker",
                href: "/boycott-checker",
                description: "Brand awareness tool",
              },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block rounded-2xl border border-[rgba(47,37,30,0.08)] bg-white/80 p-5 transition-all hover:border-primary hover:bg-[rgba(244,185,66,0.04)] hover:shadow-md"
              >
                <p className="mb-1 font-bold text-text-primary">{link.label}</p>
                <p className="text-sm text-text-secondary">{link.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
