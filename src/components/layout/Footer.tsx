import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-charcoal text-white pt-16 pb-8 border-t-4 border-gold">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-saffron to-gold rounded-lg flex items-center justify-center text-white font-black text-2xl">
                P
              </div>
              <span className="text-2xl font-serif font-bold text-white">Panchal Samaj</span>
            </Link>
            <p className="text-sm leading-relaxed mb-6 text-slate-400">
              Uniting the Panchal community through heritage, culture, and progress. Building a stronger future together.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gold hover:text-saffron transition-colors"><Facebook className="w-5 h-5" /></a>
              <a href="#" className="text-gold hover:text-saffron transition-colors"><Twitter className="w-5 h-5" /></a>
              <a href="#" className="text-gold hover:text-saffron transition-colors"><Instagram className="w-5 h-5" /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-gold font-serif text-lg mb-6">Quick Links</h4>
            <ul className="space-y-4 text-sm">
              <li><Link to="/about" className="hover:text-gold transition-colors">About Us</Link></li>
              <li><Link to="/directory" className="hover:text-gold transition-colors">Member Directory</Link></li>
              <li><Link to="/events" className="hover:text-gold transition-colors">Events & Gallery</Link></li>
              <li><Link to="/news" className="hover:text-gold transition-colors">News & Announcements</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-gold font-serif text-lg mb-6">Support</h4>
            <ul className="space-y-4 text-sm">
              <li><Link to="/contact" className="hover:text-gold transition-colors">Contact Us</Link></li>
              <li><a href="#" className="hover:text-gold transition-colors">Membership FAQ</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Terms of Service</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-gold font-serif text-lg mb-6">Contact Info</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-saffron shrink-0" />
                <span className="text-slate-400">123 Community Center, Heritage Road, Ahmedabad, Gujarat</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-saffron shrink-0" />
                <span className="text-slate-400">+91 98765 43210</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-saffron shrink-0" />
                <span className="text-slate-400">info@panchalsamaj.org</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-widest text-slate-500">
          <p>© {new Date().getFullYear()} Panchal Samaj Community Organization. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="text-gold hover:text-white transition-colors">Privacy Policy</a>
            <Link to="/admin" className="text-gold hover:text-white transition-colors">Admin Login</Link>
            <a href="#" className="text-gold hover:text-white transition-colors">Donate</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
