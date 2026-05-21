import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Movie } from '../../models/movie.model';
import { MovieService } from '../../services/movie.service';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';

@Component({
  selector: 'app-tv-shows',
  standalone: true,
  imports: [CommonModule, MovieCardComponent],
  template: `
    <div class="tv-page">
      <div class="page-header">
        <div class="header-content">
          <h1>TV Shows</h1>
          <p>Stream the hottest TV series and episodes</p>
        </div>
      </div>
      <div class="page-body">
        <div class="filter-bar">
          @for(genre of genres; track genre) {
            <button
              class="filter-btn"
              [class.active]="activeGenre() === genre"
              (click)="activeGenre.set(genre)"
            >{{ genre }}</button>
          }
        </div>
        <div class="shows-grid">
          @for(show of shows(); track show.id) {
            <app-movie-card [movie]="show"></app-movie-card>
          }
        </div>
      </div>
    </div>
  `,
  styles: [`
    .tv-page {
      background: #1a1c24;
      min-height: 100vh;
      padding-top: 64px;
    }
    .page-header {
      padding: 48px 32px 36px;
      background: linear-gradient(180deg, rgba(255,133,47,0.1) 0%, transparent 100%);
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
      flex-wrap: wrap;
      gap: 8px;
      margin-bottom: 28px;
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
      }
    }
    .shows-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
      gap: 16px;
    }
    @media (max-width: 768px) {
      .page-body, .page-header { padding: 20px 16px; }
    }
  `]
})
export class TvShowsComponent implements OnInit {
  activeGenre = signal('All');
  allShows = signal<Movie[]>([]);
  genres = ['All', 'Drama', 'Action', 'Comedy', 'Sci-Fi', 'Fantasy', 'Thriller'];

  constructor(private movieService: MovieService) {}

  ngOnInit() {
    const all = this.movieService.getSections()
      .filter(s => s.slug === 'tv-shows' || s.slug === 'drama')
      .flatMap(s => s.movies)
      .filter((m, i, arr) => arr.findIndex(x => x.id === m.id) === i);
    this.allShows.set(all);
  }

  shows() {
    const genre = this.activeGenre();
    if (genre === 'All') return this.allShows();
    return this.allShows().filter(m => m.genres.some(g => g === genre));
  }
}
