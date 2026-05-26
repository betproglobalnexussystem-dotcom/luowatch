import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { AuthService } from '../../services/auth.service';
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
              {{ 'UGX ' + (walletBalance | number:'1.2-2') }}
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
                        <img [src]="m.posterUrl" [alt]="m.title" class="mini-poster" (error)="onImgError($event)">
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
                        <span class="tx-amount" [class]="t.type">{{ 'UGX ' + (t.amount | number:'1.2-2') }}</span>
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
                        <td><img [src]="m.posterUrl" class="table-poster" (error)="onImgError($event)"></td>
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
                    <img [src]="s.posterUrl" [alt]="s.title" class="series-thumb" (error)="onImgError($event)">
                    <div class="series-info">
                      <div class="series-title">{{ s.title }}</div>
                      <div class="series-meta">{{ s.year }} · {{ s.episodes.length }} episodes</div>
                      <div class="series-genres">{{ s.genre }}</div>
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
                      <span class="act-action">{{ a.type }}</span>
                      <span class="act-target">{{ a.contentTitle }}</span>
                    </div>
                    <span class="act-time">{{ formatActivityDate(a.createdAt) }}</span>
                  </div>
                }
              </div>
            </div>
          }

          @if(activeSection() === 'wallet') {
            <div class="section-body">
              <div class="pro-wallet">

                <div class="pwallet-hero">
                  <div class="pwh-content">
                    <div class="pwh-left">
                      <div class="pwh-label">Available Balance</div>
                      <div class="pwh-amount">{{ 'UGX ' + (walletBalance | number:'1.2-2') }}</div>
                      <div class="pwh-downloads">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                        {{ downloadsCount | number }} total downloads
                      </div>
                    </div>
                    <button class="btn-withdraw" (click)="openWithdrawModal()">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                      Withdraw
                    </button>
                  </div>
                  <div class="pwh-decor d1"></div>
                  <div class="pwh-decor d2"></div>
                </div>

                <div class="pwallet-stats">
                  <div class="pws-card">
                    <div class="pws-icon pws-green">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                    </div>
                    <div class="pws-val">{{ 'UGX ' + (totalEarned | number:'1.2-2') }}</div>
                    <div class="pws-lbl">Total Earned</div>
                  </div>
                  <div class="pws-card">
                    <div class="pws-icon pws-blue">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/></svg>
                    </div>
                    <div class="pws-val">{{ downloadsCount | number }}</div>
                    <div class="pws-lbl">Total Downloads</div>
                  </div>
                  <div class="pws-card">
                    <div class="pws-icon pws-orange">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                    </div>
                    <div class="pws-val">$500.00</div>
                    <div class="pws-lbl">Total Withdrawn</div>
                  </div>
                  <div class="pws-card">
                    <div class="pws-icon pws-purple">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="15" rx="2"/><polyline points="16 2 12 7 8 2"/></svg>
                    </div>
                    <div class="pws-val">{{ myMovies.length }}</div>
                    <div class="pws-lbl">Movies Uploaded</div>
                  </div>
                </div>

                <div class="pwallet-movies">
                  <div class="pwm-header">
                    <h3>Downloaded Movies</h3>
                    <span class="pwm-count">{{ downloadsCount | number }} downloads</span>
                  </div>
                  <div class="pwm-list">
                    @for(m of downloadedMovies; track m.id) {
                      <div class="pwm-item">
                        <img [src]="m.posterUrl" class="pwm-poster" (error)="onImgError($event)" alt="">
                        <div class="pwm-info">
                          <div class="pwm-title">{{ m.title }}</div>
                          <div class="pwm-meta">{{ m.year }} · {{ m.quality }}</div>
                        </div>
                        <div class="pwm-right">
                          <div class="pwm-dl-count">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/></svg>
                            {{ m.dlCount | number }}
                          </div>
                          <div class="pwm-earn">{{ '+' + 'UGX ' + (m.dlCount * 0.01 | number:'1.2-2') }}</div>
                        </div>
                      </div>
                    }
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
                        <td class="amount" [class]="t.type">{{ 'UGX ' + (t.amount | number:'1.2-2') }}</td>
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

      @if(showWithdrawModal()) {
        <div class="mm-overlay" (click)="closeWithdrawModal()">
          <div class="mm-modal" (click)="$event.stopPropagation()">
            @if(withdrawStep() === 'form') {
              <div class="mm-header">
                <div class="mm-title">
                  <svg class="mm-title-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/></svg>
                  Withdraw to Mobile Money
                </div>
                <button class="mm-close" (click)="closeWithdrawModal()">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </button>
              </div>
              <div class="mm-body">
                <div class="mm-avail-bar">
                  <span class="mm-avail-lbl">Available Balance</span>
                  <span class="mm-avail-val">{{ 'UGX ' + (walletBalance | number:'1.2-2') }}</span>
                </div>
                <div class="mm-section-lbl">Select Network</div>
                <div class="mm-networks">
                  @for(net of mmNetworks; track net.id) {
                    <button class="mm-net" [class.active]="mobileMoney.network === net.id" (click)="mobileMoney.network = net.id">
                      <span class="mm-net-dot" [style.background]="net.color"></span>
                      <span class="mm-net-name">{{ net.name }}</span>
                      @if(mobileMoney.network === net.id) {
                        <svg class="mm-net-check" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
                      }
                    </button>
                  }
                </div>
                <div class="mm-field">
                  <label class="mm-label">Phone Number</label>
                  <input class="mm-input" type="tel" [(ngModel)]="mobileMoney.phone" placeholder="+254 7XX XXX XXX">
                </div>
                <div class="mm-field">
                  <label class="mm-label">Amount (UGX)</label>
                  <div class="mm-amount-wrap">
                    <span class="mm-prefix">UGX</span>
                    <input class="mm-input" type="number" [(ngModel)]="mobileMoney.amount" placeholder="0.00" min="1" [max]="walletBalance">
                  </div>
                  @if(isOverBalance()) {
                    <div class="mm-error">Exceeds available balance</div>
                  }
                </div>
                <button class="mm-submit" (click)="submitMobileMoney()"
                  [disabled]="isWithdrawDisabled()">
                  Withdraw Funds
                </button>
              </div>
            }
            @if(withdrawStep() === 'success') {
              <div class="mm-success">
                <div class="mm-check-circle">
                  <svg class="mm-check-icon" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <h3>Withdrawal Sent!</h3>
                <p>{{ 'UGX ' + (lastWithdrawnAmount | number:'1.2-2') }} sent to {{ mobileMoney.phone }}</p>
                <p class="mm-via">via {{ getNetworkName(mobileMoney.network) }}</p>
                <button class="mm-done-btn" (click)="closeWithdrawModal()">Done</button>
              </div>
            }
          </div>
        </div>
      }
    </div>
  `,
  styleUrl: './vj-dashboard.component.css'
})
export class VjDashboardComponent implements OnInit {
  activeSection = signal<VJSection>('overview');
  sidebarOpen = signal(false);
  uploadLoading = signal(false);
  uploadSuccess = signal(false);
  seriesSuccess = signal(false);
  episodeSuccess = signal(false);
  heroSuccess = signal(false);
  withdrawSuccess = signal(false);

  showWithdrawModal = signal(false);
  withdrawStep = signal<'form' | 'success'>('form');

  vjName = '';
  vjId: string | null = null;
  walletBalance = 0;
  totalEarned = 0;
  downloadsCount = 0;
  lastWithdrawnAmount = 0;
  mobileMoney = { network: '', phone: '', amount: 0 };
  downloadedMovies: any[] = [];

  mmNetworks = [
    { id: 'mpesa', name: 'M-Pesa', color: '#00a651' },
    { id: 'airtel', name: 'Airtel Money', color: '#e40000' },
    { id: 'tkash', name: 'T-Kash', color: '#0099d4' },
    { id: 'equitel', name: 'Equitel', color: '#1a3a6b' },
  ];

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

  stats: { label: string; value: string; color: string; icon: string }[] = [];

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

  constructor(private movieService: MovieService, private authService: AuthService) {}

  ngOnInit() {
    this.loadData();
  }

  async loadData() {
    const user = this.authService.currentUser();
    if (user) {
      this.vjName = user.name;
      this.vjId = user.uid;
    }
    const wallet = await this.movieService.getVJWallet(this.vjId || 'unknown');
    this.walletBalance = wallet.balance;
    this.totalEarned = wallet.totalEarned;
    this.downloadsCount = wallet.downloads;

    const [allMovies, allSeries, users, allTransactions, activities, heroSlides] = await Promise.all([
      this.movieService.getAllMovies(),
      this.movieService.getSeries(),
      this.movieService.getUsers(),
      this.movieService.getTransactions(),
      this.movieService.getActivities(),
      this.movieService.getHeroSlides(),
    ]);

    this.myMovies = this.vjId
      ? allMovies.filter(m => m.vjId === this.vjId)
      : allMovies;
    this.mySeries = this.vjId
      ? allSeries.filter(s => s.vjId === this.vjId)
      : allSeries;
    this.users = users;
    this.myTransactions = this.vjId
      ? allTransactions.filter(t => t.vjId === this.vjId)
      : allTransactions;
    this.activities = activities;
    this.heroSlides = heroSlides;
    this.downloadedMovies = this.myMovies.slice(0, 8).map((m, i) => ({
      ...m, dlCount: m.views ?? 0
    }));
    this.computeStats();
  }

  computeStats() {
    const totalViews = this.myMovies.reduce((sum, m) => sum + (m.views ?? 0), 0);
    const viewsStr = totalViews >= 1000000
      ? (totalViews / 1000000).toFixed(1) + 'M'
      : totalViews >= 1000
        ? (totalViews / 1000).toFixed(1) + 'K'
        : String(totalViews);
    const balStr = 'UGX ' + (this.walletBalance >= 1000
      ? (this.walletBalance / 1000).toFixed(1) + 'K'
      : this.walletBalance.toFixed(0));

    this.stats = [
      { label: 'Total Movies', value: String(this.myMovies.length), color: 'rgba(255,39,28,0.15)', icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FF6B5B" stroke-width="2"><rect x="2" y="7" width="20" height="15" rx="2"/><polyline points="16 2 12 7 8 2"/></svg>' },
      { label: 'Total Views', value: viewsStr, color: 'rgba(96,165,250,0.15)', icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>' },
      { label: 'Balance', value: balStr, color: 'rgba(74,222,128,0.15)', icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4ade80" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>' },
      { label: 'Series', value: String(this.mySeries.length), color: 'rgba(251,191,36,0.15)', icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" stroke-width="2"><rect x="2" y="7" width="20" height="15" rx="2"/><path d="M16 3l-4 4-4-4"/></svg>' },
    ];
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

  async submitMovie() {
    if (!this.uploadForm.title) return;
    this.uploadLoading.set(true);
    await this.movieService.addMovie({
      title: this.uploadForm.title,
      year: this.uploadForm.year,
      quality: this.uploadForm.quality,
      genre: this.uploadForm.genre || '',
      description: this.uploadForm.description,
      posterUrl: this.uploadForm.posterUrl,
      type: this.uploadForm.type as any,
      vjId: this.vjId || '',
      vjName: this.vjName,
      views: 0,
      featured: false,
    });
    await this.movieService.addActivity({ userName: this.vjName, userId: this.vjId || '', type: 'view', contentType: 'movie', contentId: '', contentTitle: this.uploadForm.title });
    this.uploadLoading.set(false);
    this.uploadSuccess.set(true);
    this.resetForm();
    this.loadData();
  }

  async submitSeries() {
    if (!this.seriesForm?.title) { this.seriesSuccess.set(true); return; }
    await this.movieService.addSeries({
      title: this.seriesForm.title,
      year: this.seriesForm.year,
      genre: this.seriesForm.genres || '',
      vjId: this.vjId || '',
      vjName: this.vjName,
      posterUrl: this.seriesForm.posterUrl || '',
      description: this.seriesForm.description || '',
    });
    this.seriesSuccess.set(true);
    this.loadData();
  }

  async submitEpisode() {
    if (!this.episodeForm?.seriesId || !this.episodeForm?.title) { this.episodeSuccess.set(true); return; }
    await this.movieService.addEpisode(this.episodeForm.seriesId, {
      episodeTitle: this.episodeForm.title,
      episode: this.episodeForm.episode,
      season: this.episodeForm.season,
      vjId: this.vjId || '',
    });
    this.episodeSuccess.set(true);
  }

  async submitHeroSlide() {
    if (!this.heroForm?.movieId || !this.heroForm?.imageUrl) { this.heroSuccess.set(true); return; }
    await this.movieService.addHeroSlide({
      movieId: this.heroForm.movieId,
      imageUrl: this.heroForm.imageUrl,
      title: '',
      active: false,
      uploadedBy: this.vjId || 'vj',
    });
    await this.movieService.addActivity({ userName: this.vjName, userId: this.vjId || '', type: 'view', contentType: 'movie', contentId: this.heroForm.movieId, contentTitle: 'Hero Slide' });
    this.heroSuccess.set(true);
  }

  requestWithdraw() {
    if (this.withdrawForm.amount > 0 && this.withdrawForm.amount <= this.walletBalance) {
      const amount = this.withdrawForm.amount;
      this.walletBalance -= amount;
      this.movieService.addTransaction({ vjId: this.vjId || '', type: 'withdrawal', amount, description: 'Withdrawal request', status: 'pending', from: this.vjName });
      this.withdrawSuccess.set(true);
      this.withdrawForm = { amount: 0, method: '', account: '' };
    }
  }

  openWithdrawModal() {
    this.withdrawStep.set('form');
    this.mobileMoney = { network: '', phone: '', amount: 0 };
    this.showWithdrawModal.set(true);
  }

  closeWithdrawModal() { this.showWithdrawModal.set(false); }

  submitMobileMoney() {
    if (this.mobileMoney.network && this.mobileMoney.phone && this.mobileMoney.amount > 0 && this.mobileMoney.amount <= this.walletBalance) {
      this.lastWithdrawnAmount = this.mobileMoney.amount;
      const amount = this.mobileMoney.amount;
      this.walletBalance -= amount;
      this.movieService.addTransaction({ vjId: this.vjId || '', type: 'withdrawal', amount, description: `Mobile Money - ${this.mobileMoney.network} ${this.mobileMoney.phone}`, status: 'pending', from: this.vjName });
      this.withdrawStep.set('success');
    }
  }

  isOverBalance(): boolean { return this.mobileMoney.amount > this.walletBalance; }
  isWithdrawDisabled(): boolean {
    return !this.mobileMoney.network || !this.mobileMoney.phone || this.mobileMoney.amount <= 0 || this.mobileMoney.amount > this.walletBalance;
  }

  getNetworkName(id: string): string {
    return this.mmNetworks.find(n => n.id === id)?.name ?? id;
  }

  formatActivityDate(ts: any): string {
    if (!ts) return '';
    const d: Date = ts?.toDate ? ts.toDate() : new Date(ts);
    return d.toLocaleDateString();
  }

  onImgError(event: Event) { (event.target as HTMLImageElement).style.display = 'none'; }
}
