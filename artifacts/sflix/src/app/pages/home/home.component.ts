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
      <div class="sections">
        @for(section of sections(); track section.slug) {
          <app-movie-section [section]="section"></app-movie-section>
        }
      </div>
    </div>
  `,
  styles: [`
    .home {
      background: #1a1c24;
      min-height: 100vh;
    }
    .sections {
      padding: 32px 0 0;
    }
  `]
})
export class HomeComponent implements OnInit {
  sections = signal<MovieSection[]>([]);

  constructor(private movieService: MovieService) {}

  ngOnInit() {
    this.sections.set(this.movieService.getSections());
  }
}
