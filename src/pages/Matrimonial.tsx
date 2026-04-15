import React, { useState, useEffect } from 'react';
import SectionHeading from '@/components/ui/SectionHeading';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Heart, Search, Loader2, Sparkles, User, Briefcase, GraduationCap, Ruler } from 'lucide-react';
import { db } from '@/lib/firebase';
import { collection, onSnapshot, query, orderBy, where, doc, getDoc } from 'firebase/firestore';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { analyzeMatchCompatibility } from '@/services/gemini';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import MatrimonialProfileForm from '@/components/matrimonial/MatrimonialProfileForm';

export default function Matrimonial() {
  const [profiles, setProfiles] = useState<any[]>([]);
  const [myProfile, setMyProfile] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [genderFilter, setGenderFilter] = useState<'all' | 'male' | 'female'>('all');
  const [analyzingId, setAnalyzingId] = useState<string | null>(null);
  const [insights, setInsights] = useState<Record<string, string>>({});
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const fetchMyProfile = async () => {
      try {
        const docRef = doc(db, 'matrimonial', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setMyProfile({ id: docSnap.id, ...docSnap.data() });
        }
      } catch (error) {
        console.error("Error fetching my profile:", error);
      }
    };

    fetchMyProfile();

    const q = query(
      collection(db, 'matrimonial'),
      where('status', '==', 'active'),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const profilesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProfiles(profilesData);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching matrimonial profiles:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  const handleAnalyze = async (profile: any) => {
    setAnalyzingId(profile.id);
    try {
      // Use actual profile if available, otherwise fallback to mock
      const comparisonProfile = myProfile || {
        name: user?.displayName || 'You',
        age: 28,
        education: 'Master of Engineering',
        occupation: 'Software Architect',
        familyDetails: 'Respected Panchal family from Ahmedabad with roots in craftsmanship.',
        expectations: 'Looking for a well-educated partner with strong family values and an interest in community heritage.'
      };
      const result = await analyzeMatchCompatibility(comparisonProfile, profile);
      setInsights(prev => ({ ...prev, [profile.id]: result }));
    } catch (error) {
      console.error("Analysis failed:", error);
    } finally {
      setAnalyzingId(null);
    }
  };

  const filteredProfiles = profiles.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
                         p.occupation?.toLowerCase().includes(search.toLowerCase());
    const matchesGender = genderFilter === 'all' || p.gender === genderFilter;
    return matchesSearch && matchesGender;
  });

  if (!user) {
    return (
      <div className="pt-32 pb-24 text-center bg-cream min-h-screen">
        <div className="max-w-md mx-auto p-12 bg-white rounded-lg shadow-sm border border-border-theme">
          <Heart className="w-12 h-12 text-saffron mx-auto mb-6" />
          <h3 className="text-2xl font-serif font-bold mb-4 text-charcoal">Matrimonial Access</h3>
          <p className="text-slate-500 mb-8">Please login to view matrimonial profiles and find your life partner within the community.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 bg-cream min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Matrimonial Portal"
          subtitle="Find your life partner within the Panchal community."
        />

        <div className="bg-white border border-border-theme rounded-lg p-6 mb-12 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input
                placeholder="Search by name or occupation..."
                className="pl-10 border-border-theme"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={genderFilter === 'all' ? 'default' : 'outline'}
                onClick={() => setGenderFilter('all')}
                className={genderFilter === 'all' ? 'bg-saffron' : 'border-border-theme'}
              >
                All
              </Button>
              <Button
                variant={genderFilter === 'male' ? 'default' : 'outline'}
                onClick={() => setGenderFilter('male')}
                className={genderFilter === 'male' ? 'bg-saffron' : 'border-border-theme'}
              >
                Groom
              </Button>
              <Button
                variant={genderFilter === 'female' ? 'default' : 'outline'}
                onClick={() => setGenderFilter('female')}
                className={genderFilter === 'female' ? 'bg-saffron' : 'border-border-theme'}
              >
                Bride
              </Button>
            </div>
            <div className="flex justify-end">
              <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
                <DialogTrigger
                  render={
                    <Button className="bg-gold hover:bg-gold-dark text-white font-bold">
                      {myProfile ? 'Edit My Profile' : 'Create My Profile'}
                    </Button>
                  }
                />
                <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto bg-white border-border-theme rounded-xl">
                  <DialogHeader>
                    <DialogTitle className="font-serif text-2xl text-charcoal">
                      {myProfile ? 'Update Your Matrimonial Profile' : 'Create Your Matrimonial Profile'}
                    </DialogTitle>
                  </DialogHeader>
                  <MatrimonialProfileForm 
                    initialData={myProfile} 
                    onSuccess={() => {
                      setIsFormOpen(false);
                      // Refresh my profile
                      const fetchMyProfile = async () => {
                        const docRef = doc(db, 'matrimonial', user!.uid);
                        const docSnap = await getDoc(docRef);
                        if (docSnap.exists()) {
                          setMyProfile({ id: docSnap.id, ...docSnap.data() });
                        }
                      };
                      fetchMyProfile();
                    }} 
                  />
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-24">
            <Loader2 className="w-8 h-8 animate-spin text-saffron" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProfiles.map((profile) => (
              <Card key={profile.id} className="border-border-theme hover:shadow-lg transition-shadow bg-white overflow-hidden flex flex-col">
                <div className="h-64 relative overflow-hidden">
                  <img
                    src={profile.photoUrl || 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=2069'}
                    alt={profile.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className={profile.gender === 'male' ? 'bg-blue-500' : 'bg-pink-500'}>
                      {profile.gender === 'male' ? 'Groom' : 'Bride'}
                    </Badge>
                  </div>
                </div>
                <CardHeader className="bg-accent-light border-b border-border-theme py-4">
                  <CardTitle className="font-serif text-xl text-charcoal">{profile.name}, {profile.age}</CardTitle>
                </CardHeader>
                <CardContent className="p-6 flex-grow">
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-sm text-slate-600">
                      <GraduationCap className="w-4 h-4 mr-2 text-gold" />
                      {profile.education}
                    </div>
                    <div className="flex items-center text-sm text-slate-600">
                      <Briefcase className="w-4 h-4 mr-2 text-gold" />
                      {profile.occupation}
                    </div>
                    <div className="flex items-center text-sm text-slate-600">
                      <Ruler className="w-4 h-4 mr-2 text-gold" />
                      {profile.height}
                    </div>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-lg mb-6">
                    <h4 className="text-xs font-bold text-charcoal uppercase tracking-wider mb-2">Family Background</h4>
                    <p className="text-xs text-slate-500 line-clamp-2">{profile.familyDetails}</p>
                  </div>

                  {insights[profile.id] && (
                    <div className="mb-6 p-4 bg-saffron/5 border border-saffron/20 rounded-lg animate-in fade-in slide-in-from-top-2">
                      <div className="flex items-center text-saffron mb-2">
                        <Sparkles className="w-3 h-3 mr-1" />
                        <span className="text-[10px] font-bold uppercase tracking-wider">AI Match Insights</span>
                      </div>
                      <p className="text-[11px] text-slate-600 leading-relaxed italic">
                        {insights[profile.id]}
                      </p>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      className="flex-1 border-gold text-gold hover:bg-gold hover:text-white font-bold"
                      onClick={() => handleAnalyze(profile)}
                      disabled={analyzingId === profile.id}
                    >
                      {analyzingId === profile.id ? <Loader2 className="w-4 h-4 animate-spin" /> : (
                        <>
                          <Sparkles className="w-4 h-4 mr-2" />
                          AI Match
                        </>
                      )}
                    </Button>
                    <Button className="flex-[2] bg-saffron hover:bg-saffron-dark text-white font-bold">
                      View Full Profile
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {!loading && filteredProfiles.length === 0 && (
          <div className="text-center py-24 text-slate-500">
            No profiles found matching your criteria.
          </div>
        )}
      </div>
    </div>
  );
}
