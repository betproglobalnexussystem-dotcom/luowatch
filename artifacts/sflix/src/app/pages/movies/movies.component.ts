import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Movie } from '../../models/movie.model';
import { MovieService } from '../../services/movie.service';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, MovieCardComponent],
  template: `
    <div class="movies-page">
      <div class="page-header">
        <div class="header-bg"></div>
        <div class="header-content">
          <h1>Movies</h1>
          <p>Explore thousands of movies from every genre</p>
        </div>
      </div>

      <div class="page-body">
        <div class="filter-bar">
          <div class="filter-group">
            <button
              class="filter-btn"
              [class.active]="activeGenre() === ''"
              (click)="activeGenre.set('')"
            >All</button>
            @for(genre of genres; track genre) {
              <button
                class="filter-btn"
                [class.active]="activeGenre() === genre"
                (click)="activeGenre.set(genre)"
              >{{ genre }}</button>
            }
          </div>
          <div class="sort-wrap">
            <select class="sort-select" [(ngModel)]="sortBy">
              <option value="rating">Top Rated</option>
              <option value="year">Newest</option>
              <option value="title">A-Z</option>
            </select>
          </div>
        </div>

        @if(loading()) {
          <div class="loading-state"><div class="spinner"></div></div>
        } @else {
          <div class="movies-grid">
            @for(movie of filteredMovies(); track movie.id) {
              <app-movie-card [movie]="movie"></app-movie-card>
            }
            @if(filteredMovies().length === 0) {
              <div class="empty-msg">No movies found.</div>
            }
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .movies-page {
      background: #1a1c24;
      min-height: 100vh;
      padding-top: 48px;
    }
    .page-header {
      position: relative;
      padding: 48px 32px 36px;
      background: linear-gradient(180deg, rgba(255,39,28,0.12) 0%, transparent 100%);
      border-bottom: 1px solid rgba(255,255,255,0.06);
    }
    .header-content {
      max-width: 1400px;
      margin: 0 auto;
      h1 { font-size: 32px; font-weight: 800; color: #fff; margin-bottom: 6px; }
      p { color: rgba(255,255,255,0.5); font-size: 14px; }
    }
    .page-body {
      max-width: 1400px;
      margin: 0 auto;
      padding: 28px 32px;
    }
    .filter-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 12px;
      margin-bottom: 28px;
    }
    .filter-group {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }
    .filter-btn {
      padding: 7px 16px;
      border-radius: 20px;
      font-size: 13px;
      font-weight: 500;
      color: rgba(255,255,255,0.65);
      background: rgba(255,255,255,0.07);
      border: 1px solid transparent;
      cursor: pointer;
      transition: all 0.2s;
      &:hover { color: #fff; background: rgba(255,255,255,0.12); }
      &.active {
        background: linear-gradient(135deg, #FF271C, #F5852F);
        color: #fff;
        border-color: transparent;
      }
    }
    .sort-select {
      background: rgba(255,255,255,0.08);
      border: 1px solid rgba(255,255,255,0.15);
      color: rgba(255,255,255,0.8);
      padding: 7px 14px;
      border-radius: 8px;
      font-size: 13px;
      outline: none;
      cursor: pointer;
    }
    .movies-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
      gap: 16px;
    }
    .loading-state {
      display: flex;
      justify-content: center;
      padding: 80px 0;
    }
    .spinner {
      width: 40px;
      height: 40px;
      border: 3px solid rgba(255,255,255,0.1);
      border-top-color: #FF271C;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }
    @keyframes spin { to { transform: rotate(360deg); } }
    .empty-msg {
      color: rgba(255,255,255,0.4);
      font-size: 14px;
      padding: 40px 0;
      grid-column: 1/-1;
      text-align: center;
    }
    @media (max-width: 768px) {
      .page-body { padding: 20px 16px; }
      .page-header { padding: 36px 16px 24px; }
    }
  `]
})
export class MoviesComponent implements OnInit {
  activeGenre = signal('');
  sortBy = 'rating';
  allMovies = signal<Movie[]>([]);
  loading = signal(true);
  genres = ['Action', 'Horror', 'Drama', 'Sci-Fi', 'Comedy', 'Thriller', 'Romance', 'Fantasy'];

  constructor(private movieService: MovieService) {}

  ngOnInit() {
    this.movieService.getAllMovies().then(movies => {
      this.allMovies.set(movies);
      this.loading.set(false);
    }).catch(() => this.loading.set(false));
  }

  filteredMovies() {
    let movies = this.allMovies();
    if (this.activeGenre()) {
      movies = movies.filter(m => m.genres?.some(g => g === this.activeGenre()));
    }
    if (this.sortBy === 'rating') movies = [...movies].sort((a, b) => b.rating - a.rating);
    else if (this.sortBy === 'year') movies = [...movies].sort((a, b) => b.year - a.year);
    else movies = [...movies].sort((a, b) => a.title.localeCompare(b.title));
    return movies;
  }
}
