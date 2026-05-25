import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Movie, AppComment } from '../../models/movie.model';
import { MovieService } from '../../services/movie.service';
import { MovieSectionComponent } from '../../components/movie-section/movie-section.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-watch',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, MovieSectionComponent],
  template: `
    @let movie = currentMovie();
    @if(movie) {
      <div class="watch-page">
        <div class="watch-top">
          <div class="watch-container">

            <div class="breadcrumb">
              <a routerLink="/" class="bc-link">Home</a>
              <span class="bc-sep">›</span>
              <a [routerLink]="['/movies']" class="bc-link">{{ movie.type === 'tv' ? 'TV Shows' : 'Movies' }}</a>
              <span class="bc-sep">›</span>
              <span class="bc-current">{{ movie.title }}</span>
            </div>

            <div class="player-layout">
              <div class="player-main">

                <div class="player-wrap">
                  <div class="player-box">
                    <div class="player-poster" [style.background-image]="'url(' + movie.backdrop + ')'">
                      <div class="player-overlay">
                        <button class="play-big-btn" (click)="tryPlay()">
                          @if(!playing()) {
                            <svg width="52" height="52" viewBox="0 0 24 24" fill="white"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                          } @else {
                            <svg width="52" height="52" viewBox="0 0 24 24" fill="white"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
                          }
                        </button>
                        @if(!playing()) {
                          <div class="play-hint">Click to Play</div>
                        } @else {
                          <div class="playing-bar">
                            <div class="playing-indicator"><span></span><span></span><span></span></div>
                            <span class="now-playing-text">Now Playing...</span>
                          </div>
                        }
                      </div>
                      <div class="player-quality-tag">{{ movie.quality || 'HD' }}</div>
                    </div>
                  </div>
                </div>

                <div class="action-grid">
                  <button class="action-tile" (click)="tryDownload()">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                    <span>Download</span>
                  </button>
                  <button class="action-tile" (click)="toggleShare()">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
                    <span>Share</span>
                  </button>
                  <button class="action-tile" [class.liked]="liked()" (click)="liked.set(!liked())">
                    <svg width="22" height="22" viewBox="0 0 24 24" [attr.fill]="liked() ? '#FF271C' : 'none'" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                    <span>{{ liked() ? 'Liked' : 'Like' }}</span>
                  </button>
                  <button class="action-tile" (click)="nextMovie()">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 4 15 12 5 20 5 4"/><line x1="19" y1="5" x2="19" y2="19"/></svg>
                    <span>Next</span>
                  </button>
                </div>

                <div class="movie-info-card">
                  <div class="movie-info-top">
                    <div class="mi-poster">
                      <img [src]="movie.poster" [alt]="movie.title" (error)="onImgError($event)">
                    </div>
                    <div class="mi-details">
                      <div class="mi-badges">
                        <span class="badge-type">{{ movie.type === 'tv' ? 'TV SERIES' : 'MOVIE' }}</span>
                        @if(movie.quality) { <span class="badge-quality">{{ movie.quality }}</span> }
                        @if(movie.vjName) {
                          <span class="badge-vj">
                            <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/></svg>
                            {{ movie.vjName }}
                          </span>
                        }
                      </div>
                      <h1 class="mi-title">{{ movie.title }}</h1>
                      <div class="mi-meta">
                        <span class="mi-rating">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="#F5852F"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                          {{ movie.rating | number:'1.1-1' }} / 10
                        </span>
                        <span>{{ movie.year }}</span>
                        <span>{{ movie.duration }}</span>
                        @if(movie.language) { <span>{{ movie.language }}</span> }
                        @if(movie.views) { <span>{{ movie.views | number }} views</span> }
                      </div>
                      <div class="mi-genres">
                        @for(genre of movie.genres; track genre) {
                          <span class="genre-pill">{{ genre }}</span>
                        }
                      </div>
                      <p class="mi-desc">{{ movie.description }}</p>
                      <div class="mi-actions">
                        <button class="act-btn act-play" (click)="tryPlay()">
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                          Play Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="comments-section">
                  <h3 class="section-title">Comments <span class="count-badge">{{ comments().length }}</span></h3>
                  <div class="comment-input-row">
                    <div class="comment-avatar">{{ authService.currentUser()?.initials || 'U' }}</div>
                    <input class="comment-input" placeholder="Write a comment..." [(ngModel)]="newComment" (keydown.enter)="addComment()">
                    <button class="comment-submit" (click)="addComment()">Post</button>
                  </div>
                  <div class="comments-list">
                    @for(c of comments(); track c.id) {
                      <div class="comment-item">
                        <div class="c-avatar">{{ c.name[0] }}</div>
                        <div class="c-body">
                          <div class="c-header">
                            <span class="c-name">{{ c.name }}</span>
                            <span class="c-time">{{ formatTime(c.createdAt) }}</span>
                          </div>
                          <p class="c-text">{{ c.text }}</p>
                        </div>
                      </div>
                    }
                  </div>
                </div>

              </div>

              <div class="player-sidebar">
                <h3 class="sidebar-title">Recommended</h3>
                <div class="sidebar-list">
                  @for(r of related(); track r.id) {
                    <a [routerLink]="['/watch', r.id]" class="sidebar-item">
                      <div class="si-poster">
                        <img [src]="r.poster" [alt]="r.title" (error)="onImgError($event)">
                        @if(r.quality) { <span class="si-quality">{{ r.quality }}</span> }
                      </div>
                      <div class="si-info">
                        <div class="si-title">{{ r.title }}</div>
                        @if(r.vjName) { <div class="si-vj">{{ r.vjName }}</div> }
                        <div class="si-meta">
                          <span>{{ r.year }}</span>
                          <span class="si-rating">★ {{ r.rating | number:'1.1-1' }}</span>
                        </div>
                      </div>
                    </a>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      @if(showPaywall()) {
        <div class="paywall-overlay" (click)="showPaywall.set(false)">
          <div class="paywall-card" (click)="$event.stopPropagation()">
            <button class="pw-close" (click)="showPaywall.set(false)">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
            <div class="pw-lock">
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            </div>
            <h2 class="pw-title">Subscription Required</h2>
            <p class="pw-desc">Get unlimited access to all movies, TV shows and downloads.</p>
            <div class="pw-plans">
              <div class="pw-plan">
                <div class="pw-plan-name">BASIC</div>
                <div class="pw-plan-price">UGX 5,000<span>/mo</span></div>
              </div>
              <div class="pw-plan pw-plan-featured">
                <div class="pw-plan-pop">POPULAR</div>
                <div class="pw-plan-name">STANDARD</div>
                <div class="pw-plan-price">UGX 15,000<span>/mo</span></div>
              </div>
              <div class="pw-plan">
                <div class="pw-plan-name">PREMIUM</div>
                <div class="pw-plan-price">UGX 30,000<span>/mo</span></div>
              </div>
            </div>
            <button class="pw-btn-subscribe" (click)="goSubscribe()">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              Subscribe &amp; Watch Now
            </button>
            <button class="pw-btn-login" (click)="goLogin()">Already subscribed? Sign In</button>
          </div>
        </div>
      }

    } @else {
      <div class="not-found">
        <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        <h2>Movie not found</h2>
        <a routerLink="/">Go Home</a>
      </div>
    }
  `,
  styles: [`
    :host { display: block; }
    .watch-page {
      background: #0e1018; min-height: 100vh; padding-top: 48px; color: #fff;
    }
    .watch-top { background: #0e1018; }
    .watch-container { max-width: 1340px; margin: 0 auto; padding: 18px 16px 40px; }
    .breadcrumb {
      display: flex; align-items: center; gap: 6px; margin-bottom: 14px; font-size: 13px; flex-wrap: wrap;
    }
    .bc-link { color: rgba(255,255,255,0.5); text-decoration: none; transition: color 0.2s; &:hover { color: #FF271C; } }
    .bc-sep { color: rgba(255,255,255,0.25); }
    .bc-current { color: rgba(255,255,255,0.8); }
    .player-layout { display: grid; grid-template-columns: 1fr 290px; gap: 18px; align-items: start; }
    .player-main { display: flex; flex-direction: column; gap: 16px; }
    .player-wrap { background: #000; border-radius: 12px; overflow: hidden; }
    .player-box { position: relative; width: 100%; }
    .player-poster {
      position: relative; width: 100%; aspect-ratio: 16/9;
      background-size: cover; background-position: center; background-color: #111;
      display: flex; align-items: center; justify-content: center;
    }
    .player-overlay {
      position: absolute; inset: 0; display: flex; flex-direction: column;
      align-items: center; justify-content: center;
      background: rgba(0,0,0,0.45); gap: 12px;
    }
    .play-big-btn {
      width: 82px; height: 82px; border-radius: 50%;
      background: rgba(255,39,28,0.9); border: 3px solid rgba(255,255,255,0.3);
      display: flex; align-items: center; justify-content: center;
      cursor: pointer; transition: all 0.2s; padding-left: 4px;
      box-shadow: 0 0 40px rgba(255,39,28,0.5);
      &:hover { transform: scale(1.08); background: rgba(255,39,28,1); }
    }
    .play-hint { color: rgba(255,255,255,0.7); font-size: 14px; letter-spacing: 0.5px; }
    .playing-bar { display: flex; align-items: center; gap: 10px; }
    .playing-indicator {
      display: flex; align-items: flex-end; gap: 3px; height: 20px;
      span {
        display: block; width: 4px; background: #FF271C; border-radius: 2px;
        animation: bounce 0.8s infinite ease-in-out;
        &:nth-child(1) { height: 10px; animation-delay: 0s; }
        &:nth-child(2) { height: 20px; animation-delay: 0.15s; }
        &:nth-child(3) { height: 14px; animation-delay: 0.3s; }
      }
    }
    @keyframes bounce { 0%, 100% { transform: scaleY(1); } 50% { transform: scaleY(0.4); } }
    .now-playing-text { color: rgba(255,255,255,0.8); font-size: 13px; }
    .player-quality-tag {
      position: absolute; top: 12px; right: 12px;
      background: linear-gradient(135deg, #FF271C, #F5852F);
      color: #fff; font-size: 10px; font-weight: 700; padding: 3px 8px; border-radius: 4px; letter-spacing: 1px;
    }
    .action-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; }
    .action-tile {
      display: flex; flex-direction: column; align-items: center; justify-content: center;
      gap: 7px; background: #1a1c24; border: 1px solid rgba(255,255,255,0.1);
      border-radius: 10px; padding: 14px 8px; color: rgba(255,255,255,0.75);
      cursor: pointer; transition: all 0.2s; font-size: 11px; font-weight: 600;
      &:hover { background: rgba(255,255,255,0.1); color: #fff; border-color: rgba(255,255,255,0.2); transform: translateY(-2px); }
      &.liked { color: #FF271C; border-color: rgba(255,39,28,0.4); background: rgba(255,39,28,0.1); }
    }
    .movie-info-card { background: #1a1c24; border-radius: 12px; padding: 18px; }
    .movie-info-top { display: flex; gap: 16px; }
    .mi-poster {
      flex-shrink: 0; width: 90px;
      img { width: 100%; border-radius: 8px; display: block; box-shadow: 0 8px 24px rgba(0,0,0,0.5); }
    }
    .mi-details { flex: 1; min-width: 0; }
    .mi-badges { display: flex; flex-wrap: wrap; gap: 5px; margin-bottom: 8px; }
    .badge-type { background: linear-gradient(135deg, #FF271C, #F5852F); color: #fff; font-size: 9px; font-weight: 700; padding: 2px 8px; border-radius: 3px; letter-spacing: 1px; }
    .badge-quality { background: rgba(255,255,255,0.1); color: rgba(255,255,255,0.8); font-size: 9px; font-weight: 700; padding: 2px 8px; border-radius: 3px; }
    .badge-vj { display: flex; align-items: center; gap: 4px; background: rgba(255,39,28,0.15); color: #FF6B5B; font-size: 9px; font-weight: 700; padding: 2px 8px; border-radius: 3px; border: 1px solid rgba(255,39,28,0.3); }
    .mi-title { font-size: 20px; font-weight: 800; color: #fff; margin-bottom: 6px; line-height: 1.2; }
    .mi-meta { display: flex; flex-wrap: wrap; gap: 10px; align-items: center; margin-bottom: 8px; color: rgba(255,255,255,0.55); font-size: 12px; }
    .mi-rating { display: flex; align-items: center; gap: 4px; color: #F5852F; font-weight: 600; }
    .mi-genres { display: flex; flex-wrap: wrap; gap: 5px; margin-bottom: 10px; }
    .genre-pill { background: rgba(255,255,255,0.07); color: rgba(255,255,255,0.7); font-size: 11px; padding: 2px 9px; border-radius: 20px; border: 1px solid rgba(255,255,255,0.1); }
    .mi-desc { color: rgba(255,255,255,0.65); font-size: 13px; line-height: 1.6; margin-bottom: 14px; }
    .mi-actions { display: flex; gap: 10px; flex-wrap: wrap; align-items: center; }
    .act-btn { display: flex; align-items: center; gap: 7px; font-size: 13px; font-weight: 700; padding: 9px 20px; border-radius: 20px; border: none; cursor: pointer; transition: all 0.2s; }
    .act-play { background: linear-gradient(135deg, #FF271C, #F5852F); color: #fff; box-shadow: 0 3px 14px rgba(255,39,28,0.4); &:hover { transform: translateY(-1px); } }
    .section-title { font-size: 15px; font-weight: 700; color: #fff; margin-bottom: 12px; display: flex; align-items: center; gap: 8px; }
    .count-badge { background: rgba(255,255,255,0.1); color: rgba(255,255,255,0.6); font-size: 11px; padding: 1px 8px; border-radius: 10px; font-weight: 500; }
    .comments-section { background: #1a1c24; border-radius: 12px; padding: 18px; }
    .comment-input-row { display: flex; gap: 10px; align-items: center; margin-bottom: 18px; }
    .comment-avatar { width: 34px; height: 34px; border-radius: 50%; background: linear-gradient(135deg, #FF271C, #F5852F); display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 13px; flex-shrink: 0; }
    .comment-input { flex: 1; background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.1); border-radius: 20px; padding: 8px 14px; color: #fff; font-size: 13px; outline: none; &::placeholder { color: rgba(255,255,255,0.3); } &:focus { border-color: rgba(255,39,28,0.5); } }
    .comment-submit { background: linear-gradient(135deg, #FF271C, #F5852F); color: #fff; border: none; padding: 8px 16px; border-radius: 20px; font-size: 12px; font-weight: 700; cursor: pointer; white-space: nowrap; &:hover { opacity: 0.9; } }
    .comments-list { display: flex; flex-direction: column; gap: 12px; }
    .comment-item { display: flex; gap: 10px; }
    .c-avatar { width: 32px; height: 32px; border-radius: 50%; background: #2b2e39; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 12px; flex-shrink: 0; color: rgba(255,255,255,0.7); }
    .c-body { flex: 1; }
    .c-header { display: flex; align-items: center; gap: 10px; margin-bottom: 3px; }
    .c-name { font-size: 12px; font-weight: 600; color: rgba(255,255,255,0.9); }
    .c-time { font-size: 10px; color: rgba(255,255,255,0.35); }
    .c-text { font-size: 13px; color: rgba(255,255,255,0.65); line-height: 1.5; }
    .player-sidebar { background: #1a1c24; border-radius: 12px; padding: 14px; position: sticky; top: 64px; }
    .sidebar-title { font-size: 14px; font-weight: 700; margin-bottom: 12px; color: #fff; }
    .sidebar-list { display: flex; flex-direction: column; gap: 10px; }
    .sidebar-item { display: flex; gap: 10px; text-decoration: none; border-radius: 8px; padding: 5px; transition: background 0.2s; &:hover { background: rgba(255,255,255,0.06); } }
    .si-poster { flex-shrink: 0; width: 60px; height: 84px; border-radius: 5px; overflow: hidden; position: relative; background: #2b2e39; img { width: 100%; height: 100%; object-fit: cover; } }
    .si-quality { position: absolute; top: 3px; right: 3px; background: linear-gradient(135deg, #FF271C, #F5852F); color: #fff; font-size: 7px; font-weight: 700; padding: 1px 4px; border-radius: 2px; }
    .si-info { flex: 1; min-width: 0; padding-top: 2px; }
    .si-title { font-size: 12px; font-weight: 600; color: rgba(255,255,255,0.9); line-height: 1.3; overflow: hidden; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; margin-bottom: 3px; }
    .si-vj { font-size: 10px; color: #FF6B5B; font-weight: 600; margin-bottom: 3px; }
    .si-meta { display: flex; gap: 6px; font-size: 10px; color: rgba(255,255,255,0.4); }
    .si-rating { color: #F5852F; }
    .paywall-overlay {
      position: fixed; inset: 0; z-index: 1500;
      background: rgba(0,0,0,0.85); backdrop-filter: blur(10px);
      display: flex; align-items: center; justify-content: center; padding: 16px;
    }
    .paywall-card {
      position: relative; text-align: center;
      background: linear-gradient(160deg, #0e1015 0%, #1a1c24 100%);
      border: 1px solid rgba(255,255,255,0.1); border-radius: 18px;
      padding: 36px 24px 26px; width: 100%; max-width: 400px;
      box-shadow: 0 24px 60px rgba(0,0,0,0.75);
    }
    .pw-close {
      position: absolute; top: 12px; right: 12px;
      width: 28px; height: 28px; border-radius: 50%;
      background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.12);
      color: rgba(255,255,255,0.6); cursor: pointer;
      display: flex; align-items: center; justify-content: center; transition: all 0.2s;
      &:hover { background: rgba(255,255,255,0.15); color: #fff; }
    }
    .pw-lock {
      width: 64px; height: 64px; border-radius: 50%;
      background: rgba(255,39,28,0.1); border: 2px solid rgba(255,39,28,0.28);
      display: flex; align-items: center; justify-content: center; margin: 0 auto 14px;
      color: #FF271C;
    }
    .pw-title { color: #fff; font-size: 20px; font-weight: 800; margin: 0 0 8px; }
    .pw-desc { color: rgba(255,255,255,0.5); font-size: 13px; margin: 0 0 20px; }
    .pw-plans { display: flex; gap: 8px; margin-bottom: 20px; }
    .pw-plan {
      flex: 1; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1);
      border-radius: 9px; padding: 11px 7px; position: relative;
    }
    .pw-plan-featured { background: rgba(16,185,129,0.06); border-color: rgba(52,211,153,0.35); }
    .pw-plan-pop {
      position: absolute; top: -8px; left: 50%; transform: translateX(-50%);
      background: linear-gradient(135deg, #10b981, #059669);
      color: #fff; font-size: 7.5px; font-weight: 800; letter-spacing: 0.8px;
      padding: 2px 8px; border-radius: 8px; white-space: nowrap;
    }
    .pw-plan-name { font-size: 8.5px; font-weight: 800; letter-spacing: 1.2px; color: rgba(255,255,255,0.5); margin-bottom: 4px; }
    .pw-plan-featured .pw-plan-name { color: #10b981; }
    .pw-plan-price { font-size: 10px; font-weight: 700; color: #fff; line-height: 1.4; span { color: rgba(255,255,255,0.4); font-size: 9px; } }
    .pw-btn-subscribe {
      width: 100%; display: flex; align-items: center; justify-content: center; gap: 8px;
      background: linear-gradient(135deg, #FF271C, #F5852F);
      color: #fff; font-size: 14px; font-weight: 700;
      padding: 13px; border-radius: 10px; border: none; cursor: pointer;
      transition: opacity 0.2s, transform 0.2s; margin-bottom: 10px;
      &:hover { opacity: 0.9; transform: translateY(-1px); }
    }
    .pw-btn-login {
      width: 100%; background: transparent; color: rgba(255,255,255,0.5); font-size: 13px;
      padding: 8px; border: 1px solid rgba(255,255,255,0.12); border-radius: 8px; cursor: pointer;
      transition: all 0.2s;
      &:hover { color: rgba(255,255,255,0.8); border-color: rgba(255,255,255,0.25); }
    }
    .not-found { min-height: 60vh; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 16px; h2 { font-size: 20px; color: rgba(255,255,255,0.5); } a { color: #FF271C; font-size: 14px; } }
    @media (max-width: 900px) {
      .player-layout { grid-template-columns: 1fr; }
      .player-sidebar { position: static; }
    }
    @media (max-width: 600px) {
      .watch-container { padding: 10px 12px 28px; }
      .movie-info-top { flex-direction: column; }
      .mi-poster { width: 110px; }
      .mi-title { font-size: 17px; }
      .action-grid { grid-template-columns: repeat(2, 1fr); }
      .play-big-btn { width: 64px; height: 64px; }
      .breadcrumb { font-size: 12px; }
      .pw-plans { gap: 5px; }
    }
  `]
})
export class WatchComponent implements OnInit {
  currentMovie = signal<Movie | undefined>(undefined);
  related = signal<Movie[]>([]);
  playing = signal(false);
  liked = signal(false);
  showPaywall = signal(false);
  newComment = '';
  comments = signal<AppComment[]>([]);
  currentMovieId: string | number = '';

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    public authService: AuthService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'] as string;
      this.currentMovieId = id;
      this.playing.set(false);
      this.showPaywall.set(false);
      this.comments.set([]);
      this.movieService.getMovieById(id).then(movie => {
        this.currentMovie.set(movie);
        if (movie) {
          this.movieService.getAllMovies().then(all => {
            const similar = all
              .filter(m => String(m.id) !== String(id) && m.genres?.some((g: string) => movie.genres?.includes(g)))
              .slice(0, 12);
            this.related.set(similar);
          });
          this.movieService.getComments(id).then(comments => {
            this.comments.set(comments);
          });
          this.movieService.incrementViews(id);
        }
      });
    });
  }

  tryPlay() {
    if (this.authService.hasSubscription()) {
      this.playing.set(!this.playing());
    } else {
      this.showPaywall.set(true);
    }
  }

  tryDownload() {
    if (this.authService.hasSubscription()) {
      const movie = this.currentMovie();
      if (movie) alert(`Downloading: ${movie.title}`);
    } else {
      this.showPaywall.set(true);
    }
  }

  goSubscribe() {
    this.showPaywall.set(false);
    this.authService.subscribeModalOpen.set(true);
  }

  goLogin() {
    this.showPaywall.set(false);
    this.authService.loginModalOpen.set(true);
  }

  addComment() {
    if (!this.newComment.trim()) return;
    const user = this.authService.currentUser();
    const name = user?.name || 'Guest';
    const comment: AppComment = {
      id: Date.now(),
      uid: user?.uid || 'guest',
      name,
      text: this.newComment.trim(),
      createdAt: Date.now()
    };
    this.comments.update(list => [comment, ...list]);
    this.movieService.addComment(this.currentMovieId, comment);
    this.newComment = '';
  }

  formatTime(ts: number): string {
    const diff = Date.now() - ts;
    const m = Math.floor(diff / 60000);
    if (m < 1) return 'Just now';
    if (m < 60) return `${m}m ago`;
    const h = Math.floor(m / 60);
    if (h < 24) return `${h}h ago`;
    return `${Math.floor(h / 24)}d ago`;
  }

  toggleShare() {
    if (navigator.share) {
      navigator.share({ title: this.currentMovie()?.title, url: window.location.href });
    }
  }

  nextMovie() {
    const rel = this.related();
    if (rel.length > 0) window.location.href = `#/watch/${rel[0].id}`;
  }

  onImgError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.style.display = 'none';
  }
}
