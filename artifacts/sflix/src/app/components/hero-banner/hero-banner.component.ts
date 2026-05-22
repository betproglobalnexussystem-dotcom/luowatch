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
                <svg width="12" height="12" viewBox="0 0 24 24" fill="#F5852F"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                {{ movie.rating | number:'1.1-1' }}
              </span>
              <span class="meta-year">{{ movie.year }}</span>
              <span class="meta-duration">{{ movie.duration }}</span>
            </div>

            <h1 class="hero-title">{{ movie.title }}</h1>
            <p class="hero-desc">{{ movie.description }}</p>

            <div class="hero-actions">
              <a [routerLink]="['/watch', movie.id]" class="btn-play">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                Play Now
              </a>
              <a [routerLink]="['/watch', movie.id]" class="btn-info">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
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
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>
      </button>
      <button class="hero-arrow hero-next" (click)="next()">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
      </button>
    </div>
  `,
  styles: [`
    .hero {
      position: relative;
      width: 100%;
      height: 56vh;
      min-height: 360px;
      max-height: 560px;
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
      transform: scale(1.03);
      &.active {
        opacity: 1;
        transform: scale(1);
        transition: opacity 0.8s ease, transform 6s ease;
      }
      &.prev { opacity: 0; }
    }
    .hero-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(
        180deg,
        rgba(26,28,36,0.2) 0%,
        rgba(26,28,36,0.1) 35%,
        rgba(26,28,36,0.65) 65%,
        rgba(26,28,36,1) 100%
      );
      pointer-events: none;
    }
    .hero-content {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: flex-end;
      padding-bottom: 52px;
    }
    .hero-inner {
      max-width: 620px;
      margin: 0 32px;
    }
    .hero-meta {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 7px;
      margin-bottom: 10px;
    }
    .meta-badge {
      background: linear-gradient(135deg, #FF271C, #F5852F);
      color: #fff;
      font-size: 9px;
      font-weight: 700;
      padding: 2px 7px;
      border-radius: 4px;
      letter-spacing: 1px;
    }
    .meta-rating {
      display: flex;
      align-items: center;
      gap: 3px;
      color: #F5852F;
      font-size: 12px;
      font-weight: 600;
    }
    .meta-year, .meta-duration {
      color: rgba(255,255,255,0.6);
      font-size: 12px;
    }
    .hero-title {
      font-size: clamp(22px, 3.5vw, 40px);
      font-weight: 800;
      line-height: 1.1;
      margin-bottom: 10px;
      color: #fff;
      text-shadow: 0 2px 8px rgba(0,0,0,0.5);
    }
    .hero-desc {
      color: rgba(255,255,255,0.7);
      font-size: 13px;
      line-height: 1.6;
      margin-bottom: 18px;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      max-width: 480px;
    }
    .hero-actions {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
    }
    .btn-play {
      display: flex;
      align-items: center;
      gap: 7px;
      background: linear-gradient(135deg, #FF271C, #F5852F);
      color: #fff;
      font-size: 14px;
      font-weight: 700;
      padding: 10px 22px;
      border-radius: 24px;
      transition: all 0.2s;
      text-decoration: none;
      box-shadow: 0 4px 16px rgba(255,40,28,0.4);
      &:hover { transform: translateY(-2px); }
    }
    .btn-info {
      display: flex;
      align-items: center;
      gap: 7px;
      background: rgba(255,255,255,0.1);
      color: rgba(255,255,255,0.85);
      font-size: 14px;
      font-weight: 600;
      padding: 10px 18px;
      border-radius: 24px;
      border: 1px solid rgba(255,255,255,0.15);
      transition: all 0.2s;
      text-decoration: none;
      backdrop-filter: blur(4px);
      &:hover { background: rgba(255,255,255,0.18); color: #fff; }
    }
    .hero-dots {
      position: absolute;
      bottom: 18px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      gap: 5px;
    }
    .dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: rgba(255,255,255,0.3);
      border: none;
      cursor: pointer;
      transition: all 0.25s;
      padding: 0;
      &.active { background: #FF271C; width: 18px; border-radius: 3px; }
      &:hover { background: rgba(255,255,255,0.6); }
    }
    .hero-arrow {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 38px;
      height: 38px;
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
    .hero-prev { left: 16px; }
    .hero-next { right: 16px; }
    @media (max-width: 768px) {
      .hero { height: 52vw; min-height: 280px; max-height: 400px; }
      .hero-inner { margin: 0 14px; }
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

  ngOnDestroy() { this.stopTimer(); }

  startTimer() { this.timer = setInterval(() => this.next(), 6000); }
  stopTimer() { if (this.timer) clearInterval(this.timer); }

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
