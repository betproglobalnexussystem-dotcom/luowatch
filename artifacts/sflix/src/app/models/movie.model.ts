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
}

export interface MovieSection {
  title: string;
  slug: string;
  movies: Movie[];
}
