import { Metadata } from 'next';
import Link from 'next/link';
import AppPromoMini from '@/components/ui/AppPromoMini';

export const metadata: Metadata = {
  title: 'Islamic Calendar & Events 2026 | allhalal.info',
  description: 'View the complete Islamic Hijri calendar for 2026. Find the exact dates for Ramadan, Eid al-Fitr, Eid al-Adha, and other important Muslim holidays.',
};

export default async function IslamicCalendarPage(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  let events = [];
  
  try {
    // Fetch server-side for optimal SEO since events rarely change minute-by-minute
    const res = await fetch("https://api.allhalal.info/api/v1/calendar/events", { 
      headers: {
        'X-Source': 'web'
      },
      next: { revalidate: 3600 } // Revalidate every hour
    });
    
    if (res.ok) {
      const json = await res.json();
      events = json.data?.events || [];
    }
  } catch (e) {
    console.error("Failed to fetch calendar events", e);
  }

  return (
    <div className="container py-32 max-w-4xl mx-auto min-h-screen">
      <Link href={`/${params.locale}/learn`} className="text-primary hover:underline mb-8 inline-block">&larr; Back to Learn Islam</Link>
      
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-display text-text-primary mb-4">Islamic Calendar 2026</h1>
        <p className="text-xl text-text-secondary max-w-2xl">
          Important Islamic dates, religious holidays, and sunnah fasting days according to the Hijri calendar.
        </p>
      </div>

      <div className="space-y-6 mb-16">
        {events.length > 0 ? (
          events.map((event: any) => {
            const dateObj = new Date(event.date);
            const formattedDate = dateObj.toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            });

            return (
              <div key={event.id} className="bg-bg-card border border-border p-6 md:p-8 rounded-3xl shadow-sm flex flex-col md:flex-row gap-6 items-start hover:border-primary/50 transition-colors">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center shrink-0 text-3xl">
                  {event.emoji || '📅'}
                </div>
                
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                    <h3 className="text-2xl font-bold font-display text-text-primary">{event.title}</h3>
                    <div className="text-right">
                      <span className="inline-block px-3 py-1 bg-bg-secondary text-text-secondary rounded-lg text-sm font-medium border border-border">
                        {event.hijri_date}
                      </span>
                    </div>
                  </div>
                  
                  <div className="text-primary font-semibold mb-3">
                    {formattedDate}
                  </div>
                  
                  <p className="text-text-secondary leading-relaxed">
                    {event.description}
                  </p>
                  
                  {event.title_ar && (
                    <p className="text-text-muted text-sm mt-3 font-serif" dir="rtl">
                      {event.title_ar}
                    </p>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-12 text-text-secondary">
            Could not load calendar events at this time.
          </div>
        )}
      </div>

      <AppPromoMini />
    </div>
  );
}