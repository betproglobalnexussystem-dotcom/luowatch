import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase.service';
import {
  collection, doc, getDocs, getDoc, addDoc, setDoc, updateDoc, deleteDoc,
  query, where, orderBy, limit, increment, serverTimestamp, Firestore
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

  private tsToStr(ts: any): string {
    if (!ts) return '';
    if (ts?.toDate) return ts.toDate().toISOString().split('T')[0];
    if (typeof ts === 'string') return ts.split('T')[0];
    return '';
  }

  private tsToMs(ts: any): number {
    if (!ts) return 0;
    if (ts?.toMillis) return ts.toMillis();
    if (ts?.toDate) return ts.toDate().getTime();
    if (typeof ts === 'number') return ts;
    return 0;
  }

  private mapMovie(id: string, data: any): Movie {
    return {
      id,
      title: data.title || '',
      year: data.year ?? '',
      rating: data.rating ?? 0,
      genre: data.genre || (Array.isArray(data.genres) ? data.genres[0] || '' : (data.genres || '')),
      description: data.description || '',
      posterUrl: data.posterUrl || data.poster || '',
      backdrop: data.backdrop || data.posterUrl || data.poster || '',
      movieUrl: data.movieUrl || data.videoUrl || '',
      downloadUrl: data.downloadUrl || '',
      duration: data.duration || '',
      language: data.language || '',
      quality: data.quality || '',
      type: data.type === 'tv' ? 'series' : (data.type || 'movie'),
      vjName: data.vjName || '',
      vjId: data.vjId || '',
      views: data.views ?? 0,
      downloads: data.downloads ?? 0,
      featured: data.featured ?? false,
      createdAt: data.createdAt,
    } as Movie;
  }

  async getAllMovies(): Promise<Movie[]> {
    const q = query(this.col('movies'), orderBy('createdAt', 'desc'));
    const snap = await getDocs(q);
    return snap.docs.map(d => this.mapMovie(d.id, d.data()));
  }

  async getFeatured(): Promise<Movie[]> {
    const movies = await this.getAllMovies();
    const featured = movies.filter(m => m.featured);
    return featured.length > 0 ? featured.slice(0, 8) : movies.slice(0, 5);
  }

  async getSections(): Promise<MovieSection[]> {
    const movies = await this.getAllMovies();

    const byGenre = (genre: string) =>
      movies.filter(m => (m.genre || '').toLowerCase().includes(genre.toLowerCase())).slice(0, 15);

    const byType = (type: string) =>
      movies.filter(m => m.type === type).slice(0, 15);

    const byViews = () =>
      [...movies].sort((a, b) => (b.views ?? 0) - (a.views ?? 0)).slice(0, 15);

    const byYear = () =>
      [...movies].sort((a, b) => Number(b.year) - Number(a.year)).slice(0, 15);

    const sections: MovieSection[] = [
      { title: 'Trending Now', slug: 'trending', movies: byViews() },
      { title: 'Action Movies', slug: 'action', movies: byGenre('Action') },
      { title: 'Horror Movies', slug: 'horror', movies: byGenre('Horror') },
      { title: 'Hot TV Shows', slug: 'tv-shows', movies: byType('series') },
      { title: 'New Releases', slug: 'new-releases', movies: byYear() },
      { title: 'Drama Masterpieces', slug: 'drama', movies: byGenre('Drama') },
    ].filter(s => s.movies.length > 0);

    return sections;
  }

  async getMovieById(id: string | number): Promise<Movie | undefined> {
    const snap = await getDoc(this.docRef('movies', String(id)));
    if (!snap.exists()) return undefined;
    return this.mapMovie(snap.id, snap.data());
  }

  async getMovies(): Promise<Movie[]> {
    const movies = await this.getAllMovies();
    return movies.filter(m => m.type === 'movie');
  }

  async getTvShows(): Promise<Movie[]> {
    const movies = await this.getAllMovies();
    return movies.filter(m => m.type === 'series');
  }

  async search(term: string): Promise<Movie[]> {
    const movies = await this.getAllMovies();
    const lower = term.toLowerCase();
    return movies.filter(m =>
      m.title?.toLowerCase().includes(lower) ||
      (m.genre || '').toLowerCase().includes(lower) ||
      (m.vjName ?? '').toLowerCase().includes(lower) ||
      (m.description ?? '').toLowerCase().includes(lower)
    );
  }

  async addMovie(data: any): Promise<string> {
    const movieData = {
      title: data.title || '',
      year: String(data.year ?? new Date().getFullYear()),
      quality: data.quality || '',
      genre: Array.isArray(data.genres) ? (data.genres[0] || '') : (data.genre || ''),
      description: data.description || '',
      posterUrl: data.posterUrl || data.poster || '',
      movieUrl: data.movieUrl || data.videoUrl || '',
      downloadUrl: data.downloadUrl || '',
      views: data.views ?? 0,
      downloads: data.downloads ?? 0,
      featured: data.featured ?? false,
      type: data.type === 'tv' ? 'series' : (data.type || 'movie'),
      vjId: data.vjId || '',
      vjName: data.vjName || '',
      createdAt: serverTimestamp(),
    };
    const ref = await addDoc(this.col('movies'), movieData);
    return ref.id;
  }

  async updateMovie(id: string | number, data: any): Promise<void> {
    const update: any = { ...data };
    if (Array.isArray(update.genres)) {
      update.genre = update.genres[0] || '';
      delete update.genres;
    }
    if (update.poster) { update.posterUrl = update.poster; delete update.poster; }
    if (update.videoUrl) { update.movieUrl = update.videoUrl; delete update.videoUrl; }
    await updateDoc(this.docRef('movies', String(id)), update);
  }

  async deleteMovie(id: string | number): Promise<void> {
    await deleteDoc(this.docRef('movies', String(id)));
  }

  async incrementViews(id: string | number): Promise<void> {
    await updateDoc(this.docRef('movies', String(id)), { views: increment(1) });
  }

  async incrementDownloads(id: string | number): Promise<void> {
    await updateDoc(this.docRef('movies', String(id)), { downloads: increment(1) });
  }

  async getVJs(): Promise<VJ[]> {
    const [profileSnap, moviesSnap] = await Promise.all([
      getDocs(query(this.col('profiles'), where('role', '==', 'vj'))),
      getDocs(this.col('movies')),
    ]);
    const allMovies = moviesSnap.docs.map(d => ({ id: d.id, ...d.data() })) as any[];
    return profileSnap.docs.map(d => {
      const p = d.data() as any;
      const vjMovies = allMovies.filter(m => m.vjId === d.id);
      const totalViews = vjMovies.reduce((sum: number, m: any) => sum + (m.views || 0), 0);
      return {
        id: d.id,
        name: `${p.firstName || ''} ${p.lastName || ''}`.trim() || p.email || 'VJ',
        email: p.email || '',
        uid: d.id,
        joinDate: this.tsToStr(p.createdAt) || new Date().toISOString().split('T')[0],
        totalMovies: vjMovies.length,
        totalViews,
        downloads: vjMovies.reduce((sum: number, m: any) => sum + (m.downloads || 0), 0),
        balance: p.balance ?? 0,
        status: (p.status as 'active' | 'suspended') || 'active',
      } as VJ;
    });
  }

  async getUsers(): Promise<User[]> {
    const snap = await getDocs(this.col('profiles'));
    return snap.docs.map(d => {
      const p = d.data() as any;
      return {
        id: d.id,
        name: `${p.firstName || ''} ${p.lastName || ''}`.trim() || p.email || 'User',
        email: p.email || '',
        joinDate: this.tsToStr(p.createdAt) || '',
        lastSeen: p.lastSeen || '',
        watchCount: p.watchCount || 0,
        status: (p.status as 'active' | 'banned') || 'active',
        plan: p.plan || 'none',
        role: p.role || 'viewer',
      } as User;
    });
  }

  async updateUser(uid: string, data: Partial<User>): Promise<void> {
    await updateDoc(this.docRef('profiles', uid), data as any);
  }

  async updateVJ(id: string | number, data: Partial<VJ>): Promise<void> {
    await updateDoc(this.docRef('profiles', String(id)), data as any);
  }

  async getTransactions(vjId?: string): Promise<Transaction[]> {
    const snap = await getDocs(this.col('transactions'));
    let txs = snap.docs.map(d => {
      const t = d.data() as any;
      return {
        id: d.id,
        date: t.date || this.tsToStr(t.createdAt) || new Date().toISOString().split('T')[0],
        type: t.type || 'system',
        amount: t.amount || 0,
        description: t.description || '',
        status: t.status || 'completed',
        from: t.from || '',
        vjId: t.vjId || '',
      } as Transaction;
    });
    if (vjId) txs = txs.filter(t => t.vjId === vjId);
    return txs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  async addTransaction(data: any): Promise<string> {
    const ref = await addDoc(this.col('transactions'), {
      ...data,
      date: data.date || new Date().toISOString().split('T')[0],
      createdAt: serverTimestamp(),
    });
    return ref.id;
  }

  async updateTransaction(id: string | number, data: any): Promise<void> {
    await updateDoc(this.docRef('transactions', String(id)), data);
  }

  async getActivities(): Promise<Activity[]> {
    const q = query(this.col('activities'), orderBy('createdAt', 'desc'), limit(50));
    const snap = await getDocs(q);
    return snap.docs.map(d => {
      const a = d.data() as any;
      return {
        id: d.id,
        type: a.type || 'view',
        contentType: a.contentType || 'movie',
        contentId: a.contentId || '',
        contentTitle: a.contentTitle || a.target || '',
        userId: a.userId || '',
        userName: a.userName || '',
        createdAt: a.createdAt,
      } as Activity;
    });
  }

  async addActivity(data: any): Promise<void> {
    await addDoc(this.col('activities'), {
      type: data.type || 'view',
      contentType: data.contentType || 'movie',
      contentId: data.contentId || '',
      contentTitle: data.contentTitle || data.target || '',
      userId: data.userId || '',
      userName: data.userName || '',
      createdAt: serverTimestamp(),
    });
  }

  async getHeroSlides(): Promise<HeroSlide[]> {
    const snap = await getDocs(this.col('heroSlides'));
    return snap.docs.map(d => ({ id: d.id, ...d.data() })) as HeroSlide[];
  }

  async addHeroSlide(data: Partial<HeroSlide>): Promise<string> {
    const ref = await addDoc(this.col('heroSlides'), {
      ...data,
      active: true,
      createdAt: Date.now(),
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
    const q = query(this.col('movies'), where('type', '==', 'series'), orderBy('createdAt', 'desc'));
    const snap = await getDocs(q);
    const seriesList = snap.docs.map(d => {
      const data = d.data() as any;
      return {
        id: d.id,
        title: data.title || '',
        year: data.year ?? '',
        genre: data.genre || '',
        description: data.description || '',
        posterUrl: data.posterUrl || data.poster || '',
        backdrop: data.backdrop || data.posterUrl || '',
        vjName: data.vjName || '',
        vjId: data.vjId || '',
        episodes: [],
        createdAt: data.createdAt,
      } as Series;
    });

    const withEpisodes = await Promise.all(
      seriesList.map(async s => {
        const epQ = query(
          this.col('episodes'),
          where('movieId', '==', String(s.id))
        );
        const epSnap = await getDocs(epQ);
        const episodes: Episode[] = epSnap.docs.sort((a, b) => {
          const ad = a.data() as any;
          const bd = b.data() as any;
          return (ad.season + ad.episode).localeCompare(bd.season + bd.episode);
        }).map(d => {
          const ep = d.data() as any;
          return {
            id: d.id,
            movieId: ep.movieId || String(s.id),
            seriesTitle: ep.seriesTitle || s.title,
            season: ep.season || 'S01',
            episode: ep.episode || 'E01',
            episodeTitle: ep.episodeTitle || ep.title || '',
            episodeUrl: ep.episodeUrl || ep.videoUrl || '',
            vjId: ep.vjId || '',
            duration: ep.duration || '',
            quality: ep.quality || '',
            createdAt: ep.createdAt,
          } as Episode;
        });
        return { ...s, episodes };
      })
    );
    return withEpisodes;
  }

  async addSeries(data: any): Promise<string> {
    const seriesData = {
      title: data.title || '',
      year: String(data.year ?? new Date().getFullYear()),
      genre: Array.isArray(data.genres) ? (data.genres[0] || '') : (data.genre || ''),
      description: data.description || '',
      posterUrl: data.posterUrl || data.poster || '',
      movieUrl: '',
      downloadUrl: '',
      type: 'series',
      vjId: data.vjId || '',
      vjName: data.vjName || '',
      featured: false,
      views: 0,
      downloads: 0,
      createdAt: serverTimestamp(),
    };
    const ref = await addDoc(this.col('movies'), seriesData);
    return ref.id;
  }

  async addEpisode(movieId: string | number, data: any): Promise<string> {
    const season = typeof data.season === 'number'
      ? `S${String(data.season).padStart(2, '0')}`
      : (data.season || 'S01');
    const episode = typeof data.episode === 'number'
      ? `E${String(data.episode).padStart(2, '0')}`
      : (data.episode || 'E01');
    const episodeData = {
      movieId: String(movieId),
      seriesTitle: data.seriesTitle || '',
      season,
      episode,
      episodeTitle: data.episodeTitle || data.title || '',
      episodeUrl: data.episodeUrl || data.videoUrl || '',
      vjId: data.vjId || '',
      createdAt: serverTimestamp(),
    };
    const ref = await addDoc(this.col('episodes'), episodeData);
    return ref.id;
  }

  async getEpisodes(movieId: string | number): Promise<Episode[]> {
    const q = query(
      this.col('episodes'),
      where('movieId', '==', String(movieId))
    );
    const snap = await getDocs(q);
    return snap.docs.sort((a, b) => {
      const ad = a.data() as any;
      const bd = b.data() as any;
      return (ad.season + ad.episode).localeCompare(bd.season + bd.episode);
    }).map(d => {
      const ep = d.data() as any;
      return {
        id: d.id,
        movieId: ep.movieId || String(movieId),
        seriesTitle: ep.seriesTitle || '',
        season: ep.season || 'S01',
        episode: ep.episode || 'E01',
        episodeTitle: ep.episodeTitle || ep.title || '',
        episodeUrl: ep.episodeUrl || ep.videoUrl || '',
        vjId: ep.vjId || '',
        duration: ep.duration || '',
        quality: ep.quality || '',
        createdAt: ep.createdAt,
      } as Episode;
    });
  }

  async getComments(contentId: string | number, contentType: 'movie' | 'music' | 'tiktok' | 'channel' = 'movie'): Promise<AppComment[]> {
    const q = query(
      this.col('comments'),
      where('contentId', '==', String(contentId)),
      where('contentType', '==', contentType)
    );
    const snap = await getDocs(q);
    return snap.docs.sort((a, b) => {
      const at = this.tsToMs((a.data() as any).createdAt);
      const bt = this.tsToMs((b.data() as any).createdAt);
      return bt - at;
    }).map(d => {
      const c = d.data() as any;
      return {
        id: d.id,
        contentId: c.contentId || String(contentId),
        contentType: c.contentType || contentType,
        userId: c.userId || c.uid || '',
        userName: c.userName || c.name || 'Anonymous',
        text: c.text || '',
        likes: c.likes || 0,
        createdAt: c.createdAt,
      } as AppComment;
    });
  }

  async addComment(contentId: string | number, data: any): Promise<void> {
    await addDoc(this.col('comments'), {
      contentId: String(contentId),
      contentType: data.contentType || 'movie',
      userId: data.userId || data.uid || '',
      userName: data.userName || data.name || 'Anonymous',
      text: data.text || '',
      likes: 0,
      createdAt: serverTimestamp(),
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
