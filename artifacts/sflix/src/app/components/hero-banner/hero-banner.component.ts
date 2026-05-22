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
          [style.background-image]="'url(' + movie.backdrop + ')'"
        ></div>
      }

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
      height: 65vh;
      min-height: 400px;
      max-height: 680px;
      overflow: hidden;
      background: #0e1018;
    }
    .hero-slide {
      position: absolute;
      inset: 0;
      background-size: cover;
      background-position: center;
      opacity: 0;
      transition: opacity 0.8s ease;
      &.active {
        opacity: 1;
      }
    }
    .hero-dots {
      position: absolute;
      bottom: 18px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      gap: 5px;
      z-index: 10;
    }
    .dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: rgba(255,255,255,0.4);
      border: none;
      cursor: pointer;
      transition: all 0.25s;
      padding: 0;
      &.active { background: #FF271C; width: 18px; border-radius: 3px; }
      &:hover { background: rgba(255,255,255,0.7); }
    }
    .hero-arrow {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: rgba(0,0,0,0.35);
      color: #fff;
      border: 1px solid rgba(255,255,255,0.25);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s;
      z-index: 10;
      &:hover { background: rgba(255,40,28,0.7); border-color: transparent; }
    }
    .hero-prev { left: 16px; }
    .hero-next { right: 16px; }
    @media (max-width: 768px) {
      .hero { height: 56vw; min-height: 240px; max-height: 420px; }
      .hero-arrow { display: none; }
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
