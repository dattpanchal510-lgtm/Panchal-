import React, { useState, useEffect } from 'react';
import SectionHeading from '@/components/ui/SectionHeading';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, User, Sparkles, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { summarizeNews } from '@/services/gemini';
import { db } from '@/lib/firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';

export default function News() {
  const [newsItems, setNewsItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [summaries, setSummaries] = useState<Record<string, string>>({});
  const [summarizingId, setSummarizingId] = useState<string | null>(null);

  useEffect(() => {
    const q = query(collection(db, 'news'), orderBy('date', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        date: doc.data().date?.toDate() || new Date()
      }));
      setNewsItems(newsData);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching news:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleSummarize = async (id: string, content: string) => {
    setSummarizingId(id);
    try {
      const summary = await summarizeNews(content);
      setSummaries(prev => ({ ...prev, [id]: summary }));
    } catch (error) {
      console.error("Summarization failed:", error);
    } finally {
      setSummarizingId(null);
    }
  };

  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="News & Announcements"
          subtitle="Stay informed with the latest updates from the Panchal Samaj."
        />

        {loading ? (
          <div className="flex justify-center py-24">
            <Loader2 className="w-8 h-8 animate-spin text-saffron" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsItems.map((item) => (
              <Card key={item.id} className="border-border-theme hover:shadow-lg transition-shadow bg-white flex flex-col rounded-lg overflow-hidden">
                <CardHeader className="bg-accent-light border-b border-border-theme py-4">
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="secondary" className="bg-saffron text-white border-none text-[10px] uppercase tracking-wider font-bold">
                      Community News
                    </Badge>
                    <div className="flex items-center text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                      <Calendar className="w-3 h-3 mr-1" />
                      {item.date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </div>
                  </div>
                  <CardTitle className="font-serif text-xl leading-tight text-charcoal italic">{item.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow p-6">
                  <p className="text-slate-600 text-sm leading-relaxed mb-6">
                    {item.content}
                  </p>
                  
                  {summaries[item.id] && (
                    <div className="mb-6 p-4 bg-slate-50 rounded-lg text-xs text-slate-700 italic border-l-4 border-gold">
                      <div className="font-bold mb-1 flex items-center not-italic text-gold uppercase tracking-wider text-[10px]">
                        <Sparkles className="w-3 h-3 mr-1" />
                        AI Summary
                      </div>
                      {summaries[item.id]}
                    </div>
                  )}

                  <div className="flex justify-between items-center mt-auto border-t border-slate-100 pt-4">
                    <div className="flex items-center text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                      <User className="w-3 h-3 mr-1 text-gold" />
                      {item.author}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSummarize(item.id, item.content)}
                      disabled={summarizingId === item.id}
                      className="text-saffron hover:text-saffron-dark hover:bg-saffron/5 text-[10px] font-bold uppercase tracking-wider h-8"
                    >
                      {summarizingId === item.id ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3 mr-1" />}
                      Summarize
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {!loading && newsItems.length === 0 && (
          <div className="text-center py-24 text-slate-500">No news articles found.</div>
        )}
      </div>
    </div>
  );
}
