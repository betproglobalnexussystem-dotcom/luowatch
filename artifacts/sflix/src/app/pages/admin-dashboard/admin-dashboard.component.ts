import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { Movie, Series, VJ, User, Transaction, Activity, HeroSlide } from '../../models/movie.model';

type AdminSection = 'overview' | 'movies' | 'series' | 'users' | 'vjs' | 'upload' | 'hero-slides' | 'wallet' | 'withdrawals' | 'transactions' | 'activities';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="admin-shell">
      <aside class="admin-sidebar" [class.open]="sidebarOpen()">
        <div class="sidebar-brand">
          <div class="brand-inner">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="url(#ag)"/><path d="M12 2l2.09 4.26L18 7.27l-3 2.92.71 4.14L12 12.17l-3.71 2.16.71-4.14L6 7.27l3.91-.01z" fill="white"/><defs><linearGradient id="ag" x1="0" y1="0" x2="24" y2="24"><stop stop-color="#6366f1"/><stop offset="1" stop-color="#8b5cf6"/></linearGradient></defs></svg>
            <div>
              <div class="brand-name">LUO WATCH Admin</div>
              <div class="brand-role">Super Admin</div>
            </div>
          </div>
          <button class="sidebar-close" (click)="sidebarOpen.set(false)">✕</button>
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
              @if(item.badge) { <span class="nav-badge">{{ item.badge }}</span> }
            </button>
          }
        </nav>
        <div class="sidebar-footer">
          <a routerLink="/" class="nav-item">
            <span class="nav-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg></span>
            <span>Back to Site</span>
          </a>
          <a routerLink="/vj" class="nav-item">
            <span class="nav-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg></span>
            <span>VJ Dashboard</span>
          </a>
        </div>
      </aside>

      <div class="admin-main">
        <header class="admin-header">
          <button class="menu-toggle" (click)="sidebarOpen.set(!sidebarOpen())">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          </button>
          <div class="header-title">{{ currentNavLabel() }}</div>
          <div class="header-right">
            <div class="header-badge admin-badge">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              Administrator
            </div>
            <div class="header-wallet">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
              {{ '$' + (systemWallet | number:'1.2-2') }}
            </div>
          </div>
        </header>

        <div class="admin-content">

          @if(activeSection() === 'overview') {
            <div class="section-body">
              <div class="stats-grid">
                @for(stat of adminStats; track stat.label) {
                  <div class="stat-card" [style.border-color]="stat.color + '33'">
                    <div class="stat-icon" [style.background]="stat.color + '22'" [innerHTML]="stat.icon"></div>
                    <div class="stat-info">
                      <div class="stat-value">{{ stat.value }}</div>
                      <div class="stat-label">{{ stat.label }}</div>
                    </div>
                  </div>
                }
              </div>
              <div class="overview-grid">
                <div class="ov-card">
                  <h3>Platform Revenue</h3>
                  <div class="revenue-bars">
                    @for(month of revenueData; track month.label) {
                      <div class="rev-bar-wrap">
                        <div class="rev-bar" [style.height.%]="month.pct" [style.background]="'linear-gradient(0deg,#6366f1,#8b5cf6)'"></div>
                        <span class="rev-label">{{ month.label }}</span>
                      </div>
                    }
                  </div>
                </div>
                <div class="ov-card">
                  <h3>Recent Activity</h3>
                  <div class="mini-list">
                    @for(a of activities.slice(0,6); track a.id) {
                      <div class="mini-item">
                        <div class="act-dot"></div>
                        <div class="mini-info">
                          <div class="mini-title">{{ a.userName }} {{ a.action }} {{ a.target }}</div>
                          <div class="mini-meta">{{ a.date }}</div>
                        </div>
                      </div>
                    }
                  </div>
                </div>
              </div>
            </div>
          }

          @if(activeSection() === 'movies') {
            <div class="section-body">
              <div class="section-header-row">
                <h2>All Movies ({{ allMovies.length }})</h2>
                <div class="header-actions">
                  <input type="text" [(ngModel)]="movieSearch" placeholder="Search movies..." class="search-input">
                  <button class="btn-primary" (click)="navigate('upload')">+ Upload</button>
                </div>
              </div>
              <div class="table-wrap">
                <table class="data-table">
                  <thead><tr><th>Poster</th><th>Title</th><th>Year</th><th>Type</th><th>Quality</th><th>VJ</th><th>Views</th><th>Actions</th></tr></thead>
                  <tbody>
                    @for(m of filteredMovies; track m.id) {
                      <tr>
                        <td><img [src]="m.poster" class="table-poster" (error)="onImgError($event)"></td>
                        <td class="fw">{{ m.title }}</td>
                        <td>{{ m.year }}</td>
                        <td><span class="type-pill" [class]="m.type">{{ m.type === 'tv' ? 'TV' : 'Movie' }}</span></td>
                        <td><span class="quality-tag">{{ m.quality }}</span></td>
                        <td class="vj-name">{{ m.vjName || '—' }}</td>
                        <td>{{ (m.views || 0) | number }}</td>
                        <td>
                          <div class="action-btns">
                            <button class="act-btn-sm edit">Edit</button>
                            <button class="act-btn-sm delete" (click)="deleteMovie(m.id)">Delete</button>
                          </div>
                        </td>
                      </tr>
                    }
                  </tbody>
                </table>
              </div>
            </div>
          }

          @if(activeSection() === 'series') {
            <div class="section-body">
              <div class="section-header-row">
                <h2>All Series & Episodes</h2>
                <button class="btn-primary" (click)="navigate('upload')">+ Add Series</button>
              </div>
              @for(s of allSeries; track s.id) {
                <div class="series-block">
                  <div class="series-header">
                    <img [src]="s.poster" class="series-thumb" (error)="onImgError($event)">
                    <div class="series-meta">
                      <div class="series-title">{{ s.title }}</div>
                      <div class="series-sub">{{ s.year }} · {{ s.genres.join(', ') }} · VJ: <strong>{{ s.vjName }}</strong></div>
                      <div class="series-sub">{{ s.episodes.length }} episodes</div>
                    </div>
                    <div class="action-btns">
                      <button class="act-btn-sm edit">Edit</button>
                      <button class="act-btn-sm delete">Delete</button>
                    </div>
                  </div>
                  <div class="episodes-list">
                    @for(ep of s.episodes; track ep.id) {
                      <div class="ep-item">
                        <span class="ep-num">S{{ ep.season }}E{{ ep.episode }}</span>
                        <span class="ep-title">{{ ep.title }}</span>
                        <span class="ep-dur">{{ ep.duration }}</span>
                        <span class="quality-tag sm">{{ ep.quality }}</span>
                        <div class="action-btns">
                          <button class="act-btn-sm edit">Edit</button>
                          <button class="act-btn-sm delete">Del</button>
                        </div>
                      </div>
                    }
                  </div>
                </div>
              }
            </div>
          }

          @if(activeSection() === 'users') {
            <div class="section-body">
              <div class="section-header-row">
                <h2>All Users ({{ users.length }})</h2>
                <input type="text" [(ngModel)]="userSearch" placeholder="Search users..." class="search-input">
              </div>
              <div class="table-wrap">
                <table class="data-table">
                  <thead><tr><th>#</th><th>Name</th><th>Email</th><th>Joined</th><th>Last Seen</th><th>Watches</th><th>Status</th><th>Actions</th></tr></thead>
                  <tbody>
                    @for(u of filteredUsers; track u.id; let i = $index) {
                      <tr>
                        <td>{{ i + 1 }}</td>
                        <td class="fw">{{ u.name }}</td>
                        <td>{{ u.email }}</td>
                        <td>{{ u.joinDate }}</td>
                        <td>{{ u.lastSeen }}</td>
                        <td>{{ u.watchCount }}</td>
                        <td><span class="status-pill" [class]="u.status">{{ u.status }}</span></td>
                        <td>
                          <div class="action-btns">
                            <button class="act-btn-sm" [class]="u.status === 'banned' ? 'edit' : 'delete'" (click)="toggleUserStatus(u)">{{ u.status === 'banned' ? 'Unban' : 'Ban' }}</button>
                          </div>
                        </td>
                      </tr>
                    }
                  </tbody>
                </table>
              </div>
            </div>
          }

          @if(activeSection() === 'vjs') {
            <div class="section-body">
              <div class="section-header-row">
                <h2>Manage VJs ({{ vjs.length }})</h2>
                <input type="text" [(ngModel)]="vjSearch" placeholder="Search VJs..." class="search-input">
              </div>
              <div class="table-wrap">
                <table class="data-table">
                  <thead><tr><th>#</th><th>Name</th><th>Email</th><th>Joined</th><th>Movies</th><th>Total Views</th><th>Balance</th><th>Status</th><th>Actions</th></tr></thead>
                  <tbody>
                    @for(v of filteredVJs; track v.id; let i = $index) {
                      <tr>
                        <td>{{ i + 1 }}</td>
                        <td class="fw">{{ v.name }}</td>
                        <td>{{ v.email }}</td>
                        <td>{{ v.joinDate }}</td>
                        <td>{{ v.totalMovies }}</td>
                        <td>{{ v.totalViews | number }}</td>
                        <td>{{ '$' + (v.balance | number:'1.2-2') }}</td>
                        <td><span class="status-pill" [class]="v.status">{{ v.status }}</span></td>
                        <td>
                          <div class="action-btns">
                            <button class="act-btn-sm edit">View</button>
                            <button class="act-btn-sm" [class]="v.status === 'suspended' ? 'edit' : 'delete'" (click)="toggleVJStatus(v)">{{ v.status === 'suspended' ? 'Activate' : 'Suspend' }}</button>
                          </div>
                        </td>
                      </tr>
                    }
                  </tbody>
                </table>
              </div>
            </div>
          }

          @if(activeSection() === 'upload') {
            <div class="section-body">
              <h2>Upload Content</h2>
              <div class="upload-tabs">
                <button class="utab" [class.active]="uploadTab() === 'movie'" (click)="uploadTab.set('movie')">Movie</button>
                <button class="utab" [class.active]="uploadTab() === 'series'" (click)="uploadTab.set('series')">Series</button>
                <button class="utab" [class.active]="uploadTab() === 'episode'" (click)="uploadTab.set('episode')">Episode</button>
              </div>
              <div class="form-card">
                @if(uploadTab() === 'movie') {
                  <div class="form-grid">
                    <div class="form-group full"><label>Title</label><input type="text" [(ngModel)]="adminUpload.title" placeholder="Movie title" class="form-input"></div>
                    <div class="form-group"><label>Year</label><input type="number" [(ngModel)]="adminUpload.year" class="form-input"></div>
                    <div class="form-group"><label>Quality</label><select [(ngModel)]="adminUpload.quality" class="form-input"><option>HD</option><option>Full HD</option><option>4K</option></select></div>
                    <div class="form-group"><label>Assign to VJ</label><select [(ngModel)]="adminUpload.vjId" class="form-input"><option value="">Admin (No VJ)</option>@for(v of vjs; track v.id){ <option [value]="v.id">{{ v.name }}</option> }</select></div>
                    <div class="form-group"><label>Type</label><select [(ngModel)]="adminUpload.type" class="form-input"><option value="movie">Movie</option><option value="tv">TV Series</option></select></div>
                    <div class="form-group full"><label>Description</label><textarea [(ngModel)]="adminUpload.description" class="form-input form-textarea" placeholder="Description..."></textarea></div>
                    <div class="form-group full"><label>Poster URL</label><input type="url" [(ngModel)]="adminUpload.posterUrl" class="form-input" placeholder="https://..."></div>
                    <div class="form-group full"><label>Video File</label><div class="upload-zone"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="1.5"><polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/></svg><p>Drop file or <span class="upload-browse">browse</span></p></div></div>
                  </div>
                }
                @if(uploadTab() === 'series') {
                  <div class="form-grid">
                    <div class="form-group full"><label>Series Title</label><input type="text" [(ngModel)]="adminUpload.title" class="form-input" placeholder="Series title"></div>
                    <div class="form-group"><label>Year</label><input type="number" [(ngModel)]="adminUpload.year" class="form-input"></div>
                    <div class="form-group"><label>Genres</label><input type="text" [(ngModel)]="adminUpload.genre" class="form-input" placeholder="Drama, Sci-Fi..."></div>
                    <div class="form-group"><label>Assign to VJ</label><select [(ngModel)]="adminUpload.vjId" class="form-input"><option value="">Admin</option>@for(v of vjs; track v.id){ <option [value]="v.id">{{ v.name }}</option> }</select></div>
                    <div class="form-group full"><label>Description</label><textarea [(ngModel)]="adminUpload.description" class="form-input form-textarea"></textarea></div>
                    <div class="form-group full"><label>Poster URL</label><input type="url" [(ngModel)]="adminUpload.posterUrl" class="form-input" placeholder="https://..."></div>
                  </div>
                }
                @if(uploadTab() === 'episode') {
                  <div class="form-grid">
                    <div class="form-group"><label>Series</label><select [(ngModel)]="adminUpload.seriesId" class="form-input"><option value="">Select series</option>@for(s of allSeries; track s.id){ <option [value]="s.id">{{ s.title }}</option> }</select></div>
                    <div class="form-group"><label>Episode Title</label><input type="text" [(ngModel)]="adminUpload.title" class="form-input" placeholder="Episode title"></div>
                    <div class="form-group"><label>Season</label><input type="number" [(ngModel)]="adminUpload.season" class="form-input"></div>
                    <div class="form-group"><label>Episode #</label><input type="number" [(ngModel)]="adminUpload.episode" class="form-input"></div>
                    <div class="form-group"><label>Duration</label><input type="text" [(ngModel)]="adminUpload.duration" class="form-input" placeholder="45m"></div>
                    <div class="form-group"><label>Quality</label><select [(ngModel)]="adminUpload.quality" class="form-input"><option>HD</option><option>Full HD</option><option>4K</option></select></div>
                    <div class="form-group full"><label>Video File</label><div class="upload-zone"><p>Drop file or <span class="upload-browse">browse</span></p></div></div>
                  </div>
                }
                <div class="form-actions">
                  <button class="btn-primary" (click)="adminSubmitUpload()">
                    @if(uploadLoading()) { <span class="spinner"></span> Uploading... }
                    @else { Upload Content }
                  </button>
                </div>
                @if(uploadSuccess()) {
                  <div class="success-msg">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
                    Content uploaded successfully!
                  </div>
                }
              </div>
            </div>
          }

          @if(activeSection() === 'hero-slides') {
            <div class="section-body">
              <div class="section-header-row">
                <h2>Hero Slides</h2>
              </div>
              <div class="form-card" style="margin-bottom:24px">
                <h3>Add New Slide</h3>
                <div class="form-grid">
                  <div class="form-group"><label>Select Movie</label><select [(ngModel)]="heroForm.movieId" class="form-input"><option value="">Select movie</option>@for(m of allMovies.slice(0,20); track m.id){ <option [value]="m.id">{{ m.title }}</option> }</select></div>
                  <div class="form-group"><label>Slide Image URL</label><input type="url" [(ngModel)]="heroForm.imageUrl" class="form-input" placeholder="https://..."></div>
                </div>
                <div class="form-actions"><button class="btn-primary" (click)="addHeroSlide()">Add Slide</button></div>
              </div>
              <div class="slides-grid">
                @for(slide of heroSlides; track slide.id) {
                  <div class="slide-card">
                    <div class="slide-img" [style.background-image]="'url(' + slide.imageUrl + ')'"></div>
                    <div class="slide-info">
                      <div>
                        <div class="slide-title">{{ slide.title }}</div>
                        <div class="slide-by">by {{ slide.uploadedBy }}</div>
                      </div>
                      <div class="slide-actions">
                        <button class="act-btn-sm" [class]="slide.active ? 'delete' : 'edit'" (click)="toggleSlide(slide)">{{ slide.active ? 'Deactivate' : 'Activate' }}</button>
                        <button class="act-btn-sm delete" (click)="deleteSlide(slide.id)">Del</button>
                      </div>
                    </div>
                  </div>
                }
              </div>
            </div>
          }

          @if(activeSection() === 'wallet') {
            <div class="section-body">
              <h2>System Wallet</h2>
              <div class="wallet-hero purple">
                <div class="wallet-bal-label">System Balance</div>
                <div class="wallet-bal">{{ '$' + (systemWallet | number:'1.2-2') }}</div>
                <div class="wallet-bal-sub">Total platform revenue: {{ '$' + (totalRevenue | number:'1.2-2') }}</div>
              </div>
              <div class="wallet-breakdown">
                @for(vj of vjs; track vj.id) {
                  <div class="wb-item">
                    <div class="wb-avatar">{{ vj.name[0] }}</div>
                    <div class="wb-info">
                      <div class="wb-name">{{ vj.name }}</div>
                      <div class="wb-meta">{{ vj.totalMovies }} movies · {{ vj.totalViews | number }} views</div>
                    </div>
                    <div class="wb-balance">
                      <span class="wb-amt">{{ '$' + (vj.balance | number:'1.2-2') }}</span>
                      <span class="wb-lbl">balance</span>
                    </div>
                  </div>
                }
              </div>
            </div>
          }

          @if(activeSection() === 'withdrawals') {
            <div class="section-body">
              <h2>Withdrawal Requests</h2>
              <div class="table-wrap">
                <table class="data-table">
                  <thead><tr><th>Date</th><th>VJ</th><th>Amount</th><th>Status</th><th>Actions</th></tr></thead>
                  <tbody>
                    @for(t of withdrawalRequests; track t.id) {
                      <tr>
                        <td>{{ t.date }}</td>
                        <td class="fw vj-name">{{ t.from }}</td>
                        <td class="fw">{{ '$' + (t.amount | number:'1.2-2') }}</td>
                        <td><span class="status-pill" [class]="t.status">{{ t.status }}</span></td>
                        <td>
                          @if(t.status === 'pending') {
                            <div class="action-btns">
                              <button class="act-btn-sm edit" (click)="approveWithdrawal(t)">Approve</button>
                              <button class="act-btn-sm delete" (click)="rejectWithdrawal(t)">Reject</button>
                            </div>
                          } @else {
                            <span class="done-label">{{ t.status }}</span>
                          }
                        </td>
                      </tr>
                    }
                  </tbody>
                </table>
              </div>
            </div>
          }

          @if(activeSection() === 'transactions') {
            <div class="section-body">
              <h2>All Transactions</h2>
              <div class="table-wrap">
                <table class="data-table">
                  <thead><tr><th>Date</th><th>Description</th><th>From</th><th>Type</th><th>Amount</th><th>Status</th></tr></thead>
                  <tbody>
                    @for(t of transactions; track t.id) {
                      <tr>
                        <td>{{ t.date }}</td>
                        <td class="fw">{{ t.description }}</td>
                        <td>{{ t.from || 'System' }}</td>
                        <td><span class="type-badge" [class]="t.type">{{ t.type }}</span></td>
                        <td class="fw">{{ '$' + (t.amount | number:'1.2-2') }}</td>
                        <td><span class="status-pill" [class]="t.status">{{ t.status }}</span></td>
                      </tr>
                    }
                  </tbody>
                </table>
              </div>
            </div>
          }

          @if(activeSection() === 'activities') {
            <div class="section-body">
              <h2>All User Activities</h2>
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

        </div>
      </div>

      @if(sidebarOpen()) {
        <div class="sidebar-backdrop" (click)="sidebarOpen.set(false)"></div>
      }
    </div>
  `,
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {
  activeSection = signal<AdminSection>('overview');
  sidebarOpen = signal(false);
  uploadTab = signal<'movie' | 'series' | 'episode'>('movie');
  uploadLoading = signal(false);
  uploadSuccess = signal(false);

  systemWallet = 12450.80;
  totalRevenue = 28640.50;

  allMovies: Movie[] = [];
  allSeries: Series[] = [];
  users: User[] = [];
  vjs: VJ[] = [];
  transactions: Transaction[] = [];
  activities: Activity[] = [];
  heroSlides: HeroSlide[] = [];

  movieSearch = '';
  userSearch = '';
  vjSearch = '';

  heroForm = { movieId: '', imageUrl: '' };
  adminUpload = { title: '', year: 2024, quality: 'HD', genre: '', duration: '', language: 'English', type: 'movie', description: '', posterUrl: '', vjId: '', seriesId: '', season: 1, episode: 1 };

  revenueData = [
    { label: 'Jan', pct: 40 }, { label: 'Feb', pct: 55 }, { label: 'Mar', pct: 48 },
    { label: 'Apr', pct: 70 }, { label: 'May', pct: 85 }, { label: 'Jun', pct: 62 },
  ];

  adminStats = [
    { label: 'Total Movies', value: '284', color: '#FF271C', icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FF6B5B" stroke-width="2"><rect x="2" y="7" width="20" height="15" rx="2"/><polyline points="16 2 12 7 8 2"/></svg>' },
    { label: 'Total Users', value: '12.4K', color: '#6366f1', icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#818cf8" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/></svg>' },
    { label: 'Active VJs', value: '24', color: '#f59e0b', icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" stroke-width="2"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg>' },
    { label: 'Revenue', value: '$28.6K', color: '#10b981', icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4ade80" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>' },
  ];

  navItems: { id: AdminSection, label: string, icon: string, badge?: number }[] = [
    { id: 'overview', label: 'Overview', icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>' },
    { id: 'movies', label: 'All Movies', icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="15" rx="2"/><polyline points="16 2 12 7 8 2"/></svg>' },
    { id: 'series', label: 'Series & Episodes', icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>' },
    { id: 'users', label: 'Manage Users', icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>' },
    { id: 'vjs', label: 'Manage VJs', icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg>' },
    { id: 'upload', label: 'Upload Content', icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/></svg>' },
    { id: 'hero-slides', label: 'Hero Slides', icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>' },
    { id: 'wallet', label: 'System Wallet', icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>' },
    { id: 'withdrawals', label: 'Withdrawals', icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/></svg>', badge: 1 },
    { id: 'transactions', label: 'Transactions', icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>' },
    { id: 'activities', label: 'All Activities', icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>' },
  ];

  constructor(private movieService: MovieService) {
    this.allMovies = this.movieService.getAllMovies();
    this.allSeries = this.movieService.getSeries();
    this.users = this.movieService.getUsers();
    this.vjs = this.movieService.getVJs();
    this.transactions = this.movieService.getTransactions();
    this.activities = this.movieService.getActivities();
    this.heroSlides = this.movieService.getHeroSlides();
  }

  get filteredMovies() {
    if (!this.movieSearch) return this.allMovies;
    const q = this.movieSearch.toLowerCase();
    return this.allMovies.filter(m => m.title.toLowerCase().includes(q) || (m.vjName || '').toLowerCase().includes(q));
  }

  get filteredUsers() {
    if (!this.userSearch) return this.users;
    const q = this.userSearch.toLowerCase();
    return this.users.filter(u => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q));
  }

  get filteredVJs() {
    if (!this.vjSearch) return this.vjs;
    const q = this.vjSearch.toLowerCase();
    return this.vjs.filter(v => v.name.toLowerCase().includes(q) || v.email.toLowerCase().includes(q));
  }

  get withdrawalRequests() { return this.transactions.filter(t => t.type === 'withdrawal'); }

  navigate(section: AdminSection) { this.activeSection.set(section); this.sidebarOpen.set(false); this.uploadSuccess.set(false); }
  currentNavLabel() { return this.navItems.find(n => n.id === this.activeSection())?.label || 'Dashboard'; }

  deleteMovie(id: number) { this.allMovies = this.allMovies.filter(m => m.id !== id); }
  toggleUserStatus(u: User) { u.status = u.status === 'active' ? 'banned' : 'active'; }
  toggleVJStatus(v: VJ) { v.status = v.status === 'active' ? 'suspended' : 'active'; }
  toggleSlide(s: HeroSlide) { s.active = !s.active; }
  deleteSlide(id: number) { this.heroSlides = this.heroSlides.filter(s => s.id !== id); }
  approveWithdrawal(t: Transaction) { t.status = 'completed'; }
  rejectWithdrawal(t: Transaction) { t.status = 'failed'; }
  addHeroSlide() { }

  adminSubmitUpload() {
    this.uploadLoading.set(true);
    setTimeout(() => { this.uploadLoading.set(false); this.uploadSuccess.set(true); }, 1200);
  }

  onImgError(event: Event) { (event.target as HTMLImageElement).style.display = 'none'; }
}
