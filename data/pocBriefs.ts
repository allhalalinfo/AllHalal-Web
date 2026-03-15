import type { Brief, BriefCategory } from "@/types/brief";

const categoryImages: Record<BriefCategory, string> = {
  "Faith & Practice":
    "https://images.unsplash.com/photo-1519817650390-64a93db511aa?auto=format&fit=crop&w=1600&q=80",
  "Islamic Finance":
    "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1600&q=80",
  "Family & Education":
    "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=1600&q=80",
  "Ummah & World":
    "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1600&q=80",
  "Halal Living":
    "https://images.unsplash.com/photo-1514326640560-7d063ef2aed5?auto=format&fit=crop&w=1600&q=80",
  "Halal Lifestyle":
    "https://images.unsplash.com/photo-1514326640560-7d063ef2aed5?auto=format&fit=crop&w=1600&q=80",
  "Health & Wellness":
    "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1600&q=80",
  "Tech & Innovation":
    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1600&q=80",
  "Travel & Wellness":
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80",
  "Travel & Lifestyle":
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80",
};

export const pocBriefs: Brief[] = [
  {
    id: 1,
    slug: "zakat-on-childs-funds-who-is-obligated-to-pay",
    title: "Zakat on a Child's Funds: Who Is Obligated to Pay?",
    dek: "A recurring question for Muslim families is whether Zakat applies to a child's savings and who should handle payment when wealth is held on the child's behalf.",
    summary:
      "Scholars addressing Zakat on a child's wealth note that the answer depends on how the funds are owned and managed. In many classical discussions, Zakat is tied to ownership rather than adulthood alone, which means families need to know whether a child's assets have reached the nisab threshold and remained there for a lunar year.\n\nThe practical issue is not only whether Zakat is due, but who actually calculates and pays it. Guidance commonly places that responsibility on the guardian or whoever manages the child's property, especially where the child cannot make legal or financial decisions independently.\n\nFor Muslim households trying to organize savings for school, inheritance, or gifts from relatives, the ruling matters because families can otherwise delay payment out of uncertainty. A clear method helps prevent both underpayment and unnecessary confusion during Zakat season.\n\nThe broader takeaway is that Zakat administration inside families should be treated with the same seriousness as adult personal finance, especially when accounts or trusts are set up in a child's name.",
    why_it_matters:
      "Families often save for children without realizing those funds may carry separate Zakat responsibilities, so clear guidance prevents missed obligations and confusion.",
    category: "Islamic Finance",
    image_url: categoryImages["Islamic Finance"],
    published_at: "2026-03-14T22:03:18Z",
    sources: [
      {
        name: "SeekersGuidance",
        url: "https://seekersguidance.org/answers/islamic-belief/what-should-i-do-if-my-parents-oppose-my-islam-and-refuse-to-let-me-marry-a-muslim/",
      },
    ],
    source_count: 1,
  },
  {
    id: 2,
    slug: "sukuk-demand-rises-as-gulf-investors-seek-safer-income",
    title: "Sukuk Demand Rises as Gulf Investors Seek Safer Income",
    dek: "Institutional and retail investors are leaning harder into Sukuk as rate expectations and regional liquidity push demand for more predictable Shariah-compliant income products.",
    summary:
      "Recent market coverage points to renewed appetite for Sukuk across Gulf markets, with investors looking for steady income and lower volatility while remaining within Islamic finance principles. Analysts say the demand is being shaped by both regional liquidity and a broader search for resilient fixed-income alternatives.\n\nFor issuers, that means a friendlier backdrop for new Sukuk offerings and refinancing activity. Governments and large corporates are well placed to benefit, especially where infrastructure, energy, and sovereign-linked financing remain active.\n\nThe shift also matters for Muslim retail investors who often have fewer familiar income options compared with conventional bond markets. More issuance can improve access, variety, and price discovery for people who want long-term halal investment choices.\n\nThe market still faces structural questions around depth and standardization, but the current trend suggests Sukuk is moving further into the mainstream rather than remaining a niche product.",
    why_it_matters:
      "A stronger Sukuk market creates more realistic halal income options for Muslim investors who want stability without turning to conventional bonds.",
    category: "Islamic Finance",
    image_url: categoryImages["Islamic Finance"],
    published_at: "2026-03-14T19:18:00Z",
    sources: [
      {
        name: "Islamic Finance Guru",
        url: "https://www.islamicfinanceguru.com/",
      },
      {
        name: "Gulf News",
        url: "https://gulfnews.com/business/markets/islamic-economy/rss",
      },
    ],
    source_count: 2,
  },
  {
    id: 3,
    slug: "how-families-are-planning-ramadan-learning-at-home",
    title: "How Families Are Planning Ramadan Learning at Home",
    dek: "Parents are leaning into simple at-home Ramadan routines built around Qur'an reading, short lessons, and child-friendly acts of worship instead of overloaded schedules.",
    summary:
      "Family-oriented Muslim publishers are seeing continued interest in home-based Ramadan routines that emphasize consistency over volume. Parents are prioritizing short Qur'an sessions, age-appropriate duas, and a small number of repeatable practices that children can realistically sustain.\n\nThat approach reflects a wider shift in Muslim family education: less focus on perfection, more focus on building attachment and habit. Educators say children are more likely to retain Ramadan lessons when worship is tied to routine, warmth, and shared family participation.\n\nThe strongest examples are often practical rather than elaborate. A family prayer corner, a single nightly reflection, or a weekly charitable goal can do more than crowded activity plans that quickly collapse.\n\nFor Muslim parents, the message is clear: meaningful Ramadan learning does not require an idealized household setup, but it does benefit from intentional structure and repetition.",
    why_it_matters:
      "Families want realistic Islamic routines that children can actually keep, especially during Ramadan when expectations often become overwhelming.",
    category: "Family & Education",
    image_url: categoryImages["Family & Education"],
    published_at: "2026-03-14T18:00:00Z",
    sources: [
      {
        name: "Productive Muslim",
        url: "https://productivemuslim.com/feed/",
      },
      {
        name: "Virtual Mosque",
        url: "https://www.virtualmosque.com/feed/",
      },
    ],
    source_count: 2,
  },
  {
    id: 4,
    slug: "what-to-know-before-using-muslim-friendly-travel-guides",
    title: "What to Know Before Using Muslim-Friendly Travel Guides",
    dek: "Muslim travel content is growing fast, but travelers still need to verify prayer access, halal food standards, and local reliability instead of relying on labels alone.",
    summary:
      "More destinations are marketing themselves as Muslim-friendly, and travel platforms increasingly highlight halal dining, family privacy, and prayer access. But seasoned travelers say those labels can hide major differences in actual standards on the ground.\n\nThe most common weak spots remain halal verification and prayer convenience. A restaurant marketed as suitable for Muslims may only be pork-free, while a hotel might mention prayer mats without offering reliable qibla direction or nearby congregational access.\n\nThat makes pre-trip checking essential. Experienced travelers continue to rely on a mix of local mosque searches, map reviews, recent traveler feedback, and direct messaging with hotels or tour providers.\n\nFor Muslim families and solo travelers alike, the safest mindset is to treat 'Muslim-friendly' as a starting clue rather than a final guarantee.",
    why_it_matters:
      "Travel decisions are expensive and time-sensitive, so Muslims need reliable signals instead of vague marketing language.",
    category: "Halal Living",
    image_url: categoryImages["Halal Living"],
    published_at: "2026-03-14T16:20:00Z",
    sources: [
      {
        name: "HalalTrip",
        url: "https://www.halaltrip.com/blog/feed/",
      },
      {
        name: "Salaam Gateway",
        url: "https://salaamgateway.com/rss",
      },
    ],
    source_count: 2,
  },
  {
    id: 5,
    slug: "a-short-dua-routine-muslims-are-keeping-after-fajr",
    title: "A Short Dua Routine Muslims Are Keeping After Fajr",
    dek: "Many readers are moving toward shorter, repeatable post-Fajr dhikr routines that fit around work, school, and family schedules without turning mornings into another burden.",
    summary:
      "Faith-and-practice coverage increasingly points to a simple pattern: Muslims are more likely to maintain their morning adhkar when routines are brief, familiar, and anchored to prayer rather than ambition.\n\nTeachers continue to recommend short collections of post-Fajr remembrances and duas that can be repeated daily instead of constantly changing programs. The consistency appears to matter more than volume, especially for working adults.\n\nThis is part of a wider correction against all-or-nothing religious routines. Rather than treating every morning like a special project, Muslims are building durable habits around small but stable acts of remembrance.\n\nThe result is a quieter but more sustainable devotional life, especially for people who once dropped routines because they tried to do too much too quickly.",
    why_it_matters:
      "Short, repeatable routines are often the difference between occasional inspiration and a stable daily worship habit.",
    category: "Faith & Practice",
    image_url: categoryImages["Faith & Practice"],
    published_at: "2026-03-14T13:40:00Z",
    sources: [
      {
        name: "Yaqeen Institute",
        url: "https://yaqeeninstitute.org/rss.xml",
      },
      {
        name: "About Islam",
        url: "https://aboutislam.net/feed/",
      },
    ],
    source_count: 2,
  },
  {
    id: 6,
    slug: "why-muslim-wellness-content-is-moving-toward-routine-over-hacks",
    title: "Why Muslim Wellness Content Is Moving Toward Routine Over Hacks",
    dek: "Wellness writing aimed at Muslims is shifting away from dramatic self-improvement advice and toward simple routines that support prayer, sleep, food discipline, and emotional steadiness.",
    summary:
      "Muslim wellness content increasingly emphasizes rhythm instead of life hacks. Writers and educators are connecting health to repeatable practices such as meal timing, sleep consistency, walking, hydration, and worship-friendly daily structure.\n\nThe change is partly a response to burnout. Audiences appear less interested in dramatic productivity formulas and more interested in routines that fit real Muslim life, especially around prayer times and family commitments.\n\nThat makes wellness content more useful when it respects ordinary constraints rather than pretending everyone can maintain a highly optimized schedule. Simplicity, not intensity, is becoming the more credible message.\n\nFor Muslim readers, the appeal lies in alignment: physical and emotional wellbeing no longer sits outside Islamic practice, but is understood as something supported by order, restraint, and balance.",
    why_it_matters:
      "Readers are more likely to follow advice that works alongside prayer and family obligations instead of competing with them.",
    category: "Health & Wellness",
    image_url: categoryImages["Health & Wellness"],
    published_at: "2026-03-14T11:10:00Z",
    sources: [
      {
        name: "Productive Muslim",
        url: "https://productivemuslim.com/feed/",
      },
      {
        name: "Muslim Girl",
        url: "https://muslimgirl.com/feed/",
      },
    ],
    source_count: 2,
  },
  {
    id: 7,
    slug: "charity-groups-push-ahead-with-gaza-support-despite-pressure",
    title: "Charity Groups Push Ahead With Gaza Support Despite Pressure",
    dek: "Aid organizations working on Gaza-related relief continue to navigate funding pressure, logistics, and public scrutiny while trying to keep essential support channels open.",
    summary:
      "Humanitarian reporting this week shows relief organizations still wrestling with the practical difficulty of moving funds, supplies, and public attention into sustained assistance for Gaza. The challenge is no longer only emergency response, but continuity.\n\nCharity leaders describe a mix of donor fatigue, political pressure, and operational friction that complicates long-term planning. At the same time, demand for aid remains high, especially where families need basic support beyond short-term appeals.\n\nFor Muslim communities, this shifts the conversation from one-off giving to disciplined support and better understanding of which organizations can maintain delivery capacity over time.\n\nThe wider lesson is that public concern alone does not guarantee durable relief. Institutions, verification, and transparent logistics still determine whether aid reaches people consistently.",
    why_it_matters:
      "Muslim audiences want credible guidance on where support is still making a difference and why sustained giving matters more than short spikes of attention.",
    category: "Ummah & World",
    image_url: categoryImages["Ummah & World"],
    published_at: "2026-03-14T09:30:00Z",
    sources: [
      {
        name: "Islamic Relief",
        url: "https://islamic-relief.org/feed/",
      },
      {
        name: "Middle East Eye",
        url: "https://www.middleeasteye.net/rss",
      },
    ],
    source_count: 2,
  },
  {
    id: 8,
    slug: "how-to-read-sukuk-yields-without-confusing-them-for-bonds",
    title: "How to Read Sukuk Yields Without Confusing Them for Bonds",
    dek: "Many Muslims see familiar yield numbers and assume Sukuk works exactly like conventional debt, but structure and risk still need to be understood separately.",
    summary:
      "As more mainstream coverage mentions Sukuk pricing and yields, Muslim investors are increasingly exposed to numbers that look familiar but are often misunderstood. A yield figure may signal expected return, but it does not erase the structural distinction between Sukuk and conventional bonds.\n\nFinancial educators continue to stress that investors need to read beyond the headline percentage. Asset linkage, issuer quality, legal structure, and Shariah governance all matter if a Sukuk is being considered as part of a halal portfolio.\n\nThat makes basic literacy important for retail audiences. Without it, Muslims risk treating every Sukuk label as a shortcut for compliance or assuming familiar terminology means identical risk.\n\nThe more Sukuk enters mainstream investing conversations, the more useful simple explanatory content becomes for everyday investors.",
    why_it_matters:
      "Retail Muslim investors need plain-language guidance so halal finance products remain understandable, not just available.",
    category: "Islamic Finance",
    image_url: categoryImages["Islamic Finance"],
    published_at: "2026-03-14T08:05:00Z",
    sources: [
      {
        name: "IFG",
        url: "https://www.islamicfinanceguru.com/rss.xml",
      },
      {
        name: "Islamic Finance News",
        url: "https://www.islamicfinancenews.com/rss",
      },
    ],
    source_count: 2,
  },
  {
    id: 9,
    slug: "muslim-students-balance-campus-life-with-daily-prayer-routines",
    title: "Muslim Students Balance Campus Life With Daily Prayer Routines",
    dek: "Students are sharing more practical campus strategies for maintaining salah, halal eating, and Islamic identity without relying on ideal conditions.",
    summary:
      "Family and education coverage shows Muslim students increasingly looking for practical, peer-tested ways to organize campus life around prayer and halal constraints. Rather than waiting for perfect schedules or supportive environments, many are building small systems that reduce friction.\n\nThat includes identifying quiet prayer spaces early, keeping backup food plans, and choosing class or work patterns with some awareness of congregational access. Small decisions add up over the semester.\n\nWriters in this space are also emphasizing that Islamic identity on campus is strengthened by routine and companionship more than by dramatic gestures. A stable circle, a repeatable plan, and visible habits often matter most.\n\nThe theme resonates because many Muslim students are not searching for inspiration alone; they want workable methods they can use this week.",
    why_it_matters:
      "Students need realistic support that fits real campus life, not idealized advice that collapses under ordinary schedules.",
    category: "Family & Education",
    image_url: categoryImages["Family & Education"],
    published_at: "2026-03-13T23:50:00Z",
    sources: [
      {
        name: "Virtual Mosque",
        url: "https://www.virtualmosque.com/feed/",
      },
      {
        name: "Muslim Youth Musings",
        url: "https://muslimyouthmusings.com/feed/",
      },
    ],
    source_count: 2,
  },
  {
    id: 10,
    slug: "what-converts-keep-asking-about-belonging-after-shahada",
    title: "What Converts Keep Asking About Belonging After Shahada",
    dek: "Questions from new Muslims increasingly center on belonging, stability, and community access after conversion rather than theology alone.",
    summary:
      "Faith guidance for converts often begins with core beliefs, but many of the most urgent questions now concern belonging: where to learn, whom to trust, and how to remain steady once the first phase of conversion attention fades.\n\nTeachers responding to convert concerns repeatedly note that isolation, not lack of sincerity, is one of the biggest threats to long-term stability. Converts need rhythms, local relationships, and realistic learning plans more than intense information overload.\n\nThat has implications for Muslim institutions too. Communities that want to support converts well need structures for continuity rather than only one-time welcomes.\n\nThe repeated pattern across these questions is that conversion is not only a theological event; it is the beginning of a practical social and emotional adjustment that needs support.",
    why_it_matters:
      "Better convert support strengthens long-term faith, belonging, and retention inside Muslim communities.",
    category: "Faith & Practice",
    image_url: categoryImages["Faith & Practice"],
    published_at: "2026-03-13T20:15:00Z",
    sources: [
      {
        name: "SeekersGuidance",
        url: "https://seekersguidance.org/feed/",
      },
      {
        name: "About Islam",
        url: "https://aboutislam.net/feed/",
      },
    ],
    source_count: 2,
  },
  {
    id: 11,
    slug: "halal-kitchen-routines-people-keep-after-ramadan",
    title: "Halal Kitchen Routines People Keep After Ramadan",
    dek: "Ramadan often resets meal planning, shopping discipline, and shared kitchen habits, and many households are trying to keep the best parts long after the month ends.",
    summary:
      "Halal living content is showing interest in what remains after Ramadan rather than what only happens during it. Readers are returning to questions about shopping discipline, simpler cooking, batch preparation, and more intentional eating.\n\nWhat makes these routines sticky is that they solve ordinary problems. Less waste, fewer impulse purchases, and more predictable meal planning all reduce household stress while supporting a more conscious halal lifestyle.\n\nThis also reflects a wider desire to make religious seasons shape ordinary living rather than remain isolated spikes of devotion. Good Ramadan routines feel especially valuable when they survive outside Ramadan.\n\nFor readers, the appeal is practical: these are everyday systems, not abstract ideals.",
    why_it_matters:
      "Muslim households are looking for tangible ways to keep the discipline of Ramadan alive in everyday life.",
    category: "Halal Living",
    image_url: categoryImages["Halal Living"],
    published_at: "2026-03-13T17:40:00Z",
    sources: [
      {
        name: "HalalZilla",
        url: "https://www.halalzilla.com/feed/",
      },
      {
        name: "HalalTrip",
        url: "https://www.halaltrip.com/blog/feed/",
      },
    ],
    source_count: 2,
  },
  {
    id: 12,
    slug: "mental-load-and-mercy-how-couples-are-rethinking-household-balance",
    title: "Mental Load and Mercy: How Couples Are Rethinking Household Balance",
    dek: "Muslim family writing is increasingly connecting domestic imbalance with emotional strain and calling for more intentional, merciful household cooperation.",
    summary:
      "Writers focusing on Muslim marriage and family life are paying more attention to mental load: the unseen planning, remembering, and emotional management that often falls unevenly inside households.\n\nRather than framing the issue only through modern productivity language, many discussions now connect it to mercy, ihsan, and fairness in day-to-day marriage. The concern is not only efficiency, but emotional steadiness and mutual care.\n\nThat makes the conversation easier to place within Islamic ethics. Household balance is not a trendy import but part of how spouses protect one another from avoidable strain.\n\nFor readers, the topic lands because it speaks to ordinary life. It is less about dramatic conflict and more about the small burdens that quietly shape the health of a marriage.",
    why_it_matters:
      "Couples need language and examples that connect emotional fairness to Islamic ethics, not just generic relationship advice.",
    category: "Health & Wellness",
    image_url: categoryImages["Health & Wellness"],
    published_at: "2026-03-13T14:00:00Z",
    sources: [
      {
        name: "Muslim Girl",
        url: "https://muslimgirl.com/feed/",
      },
      {
        name: "Productive Muslim",
        url: "https://productivemuslim.com/feed/",
      },
    ],
    source_count: 2,
  },
];
