import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase.service';
import {
  collection, doc, getDocs, getDoc, addDoc, setDoc, updateDoc, deleteDoc,
  query, where, orderBy, increment, Firestore
} from 'firebase/firestore';
import { Movie, MovieSection, Series, Episode, VJ, User, Transaction, Activity, HeroSlide, AppComment } from '../models/movie.model';

@Injectable({ providedIn: 'root' })
export class MovieService {
  private db: Firestore;

  constructor(private firebase: FirebaseService) {
    this.db = this.firebase.db;
  }

  private col(path: string) {
    return collection(this.db, path);
  }

  private docRef(path: string, id: string) {
    return doc(this.db, path, id);
  }

  private snapToArray<T>(snap: { docs: any[] }, idField = 'id'): T[] {
    return snap.docs.map(d => ({ [idField]: d.id, ...d.data() })) as T[];
  }

  async getAllMovies(): Promise<Movie[]> {
    const snap = await getDocs(this.col('movies'));
    return this.snapToArray<Movie>(snap);
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
    const snap = await getDoc(this.docRef('movies', String(id)));
    if (!snap.exists()) return undefined;
    return { id: snap.id, ...snap.data() } as Movie;
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
    const ref = await addDoc(this.col('movies'), {
      ...data,
      views: 0,
      createdAt: Date.now()
    });
    return ref.id;
  }

  async updateMovie(id: string | number, data: Partial<Movie>): Promise<void> {
    await updateDoc(this.docRef('movies', String(id)), data as any);
  }

  async deleteMovie(id: string | number): Promise<void> {
    await deleteDoc(this.docRef('movies', String(id)));
  }

  async incrementViews(id: string | number): Promise<void> {
    await updateDoc(this.docRef('movies', String(id)), { views: increment(1) });
  }

  async getVJs(): Promise<VJ[]> {
    const snap = await getDocs(this.col('vjs'));
    return this.snapToArray<VJ>(snap);
  }

  async getUsers(): Promise<User[]> {
    const snap = await getDocs(this.col('users'));
    return this.snapToArray<User>(snap);
  }

  async updateUser(uid: string, data: Partial<User>): Promise<void> {
    await updateDoc(this.docRef('users', uid), data as any);
  }

  async updateVJ(id: string | number, data: Partial<VJ>): Promise<void> {
    await updateDoc(this.docRef('vjs', String(id)), data as any);
  }

  async getTransactions(vjId?: string): Promise<Transaction[]> {
    const snap = await getDocs(this.col('transactions'));
    let txs = this.snapToArray<Transaction>(snap);
    if (vjId) txs = txs.filter(t => t.vjId === vjId);
    return txs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  async addTransaction(data: Partial<Transaction>): Promise<string> {
    const ref = await addDoc(this.col('transactions'), {
      ...data,
      date: new Date().toISOString().split('T')[0]
    });
    return ref.id;
  }

  async updateTransaction(id: string | number, data: Partial<Transaction>): Promise<void> {
    await updateDoc(this.docRef('transactions', String(id)), data as any);
  }

  async getActivities(): Promise<Activity[]> {
    const snap = await getDocs(this.col('activities'));
    const acts = this.snapToArray<Activity>(snap);
    return acts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  async addActivity(data: Partial<Activity>): Promise<void> {
    await addDoc(this.col('activities'), {
      ...data,
      date: new Date().toISOString()
    });
  }

  async getHeroSlides(): Promise<HeroSlide[]> {
    const snap = await getDocs(this.col('heroSlides'));
    return this.snapToArray<HeroSlide>(snap);
  }

  async addHeroSlide(data: Partial<HeroSlide>): Promise<string> {
    const ref = await addDoc(this.col('heroSlides'), {
      ...data,
      active: true,
      createdAt: Date.now()
    });
    return ref.id;
  }

  async updateHeroSlide(id: string | number, data: Partial<HeroSlide>): Promise<void> {
    await updateDoc(this.docRef('heroSlides', String(id)), data as any);
  }

  async deleteHeroSlide(id: string | number): Promise<void> {
    await deleteDoc(this.docRef('heroSlides', String(id)));
  }

  async getSeries(): Promise<Series[]> {
    const snap = await getDocs(this.col('series'));
    const seriesList = this.snapToArray<Series>(snap);
    const withEpisodes = await Promise.all(
      seriesList.map(async s => {
        const epSnap = await getDocs(collection(this.db, `series/${s.id}/episodes`));
        const episodes = epSnap.docs.map(d => ({ id: d.id, ...d.data() })) as Episode[];
        return { ...s, episodes: episodes.length > 0 ? episodes : (Array.isArray(s.episodes) ? s.episodes : []) };
      })
    );
    return withEpisodes;
  }

  async addSeries(data: Partial<Series>): Promise<string> {
    const ref = await addDoc(this.col('series'), {
      ...data,
      createdAt: Date.now()
    });
    return ref.id;
  }

  async addEpisode(seriesId: string | number, data: Partial<Episode>): Promise<string> {
    const ref = await addDoc(collection(this.db, `series/${seriesId}/episodes`), data);
    return ref.id;
  }

  async getComments(movieId: string | number): Promise<AppComment[]> {
    const q = query(this.col('comments'), where('movieId', '==', String(movieId)));
    const snap = await getDocs(q);
    const comments = snap.docs.map(d => ({ id: d.id, ...d.data() })) as AppComment[];
    return comments.sort((a, b) => b.createdAt - a.createdAt);
  }

  async addComment(movieId: string | number, data: Partial<AppComment>): Promise<void> {
    await addDoc(this.col('comments'), {
      ...data,
      movieId: String(movieId),
      createdAt: Date.now()
    });
  }

  async getVJWallet(vjId: string): Promise<{ balance: number; totalEarned: number; totalWithdrawn: number; downloads: number }> {
    const snap = await getDoc(this.docRef('wallets', vjId));
    if (!snap.exists()) return { balance: 0, totalEarned: 0, totalWithdrawn: 0, downloads: 0 };
    return snap.data() as { balance: number; totalEarned: number; totalWithdrawn: number; downloads: number };
  }

  async updateVJWallet(vjId: string, data: Record<string, unknown>): Promise<void> {
    await setDoc(this.docRef('wallets', vjId), data, { merge: true });
  }
}
