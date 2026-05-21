import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'movies',
    loadComponent: () => import('./pages/movies/movies.component').then(m => m.MoviesComponent)
  },
  {
    path: 'tv-shows',
    loadComponent: () => import('./pages/tv-shows/tv-shows.component').then(m => m.TvShowsComponent)
  },
  {
    path: 'detail/:id',
    loadComponent: () => import('./pages/detail/detail.component').then(m => m.DetailComponent)
  },
  {
    path: 'search',
    loadComponent: () => import('./pages/search/search.component').then(m => m.SearchComponent)
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found.component').then(m => m.NotFoundComponent)
  }
];
