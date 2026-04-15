import React, { useState, useEffect } from 'react';
import SectionHeading from '@/components/ui/SectionHeading';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Heart, HandHelping, Landmark, MessageSquare, Loader2, Sparkles, Users, ShieldCheck } from 'lucide-react';
import { db } from '@/lib/firebase';
import { collection, addDoc, onSnapshot, query, orderBy, limit } from 'firebase/firestore';
import { useAuth } from '@/contexts/AuthContext';

export default function Services() {
  const [serviceType, setServiceType] = useState('widow_support');
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [donations, setDonations] = useState<any[]>([]);
  const { user } = useAuth();

  const [inquiryData, setInquiryData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [inquirySubmitting, setInquirySubmitting] = useState(false);

  useEffect(() => {
    const q = query(collection(db, 'donations'), orderBy('date', 'desc'), limit(5));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const donationsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setDonations(donationsData);
    });
    return () => unsubscribe();
  }, []);

  const handleSubmitRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSubmitting(true);
    try {
      await addDoc(collection(db, 'service_requests'), {
        uid: user.uid,
        requesterName: user.displayName || 'Anonymous',
        serviceType,
        description,
        status: 'pending',
        createdAt: new Date()
      });
      setDescription('');
      alert("Your request has been submitted successfully. Our team will review it soon.");
    } catch (error) {
      console.error("Error submitting service request:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmitInquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    setInquirySubmitting(true);
    try {
      await addDoc(collection(db, 'inquiries'), {
        ...inquiryData,
        subject: 'Services Inquiry',
        status: 'new',
        createdAt: new Date()
      });
      setInquiryData({ name: '', email: '', message: '' });
      alert("Thank you for your inquiry. We will get back to you shortly.");
    } catch (error) {
      console.error("Error submitting inquiry:", error);
    } finally {
      setInquirySubmitting(false);
    }
  };

  return (
    <div className="pt-32 pb-24 bg-cream min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Community Services & Aid"
          subtitle="Empowering our members through mutual support and dedicated service funds."
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Service Options */}
          <div className="lg:col-span-2 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-border-theme bg-white">
                <CardHeader className="flex flex-row items-center space-x-4 pb-2">
                  <div className="p-2 bg-saffron/10 rounded-lg">
                    <Heart className="w-6 h-6 text-saffron" />
                  </div>
                  <CardTitle className="text-lg font-serif">Widow Support</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-500 mb-4">Dedicated financial and social assistance for widowed women in our community.</p>
                  <Button variant="outline" className="w-full border-saffron text-saffron hover:bg-saffron hover:text-white" onClick={() => setServiceType('widow_support')}>
                    Request Support
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-border-theme bg-white">
                <CardHeader className="flex flex-row items-center space-x-4 pb-2">
                  <div className="p-2 bg-gold/10 rounded-lg">
                    <GraduationCap className="w-6 h-6 text-gold" />
                  </div>
                  <CardTitle className="text-lg font-serif">Education Aid</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-500 mb-4">Scholarships and educational resources for bright students from underprivileged backgrounds.</p>
                  <Button variant="outline" className="w-full border-gold text-gold hover:bg-gold hover:text-white" onClick={() => setServiceType('education_aid')}>
                    Apply for Aid
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-border-theme bg-white">
                <CardHeader className="flex flex-row items-center space-x-4 pb-2">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <ShieldCheck className="w-6 h-6 text-blue-500" />
                  </div>
                  <CardTitle className="text-lg font-serif">Medical Aid</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-500 mb-4">Emergency medical funds and healthcare guidance for community members in need.</p>
                  <Button variant="outline" className="w-full border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white" onClick={() => setServiceType('medical_aid')}>
                    Get Assistance
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-border-theme bg-white">
                <CardHeader className="flex flex-row items-center space-x-4 pb-2">
                  <div className="p-2 bg-slate-100 rounded-lg">
                    <Users className="w-6 h-6 text-slate-600" />
                  </div>
                  <CardTitle className="text-lg font-serif">Other Services</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-500 mb-4">Legal aid, career counseling, and other community-driven support initiatives.</p>
                  <Button variant="outline" className="w-full border-slate-400 text-slate-600 hover:bg-slate-600 hover:text-white" onClick={() => {
                    const el = document.getElementById('general-inquiry');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}>
                    Inquire More
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Request Form */}
            <Card className="border-border-theme bg-white shadow-sm">
              <CardHeader className="bg-accent-light border-b border-border-theme">
                <CardTitle className="font-serif text-xl text-charcoal flex items-center">
                  <HandHelping className="w-5 h-5 mr-2 text-saffron" />
                  Submit Service Request
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <form onSubmit={handleSubmitRequest} className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-charcoal mb-2 uppercase tracking-wider">Service Category</label>
                    <select
                      className="w-full p-3 border border-border-theme rounded-lg bg-white text-sm"
                      value={serviceType}
                      onChange={(e) => setServiceType(e.target.value)}
                    >
                      <option value="widow_support">Widow Support</option>
                      <option value="education_aid">Education Aid</option>
                      <option value="medical_aid">Medical Aid</option>
                      <option value="other">Other Services</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-charcoal mb-2 uppercase tracking-wider">Describe Your Need</label>
                    <Textarea
                      placeholder="Please provide details about the assistance you require..."
                      className="min-h-[150px] border-border-theme"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full bg-saffron hover:bg-saffron-dark text-white font-bold py-6" disabled={submitting || !user}>
                    {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Submit Request'}
                  </Button>
                  {!user && <p className="text-xs text-red-500 text-center mt-2">Please login to submit a request.</p>}
                </form>
              </CardContent>
            </Card>

            {/* General Inquiry Form */}
            <Card id="general-inquiry" className="border-border-theme bg-white shadow-sm scroll-mt-32">
              <CardHeader className="bg-slate-50 border-b border-border-theme">
                <CardTitle className="font-serif text-xl text-charcoal flex items-center">
                  <MessageSquare className="w-5 h-5 mr-2 text-gold" />
                  General Questions & Other Services
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <form onSubmit={handleSubmitInquiry} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-charcoal mb-2 uppercase tracking-wider">Your Name</label>
                      <Input
                        placeholder="Full Name"
                        className="border-border-theme"
                        value={inquiryData.name}
                        onChange={(e) => setInquiryData({ ...inquiryData, name: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-charcoal mb-2 uppercase tracking-wider">Email Address</label>
                      <Input
                        type="email"
                        placeholder="Email"
                        className="border-border-theme"
                        value={inquiryData.email}
                        onChange={(e) => setInquiryData({ ...inquiryData, email: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-charcoal mb-2 uppercase tracking-wider">How can we help you?</label>
                    <Textarea
                      placeholder="Ask about legal aid, career counseling, or any other community support..."
                      className="min-h-[120px] border-border-theme"
                      value={inquiryData.message}
                      onChange={(e) => setInquiryData({ ...inquiryData, message: e.target.value })}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full bg-gold hover:bg-gold-dark text-white font-bold py-6" disabled={inquirySubmitting}>
                    {inquirySubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Send Inquiry'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar: Fund & Donations */}
          <div className="space-y-8">
            <Card className="border-border-theme bg-charcoal text-white overflow-hidden">
              <div className="p-8 bg-gradient-to-br from-charcoal to-slate-800">
                <Landmark className="w-10 h-10 text-gold mb-4" />
                <h3 className="text-2xl font-serif font-bold mb-2">Community Fund</h3>
                <p className="text-slate-400 text-sm mb-6">Your contributions help us sustain these vital services.</p>
                <div className="text-4xl font-bold text-gold mb-8">₹ 4,52,000</div>
                <Button className="w-full bg-gold hover:bg-gold-dark text-white font-bold py-6">
                  Donate Now
                </Button>
              </div>
            </Card>

            <Card className="border-border-theme bg-white">
              <CardHeader className="border-b border-border-theme py-4">
                <CardTitle className="text-sm font-bold uppercase tracking-wider text-charcoal">Recent Donors</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-slate-100">
                  {donations.length > 0 ? donations.map((donation) => (
                    <div key={donation.id} className="p-4 flex justify-between items-center">
                      <div>
                        <div className="text-sm font-bold text-charcoal">{donation.donorName}</div>
                        <div className="text-[10px] text-slate-400 uppercase">{donation.purpose}</div>
                      </div>
                      <div className="text-sm font-bold text-saffron">₹ {donation.amount}</div>
                    </div>
                  )) : (
                    <div className="p-8 text-center text-slate-400 text-xs">No recent donations.</div>
                  )}
                </div>
              </CardContent>
            </Card>

            <div className="bg-accent-light border border-border-theme p-6 rounded-lg">
              <div className="flex items-center text-gold mb-3">
                <Sparkles className="w-4 h-4 mr-2" />
                <span className="text-xs font-bold uppercase tracking-wider">AI Impact Analysis</span>
              </div>
              <p className="text-xs text-slate-600 italic">
                "Based on current trends, your community fund has supported 15 families this month, with a 20% increase in education aid requests."
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function GraduationCap(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  );
}
