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
    path: 'watch/:id',
    loadComponent: () => import('./pages/watch/watch.component').then(m => m.WatchComponent)
  },
  {
    path: 'detail/:id',
    redirectTo: m => `/watch/${m.params['id']}`
  },
  {
    path: 'vj',
    loadComponent: () => import('./pages/vj-dashboard/vj-dashboard.component').then(m => m.VjDashboardComponent)
  },
  {
    path: 'admin',
    loadComponent: () => import('./pages/admin-dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent)
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
