import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroBannerComponent } from '../../components/hero-banner/hero-banner.component';
import { MovieSectionComponent } from '../../components/movie-section/movie-section.component';
import { MovieSection } from '../../models/movie.model';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeroBannerComponent, MovieSectionComponent],
  template: `
    <div class="home">
      <app-hero-banner></app-hero-banner>
      @if(loading()) {
        <div class="loading-state">
          <div class="spinner"></div>
        </div>
      } @else {
        <div class="sections">
          @for(section of sections(); track section.slug) {
            <app-movie-section [section]="section"></app-movie-section>
          }
          @if(sections().length === 0) {
            <div class="empty-state">
              <p>No content available yet. Check back soon!</p>
            </div>
          }
        </div>
      }
    </div>
  `,
  styles: [`
    .home {
      background: #1a1c24;
      min-height: 100vh;
    }
    .sections {
      padding: 16px 0 0;
    }
    .loading-state {
      display: flex;
      align-items: center;
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
    .empty-state {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 80px 32px;
      color: rgba(255,255,255,0.4);
      font-size: 15px;
    }
  `]
})
export class HomeComponent implements OnInit {
  sections = signal<MovieSection[]>([]);
  loading = signal(true);

  constructor(private movieService: MovieService) {}

  ngOnInit() {
    this.movieService.getSections().then(sections => {
      this.sections.set(sections);
      this.loading.set(false);
    }).catch(() => this.loading.set(false));
  }
}
