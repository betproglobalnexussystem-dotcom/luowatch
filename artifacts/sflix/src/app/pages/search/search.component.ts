import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Movie } from '../../models/movie.model';
import { MovieService } from '../../services/movie.service';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, RouterLink, MovieCardComponent],
  template: `
    <div class="search-page">
      <div class="search-header">
        <div class="header-content">
          <h1>Search Results</h1>
          @if(query()) {
            <p>Showing results for "<strong>{{ query() }}</strong>" — {{ results().length }} found</p>
          }
        </div>
      </div>
      <div class="search-body">
        @if(results().length > 0) {
          <div class="results-grid">
            @for(movie of results(); track movie.id) {
              <app-movie-card [movie]="movie"></app-movie-card>
            }
          </div>
        } @else {
          <div class="no-results">
            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            <p>No results found for "{{ query() }}"</p>
            <a routerLink="/" class="home-link">Back to Home</a>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .search-page {
      background: #1a1c24;
      min-height: 100vh;
      padding-top: 64px;
    }
    .search-header {
      padding: 40px 32px 28px;
      border-bottom: 1px solid rgba(255,255,255,0.06);
    }
    .header-content {
      max-width: 1400px;
      margin: 0 auto;
      h1 { font-size: 28px; font-weight: 800; color: #fff; margin-bottom: 6px; }
      p { color: rgba(255,255,255,0.5); font-size: 14px; }
      strong { color: #FF271C; }
    }
    .search-body {
      max-width: 1400px;
      margin: 0 auto;
      padding: 28px 32px;
    }
    .results-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
      gap: 16px;
    }
    .no-results {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 14px;
      padding: 80px 0;
      color: rgba(255,255,255,0.4);
      font-size: 15px;
    }
    .home-link {
      color: #FF271C;
      font-size: 14px;
      margin-top: 8px;
    }
    @media (max-width: 768px) {
      .search-body, .search-header { padding: 20px 16px; }
    }
  `]
})
export class SearchComponent implements OnInit {
  query = signal('');
  results = signal<Movie[]>([]);

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const q = params['q'] || '';
      this.query.set(q);
      if (q) {
        const all = this.movieService.getSections().flatMap(s => s.movies)
          .filter((m, i, arr) => arr.findIndex(x => x.id === m.id) === i);
        const lower = q.toLowerCase();
        this.results.set(all.filter(m =>
          m.title.toLowerCase().includes(lower) ||
          m.genres.some(g => g.toLowerCase().includes(lower))
        ));
      } else {
        this.results.set([]);
      }
    });
  }
}
