import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase.service';
import { ref, get, push, set, update, remove } from 'firebase/database';
import { Movie, MovieSection, Series, Episode, VJ, User, Transaction, Activity, HeroSlide, AppComment } from '../models/movie.model';

@Injectable({ providedIn: 'root' })
export class MovieService {
  constructor(private firebase: FirebaseService) {}

  private dbRef(path: string) {
    return ref(this.firebase.db, path);
  }

  private objToArray<T>(obj: unknown, idField = 'id'): T[] {
    if (!obj || typeof obj !== 'object') return [];
    return Object.entries(obj as Record<string, unknown>).map(([key, val]) => ({
      [idField]: key,
      ...(val as Record<string, unknown>)
    })) as T[];
  }

  async getAllMovies(): Promise<Movie[]> {
    const snap = await get(this.dbRef('movies'));
    if (!snap.exists()) return [];
    return this.objToArray<Movie>(snap.val());
  }

  async getFeatured(): Promise<Movie[]> {
    const movies = await this.getAllMovies();
    const featured = movies.filter(m => m.featured);
    return featured.length > 0 ? featured.slice(0, 8) : movies.slice(0, 5);
  }

  async getSections(): Promise<MovieSection[]> {
    const movies = await this.getAllMovies();

    const byGenre = (genre: string) =>
      movies.filter(m => m.genres?.some((g: string) => g.toLowerCase() === genre.toLowerCase())).slice(0, 15);

    const byType = (type: string) =>
      movies.filter(m => m.type === type).slice(0, 15);

    const byViews = () =>
      [...movies].sort((a, b) => (b.views ?? 0) - (a.views ?? 0)).slice(0, 15);

    const byYear = () =>
      [...movies].sort((a, b) => b.year - a.year).slice(0, 15);

    const sections: MovieSection[] = [
      { title: 'Trending Now', slug: 'trending', movies: byViews() },
      { title: 'Action Movies', slug: 'action', movies: byGenre('Action') },
      { title: 'Horror Movies', slug: 'horror', movies: byGenre('Horror') },
      { title: 'Hot TV Shows', slug: 'tv-shows', movies: byType('tv') },
      { title: 'New Releases', slug: 'new-releases', movies: byYear() },
      { title: 'Drama Masterpieces', slug: 'drama', movies: byGenre('Drama') },
    ].filter(s => s.movies.length > 0);

    return sections;
  }

  async getMovieById(id: string | number): Promise<Movie | undefined> {
    const snap = await get(this.dbRef(`movies/${id}`));
    if (!snap.exists()) return undefined;
    return { id, ...snap.val() } as Movie;
  }

  async getMovies(): Promise<Movie[]> {
    const movies = await this.getAllMovies();
    return movies.filter(m => m.type === 'movie');
  }

  async getTvShows(): Promise<Movie[]> {
    const movies = await this.getAllMovies();
    return movies.filter(m => m.type === 'tv');
  }

  async search(query: string): Promise<Movie[]> {
    const movies = await this.getAllMovies();
    const lower = query.toLowerCase();
    return movies.filter(m =>
      m.title?.toLowerCase().includes(lower) ||
      m.genres?.some((g: string) => g.toLowerCase().includes(lower)) ||
      (m.vjName ?? '').toLowerCase().includes(lower)
    );
  }

  async addMovie(data: Partial<Movie>): Promise<string> {
    const newRef = await push(this.dbRef('movies'), {
      ...data,
      views: 0,
      createdAt: Date.now()
    });
    return newRef.key!;
  }

  async updateMovie(id: string | number, data: Partial<Movie>): Promise<void> {
    await update(this.dbRef(`movies/${id}`), data as Record<string, unknown>);
  }

  async deleteMovie(id: string | number): Promise<void> {
    await remove(this.dbRef(`movies/${id}`));
  }

  async incrementViews(id: string | number): Promise<void> {
    const snap = await get(this.dbRef(`movies/${id}/views`));
    const current = snap.exists() ? (snap.val() as number) : 0;
    await set(this.dbRef(`movies/${id}/views`), current + 1);
  }

  async getVJs(): Promise<VJ[]> {
    const snap = await get(this.dbRef('vjs'));
    if (!snap.exists()) return [];
    return this.objToArray<VJ>(snap.val());
  }

  async getUsers(): Promise<User[]> {
    const snap = await get(this.dbRef('users'));
    if (!snap.exists()) return [];
    return this.objToArray<User>(snap.val());
  }

