import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Users, Calendar, Megaphone, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SectionHeading from '@/components/ui/SectionHeading';
import Mandala from '@/components/ui/Mandala';

export default function Home() {
  return (
    <div className="pt-20 bg-cream min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr_280px] gap-8">
          
          {/* Left Sidebar: Announcements */}
          <div className="hidden lg:flex flex-col gap-6">
            <div className="bg-white border border-border-theme rounded-lg overflow-hidden flex flex-col shadow-sm">
              <div className="px-4 py-3 bg-accent-light border-b border-border-theme font-serif italic font-bold text-saffron flex justify-between items-center">
                Latest Announcements
                <span className="bg-saffron text-white text-[10px] px-2 py-0.5 rounded uppercase not-italic">New</span>
              </div>
              <div className="divide-y divide-slate-100">
                <div className="p-4 hover:bg-slate-50 transition-colors">
                  <h4 className="text-sm font-bold mb-1">Scholarship 2024</h4>
                  <p className="text-xs text-slate-500">Applications are open for high school graduates of our community.</p>
                </div>
                <div className="p-4 hover:bg-slate-50 transition-colors">
                  <h4 className="text-sm font-bold mb-1">Community Hall Reno</h4>
                  <p className="text-xs text-slate-500">The Ahmedabad central hall is now open for bookings after renovation.</p>
                </div>
                <div className="p-4 hover:bg-slate-50 transition-colors">
                  <h4 className="text-sm font-bold mb-1">Annual Gathering</h4>
                  <p className="text-xs text-slate-500">Save the date: October 14th for the Dussehra Milan.</p>
                </div>
              </div>
              
              <div className="mt-auto p-4 bg-slate-50 grid grid-cols-2 gap-2 border-t border-border-theme">
                <div className="bg-white border border-slate-100 p-2 text-center rounded">
                  <span className="block text-lg font-bold text-saffron">1,240</span>
                  <label className="text-[10px] uppercase text-slate-400 font-bold">Members</label>
                </div>
                <div className="bg-white border border-slate-100 p-2 text-center rounded">
                  <span className="block text-lg font-bold text-saffron">15</span>
                  <label className="text-[10px] uppercase text-slate-400 font-bold">Cities</label>
                </div>
                <div className="bg-white border border-slate-100 p-2 text-center rounded">
                  <span className="block text-lg font-bold text-saffron">$45k</span>
                  <label className="text-[10px] uppercase text-slate-400 font-bold">Fund</label>
                </div>
                <div className="bg-white border border-slate-100 p-2 text-center rounded">
                  <span className="block text-lg font-bold text-saffron">82</span>
                  <label className="text-[10px] uppercase text-slate-400 font-bold">Volunteers</label>
                </div>
              </div>
            </div>
          </div>

          {/* Center: Hero Section */}
          <div className="flex flex-col gap-8">
            <div className="bg-white border border-border-theme rounded-lg p-12 text-center relative overflow-hidden flex flex-col justify-center min-h-[500px] shadow-sm">
              {/* Pattern Background */}
              <div className="absolute inset-0 opacity-10 pointer-events-none" 
                   style={{ background: 'repeating-linear-gradient(45deg, #fcf8f0, #fcf8f0 10px, #fff 10px, #fff 20px)' }} />
              
              <div className="relative z-10">
                <div className="text-gold font-bold tracking-[2px] uppercase text-xs mb-4">Established 1952</div>
                <h1 className="text-5xl md:text-6xl font-serif text-charcoal mb-6 leading-tight">Unity, Heritage & Growth</h1>
                <p className="text-slate-600 text-lg max-w-lg mx-auto mb-10 leading-relaxed">
                  Preserving our cultural roots while empowering the next generation of the Panchal community worldwide.
                </p>
                <Button className="bg-saffron hover:bg-saffron-dark text-white px-8 py-6 font-bold rounded-md shadow-lg shadow-saffron/20 mx-auto">
                  Join the Directory
                </Button>

                <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="border border-border-theme p-6 rounded-lg bg-white/50 backdrop-blur-sm">
                    <strong className="block text-charcoal mb-2">Mission</strong>
                    <p className="text-xs text-slate-500">To foster social cohesion and economic support.</p>
                  </div>
                  <div className="border border-border-theme p-6 rounded-lg bg-white/50 backdrop-blur-sm">
                    <strong className="block text-charcoal mb-2">Vision</strong>
                    <p className="text-xs text-slate-500">A global network of empowered professionals.</p>
                  </div>
                  <div className="border border-border-theme p-6 rounded-lg bg-white/50 backdrop-blur-sm">
                    <strong className="block text-charcoal mb-2">Culture</strong>
                    <p className="text-xs text-slate-500">Celebrating our shared rituals and craftsmanship.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar: Events & Members */}
          <div className="hidden lg:flex flex-col gap-6">
            <div className="bg-white border border-border-theme rounded-lg overflow-hidden flex flex-col shadow-sm">
              <div className="px-4 py-3 bg-accent-light border-b border-border-theme font-serif italic font-bold text-saffron">
                Upcoming Events
              </div>
              <div className="divide-y divide-slate-100">
                <div className="p-4">
                  <span className="bg-gold text-white text-[10px] px-2 py-0.5 rounded uppercase font-bold">Oct 05</span>
                  <h4 className="text-sm font-bold mt-2">Navratri Celebration</h4>
                  <p className="text-xs text-slate-500">Grand Garba Night at Community Grounds</p>
                </div>
                <div className="p-4">
                  <span className="bg-gold text-white text-[10px] px-2 py-0.5 rounded uppercase font-bold">Nov 12</span>
                  <h4 className="text-sm font-bold mt-2">Business Summit</h4>
                  <p className="text-xs text-slate-500">Networking for small business owners</p>
                </div>
              </div>

              <div className="px-4 py-3 bg-accent-light border-y border-border-theme font-serif italic font-bold text-saffron">
                Active Members
              </div>
              <div className="divide-y divide-slate-100">
                {[
                  { name: 'Rajesh Sharma', role: 'Senior Architect', city: 'Mumbai', initials: 'RS' },
                  { name: 'Anjali Panchal', role: 'Software Engineer', city: 'Bengaluru', initials: 'AP' },
                  { name: 'Kiran Panchal', role: 'Educationist', city: 'Pune', initials: 'KP' },
                ].map((member, i) => (
                  <div key={i} className="p-4 flex items-center gap-3">
                    <div className="w-8 h-8 bg-slate-100 border border-gold rounded-full flex items-center justify-center text-[10px] font-bold text-slate-500">
                      {member.initials}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-charcoal">{member.name}</div>
                      <div className="text-[10px] text-slate-400">{member.role} • {member.city}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
