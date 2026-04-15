import React, { useState, useEffect } from 'react';
import SectionHeading from '@/components/ui/SectionHeading';
import { Input } from '@/components/ui/input';
import { Search, MapPin, Briefcase, Loader2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { db } from '@/lib/firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { useAuth } from '@/contexts/AuthContext';

export default function Directory() {
  const [search, setSearch] = useState('');
  const [members, setMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const q = query(collection(db, 'members'), orderBy('name', 'asc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const membersData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setMembers(membersData);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching members:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  const filteredMembers = members.filter(m =>
    m.name?.toLowerCase().includes(search.toLowerCase()) ||
    m.profession?.toLowerCase().includes(search.toLowerCase()) ||
    m.city?.toLowerCase().includes(search.toLowerCase())
  );

  if (!user) {
    return (
      <div className="pt-32 pb-24 text-center">
        <div className="max-w-md mx-auto p-12 bg-white rounded-3xl shadow-sm border border-slate-100">
          <h3 className="text-2xl font-serif font-bold mb-4">Login Required</h3>
          <p className="text-slate-600 mb-8">Please login to view the community directory and connect with other members.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Member Directory"
          subtitle="Connect with fellow community members and professionals."
        />

        <div className="max-w-2xl mx-auto mb-16 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <Input
            placeholder="Search by name, profession, or city..."
            className="pl-12 py-6 text-lg rounded-lg border-border-theme focus:border-gold focus:ring-gold/20 bg-white"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {loading ? (
          <div className="flex justify-center py-24">
            <Loader2 className="w-8 h-8 animate-spin text-saffron" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredMembers.map((member) => (
              <Card key={member.id} className="overflow-hidden hover:shadow-lg transition-shadow border-border-theme bg-white">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <Avatar className="w-16 h-16 border-2 border-gold">
                      <AvatarImage src={member.photoUrl} />
                      <AvatarFallback>{member.name?.[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-xl font-serif font-bold text-charcoal">{member.name}</h3>
                      <div className="flex items-center text-slate-500 text-sm mt-1">
                        <Briefcase className="w-3 h-3 mr-1 text-gold" />
                        {member.profession || 'Panchal Member'}
                      </div>
                      <div className="flex items-center text-slate-500 text-sm mt-1">
                        <MapPin className="w-3 h-3 mr-1 text-gold" />
                        {member.city || 'Location Unknown'}
                      </div>
                      {member.familyBackground && (
                        <div className="mt-4 p-3 bg-slate-50 rounded border border-slate-100">
                          <h4 className="text-[10px] font-bold text-charcoal uppercase tracking-wider mb-1">Family Background</h4>
                          <p className="text-[10px] text-slate-500 line-clamp-2">{member.familyBackground}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {!loading && filteredMembers.length === 0 && (
          <div className="text-center py-24 text-slate-500">
            No members found matching your search.
          </div>
        )}
      </div>
    </div>
  );
}
