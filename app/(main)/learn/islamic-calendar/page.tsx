import type { Metadata } from "next";
import Link from "next/link";
import BreadcrumbsSchema from "@/components/seo/BreadcrumbsSchema";
import FAQSchema from "@/components/seo/FAQSchema";
import { SITE_URL } from "@/lib/seo/metadata";

export const revalidate = 3600;

export const metadata: Metadata = {
  alternates: { canonical: "/learn/islamic-calendar" },
  title: "Islamic Calendar (Hijri) 2026 | Months, Dates & Sacred Days | AllHalal",
  description:
    "Today's Hijri date, the 12 Islamic months, and the sacred days Muslims track each year — Ramadan, Eid, Ashura, Arafah and more — explained clearly.",
  keywords: [
    "islamic calendar",
    "hijri calendar",
    "hijri date today",
    "islamic months",
    "ramadan dates",
    "eid dates",
    "islamic calendar 2026",
  ].join(", "),
  openGraph: {
    title: "Islamic Calendar (Hijri) | allhalal.info",
    description:
      "Today's Hijri date and a clear guide to Islamic months and sacred days.",
    url: `${SITE_URL}/learn/islamic-calendar`,
    type: "website",
  },
};

const MONTHS = [
  {
    name: "Muharram",
    arabic: "محرم",
    note: "The first month of the Islamic year. The 10th day is Ashura.",
  },
  {
    name: "Safar",
    arabic: "صفر",
    note: "The second month. No prescribed fasts or festivals of its own.",
  },
  {
    name: "Rabiʿ al-Awwal",
    arabic: "ربيع الأول",
    note: "The month of the Prophet's birth. Many communities mark Mawlid here.",
  },
  {
    name: "Rabiʿ al-Thani",
    arabic: "ربيع الآخر",
    note: "Also called Rabiʿ al-Akhir. An ordinary month in the ritual calendar.",
  },
  {
    name: "Jumada al-Ula",
    arabic: "جمادى الأولى",
    note: "The fifth month. No obligatory rites attached to it.",
  },
  {
    name: "Jumada al-Akhirah",
    arabic: "جمادى الآخرة",
    note: "The sixth month, closing the first half of the Hijri year.",
  },
  {
    name: "Rajab",
    arabic: "رجب",
    note: "One of the four sacred months. Historically associated with Isra and Miʿraj.",
  },
  {
    name: "Shaʿban",
    arabic: "شعبان",
    note: "The month before Ramadan. The 15th night (Laylat al-Baraʾah) is observed by many.",
  },
  {
    name: "Ramadan",
    arabic: "رمضان",
    note: "The month of fasting. The last ten nights include Laylat al-Qadr.",
  },
  {
    name: "Shawwal",
    arabic: "شوال",
    note: "Begins with Eid al-Fitr. The six recommended fasts of Shawwal follow.",
  },
  {
    name: "Dhul-Qaʿdah",
    arabic: "ذو القعدة",
    note: "A sacred month and the first of the Hajj season months.",
  },
  {
    name: "Dhul-Hijjah",
    arabic: "ذو الحجة",
    note: "The month of Hajj. The Day of Arafah and Eid al-Adha fall here.",
  },
];

const SACRED_DAYS = [
  {
    title: "1 Muharram — Islamic New Year",
    body: "Marks the start of the Hijri year. It commemorates the Hijrah of the Prophet ﷺ from Makkah to Madinah, which Umar ibn al-Khattab used as the calendar's epoch.",
  },
  {
    title: "10 Muharram — Ashura",
    body: "A day of recommended fasting. For Sunni Muslims it recalls Musa (peace be upon him) and the Children of Israel being saved; for Shia Muslims it is also the day of the martyrdom of Husayn at Karbala.",
  },
  {
    title: "Ramadan — the month of fasting",
    body: "Dawn-to-sunset fasting for every able adult Muslim. The last ten nights are especially sought for Laylat al-Qadr, whose exact night is not known with certainty.",
  },
  {
    title: "1 Shawwal — Eid al-Fitr",
    body: "The festival that ends the Ramadan fast. It begins with the sighting (or calculation) of the Shawwal crescent and includes the Eid prayer and Zakat al-Fitr.",
  },
  {
    title: "9 Dhul-Hijjah — Day of Arafah",
    body: "The climax of Hajj. For non-pilgrims, fasting on this day is strongly recommended and is said to expiate the previous and coming year.",
  },
  {
    title: "10 Dhul-Hijjah — Eid al-Adha",
    body: "The Festival of Sacrifice, coinciding with the completion of Hajj. Those who are able offer an animal sacrifice (udhiyah / qurbani) and share the meat.",
  },
];

