import { Component, Input, ElementRef, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MovieSection } from '../../models/movie.model';
import { MovieCardComponent } from '../movie-card/movie-card.component';

@Component({
  selector: 'app-movie-section',
  standalone: true,
  imports: [RouterLink, CommonModule, MovieCardComponent],
  template: `
    <section class="section">
      <div class="section-header">
        <div class="section-title-wrap">
          <span class="title-bar"></span>
          <h2 class="section-title">{{ section.title }}</h2>
        </div>
        <a [routerLink]="['/movies']" class="more-link">
          More
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
        </a>
      </div>

      <div class="scroll-wrapper">
        <button class="arrow arrow-left" (click)="scrollLeft()" [class.hidden]="atStart">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
        </button>

        <div class="scroll-track no-scrollbar" #scrollTrack (scroll)="onScroll()">
          @for(movie of section.movies; track movie.id) {
            <app-movie-card [movie]="movie"></app-movie-card>
          }
        </div>

        <button class="arrow arrow-right" (click)="scrollRight()" [class.hidden]="atEnd">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
      </div>
    </section>
  `,
  styles: [`
    .section {
      padding: 0 0 10px;
    }
    .section-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 32px 10px;
      max-width: 1400px;
      margin: 0 auto;
    }
    .section-title-wrap {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .title-bar {
      width: 4px;
      height: 22px;
      background: linear-gradient(180deg, #FF271C, #F5852F);
      border-radius: 2px;
      flex-shrink: 0;
    }
    .section-title {
      font-size: 18px;
      font-weight: 700;
      color: #fff;
      letter-spacing: -0.2px;
    }
    .more-link {
      display: flex;
      align-items: center;
      gap: 4px;
      color: rgba(255,255,255,0.55);
      font-size: 13px;
      font-weight: 500;
      text-decoration: none;
      transition: color 0.2s;
      &:hover { color: #FF271C; }
    }
    .scroll-wrapper {
      position: relative;
      max-width: 1400px;
      margin: 0 auto;
      padding: 0 32px;
    }
    .scroll-track {
      display: flex;
      gap: 12px;
      overflow-x: auto;
      scroll-behavior: smooth;
      padding-bottom: 8px;
    }
    .arrow {
      position: absolute;
      top: 50%;
      transform: translateY(-60%);
      z-index: 10;
      width: 38px;
      height: 38px;
      border-radius: 50%;
      background: rgba(26,28,36,0.9);
      color: rgba(255,255,255,0.9);
      border: 1px solid rgba(255,255,255,0.15);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s;
      backdrop-filter: blur(4px);
      &:hover {
        background: linear-gradient(135deg, #FF271C, #F5852F);
        border-color: transparent;
        transform: translateY(-60%) scale(1.05);
      }
      &.hidden { opacity: 0; pointer-events: none; }
    }
    .arrow-left { left: -4px; }
    .arrow-right { right: -4px; }
    @media (max-width: 768px) {
      .section-header { padding: 0 16px 12px; }
      .scroll-wrapper { padding: 0 16px; }
      .arrow { display: none; }
    }
  `]
})
export class MovieSectionComponent {
  @Input({ required: true }) section!: MovieSection;
  @ViewChild('scrollTrack') scrollTrack!: ElementRef<HTMLDivElement>;

  atStart = true;
  atEnd = false;

  onScroll() {
    const el = this.scrollTrack?.nativeElement;
    if (!el) return;
    this.atStart = el.scrollLeft <= 10;
    this.atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 10;
  }

  scrollLeft() {
    const el = this.scrollTrack?.nativeElement;
    if (el) el.scrollBy({ left: -460, behavior: 'smooth' });
  }

  scrollRight() {
    const el = this.scrollTrack?.nativeElement;
    if (el) el.scrollBy({ left: 460, behavior: 'smooth' });
  }
}
