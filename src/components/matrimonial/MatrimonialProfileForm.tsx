import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Camera } from 'lucide-react';
import { db } from '@/lib/firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { useAuth } from '@/contexts/AuthContext';

interface MatrimonialProfileFormProps {
  initialData?: any;
  onSuccess: () => void;
}

export default function MatrimonialProfileForm({ initialData, onSuccess }: MatrimonialProfileFormProps) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: 'male',
    education: '',
    occupation: '',
    height: '',
    familyDetails: '',
    expectations: '',
    photoUrl: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        age: initialData.age?.toString() || '',
        gender: initialData.gender || 'male',
        education: initialData.education || '',
        occupation: initialData.occupation || '',
        height: initialData.height || '',
        familyDetails: initialData.familyDetails || '',
        expectations: initialData.expectations || '',
        photoUrl: initialData.photoUrl || ''
      });
    } else if (user) {
      setFormData(prev => ({ ...prev, name: user.displayName || '' }));
    }
  }, [initialData, user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      const profileId = user.uid;
      await setDoc(doc(db, 'matrimonial', profileId), {
        ...formData,
        age: parseInt(formData.age),
        uid: user.uid,
        status: 'active',
        updatedAt: serverTimestamp(),
        createdAt: initialData?.createdAt || serverTimestamp(),
      });
      onSuccess();
    } catch (error) {
      console.error("Error saving matrimonial profile:", error);
      alert("Failed to save profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 py-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-xs font-bold text-charcoal uppercase tracking-wider">Full Name</label>
          <Input
            placeholder="Enter your full name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold text-charcoal uppercase tracking-wider">Age</label>
          <Input
            type="number"
            placeholder="Enter your age"
            value={formData.age}
            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold text-charcoal uppercase tracking-wider">Gender</label>
          <select
            className="w-full h-10 px-3 py-2 text-sm bg-white border border-border-theme rounded-md focus:outline-none focus:ring-2 focus:ring-saffron/20 focus:border-saffron"
            value={formData.gender}
            onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
            required
          >
            <option value="male">Male (Groom)</option>
            <option value="female">Female (Bride)</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold text-charcoal uppercase tracking-wider">Height</label>
          <Input
            placeholder="e.g. 5ft 8in"
            value={formData.height}
            onChange={(e) => setFormData({ ...formData, height: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold text-charcoal uppercase tracking-wider">Education</label>
          <Input
            placeholder="Highest qualification"
            value={formData.education}
            onChange={(e) => setFormData({ ...formData, education: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold text-charcoal uppercase tracking-wider">Occupation</label>
          <Input
            placeholder="Your current profession"
            value={formData.occupation}
            onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-bold text-charcoal uppercase tracking-wider">Photo URL</label>
        <div className="flex gap-2">
          <Input
            placeholder="Paste image URL here"
            value={formData.photoUrl}
            onChange={(e) => setFormData({ ...formData, photoUrl: e.target.value })}
          />
          <div className="w-10 h-10 bg-slate-100 rounded flex items-center justify-center text-slate-400 shrink-0">
            <Camera className="w-5 h-5" />
          </div>
        </div>
        <p className="text-[10px] text-slate-400 italic">Tip: Use a clear, professional portrait photo.</p>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-bold text-charcoal uppercase tracking-wider">Family Details</label>
        <Textarea
          placeholder="Tell us about your family background, siblings, parents' occupation, etc."
          className="min-h-[100px]"
          value={formData.familyDetails}
          onChange={(e) => setFormData({ ...formData, familyDetails: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <label className="text-xs font-bold text-charcoal uppercase tracking-wider">Expectations</label>
        <Textarea
          placeholder="What are you looking for in a partner?"
          className="min-h-[100px]"
          value={formData.expectations}
          onChange={(e) => setFormData({ ...formData, expectations: e.target.value })}
          required
        />
      </div>

      <Button type="submit" className="w-full bg-saffron hover:bg-saffron-dark text-white font-bold py-6" disabled={loading}>
        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (initialData ? 'Update My Profile' : 'Create My Profile')}
      </Button>
    </form>
  );
}
