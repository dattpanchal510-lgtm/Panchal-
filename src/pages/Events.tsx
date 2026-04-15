import React, { useState, useEffect } from 'react';
import SectionHeading from '@/components/ui/SectionHeading';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, MapPin, Clock, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { db } from '@/lib/firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';

export default function Events() {
  const [upcomingEvents, setUpcomingEvents] = useState<any[]>([]);
  const [pastEvents, setPastEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'events'), orderBy('date', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const eventsData = snapshot.docs.map(doc => ({
        ...(doc.data() as any),
        id: doc.id,
        date: doc.data().date?.toDate() || new Date()
      }));
      setUpcomingEvents(eventsData.filter(e => e.category === 'upcoming'));
      setPastEvents(eventsData.filter(e => e.category === 'past'));
      setLoading(false);
    }, (error) => {
      console.error("Error fetching events:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Events & Gallery"
          subtitle="Join us in celebrating our culture and community milestones."
        />

        {loading ? (
          <div className="flex justify-center py-24">
            <Loader2 className="w-8 h-8 animate-spin text-saffron" />
          </div>
        ) : (
          <Tabs defaultValue="upcoming" className="w-full">
            <div className="flex justify-center mb-12">
              <TabsList className="bg-white border border-border-theme p-1 rounded-lg h-auto">
                <TabsTrigger value="upcoming" className="rounded-md px-8 py-3 data-[state=active]:bg-saffron data-[state=active]:text-white font-bold uppercase text-xs tracking-wider">Upcoming Events</TabsTrigger>
                <TabsTrigger value="past" className="rounded-md px-8 py-3 data-[state=active]:bg-saffron data-[state=active]:text-white font-bold uppercase text-xs tracking-wider">Past Events</TabsTrigger>
                <TabsTrigger value="gallery" className="rounded-md px-8 py-3 data-[state=active]:bg-saffron data-[state=active]:text-white font-bold uppercase text-xs tracking-wider">Photo Gallery</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="upcoming">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="bg-white rounded-lg overflow-hidden shadow-sm border border-border-theme hover:shadow-md transition-shadow">
                    <div className="h-48 overflow-hidden">
                      <img
                        src={event.imageUrl || 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=2069'}
                        alt={event.title}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-serif font-bold mb-4 text-charcoal">{event.title}</h3>
                      <div className="space-y-2 mb-6">
                        <div className="flex items-center text-slate-500 text-sm">
                          <Calendar className="w-4 h-4 mr-2 text-saffron" />
                          {event.date.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </div>
                        <div className="flex items-center text-slate-500 text-sm">
                          <Clock className="w-4 h-4 mr-2 text-saffron" />
                          {event.date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                        </div>
                        <div className="flex items-center text-slate-500 text-sm">
                          <MapPin className="w-4 h-4 mr-2 text-saffron" />
                          {event.location}
                        </div>
                      </div>
                      <Button className="w-full bg-saffron hover:bg-saffron-dark text-white font-bold rounded-md">
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              {upcomingEvents.length === 0 && (
                <div className="text-center py-24 text-slate-500">No upcoming events scheduled.</div>
              )}
            </TabsContent>

            <TabsContent value="past">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {pastEvents.map((event) => (
                  <div key={event.id} className="bg-white rounded-lg overflow-hidden shadow-sm border border-border-theme hover:shadow-md transition-shadow">
                    <div className="h-48 overflow-hidden">
                      <img
                        src={event.imageUrl || 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=2069'}
                        alt={event.title}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-serif font-bold mb-4 text-charcoal">{event.title}</h3>
                      <div className="space-y-2 mb-6">
                        <div className="flex items-center text-slate-500 text-sm">
                          <Calendar className="w-4 h-4 mr-2 text-saffron" />
                          {event.date.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </div>
                        <div className="flex items-center text-slate-500 text-sm">
                          <Clock className="w-4 h-4 mr-2 text-saffron" />
                          {event.date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                        </div>
                        <div className="flex items-center text-slate-500 text-sm">
                          <MapPin className="w-4 h-4 mr-2 text-saffron" />
                          {event.location}
                        </div>
                      </div>
                      <Button className="w-full bg-saffron hover:bg-saffron-dark text-white font-bold rounded-md">
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              {pastEvents.length === 0 && (
                <div className="text-center py-24 text-slate-500">No past events found.</div>
              )}
            </TabsContent>

            <TabsContent value="gallery">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <div key={i} className="aspect-square rounded-2xl overflow-hidden group relative cursor-pointer">
                    <img
                      src={`https://picsum.photos/seed/panchal${i}/800/800`}
                      alt={`Gallery ${i}`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="text-white text-sm font-medium">View Photo</span>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
}
