import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Movie } from '../../models/movie.model';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [RouterLink, CommonModule],
  template: `
    <a class="card" [routerLink]="['/watch', movie.id]">
      <div class="card-cover">
        <img
          [src]="movie.posterUrl"
          [alt]="movie.title"
          loading="lazy"
          (error)="onImgError($event)"
        />
        @if(movie.vjName) {
          <span class="quality-badge">{{ movie.vjName }}</span>
        } @else if(movie.quality) {
          <span class="quality-badge">{{ movie.quality }}</span>
        }
        <div class="card-hover">
          <button class="play-btn" (click)="$event.stopPropagation()">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
          </button>
          <div class="hover-info">
            @if((movie.rating ?? 0) > 0) {
              <span class="hover-rating">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="#F5852F"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                {{ movie.rating | number:'1.1-1' }}
              </span>
            }
            <span class="hover-year">{{ movie.year }}</span>
          </div>
        </div>
      </div>
      <div class="card-title">{{ movie.title }}</div>
    </a>
  `,
  styles: [`
    .card {
      display: block;
      text-decoration: none;
      cursor: pointer;
      flex-shrink: 0;
      width: 140px;
      transition: transform 0.25s ease;
      &:hover { transform: translateY(-4px); }
      &:hover .card-hover { opacity: 1; }
      &:hover .card-cover img { filter: brightness(0.6); }
    }
    .card-cover {
      position: relative;
      width: 100%;
      padding-bottom: 140%;
      background: #2b2e39;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 4px 16px rgba(0,0,0,0.4);
      img {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: filter 0.25s ease;
      }
    }
    .quality-badge {
      position: absolute;
      top: 7px;
      right: 7px;
      background: linear-gradient(135deg, #FF271C, #F5852F);
      color: #fff;
      font-size: 9px;
      font-weight: 700;
      padding: 2px 5px;
      border-radius: 3px;
      letter-spacing: 0.5px;
      z-index: 2;
    }
    .card-hover {
      position: absolute;
      inset: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: opacity 0.25s ease;
      z-index: 3;
    }
    .play-btn {
      width: 42px;
      height: 42px;
      border-radius: 50%;
      background: rgba(255,255,255,0.95);
      color: #1a1c24;
      display: flex;
      align-items: center;
      justify-content: center;
      border: none;
      cursor: pointer;
      transition: transform 0.2s;
      padding-left: 2px;
      &:hover { transform: scale(1.1); }
    }
    .hover-info {
      position: absolute;
      bottom: 8px;
      left: 8px;
      display: flex;
      gap: 5px;
      align-items: center;
    }
    .hover-rating {
      display: flex;
      align-items: center;
      gap: 3px;
      color: #F5852F;
      font-size: 10px;
      font-weight: 600;
    }
    .hover-year {
      color: rgba(255,255,255,0.7);
      font-size: 10px;
    }
    .card-title {
      margin-top: 7px;
      color: rgba(255,255,255,0.85);
      font-size: 12px;
      font-weight: 500;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      line-height: 1.3;
    }
  `]
})
export class MovieCardComponent {
  @Input({ required: true }) movie!: Movie;

  onImgError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.style.display = 'none';
  }
}
