export interface Member {
  id: string;
  name: string;
  profession: string;
  city: string;
  email?: string;
  phone?: string;
  photoUrl?: string;
  bio?: string;
  role: 'member' | 'admin';
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  imageUrl?: string;
  category: 'upcoming' | 'past';
}

export interface NewsItem {
  id: string;
  title: string;
  content: string;
  date: string;
  author: string;
  imageUrl?: string;
}

export interface GalleryImage {
  id: string;
  url: string;
  caption: string;
  category: string;
}
