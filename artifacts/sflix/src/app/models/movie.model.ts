export interface Movie {
  id: string | number;
  title: string;
  year: string | number;
  rating?: number;
  genre: string;
  description: string;
  posterUrl: string;
  backdrop?: string;
  movieUrl?: string;
  downloadUrl?: string;
  duration?: string;
  language?: string;
  quality?: string;
  type: 'movie' | 'series';
  vjName?: string;
  vjId?: string;
  views?: number;
  downloads?: number;
  featured?: boolean;
  createdAt?: any;
}

export interface MovieSection {
  title: string;
  slug: string;
  movies: Movie[];
}

export interface Series {
  id: string | number;
  title: string;
  year: string | number;
  genre: string;
  description: string;
  posterUrl: string;
  backdrop?: string;
  vjName: string;
  vjId?: string;
  episodes: Episode[];
  createdAt?: any;
}

export interface Episode {
  id: string | number;
  movieId: string;
  seriesTitle?: string;
  season: string;
  episode: string;
  episodeTitle?: string;
  episodeUrl?: string;
  vjId?: string;
  duration?: string;
  quality?: string;
  createdAt?: any;
}

export interface Profile {
  id: string;
  firstName: string;
  lastName: string;
  role: 'viewer' | 'vj' | 'musician' | 'tiktoker' | 'admin';
  phone?: string;
  email: string;
  createdAt?: any;
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
  type: 'view' | 'download' | 'share' | 'comment' | 'like' | 'save';
  contentType: 'movie' | 'music' | 'tiktok' | 'channel';
  contentId: string;
  contentTitle: string;
  userId: string;
  userName: string;
  createdAt?: any;
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
  contentId: string;
  contentType: 'movie' | 'music' | 'tiktok' | 'channel';
  userId: string;
  userName: string;
  text: string;
  likes?: number;
  createdAt?: any;
}
