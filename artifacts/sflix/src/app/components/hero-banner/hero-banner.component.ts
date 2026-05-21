import { Component, OnInit, OnDestroy, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Movie } from '../../models/movie.model';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-hero-banner',
  standalone: true,
  imports: [RouterLink, CommonModule],
  template: `
    <div class="hero">
      @for(movie of featured(); track movie.id; let i = $index) {
        <div
          class="hero-slide"
          [class.active]="i === currentIndex()"
          [class.prev]="i === prevIndex()"
          [style.background-image]="'url(' + movie.backdrop + ')'"
        ></div>
      }

      <div class="hero-overlay"></div>

      <div class="hero-content">
        <div class="hero-inner">
          @let movie = featured()[currentIndex()];
          @if(movie) {
            <div class="hero-meta">
              <span class="meta-badge">{{ movie.type === 'tv' ? 'TV SERIES' : 'MOVIE' }}</span>
              <span class="meta-rating">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="#F5852F"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                {{ movie.rating | number:'1.1-1' }}
              </span>
              <span class="meta-year">{{ movie.year }}</span>
              <span class="meta-duration">{{ movie.duration }}</span>
              @for(genre of movie.genres.slice(0, 3); track $index) {
                <span class="meta-genre">{{ genre }}</span>
              }
            </div>

            <h1 class="hero-title">{{ movie.title }}</h1>
            <p class="hero-desc">{{ movie.description }}</p>

            <div class="hero-actions">
              <a [routerLink]="['/detail', movie.id]" class="btn-play">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                Play Now
              </a>
              <button class="btn-fav">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                My List
              </button>
              <a [routerLink]="['/detail', movie.id]" class="btn-info">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                More Info
              </a>
            </div>
          }
        </div>
      </div>

      <div class="hero-dots">
        @for(movie of featured(); track movie.id; let i = $index) {
          <button
            class="dot"
            [class.active]="i === currentIndex()"
            (click)="goTo(i)"
            [attr.aria-label]="'Slide ' + (i+1)"
          ></button>
        }
      </div>

      <button class="hero-arrow hero-prev" (click)="prev()">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>
      </button>
      <button class="hero-arrow hero-next" (click)="next()">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
      </button>
    </div>
  `,
  styles: [`
    .hero {
      position: relative;
      width: 100%;
      height: 85vh;
      min-height: 540px;
      max-height: 820px;
      overflow: hidden;
      background: #0e1018;
    }
    .hero-slide {
      position: absolute;
      inset: 0;
      background-size: cover;
      background-position: center top;
      opacity: 0;
      transition: opacity 0.8s ease;
      transform: scale(1.04);
      &.active {
        opacity: 1;
        transform: scale(1);
        transition: opacity 0.8s ease, transform 6s ease;
      }
      &.prev {
        opacity: 0;
      }
    }
    .hero-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(
        180deg,
        rgba(26,28,36,0.3) 0%,
        rgba(26,28,36,0.15) 40%,
        rgba(26,28,36,0.6) 70%,
        rgba(26,28,36,1) 100%
      );
      pointer-events: none;
    }
    .hero-content {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: flex-end;
      padding-bottom: 80px;
    }
    .hero-inner {
      max-width: 1400px;
      width: 100%;
      margin: 0 auto;
      padding: 0 32px;
      max-width: 680px;
      margin: 0 32px;
    }
    .hero-meta {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 8px;
      margin-bottom: 14px;
    }
    .meta-badge {
      background: linear-gradient(135deg, #FF271C, #F5852F);
      color: #fff;
      font-size: 10px;
      font-weight: 700;
      padding: 3px 8px;
      border-radius: 4px;
      letter-spacing: 1px;
    }
    .meta-rating {
      display: flex;
      align-items: center;
      gap: 4px;
      color: #F5852F;
      font-size: 13px;
      font-weight: 600;
    }
    .meta-year, .meta-duration {
      color: rgba(255,255,255,0.65);
      font-size: 13px;
    }
    .meta-genre {
      background: rgba(255,255,255,0.12);
      color: rgba(255,255,255,0.8);
      font-size: 11px;
      padding: 3px 8px;
      border-radius: 4px;
    }
    .hero-title {
      font-size: clamp(28px, 4.5vw, 52px);
      font-weight: 800;
      line-height: 1.1;
      margin-bottom: 14px;
      color: #fff;
      text-shadow: 0 2px 8px rgba(0,0,0,0.5);
    }
    .hero-desc {
      color: rgba(255,255,255,0.75);
      font-size: 14px;
      line-height: 1.6;
      margin-bottom: 24px;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
      max-width: 520px;
    }
    .hero-actions {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
    }
    .btn-play {
      display: flex;
      align-items: center;
      gap: 8px;
      background: linear-gradient(135deg, #FF271C, #F5852F);
      color: #fff;
      font-size: 15px;
      font-weight: 700;
      padding: 12px 28px;
      border-radius: 28px;
      transition: all 0.2s;
      text-decoration: none;
      box-shadow: 0 4px 20px rgba(255,40,28,0.45);
      &:hover { transform: translateY(-2px); box-shadow: 0 6px 24px rgba(255,40,28,0.55); }
    }
    .btn-fav {
      display: flex;
      align-items: center;
      gap: 8px;
      background: rgba(255,255,255,0.12);
      color: #fff;
      font-size: 15px;
      font-weight: 600;
      padding: 12px 24px;
      border-radius: 28px;
      border: 1px solid rgba(255,255,255,0.2);
      transition: all 0.2s;
      cursor: pointer;
      backdrop-filter: blur(4px);
      &:hover { background: rgba(255,255,255,0.2); }
    }
    .btn-info {
      display: flex;
      align-items: center;
      gap: 8px;
      background: rgba(255,255,255,0.08);
      color: rgba(255,255,255,0.85);
      font-size: 15px;
      font-weight: 600;
      padding: 12px 20px;
      border-radius: 28px;
      border: 1px solid rgba(255,255,255,0.12);
      transition: all 0.2s;
      text-decoration: none;
      backdrop-filter: blur(4px);
      &:hover { background: rgba(255,255,255,0.15); color: #fff; }
    }
    .hero-dots {
      position: absolute;
      bottom: 28px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      gap: 6px;
    }
    .dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: rgba(255,255,255,0.3);
      border: none;
      cursor: pointer;
      transition: all 0.25s;
      padding: 0;
      &.active { background: #FF271C; width: 22px; border-radius: 4px; }
      &:hover { background: rgba(255,255,255,0.6); }
    }
    .hero-arrow {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 46px;
      height: 46px;
      border-radius: 50%;
      background: rgba(26,28,36,0.6);
      color: rgba(255,255,255,0.8);
      border: 1px solid rgba(255,255,255,0.15);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s;
      backdrop-filter: blur(4px);
      &:hover { background: rgba(255,40,28,0.6); color: #fff; border-color: transparent; }
    }
    .hero-prev { left: 20px; }
    .hero-next { right: 20px; }
    @media (max-width: 768px) {
      .hero { height: 70vw; min-height: 400px; max-height: 600px; }
      .hero-inner { margin: 0 16px; }
      .hero-arrow { display: none; }
      .hero-desc { display: none; }
    }
  `]
})
export class HeroBannerComponent implements OnInit, OnDestroy {
  featured = signal<Movie[]>([]);
  currentIndex = signal(0);
  prevIndex = signal(0);
  private timer: ReturnType<typeof setInterval> | null = null;

  constructor(private movieService: MovieService) {}

  ngOnInit() {
    this.featured.set(this.movieService.getFeatured());
    this.startTimer();
  }

  ngOnDestroy() {
    this.stopTimer();
  }

  startTimer() {
    this.timer = setInterval(() => this.next(), 6000);
  }

  stopTimer() {
    if (this.timer) clearInterval(this.timer);
  }

  next() {
    this.prevIndex.set(this.currentIndex());
    this.currentIndex.update(i => (i + 1) % this.featured().length);
  }

  prev() {
    this.prevIndex.set(this.currentIndex());
    this.currentIndex.update(i => (i - 1 + this.featured().length) % this.featured().length);
  }

  goTo(index: number) {
    this.prevIndex.set(this.currentIndex());
    this.currentIndex.set(index);
    this.stopTimer();
    this.startTimer();
  }
}
