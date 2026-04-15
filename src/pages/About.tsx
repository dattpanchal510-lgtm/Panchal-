import React, { useState } from 'react';
import SectionHeading from '@/components/ui/SectionHeading';
import { motion } from 'motion/react';
import { getCommunityInsights } from '@/services/gemini';
import { Button } from '@/components/ui/button';
import { Sparkles, Loader2 } from 'lucide-react';
import Mandala from '@/components/ui/Mandala';

export default function About() {
  const [insight, setInsight] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchInsight = async () => {
    setLoading(true);
    const result = await getCommunityInsights("Tell me about the historical significance of Panchal community in Indian architecture and craftsmanship.");
    setInsight(result);
    setLoading(false);
  };

  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="About Panchal Samaj"
          subtitle="Our journey, our values, and our commitment to the community."
        />

        <div className="relative">
          <Mandala className="absolute top-0 right-0 w-96 h-96 text-gold opacity-5 pointer-events-none -translate-y-1/2 translate-x-1/4" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-serif font-bold mb-6 text-saffron">Our History</h3>
            <p className="text-slate-600 leading-relaxed mb-6">
              The Panchal community, traditionally known as the Vishwakarma community, has been the backbone of Indian craftsmanship for millennia. Our ancestors were the master builders, architects, and artisans who created the magnificent temples and monuments that define our heritage.
            </p>
            <p className="text-slate-600 leading-relaxed">
              The Panchal Samaj was formally organized to bring together families from various regions, providing a support system and a collective voice for our community in the modern era.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-2xl font-serif font-bold mb-6 text-gold">Our Mission</h3>
            <p className="text-slate-600 leading-relaxed mb-6">
              To empower every member of the Panchal community through education, professional networking, and cultural preservation. We strive to create an environment where our traditions are respected and our future is bright.
            </p>
            <h3 className="text-2xl font-serif font-bold mb-6 text-gold">Our Vision</h3>
            <p className="text-slate-600 leading-relaxed">
              A globally connected Panchal community that is recognized for its excellence, integrity, and contribution to society, while staying deeply rooted in its cultural values.
            </p>
          </motion.div>
        </div>
      </div>

      {/* AI Insight Section */}
        <div className="mb-24 p-10 bg-gradient-to-br from-saffron/5 to-gold/5 rounded-3xl border border-gold/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Sparkles className="w-24 h-24 text-saffron" />
          </div>
          <div className="relative z-10">
            <h3 className="text-2xl font-serif font-bold mb-4 flex items-center">
              <Sparkles className="w-6 h-6 mr-2 text-saffron" />
              AI Cultural Insights
            </h3>
            <p className="text-slate-600 mb-8 max-w-2xl">
              Want to learn more about our community's heritage? Our AI assistant can provide deep insights into our history and traditions.
            </p>
            {!insight ? (
              <Button
                onClick={fetchInsight}
                disabled={loading}
                className="bg-saffron hover:bg-saffron-dark text-white rounded-full px-8"
              >
                {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                Get AI Insight
              </Button>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="prose prose-slate max-w-none text-slate-700 leading-relaxed"
              >
                {insight}
                <Button
                  variant="link"
                  onClick={() => setInsight(null)}
                  className="mt-4 text-saffron p-0 h-auto"
                >
                  Clear Insight
                </Button>
              </motion.div>
            )}
          </div>
        </div>

        {/* Values */}
        <div className="bg-white rounded-3xl p-12 shadow-sm border border-slate-100">
          <h3 className="text-3xl font-serif font-bold text-center mb-12">Our Core Values</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { title: 'Unity', desc: 'Strength in togetherness and mutual support.' },
              { title: 'Integrity', desc: 'Upholding the highest moral and ethical standards.' },
              { title: 'Excellence', desc: 'Striving for perfection in every endeavor.' }
            ].map((value, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl font-serif font-bold text-saffron/20 mb-4">0{i + 1}</div>
                <h4 className="text-xl font-serif font-bold mb-4">{value.title}</h4>
                <p className="text-slate-600">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
