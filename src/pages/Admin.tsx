import React, { useState, useEffect } from 'react';
import SectionHeading from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp, onSnapshot, query, orderBy, updateDoc, doc } from 'firebase/firestore';
import { Loader2, Plus, Megaphone, Calendar, ShieldAlert, Heart, HandHelping, Landmark, MessageSquare } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function Admin() {
  const { user, isAdmin, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(false);
  const [newsTitle, setNewsTitle] = useState('');
  const [newsContent, setNewsContent] = useState('');
  const [eventTitle, setEventTitle] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  
  const [serviceRequests, setServiceRequests] = useState<any[]>([]);
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [donationDonor, setDonationDonor] = useState('');
  const [donationAmount, setDonationAmount] = useState('');
  const [donationPurpose, setDonationPurpose] = useState('');

  useEffect(() => {
    if (!isAdmin) return;

    const qRequests = query(collection(db, 'service_requests'), orderBy('createdAt', 'desc'));
    const unsubRequests = onSnapshot(qRequests, (snapshot) => {
      setServiceRequests(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
    });

    const qInquiries = query(collection(db, 'inquiries'), orderBy('createdAt', 'desc'));
    const unsubInquiries = onSnapshot(qInquiries, (snapshot) => {
      setInquiries(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
    });

    return () => {
      unsubRequests();
      unsubInquiries();
    };
  }, [isAdmin]);

  const handleAddNews = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addDoc(collection(db, 'news'), {
        title: newsTitle,
        content: newsContent,
        author: user?.displayName || 'Admin',
        date: serverTimestamp(),
        createdAt: serverTimestamp(),
      });
      setNewsTitle('');
      setNewsContent('');
      alert('News added successfully!');
    } catch (error) {
      console.error("Error adding news:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addDoc(collection(db, 'events'), {
        title: eventTitle,
        date: new Date(eventDate),
        location: eventLocation,
        description: 'New community event',
        category: 'upcoming',
        createdAt: serverTimestamp(),
      });
      setEventTitle('');
      setEventDate('');
      setEventLocation('');
      alert('Event added successfully!');
    } catch (error) {
      console.error("Error adding event:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddDonation = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addDoc(collection(db, 'donations'), {
        donorName: donationDonor,
        amount: Number(donationAmount),
        purpose: donationPurpose,
        date: serverTimestamp(),
      });
      setDonationDonor('');
      setDonationAmount('');
      setDonationPurpose('');
      alert('Donation recorded successfully!');
    } catch (error) {
      console.error("Error adding donation:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateRequestStatus = async (id: string, status: string) => {
    try {
      await updateDoc(doc(db, 'service_requests', id), { status });
    } catch (error) {
      console.error("Error updating request:", error);
    }
  };

  if (authLoading) {
    return (
      <div className="pt-32 flex justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-saffron" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="pt-32 pb-24 text-center bg-cream min-h-screen">
        <div className="max-w-md mx-auto p-12 bg-white rounded-lg shadow-sm border border-border-theme">
          <ShieldAlert className="w-16 h-16 text-saffron mx-auto mb-6" />
          <h3 className="text-2xl font-serif font-bold mb-4 text-red-500">Access Restricted</h3>
          <p className="text-slate-600 mb-8">This area is reserved for community administrators. Please login with an admin account.</p>
          <Button variant="outline" className="border-gold text-gold" onClick={() => window.history.back()}>Go Back</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 bg-cream min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Admin Dashboard"
          subtitle="Manage community content, service requests, and funds."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Add News */}
          <Card className="border-border-theme bg-white">
            <CardHeader className="bg-accent-light border-b border-border-theme">
              <CardTitle className="flex items-center text-charcoal">
                <Megaphone className="w-5 h-5 mr-2 text-saffron" />
                Post News Announcement
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <form onSubmit={handleAddNews} className="space-y-4">
                <Input 
                  placeholder="News Title" 
                  className="border-border-theme"
                  value={newsTitle} 
                  onChange={(e) => setNewsTitle(e.target.value)} 
                  required 
                />
                <textarea
                  className="w-full min-h-[150px] p-4 rounded-lg border border-border-theme focus:border-gold focus:ring-1 focus:ring-gold outline-none text-sm"
                  placeholder="Content..."
                  value={newsContent}
                  onChange={(e) => setNewsContent(e.target.value)}
                  required
                />
                <Button type="submit" disabled={loading} className="w-full bg-saffron hover:bg-saffron-dark text-white font-bold">
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4 mr-2" />}
                  Post News
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Add Event */}
          <Card className="border-border-theme bg-white">
            <CardHeader className="bg-accent-light border-b border-border-theme">
              <CardTitle className="flex items-center text-charcoal">
                <Calendar className="w-5 h-5 mr-2 text-gold" />
                Schedule New Event
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <form onSubmit={handleAddEvent} className="space-y-4">
                <Input 
                  placeholder="Event Title" 
                  className="border-border-theme"
                  value={eventTitle} 
                  onChange={(e) => setEventTitle(e.target.value)} 
                  required 
                />
                <Input 
                  type="datetime-local" 
                  className="border-border-theme"
                  value={eventDate} 
                  onChange={(e) => setEventDate(e.target.value)} 
                  required 
                />
                <Input 
                  placeholder="Location" 
                  className="border-border-theme"
                  value={eventLocation} 
                  onChange={(e) => setEventLocation(e.target.value)} 
                  required 
                />
                <Button type="submit" disabled={loading} className="w-full bg-gold hover:bg-gold-dark text-white font-bold">
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4 mr-2" />}
                  Schedule Event
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Service Requests */}
          <Card className="lg:col-span-2 border-border-theme bg-white">
            <CardHeader className="bg-accent-light border-b border-border-theme">
              <CardTitle className="flex items-center text-charcoal">
                <HandHelping className="w-5 h-5 mr-2 text-saffron" />
                Service Requests
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-slate-100">
                {serviceRequests.map(req => (
                  <div key={req.id} className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-charcoal">{req.requesterName}</h4>
                      <Badge variant={req.status === 'pending' ? 'outline' : 'default'} className={req.status === 'pending' ? 'border-saffron text-saffron' : 'bg-green-500'}>
                        {req.status}
                      </Badge>
                    </div>
                    <div className="text-xs text-gold font-bold uppercase mb-2">{req.serviceType.replace('_', ' ')}</div>
                    <p className="text-sm text-slate-500 mb-4">{req.description}</p>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="text-[10px] h-7" onClick={() => updateRequestStatus(req.id, 'reviewed')}>Mark Reviewed</Button>
                      <Button size="sm" variant="outline" className="text-[10px] h-7" onClick={() => updateRequestStatus(req.id, 'completed')}>Mark Completed</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Add Donation */}
          <div className="space-y-8">
            <Card className="border-border-theme bg-white">
              <CardHeader className="bg-accent-light border-b border-border-theme">
                <CardTitle className="flex items-center text-charcoal text-sm font-bold uppercase tracking-wider">
                  <Landmark className="w-4 h-4 mr-2 text-gold" />
                  Record Donation
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <form onSubmit={handleAddDonation} className="space-y-4">
                  <Input placeholder="Donor Name" className="border-border-theme" value={donationDonor} onChange={(e) => setDonationDonor(e.target.value)} required />
                  <Input type="number" placeholder="Amount" className="border-border-theme" value={donationAmount} onChange={(e) => setDonationAmount(e.target.value)} required />
                  <Input placeholder="Purpose (e.g. Widow Support)" className="border-border-theme" value={donationPurpose} onChange={(e) => setDonationPurpose(e.target.value)} />
                  <Button type="submit" disabled={loading} className="w-full bg-gold hover:bg-gold-dark text-white font-bold">
                    Record Donation
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card className="border-border-theme bg-white">
              <CardHeader className="bg-accent-light border-b border-border-theme">
                <CardTitle className="flex items-center text-charcoal text-sm font-bold uppercase tracking-wider">
                  <MessageSquare className="w-4 h-4 mr-2 text-saffron" />
                  Recent Inquiries
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-slate-100">
                  {inquiries.map(inq => (
                    <div key={inq.id} className="p-4">
                      <div className="text-xs font-bold text-charcoal">{inq.name}</div>
                      <div className="text-[10px] text-slate-400 mb-1">{inq.email}</div>
                      <p className="text-[10px] text-slate-500 line-clamp-2">{inq.message}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
