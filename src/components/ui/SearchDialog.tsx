import React, { useState } from 'react';
import { Search, Sparkles, Loader2, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { getCommunityInsights } from '@/services/gemini';
import { motion, AnimatePresence } from 'motion/react';

export default function SearchDialog() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    const answer = await getCommunityInsights(query);
    setResult(answer);
    setLoading(false);
  };

  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button variant="ghost" size="icon" className="text-slate-600 hover:text-saffron">
            <Search className="w-5 h-5" />
          </Button>
        }
      />
      <DialogContent className="sm:max-w-[600px] bg-cream border-gold/20 rounded-3xl">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl flex items-center">
            <Sparkles className="w-5 h-5 mr-2 text-saffron" />
            Community AI Search
          </DialogTitle>
        </DialogHeader>
        <div className="py-6">
          <form onSubmit={handleSearch} className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <Input
              placeholder="Ask anything about Panchal Samaj heritage, traditions..."
              className="pl-12 py-6 rounded-full border-gold/20 focus:border-gold"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <Button 
              type="submit" 
              disabled={loading}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-saffron hover:bg-saffron-dark text-white rounded-full px-4 h-10"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Ask'}
            </Button>
          </form>

          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-6 rounded-2xl border border-slate-100 max-h-[400px] overflow-y-auto prose prose-slate text-sm"
              >
                {result}
              </motion.div>
            )}
          </AnimatePresence>

          {!result && !loading && (
            <div className="text-center py-12 text-slate-400">
              <p className="text-sm">Try asking: "What are the traditional occupations of Panchals?" or "Tell me about Vishwakarma Jayanti."</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
