import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { Movie, Series, Transaction, Activity, HeroSlide } from '../../models/movie.model';

type VJSection = 'overview' | 'my-movies' | 'upload-movie' | 'series' | 'add-series' | 'add-episode' | 'users' | 'hero-slides' | 'activities' | 'wallet' | 'transactions';

@Component({
  selector: 'app-vj-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="vj-shell">
      <aside class="vj-sidebar" [class.open]="sidebarOpen()">
        <div class="sidebar-brand">
          <a routerLink="/" class="brand-logo">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="url(#vg)"/><polygon points="9 7 17 12 9 17" fill="white"/><defs><linearGradient id="vg" x1="0" y1="0" x2="24" y2="24"><stop stop-color="#FF271C"/><stop offset="1" stop-color="#F5852F"/></linearGradient></defs></svg>
            <span>LUO WATCH</span>
          </a>
          <button class="sidebar-close" (click)="sidebarOpen.set(false)">✕</button>
        </div>
        <div class="sidebar-user">
          <div class="su-avatar">{{ vjName[0] }}</div>
          <div class="su-info">
            <div class="su-name">{{ vjName }}</div>
            <div class="su-role">VJ Creator</div>
          </div>
        </div>
        <nav class="sidebar-nav">
          @for(item of navItems; track item.id) {
            <button
              class="nav-item"
              [class.active]="activeSection() === item.id"
              (click)="navigate(item.id)"
            >
              <span class="nav-icon" [innerHTML]="item.icon"></span>
              <span>{{ item.label }}</span>
            </button>
          }
        </nav>
        <div class="sidebar-footer">
          <a routerLink="/" class="nav-item">
            <span class="nav-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
            </span>
            <span>Back to Site</span>
          </a>
        </div>
      </aside>

      <div class="vj-main">
        <header class="vj-header">
          <button class="menu-toggle" (click)="sidebarOpen.set(!sidebarOpen())">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          </button>
          <div class="header-title">{{ currentNavLabel() }}</div>
          <div class="header-right">
            <div class="header-wallet">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
              {{ '$' + (walletBalance | number:'1.2-2') }}
            </div>
          </div>
        </header>

        <div class="vj-content">

          @if(activeSection() === 'overview') {
            <div class="section-body">
              <div class="stats-grid">
                @for(stat of stats; track stat.label) {
                  <div class="stat-card">
                    <div class="stat-icon" [style.background]="stat.color" [innerHTML]="stat.icon"></div>
                    <div class="stat-info">
                      <div class="stat-value">{{ stat.value }}</div>
                      <div class="stat-label">{{ stat.label }}</div>
                    </div>
                  </div>
                }
              </div>
              <div class="overview-grid">
                <div class="ov-card">
                  <h3>Recent Uploads</h3>
                  <div class="mini-list">
                    @for(m of myMovies.slice(0,5); track m.id) {
                      <div class="mini-item">
                        <img [src]="m.poster" [alt]="m.title" class="mini-poster" (error)="onImgError($event)">
                        <div class="mini-info">
                          <div class="mini-title">{{ m.title }}</div>
                          <div class="mini-meta">{{ m.year }} · {{ m.quality }}</div>
                        </div>
                        <span class="status-pill active">Live</span>
                      </div>
                    }
                  </div>
                </div>
                <div class="ov-card">
                  <h3>Recent Transactions</h3>
                  <div class="mini-list">
                    @for(t of myTransactions.slice(0,5); track t.id) {
                      <div class="mini-item">
                        <div class="tx-icon" [class]="t.type">
                          @if(t.type === 'earning') { + }
                          @else { - }
                        </div>
                        <div class="mini-info">
                          <div class="mini-title">{{ t.description }}</div>
                          <div class="mini-meta">{{ t.date }}</div>
                        </div>
                        <span class="tx-amount" [class]="t.type">{{ '$' + (t.amount | number:'1.2-2') }}</span>
                      </div>
                    }
                  </div>
                </div>
              </div>
            </div>
          }

          @if(activeSection() === 'my-movies') {
            <div class="section-body">
              <div class="section-header-row">
                <h2>My Movies</h2>
                <button class="btn-primary" (click)="navigate('upload-movie')">+ Upload Movie</button>
              </div>
              <div class="table-wrap">
                <table class="data-table">
                  <thead><tr><th>Poster</th><th>Title</th><th>Year</th><th>Quality</th><th>Views</th><th>Status</th></tr></thead>
                  <tbody>
                    @for(m of myMovies; track m.id) {
                      <tr>
                        <td><img [src]="m.poster" class="table-poster" (error)="onImgError($event)"></td>
                        <td class="fw">{{ m.title }}</td>
                        <td>{{ m.year }}</td>
                        <td><span class="quality-tag">{{ m.quality }}</span></td>
                        <td>{{ (m.views || 0) | number }}</td>
                        <td><span class="status-pill active">Live</span></td>
                      </tr>
                    }
                  </tbody>
                </table>
              </div>
            </div>
          }

          @if(activeSection() === 'upload-movie') {
            <div class="section-body">
              <h2>Upload Movie</h2>
              <div class="form-card">
                <div class="form-grid">
                  <div class="form-group full">
                    <label>Movie Title</label>
                    <input type="text" [(ngModel)]="uploadForm.title" placeholder="Enter movie title" class="form-input">
                  </div>
                  <div class="form-group">
                    <label>Year</label>
                    <input type="number" [(ngModel)]="uploadForm.year" placeholder="2024" class="form-input">
                  </div>
                  <div class="form-group">
                    <label>Quality</label>
                    <select [(ngModel)]="uploadForm.quality" class="form-input">
                      <option value="">Select quality</option>
                      <option>HD</option><option>Full HD</option><option>4K</option><option>CAM</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label>Genre</label>
                    <input type="text" [(ngModel)]="uploadForm.genre" placeholder="Action, Drama..." class="form-input">
                  </div>
                  <div class="form-group">
                    <label>Duration</label>
                    <input type="text" [(ngModel)]="uploadForm.duration" placeholder="2h 30m" class="form-input">
                  </div>
                  <div class="form-group">
                    <label>Language</label>
                    <input type="text" [(ngModel)]="uploadForm.language" placeholder="English" class="form-input">
                  </div>
                  <div class="form-group">
                    <label>Type</label>
                    <select [(ngModel)]="uploadForm.type" class="form-input">
                      <option value="movie">Movie</option>
                      <option value="tv">TV Show</option>
                    </select>
                  </div>
                  <div class="form-group full">
                    <label>Description</label>
                    <textarea [(ngModel)]="uploadForm.description" placeholder="Movie description..." class="form-input form-textarea"></textarea>
                  </div>
                  <div class="form-group full">
                    <label>Movie Poster URL</label>
                    <input type="url" [(ngModel)]="uploadForm.posterUrl" placeholder="https://..." class="form-input">
                  </div>
                  <div class="form-group full">
                    <label>Backdrop Image URL</label>
                    <input type="url" [(ngModel)]="uploadForm.backdropUrl" placeholder="https://..." class="form-input">
                  </div>
                  <div class="form-group full">
                    <label>Video File</label>
                    <div class="upload-zone">
                      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="1.5"><polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/></svg>
                      <p>Drag & drop video file or <span class="upload-browse">browse</span></p>
                      <p class="upload-hint">Supported: MP4, MKV, AVI (Max 5GB)</p>
                    </div>
                  </div>
                </div>
                <div class="form-actions">
                  <button class="btn-secondary" (click)="resetForm()">Reset</button>
                  <button class="btn-primary" (click)="submitMovie()">
                    @if(uploadLoading()) { <span class="spinner"></span> Uploading... }
                    @else { Upload Movie }
                  </button>
                </div>
                @if(uploadSuccess()) {
                  <div class="success-msg">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
                    Movie uploaded successfully!
                  </div>
                }
              </div>
            </div>
          }

          @if(activeSection() === 'series') {
            <div class="section-body">
              <div class="section-header-row">
                <h2>My Series</h2>
                <button class="btn-primary" (click)="navigate('add-series')">+ Add Series</button>
              </div>
              <div class="series-grid">
                @for(s of mySeries; track s.id) {
                  <div class="series-card">
                    <img [src]="s.poster" [alt]="s.title" class="series-thumb" (error)="onImgError($event)">
                    <div class="series-info">
                      <div class="series-title">{{ s.title }}</div>
                      <div class="series-meta">{{ s.year }} · {{ s.episodes.length }} episodes</div>
                      <div class="series-genres">{{ s.genres.join(', ') }}</div>
                    </div>
                    <button class="btn-sm" (click)="selectSeries(s); navigate('add-episode')">+ Episode</button>
                  </div>
                }
              </div>
            </div>
          }

          @if(activeSection() === 'add-series') {
            <div class="section-body">
              <h2>Add New Series</h2>
              <div class="form-card">
                <div class="form-grid">
                  <div class="form-group full">
                    <label>Series Title</label>
                    <input type="text" [(ngModel)]="seriesForm.title" placeholder="Series title" class="form-input">
                  </div>
                  <div class="form-group">
                    <label>Year</label>
                    <input type="number" [(ngModel)]="seriesForm.year" placeholder="2024" class="form-input">
                  </div>
                  <div class="form-group">
                    <label>Genres</label>
                    <input type="text" [(ngModel)]="seriesForm.genres" placeholder="Drama, Sci-Fi..." class="form-input">
                  </div>
                  <div class="form-group full">
                    <label>Description</label>
                    <textarea [(ngModel)]="seriesForm.description" placeholder="Series description..." class="form-input form-textarea"></textarea>
                  </div>
                  <div class="form-group full">
                    <label>Poster URL</label>
                    <input type="url" [(ngModel)]="seriesForm.posterUrl" placeholder="https://..." class="form-input">
                  </div>
                </div>
                <div class="form-actions">
                  <button class="btn-secondary" (click)="navigate('series')">Cancel</button>
                  <button class="btn-primary" (click)="submitSeries()">Create Series</button>
                </div>
                @if(seriesSuccess()) {
                  <div class="success-msg">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
                    Series created! Now you can add episodes.
                  </div>
                }
              </div>
            </div>
          }

          @if(activeSection() === 'add-episode') {
            <div class="section-body">
              <h2>Add Episode</h2>
              <div class="form-card">
                <div class="form-group" style="margin-bottom:20px">
                  <label>Select Series</label>
                  <select [(ngModel)]="episodeForm.seriesId" class="form-input">
                    <option value="">Select a series</option>
                    @for(s of mySeries; track s.id) {
                      <option [value]="s.id">{{ s.title }}</option>
                    }
                  </select>
                </div>
                <div class="form-grid">
                  <div class="form-group full">
                    <label>Episode Title</label>
                    <input type="text" [(ngModel)]="episodeForm.title" placeholder="Episode title" class="form-input">
                  </div>
                  <div class="form-group">
                    <label>Season</label>
                    <input type="number" [(ngModel)]="episodeForm.season" placeholder="1" class="form-input">
                  </div>
                  <div class="form-group">
                    <label>Episode Number</label>
                    <input type="number" [(ngModel)]="episodeForm.episode" placeholder="1" class="form-input">
                  </div>
                  <div class="form-group">
                    <label>Duration</label>
                    <input type="text" [(ngModel)]="episodeForm.duration" placeholder="45m" class="form-input">
                  </div>
                  <div class="form-group">
                    <label>Quality</label>
                    <select [(ngModel)]="episodeForm.quality" class="form-input">
                      <option value="">Select quality</option>
                      <option>HD</option><option>Full HD</option><option>4K</option>
                    </select>
                  </div>
                  <div class="form-group full">
                    <label>Video File</label>
                    <div class="upload-zone">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="1.5"><polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/></svg>
                      <p>Drop video file or <span class="upload-browse">browse</span></p>
                    </div>
                  </div>
                </div>
                <div class="form-actions">
                  <button class="btn-secondary" (click)="navigate('series')">Cancel</button>
                  <button class="btn-primary" (click)="submitEpisode()">Add Episode</button>
                </div>
                @if(episodeSuccess()) {
                  <div class="success-msg">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
                    Episode added successfully!
                  </div>
                }
              </div>
            </div>
          }

          @if(activeSection() === 'users') {
            <div class="section-body">
              <h2>Users</h2>
              <div class="info-banner">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                Showing users who have watched your content
              </div>
              <div class="table-wrap">
                <table class="data-table">
                  <thead><tr><th>#</th><th>Name</th><th>Email</th><th>Joined</th><th>Watches</th><th>Status</th></tr></thead>
                  <tbody>
                    @for(u of users; track u.id; let i = $index) {
                      <tr>
                        <td>{{ i + 1 }}</td>
                        <td class="fw">{{ u.name }}</td>
                        <td>{{ u.email }}</td>
                        <td>{{ u.joinDate }}</td>
                        <td>{{ u.watchCount }}</td>
                        <td><span class="status-pill" [class]="u.status">{{ u.status }}</span></td>
                      </tr>
                    }
                  </tbody>
                </table>
              </div>
            </div>
          }

          @if(activeSection() === 'hero-slides') {
            <div class="section-body">
              <div class="section-header-row">
                <h2>Hero Slides</h2>
              </div>
              <div class="form-card" style="margin-bottom:24px">
                <h3 style="color:#fff;font-size:15px;font-weight:700;margin-bottom:16px">Upload New Hero Slide</h3>
                <div class="form-grid">
                  <div class="form-group">
                    <label>Select Movie</label>
                    <select [(ngModel)]="heroForm.movieId" class="form-input">
                      <option value="">Select movie</option>
                      @for(m of myMovies; track m.id) {
                        <option [value]="m.id">{{ m.title }}</option>
                      }
                    </select>
                  </div>
                  <div class="form-group">
                    <label>Slide Image URL</label>
                    <input type="url" [(ngModel)]="heroForm.imageUrl" placeholder="https://..." class="form-input">
                  </div>
                </div>
                <div class="form-actions">
                  <button class="btn-primary" (click)="submitHeroSlide()">Submit for Review</button>
                </div>
                @if(heroSuccess()) {
                  <div class="success-msg">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
                    Hero slide submitted for admin review!
                  </div>
                }
              </div>
              <div class="slides-grid">
                @for(slide of heroSlides; track slide.id) {
                  <div class="slide-card">
                    <div class="slide-img" [style.background-image]="'url(' + slide.imageUrl + ')'"></div>
                    <div class="slide-info">
                      <div class="slide-title">{{ slide.title }}</div>
                      <span class="status-pill" [class]="slide.active ? 'active' : 'inactive'">{{ slide.active ? 'Active' : 'Inactive' }}</span>
                    </div>
                  </div>
                }
              </div>
            </div>
          }

          @if(activeSection() === 'activities') {
            <div class="section-body">
              <h2>User Activities</h2>
              <div class="activity-list">
                @for(a of activities; track a.id) {
                  <div class="activity-item">
                    <div class="act-avatar">{{ a.userName[0] }}</div>
                    <div class="act-body">
                      <span class="act-user">{{ a.userName }}</span>
                      <span class="act-action">{{ a.action }}</span>
                      <span class="act-target">{{ a.target }}</span>
                    </div>
                    <span class="act-time">{{ a.date }}</span>
                  </div>
                }
              </div>
            </div>
          }

          @if(activeSection() === 'wallet') {
            <div class="section-body">
              <h2>Wallet</h2>
              <div class="wallet-hero">
                <div class="wallet-bal-label">Available Balance</div>
                <div class="wallet-bal">{{ '$' + (walletBalance | number:'1.2-2') }}</div>
                <div class="wallet-bal-sub">Total earned: {{ '$' + (totalEarned | number:'1.2-2') }}</div>
              </div>
              <div class="wallet-grid">
                <div class="form-card">
                  <h3>Withdraw Funds</h3>
                  <div class="form-group">
                    <label>Amount ($)</label>
                    <input type="number" [(ngModel)]="withdrawForm.amount" placeholder="Enter amount" class="form-input">
                  </div>
                  <div class="form-group">
                    <label>Payment Method</label>
                    <select [(ngModel)]="withdrawForm.method" class="form-input">
                      <option value="">Select method</option>
                      <option>Bank Transfer</option>
                      <option>PayPal</option>
                      <option>Payoneer</option>
                      <option>Crypto (USDT)</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label>Account Details</label>
                    <input type="text" [(ngModel)]="withdrawForm.account" placeholder="Bank/Account number" class="form-input">
                  </div>
                  <div class="form-actions">
                    <button class="btn-primary" (click)="requestWithdraw()">Request Withdrawal</button>
                  </div>
                  @if(withdrawSuccess()) {
                    <div class="success-msg">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
                      Withdrawal request submitted!
                    </div>
                  }
                </div>
                <div class="wallet-stats-col">
                  <div class="wallet-stat-card">
                    <div class="ws-icon green">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                    </div>
                    <div>
                      <div class="ws-val">{{ '$' + (totalEarned | number:'1.2-2') }}</div>
                      <div class="ws-lbl">Total Earned</div>
                    </div>
                  </div>
                  <div class="wallet-stat-card">
                    <div class="ws-icon orange">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                    </div>
                    <div>
                      <div class="ws-val">$500.00</div>
                      <div class="ws-lbl">Total Withdrawn</div>
                    </div>
                  </div>
                  <div class="wallet-stat-card">
                    <div class="ws-icon blue">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
                    </div>
                    <div>
                      <div class="ws-val">{{ '$' + (walletBalance | number:'1.2-2') }}</div>
                      <div class="ws-lbl">Available</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          }

          @if(activeSection() === 'transactions') {
            <div class="section-body">
              <h2>Transactions</h2>
              <div class="table-wrap">
                <table class="data-table">
                  <thead><tr><th>Date</th><th>Description</th><th>Type</th><th>Amount</th><th>Status</th></tr></thead>
                  <tbody>
                    @for(t of myTransactions; track t.id) {
                      <tr>
                        <td>{{ t.date }}</td>
                        <td class="fw">{{ t.description }}</td>
                        <td><span class="type-badge" [class]="t.type">{{ t.type }}</span></td>
                        <td class="amount" [class]="t.type">{{ '$' + (t.amount | number:'1.2-2') }}</td>
                        <td><span class="status-pill" [class]="t.status">{{ t.status }}</span></td>
                      </tr>
                    }
                  </tbody>
                </table>
              </div>
            </div>
          }

        </div>
      </div>

      @if(sidebarOpen()) {
        <div class="sidebar-backdrop" (click)="sidebarOpen.set(false)"></div>
      }
    </div>
  `,
  styleUrl: './vj-dashboard.component.css'
})
export class VjDashboardComponent {
  activeSection = signal<VJSection>('overview');
  sidebarOpen = signal(false);
  uploadLoading = signal(false);
  uploadSuccess = signal(false);
  seriesSuccess = signal(false);
  episodeSuccess = signal(false);
  heroSuccess = signal(false);
  withdrawSuccess = signal(false);

  vjName = 'CineVault';
  walletBalance = 1240.50;
  totalEarned = 1740.50;

  myMovies: Movie[] = [];
  mySeries: Series[] = [];
  users: any[] = [];
  myTransactions: Transaction[] = [];
  activities: Activity[] = [];
  heroSlides: HeroSlide[] = [];

  selectedSeries: Series | null = null;

  uploadForm = { title: '', year: 2024, quality: '', genre: '', duration: '', language: 'English', type: 'movie', description: '', posterUrl: '', backdropUrl: '' };
  seriesForm = { title: '', year: 2024, genres: '', description: '', posterUrl: '' };
  episodeForm = { seriesId: '', title: '', season: 1, episode: 1, duration: '', quality: '' };
  heroForm = { movieId: '', imageUrl: '' };
  withdrawForm = { amount: 0, method: '', account: '' };

  stats = [
    { label: 'Total Movies', value: '42', color: 'rgba(255,39,28,0.15)', icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FF6B5B" stroke-width="2"><rect x="2" y="7" width="20" height="15" rx="2"/><polyline points="16 2 12 7 8 2"/></svg>' },
    { label: 'Total Views', value: '715K', color: 'rgba(96,165,250,0.15)', icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>' },
    { label: 'Balance', value: '$1,240', color: 'rgba(74,222,128,0.15)', icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4ade80" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>' },
    { label: 'Series', value: '4', color: 'rgba(251,191,36,0.15)', icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" stroke-width="2"><rect x="2" y="7" width="20" height="15" rx="2"/><path d="M16 3l-4 4-4-4"/></svg>' },
  ];

  navItems: { id: VJSection, label: string, icon: string }[] = [
    { id: 'overview', label: 'Overview', icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>' },
    { id: 'my-movies', label: 'My Movies', icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="15" rx="2"/><polyline points="16 2 12 7 8 2"/></svg>' },
    { id: 'upload-movie', label: 'Upload Movie', icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/></svg>' },
    { id: 'series', label: 'My Series', icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>' },
    { id: 'add-series', label: 'Add Series', icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>' },
    { id: 'add-episode', label: 'Add Episode', icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>' },
    { id: 'users', label: 'Users', icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>' },
    { id: 'hero-slides', label: 'Hero Slides', icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>' },
    { id: 'activities', label: 'User Activities', icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>' },
    { id: 'wallet', label: 'Wallet', icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>' },
    { id: 'transactions', label: 'Transactions', icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>' },
  ];

  constructor(private movieService: MovieService) {
    this.myMovies = this.movieService.getAllMovies().filter(m => m.vjName === this.vjName);
    this.mySeries = this.movieService.getSeries().filter(s => s.vjName === this.vjName);
    this.users = this.movieService.getUsers();
    this.myTransactions = this.movieService.getTransactions().filter(t => t.from === this.vjName);
    this.activities = this.movieService.getActivities();
    this.heroSlides = this.movieService.getHeroSlides();
  }

  navigate(section: VJSection) {
    this.activeSection.set(section);
    this.sidebarOpen.set(false);
    this.uploadSuccess.set(false);
    this.seriesSuccess.set(false);
    this.episodeSuccess.set(false);
    this.heroSuccess.set(false);
    this.withdrawSuccess.set(false);
  }

  currentNavLabel() {
    return this.navItems.find(n => n.id === this.activeSection())?.label || 'Dashboard';
  }

  selectSeries(s: Series) { this.selectedSeries = s; this.episodeForm.seriesId = String(s.id); }

  resetForm() { this.uploadForm = { title: '', year: 2024, quality: '', genre: '', duration: '', language: 'English', type: 'movie', description: '', posterUrl: '', backdropUrl: '' }; }

  submitMovie() {
    this.uploadLoading.set(true);
    setTimeout(() => { this.uploadLoading.set(false); this.uploadSuccess.set(true); this.resetForm(); }, 1500);
  }

  submitSeries() { this.seriesSuccess.set(true); }
  submitEpisode() { this.episodeSuccess.set(true); }
  submitHeroSlide() { this.heroSuccess.set(true); }

  requestWithdraw() {
    if (this.withdrawForm.amount > 0 && this.withdrawForm.amount <= this.walletBalance) {
      this.walletBalance -= this.withdrawForm.amount;
      this.withdrawSuccess.set(true);
      this.withdrawForm = { amount: 0, method: '', account: '' };
    }
  }

  onImgError(event: Event) { (event.target as HTMLImageElement).style.display = 'none'; }
}