  async updateUser(uid: string, data: Partial<User>): Promise<void> {
    await update(this.dbRef(`users/${uid}`), data as Record<string, unknown>);
  }

  async updateVJ(id: string | number, data: Partial<VJ>): Promise<void> {
    await update(this.dbRef(`vjs/${id}`), data as Record<string, unknown>);
  }

  async getTransactions(vjId?: string): Promise<Transaction[]> {
    const snap = await get(this.dbRef('transactions'));
    if (!snap.exists()) return [];
    let txs = this.objToArray<Transaction>(snap.val());
    if (vjId) txs = txs.filter(t => t.vjId === vjId);
    return txs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  async addTransaction(data: Partial<Transaction>): Promise<string> {
    const txRef = await push(this.dbRef('transactions'), {
      ...data,
      date: new Date().toISOString().split('T')[0]
    });
    return txRef.key!;
  }

  async updateTransaction(id: string | number, data: Partial<Transaction>): Promise<void> {
    await update(this.dbRef(`transactions/${id}`), data as Record<string, unknown>);
  }

  async getActivities(): Promise<Activity[]> {
    const snap = await get(this.dbRef('activities'));
    if (!snap.exists()) return [];
    const acts = this.objToArray<Activity>(snap.val());
    return acts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  async addActivity(data: Partial<Activity>): Promise<void> {
    await push(this.dbRef('activities'), {
      ...data,
      date: new Date().toISOString()
    });
  }

  async getHeroSlides(): Promise<HeroSlide[]> {
    const snap = await get(this.dbRef('heroSlides'));
    if (!snap.exists()) return [];
    return this.objToArray<HeroSlide>(snap.val());
  }

  async addHeroSlide(data: Partial<HeroSlide>): Promise<string> {
    const slideRef = await push(this.dbRef('heroSlides'), {
      ...data,
      active: true,
      createdAt: Date.now()
    });
    return slideRef.key!;
  }

  async updateHeroSlide(id: string | number, data: Partial<HeroSlide>): Promise<void> {
    await update(this.dbRef(`heroSlides/${id}`), data as Record<string, unknown>);
  }

  async deleteHeroSlide(id: string | number): Promise<void> {
    await remove(this.dbRef(`heroSlides/${id}`));
  }

  async getSeries(): Promise<Series[]> {
    const snap = await get(this.dbRef('series'));
    if (!snap.exists()) return [];
    const seriesList = this.objToArray<Series>(snap.val());
    return seriesList.map(s => ({
      ...s,
      episodes: s.episodes && !Array.isArray(s.episodes)
        ? Object.entries(s.episodes as unknown as Record<string, unknown>).map(([k, v]) => ({
            id: k,
            ...(v as Record<string, unknown>)
          })) as Episode[]
        : (Array.isArray(s.episodes) ? s.episodes : [])
    }));
  }

  async addSeries(data: Partial<Series>): Promise<string> {
    const seriesRef = await push(this.dbRef('series'), {
      ...data,
      episodes: {},
      createdAt: Date.now()
    });
    return seriesRef.key!;
  }

  async addEpisode(seriesId: string | number, data: Partial<Episode>): Promise<string> {
    const epRef = await push(this.dbRef(`series/${seriesId}/episodes`), data);
    return epRef.key!;
  }

  async getComments(movieId: string | number): Promise<AppComment[]> {
    const snap = await get(this.dbRef(`comments/${movieId}`));
    if (!snap.exists()) return [];
    const comments = this.objToArray<AppComment>(snap.val());
    return comments.sort((a, b) => b.createdAt - a.createdAt);
  }

  async addComment(movieId: string | number, data: Partial<AppComment>): Promise<void> {
    await push(this.dbRef(`comments/${movieId}`), {
      ...data,
      createdAt: Date.now()
    });
  }

  async getVJWallet(vjId: string): Promise<{ balance: number; totalEarned: number; totalWithdrawn: number; downloads: number }> {
    const snap = await get(this.dbRef(`wallets/${vjId}`));
    if (!snap.exists()) return { balance: 0, totalEarned: 0, totalWithdrawn: 0, downloads: 0 };
    return snap.val() as { balance: number; totalEarned: number; totalWithdrawn: number; downloads: number };
  }

  async updateVJWallet(vjId: string, data: Record<string, unknown>): Promise<void> {
    await update(this.dbRef(`wallets/${vjId}`), data);
  }
}
