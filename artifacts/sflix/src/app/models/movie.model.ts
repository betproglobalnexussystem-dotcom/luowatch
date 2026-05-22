export interface Movie {
  id: number;
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
  views?: number;
  videoUrl?: string;
}

export interface MovieSection {
  title: string;
  slug: string;
  movies: Movie[];
}

export interface Series {
  id: number;
  title: string;
  year: number;
  genres: string[];
  description: string;
  poster: string;
  backdrop: string;
  vjName: string;
  episodes: Episode[];
}

export interface Episode {
  id: number;
  seriesId: number;
  title: string;
  episode: number;
  season: number;
  duration: string;
  videoUrl?: string;
  quality?: string;
}

export interface VJ {
  id: number;
  name: string;
  email: string;
  joinDate: string;
  totalMovies: number;
  totalViews: number;
  balance: number;
  status: 'active' | 'suspended';
}

export interface User {
  id: number;
  name: string;
  email: string;
  joinDate: string;
  lastSeen: string;
  watchCount: number;
  status: 'active' | 'banned';
}

export interface Transaction {
  id: number;
  date: string;
  type: 'earning' | 'withdrawal' | 'system';
  amount: number;
  description: string;
  status: 'completed' | 'pending' | 'failed';
  from?: string;
}

export interface Activity {
  id: number;
  userId: number;
  userName: string;
  action: string;
  target: string;
  date: string;
}

export interface HeroSlide {
  id: number;
  movieId: number;
  title: string;
  imageUrl: string;
  active: boolean;
  uploadedBy: string;
}
