import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Movie } from '../../models/movie.model';
import { MovieService } from '../../services/movie.service';
import { MovieSectionComponent } from '../../components/movie-section/movie-section.component';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, MovieSectionComponent],
  template: `
    @let movie = currentMovie();
    @if(movie) {
      <div class="detail-page">
        <div class="backdrop" [style.background-image]="'url(' + movie.backdrop + ')'">
          <div class="backdrop-overlay"></div>
        </div>

        <div class="detail-content">
          <div class="back-btn">
            <a routerLink="/" class="btn-back">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>
              Back
            </a>
          </div>

          <div class="detail-main">
            <div class="detail-poster">
              <img [src]="movie.poster" [alt]="movie.title">
            </div>

            <div class="detail-info">
              <div class="info-badges">
                <span class="badge-type">{{ movie.type === 'tv' ? 'TV SERIES' : 'MOVIE' }}</span>
                @if(movie.quality) {
                  <span class="badge-quality">{{ movie.quality }}</span>
                }
              </div>

              <h1 class="detail-title">{{ movie.title }}</h1>

              <div class="detail-meta">
                <span class="meta-rating">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="#F5852F"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                  {{ movie.rating | number:'1.1-1' }} / 10
                </span>
                <span>{{ movie.year }}</span>
                <span>{{ movie.duration }}</span>
                @if(movie.language) {
                  <span>{{ movie.language }}</span>
                }
              </div>

              <div class="detail-genres">
                @for(genre of movie.genres; track genre) {
                  <span class="genre-tag">{{ genre }}</span>
                }
              </div>

              <p class="detail-desc">{{ movie.description }}</p>

              <div class="detail-actions">
                <button class="btn-play">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                  Play Now
                </button>
                <button class="btn-trailer">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                  Trailer
                </button>
                <button class="btn-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                </button>
                <button class="btn-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        @if(related().movies.length) {
          <div class="related-section">
            <app-movie-section [section]="related()"></app-movie-section>
          </div>
        }
      </div>
    } @else {
      <div class="not-found">
        <h2>Movie not found</h2>
        <a routerLink="/">Go Home</a>
      </div>
    }
  `,
  styles: [`
    .detail-page {
      background: #1a1c24;
      min-height: 100vh;
      padding-top: 48px;
      position: relative;
    }
    .backdrop {
      position: absolute;
      top: 0; left: 0; right: 0;
      height: 580px;
      background-size: cover;
      background-position: center top;
      z-index: 0;
    }
    .backdrop-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(180deg, rgba(26,28,36,0.5) 0%, rgba(26,28,36,0.85) 60%, #1a1c24 100%);
    }
    .detail-content {
      position: relative;
      z-index: 1;
      max-width: 1400px;
      margin: 0 auto;
      padding: 24px 32px 48px;
    }
    .back-btn {
      margin-bottom: 32px;
    }
    .btn-back {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      color: rgba(255,255,255,0.7);
      font-size: 14px;
      font-weight: 500;
      padding: 8px 16px;
      background: rgba(255,255,255,0.1);
      border-radius: 20px;
      transition: all 0.2s;
      text-decoration: none;
      &:hover { color: #fff; background: rgba(255,255,255,0.18); }
    }
    .detail-main {
      display: grid;
      grid-template-columns: 220px 1fr;
      gap: 40px;
      align-items: start;
    }
    .detail-poster {
      img {
        width: 100%;
        border-radius: 12px;
        box-shadow: 0 20px 60px rgba(0,0,0,0.7);
      }
    }
    .detail-info { padding-top: 8px; }
    .info-badges {
      display: flex;
      gap: 8px;
      margin-bottom: 14px;
    }
    .badge-type {
      background: linear-gradient(135deg, #FF271C, #F5852F);
      color: #fff;
      font-size: 10px;
      font-weight: 700;
      padding: 3px 10px;
      border-radius: 4px;
      letter-spacing: 1px;
    }
    .badge-quality {
      background: rgba(255,255,255,0.12);
      color: rgba(255,255,255,0.85);
      font-size: 10px;
      font-weight: 700;
      padding: 3px 10px;
      border-radius: 4px;
    }
    .detail-title {
      font-size: 38px;
      font-weight: 800;
      color: #fff;
      margin-bottom: 12px;
      line-height: 1.1;
    }
    .detail-meta {
      display: flex;
      flex-wrap: wrap;
      gap: 16px;
      align-items: center;
      margin-bottom: 14px;
      color: rgba(255,255,255,0.6);
      font-size: 14px;
    }
    .meta-rating {
      display: flex;
      align-items: center;
      gap: 5px;
      color: #F5852F;
      font-weight: 600;
    }
    .detail-genres {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-bottom: 20px;
    }
    .genre-tag {
      background: rgba(255,255,255,0.08);
      color: rgba(255,255,255,0.75);
      font-size: 13px;
      padding: 4px 12px;
      border-radius: 20px;
      border: 1px solid rgba(255,255,255,0.1);
    }
    .detail-desc {
      color: rgba(255,255,255,0.75);
      font-size: 15px;
      line-height: 1.7;
      margin-bottom: 28px;
      max-width: 600px;
    }
    .detail-actions {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
      align-items: center;
    }
    .btn-play {
      display: flex;
      align-items: center;
      gap: 8px;
      background: linear-gradient(135deg, #FF271C, #F5852F);
      color: #fff;
      font-size: 15px;
      font-weight: 700;
      padding: 13px 32px;
      border-radius: 28px;
      border: none;
      cursor: pointer;
      box-shadow: 0 4px 20px rgba(255,40,28,0.45);
      transition: all 0.2s;
      &:hover { transform: translateY(-2px); }
    }
    .btn-trailer {
      display: flex;
      align-items: center;
      gap: 8px;
      background: rgba(255,255,255,0.1);
      color: #fff;
      font-size: 15px;
      font-weight: 600;
      padding: 13px 24px;
      border-radius: 28px;
      border: 1px solid rgba(255,255,255,0.2);
      cursor: pointer;
      transition: all 0.2s;
      &:hover { background: rgba(255,255,255,0.18); }
    }
    .btn-icon {
      width: 46px;
      height: 46px;
      border-radius: 50%;
      background: rgba(255,255,255,0.08);
      color: rgba(255,255,255,0.8);
      border: 1px solid rgba(255,255,255,0.15);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.2s;
      &:hover { background: rgba(255,255,255,0.18); color: #fff; }
    }
    .related-section {
      position: relative;
      z-index: 1;
      padding-top: 12px;
    }
    .not-found {
      min-height: 60vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 16px;
      color: rgba(255,255,255,0.6);
      h2 { font-size: 22px; }
      a { color: #FF271C; }
    }
    @media (max-width: 768px) {
      .detail-main { grid-template-columns: 1fr; }
      .detail-poster { max-width: 200px; }
      .detail-content { padding: 16px; }
      .detail-title { font-size: 26px; }
    }
  `]
})
export class DetailComponent implements OnInit {
  currentMovie = signal<Movie | undefined>(undefined);
  related = signal({ title: 'You May Also Like', slug: 'related', movies: [] as Movie[] });

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = Number(params['id']);
      const featured = this.movieService.getFeatured();
      const all = this.movieService.getSections().flatMap(s => s.movies);
      const movie = featured.find(m => m.id === id) || all.find(m => m.id === id);
      this.currentMovie.set(movie);

      if (movie) {
        const similar = all
          .filter(m => m.id !== id && m.genres.some(g => movie.genres.includes(g)))
          .filter((m, i, arr) => arr.findIndex(x => x.id === m.id) === i)
          .slice(0, 10);
        this.related.set({ title: 'You May Also Like', slug: 'related', movies: similar });
      }
    });
  }
}