function formatToday() {
  const now = new Date();
  let hijri = "Hijri date unavailable";
  try {
    hijri = new Intl.DateTimeFormat("en-US-u-ca-islamic", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(now);
  } catch {
    // keep fallback
  }
  const gregorian = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(now);
  return { hijri, gregorian };
}

export default function IslamicCalendarPage() {
  const { hijri, gregorian } = formatToday();

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Learn", url: "/learn" },
    { name: "Islamic Calendar", url: "/learn/islamic-calendar" },
  ];

  const faqs = [
    {
      question: "What is today's Hijri date?",
      answer: `Today is ${hijri} (${gregorian} on the Gregorian calendar). Hijri dates can differ by one day between regions depending on moon-sighting versus calculation.`,
    },
    {
      question: "How many months are in the Islamic calendar?",
      answer:
        "Twelve lunar months: Muharram, Safar, Rabiʿ al-Awwal, Rabiʿ al-Thani, Jumada al-Ula, Jumada al-Akhirah, Rajab, Shaʿban, Ramadan, Shawwal, Dhul-Qaʿdah and Dhul-Hijjah. A Hijri year is about 354 days.",
    },
    {
      question: "Why do Ramadan and Eid dates change every year?",
      answer:
        "The Islamic calendar is lunar. Each year it shifts roughly 10–11 days earlier against the solar Gregorian calendar, so sacred months move through the seasons over a 33-year cycle.",
    },
    {
      question: "Do all Muslims start Ramadan on the same day?",
      answer:
        "Not always. Some communities wait for a local crescent sighting; others follow a calculated calendar or the announcement of a particular country. A one-day difference between regions is common and expected.",
    },
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#f7f2e7] via-[#f9f6f1] to-[#f2f1e8]">
      <BreadcrumbsSchema items={breadcrumbs} />
      <FAQSchema faqs={faqs} />

      <div className="container relative z-10 mx-auto max-w-4xl px-6 py-32">
        <nav className="mb-8 text-sm text-text-muted" aria-label="Breadcrumb">
          <Link href="/" className="text-primary hover:underline">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/learn" className="text-primary hover:underline">
            Learn
          </Link>
          <span className="mx-2">/</span>
          <span className="text-text-secondary">Islamic Calendar</span>
        </nav>

        <header className="mb-12">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-[#4B6E70]">
            Hijri calendar
          </p>
          <h1 className="font-display text-[clamp(2.25rem,6vw,3.75rem)] font-black leading-[0.95] tracking-tight text-text-primary">
            Islamic calendar
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-text-secondary">
            The Hijri calendar is lunar: twelve months, about 354 days, and a year that
            drifts earlier through the seasons. Here is today&apos;s date, the months in
            order, and the days Muslims plan around.
          </p>
        </header>

        <section className="mb-14 rounded-3xl border border-[rgba(47,37,30,0.08)] bg-[#173640] p-8 text-white shadow-[0_20px_56px_rgba(23,54,64,0.18)] md:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-white/60">
            Today
          </p>
          <p className="mt-3 font-display text-3xl font-bold text-[#F0C65F] md:text-4xl">
            {hijri}
          </p>
          <p className="mt-2 text-white/80">{gregorian}</p>
          <p className="mt-6 text-sm leading-relaxed text-white/65">
            Calculated for your browser&apos;s timezone using the Islamic calendar. Local
            moon-sighting announcements can differ by a day — that is normal, not an error.
          </p>
        </section>

        <section className="mb-14">
          <h2 className="mb-4 font-display text-3xl font-black text-text-primary">
            How the Hijri calendar works
          </h2>
          <div className="space-y-4 text-lg leading-relaxed text-text-secondary">
            <p>
              Each month begins with the new crescent. Because a lunar month is about
              29.5 days, months alternate between 29 and 30 days, and a full Hijri year
              is roughly 10–11 days shorter than a Gregorian year. That is why Ramadan
              moves through winter and summer over a generation.
            </p>
            <p>
              The calendar&apos;s starting point is the Hijrah — the migration of the
              Prophet Muhammad ﷺ from Makkah to Madinah in 622 CE — which Caliph Umar
              established as year 1 AH (Anno Hegirae).
            </p>
            <p>
              Four months are traditionally called sacred (ashhur hurum): Muharram,
              Rajab, Dhul-Qaʿdah and Dhul-Hijjah. Fighting was forbidden in them in
              pre-Islamic Arabia, and the Qur&apos;an affirms their special status.
            </p>
          </div>
        </section>

        <section className="mb-14">
          <h2 className="mb-6 font-display text-3xl font-black text-text-primary">
            The 12 Islamic months
          </h2>
          <ol className="grid gap-3 sm:grid-cols-2">
            {MONTHS.map((month, index) => (
              <li
                key={month.name}
                className="rounded-2xl border border-[rgba(47,37,30,0.08)] bg-white/70 p-5"
              >
                <div className="mb-1 flex items-baseline justify-between gap-3">
                  <span className="font-display text-lg font-bold text-text-primary">
                    {index + 1}. {month.name}
                  </span>
                  <span className="text-sm text-text-muted" dir="rtl" lang="ar">
                    {month.arabic}
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-text-secondary">{month.note}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="mb-14">
          <h2 className="mb-6 font-display text-3xl font-black text-text-primary">
            Sacred days most people track
          </h2>
          <div className="space-y-5">
            {SACRED_DAYS.map((day) => (
              <article
                key={day.title}
                className="rounded-2xl border border-[rgba(47,37,30,0.08)] bg-white/70 p-6"
              >
                <h3 className="font-display text-xl font-bold text-text-primary">
                  {day.title}
                </h3>
                <p className="mt-2 leading-relaxed text-text-secondary">{day.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-14 rounded-2xl border border-[rgba(47,37,30,0.08)] bg-white/70 p-6 md:p-8">
          <h2 className="mb-3 font-display text-2xl font-black text-text-primary">
            Sighting vs calculation
          </h2>
          <p className="leading-relaxed text-text-secondary">
            Some Muslim communities begin a month only after a reliable local sighting of
            the crescent. Others follow a pre-calculated table or the announcement of a
            national authority. Both approaches are used by serious scholars. For prayer
            and fasting in your city, follow the mosque or council you normally trust —
            and expect neighbouring countries to sometimes differ by a day.
          </p>
        </section>

        <section className="flex flex-wrap gap-3">
          <Link
            href="/learn/ramadan"
            className="rounded-full bg-[#173640] px-5 py-3 text-sm font-semibold text-white"
          >
            Ramadan guide
          </Link>
          <Link
            href="/prayer-times"
            className="rounded-full border border-[rgba(47,37,30,0.15)] bg-white/80 px-5 py-3 text-sm font-semibold text-text-primary"
          >
            Prayer times
          </Link>
          <Link
            href="/learn/duas"
            className="rounded-full border border-[rgba(47,37,30,0.15)] bg-white/80 px-5 py-3 text-sm font-semibold text-text-primary"
          >
            Duas & Athkar
          </Link>
          <Link
            href="/is-it-halal"
            className="rounded-full border border-[rgba(47,37,30,0.15)] bg-white/80 px-5 py-3 text-sm font-semibold text-text-primary"
          >
            Halal checker
          </Link>
          <Link
            href="/boycott-checker"
            className="rounded-full border border-[rgba(47,37,30,0.15)] bg-white/80 px-5 py-3 text-sm font-semibold text-text-primary"
          >
            Boycott checker
          </Link>
        </section>
      </div>
    </main>
  );
}
