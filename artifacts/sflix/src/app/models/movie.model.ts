export interface Movie {
  id: string | number;
  title: string;
  year: number;
  rating: number;
  genres: string[];
  description: string;
  backdrop: string;
  poster: string;
  duration: string;
  language?: string;
  quality?: string;
  type: 'movie' | 'tv';
  vjName?: string;
  vjId?: string;
  views?: number;
  videoUrl?: string;
  featured?: boolean;
  createdAt?: number;
}

export interface MovieSection {
  title: string;
  slug: string;
  movies: Movie[];
}

export interface Series {
  id: string | number;
  title: string;
  year: number;
  genres: string[];
  description: string;
  poster: string;
  backdrop: string;
  vjName: string;
  vjId?: string;
  episodes: Episode[];
  createdAt?: number;
}

export interface Episode {
  id: string | number;
  seriesId: string | number;
  title: string;
  episode: number;
  season: number;
  duration: string;
  videoUrl?: string;
  quality?: string;
}

export interface VJ {
  id: string | number;
  name: string;
  email: string;
  uid?: string;
  joinDate: string;
  totalMovies: number;
  totalViews: number;
  downloads: number;
  balance: number;
  status: 'active' | 'suspended';
}

export interface User {
  id: string | number;
  name: string;
  email: string;
  joinDate: string;
  lastSeen: string;
  watchCount: number;
  status: 'active' | 'banned';
  plan?: string;
  role?: string;
}

export interface Transaction {
  id: string | number;
  date: string;
  type: 'earning' | 'withdrawal' | 'system';
  amount: number;
  description: string;
  status: 'completed' | 'pending' | 'failed';
  from?: string;
  vjId?: string;
}

export interface Activity {
  id: string | number;
  userId: string | number;
  userName: string;
  action: string;
  target: string;
  date: string;
}

export interface HeroSlide {
  id: string | number;
  movieId: string | number;
  title: string;
  imageUrl: string;
  active: boolean;
  uploadedBy: string;
  createdAt?: number;
}

export interface AppComment {
  id: string | number;
  uid: string;
  name: string;
  text: string;
  createdAt: number;
}
