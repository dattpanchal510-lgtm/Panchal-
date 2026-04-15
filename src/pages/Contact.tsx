import React, { useState } from 'react';
import SectionHeading from '@/components/ui/SectionHeading';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin, Send, Loader2 } from 'lucide-react';
import { db } from '@/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await addDoc(collection(db, 'inquiries'), {
        ...formData,
        status: 'new',
        createdAt: new Date()
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
      alert("Thank you for your inquiry. We will get back to you shortly.");
    } catch (error) {
      console.error("Error submitting inquiry:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="pt-32 pb-24 bg-cream min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Contact & Inquiries"
          subtitle="Have questions or want to get involved? We'd love to hear from you."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div>
            <h3 className="text-2xl font-serif font-bold mb-8 text-charcoal">Get in Touch</h3>
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-accent-light border border-border-theme rounded-lg">
                  <MapPin className="w-6 h-6 text-saffron" />
                </div>
                <div>
                  <h4 className="font-bold mb-1 text-charcoal uppercase tracking-wider text-sm">Our Location</h4>
                  <p className="text-slate-500 text-sm">123 Community Center, Heritage Road, Ahmedabad, Gujarat 380001</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-accent-light border border-border-theme rounded-lg">
                  <Phone className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <h4 className="font-bold mb-1 text-charcoal uppercase tracking-wider text-sm">Phone Number</h4>
                  <p className="text-slate-500 text-sm">+91 98765 43210</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-accent-light border border-border-theme rounded-lg">
                  <Mail className="w-6 h-6 text-saffron" />
                </div>
                <div>
                  <h4 className="font-bold mb-1 text-charcoal uppercase tracking-wider text-sm">Email Address</h4>
                  <p className="text-slate-500 text-sm">info@panchalsamaj.org</p>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="mt-12 aspect-video bg-white rounded-lg overflow-hidden border border-border-theme flex items-center justify-center text-slate-400 shadow-sm">
              <div className="text-center">
                <MapPin className="w-12 h-12 mx-auto mb-2 opacity-20 text-gold" />
                <p className="text-xs font-bold uppercase tracking-wider">Interactive Map Placeholder</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-10 rounded-lg shadow-sm border border-border-theme">
            <h3 className="text-2xl font-serif font-bold mb-8 text-charcoal">Send a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-charcoal uppercase tracking-wider">Full Name</label>
                  <Input
                    placeholder="John Doe"
                    className="border-border-theme"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-charcoal uppercase tracking-wider">Email Address</label>
                  <Input
                    type="email"
                    placeholder="john@example.com"
                    className="border-border-theme"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-charcoal uppercase tracking-wider">Subject</label>
                <Input
                  placeholder="How can we help?"
                  className="border-border-theme"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-charcoal uppercase tracking-wider">Message</label>
                <Textarea
                  className="min-h-[150px] border-border-theme"
                  placeholder="Tell us more..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-saffron hover:bg-saffron-dark text-white py-6 font-bold rounded-md shadow-lg shadow-saffron/20">
                {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                  <>
                    Send Message
                    <Send className="ml-2 w-4 h-4" />
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
