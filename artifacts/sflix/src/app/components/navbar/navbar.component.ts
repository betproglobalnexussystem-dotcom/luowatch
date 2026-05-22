import { Component, HostListener, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule, FormsModule],
  template: `
    <header class="header" [class.scrolled]="isScrolled()">
      <div class="header-inner">
        <div class="header-left">
          <a routerLink="/" class="logo">
            <svg width="130" height="28" viewBox="0 0 130 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <text x="0" y="22" font-family="Inter, sans-serif" font-weight="800" font-size="18" fill="url(#grad)">LUO WATCH</text>
              <defs>
                <linearGradient id="grad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stop-color="#FF271C"/>
                  <stop offset="100%" stop-color="#F5852F"/>
                </linearGradient>
              </defs>
            </svg>
          </a>
          <nav class="desktop-nav">
            <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}" class="nav-link">Home</a>
            <a routerLink="/movies" routerLinkActive="active" class="nav-link">Movies</a>
            <a routerLink="/tv-shows" routerLinkActive="active" class="nav-link">TV Shows</a>
            <a routerLink="/vj" routerLinkActive="active" class="nav-link">VJ Dashboard</a>
            <a routerLink="/admin" routerLinkActive="active" class="nav-link">Admin</a>
            <div class="nav-dropdown" (mouseenter)="showExplore.set(true)" (mouseleave)="showExplore.set(false)">
              <button class="nav-link dropdown-btn">
                Explore
                <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor"><path d="M2 4l4 4 4-4"/></svg>
              </button>
              @if(showExplore()) {
                <div class="dropdown-menu">
                  <a routerLink="/movies" class="dropdown-item">All Movies</a>
                  <a routerLink="/tv-shows" class="dropdown-item">TV Series</a>
                  <a routerLink="/movies" class="dropdown-item">Anime</a>
                  <a routerLink="/movies" class="dropdown-item">Documentaries</a>
                </div>
              }
            </div>
            <div class="nav-dropdown" (mouseenter)="showCategories.set(true)" (mouseleave)="showCategories.set(false)">
              <button class="nav-link dropdown-btn">
                Categories
                <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor"><path d="M2 4l4 4 4-4"/></svg>
              </button>
              @if(showCategories()) {
                <div class="dropdown-menu">
                  <a routerLink="/movies" class="dropdown-item">Action</a>
                  <a routerLink="/movies" class="dropdown-item">Horror</a>
                  <a routerLink="/movies" class="dropdown-item">Romance</a>
                  <a routerLink="/movies" class="dropdown-item">Comedy</a>
                  <a routerLink="/movies" class="dropdown-item">Drama</a>
                  <a routerLink="/movies" class="dropdown-item">Sci-Fi</a>
                </div>
              }
            </div>
          </nav>
        </div>

        <div class="header-right">
          <div class="search-wrap desktop-only">
            @if(searchOpen()) {
              <input
                class="search-input"
                type="text"
                placeholder="Search movies, shows..."
                [(ngModel)]="searchQuery"
                (keyup.enter)="doSearch()"
                (keyup.escape)="searchOpen.set(false)"
                #searchInput
                autofocus
              />
            }
            <button class="icon-btn" (click)="toggleSearch()">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
            </button>
          </div>

          <div class="lang-selector desktop-only">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
            <span>ENGLISH</span>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor"><path d="M2 4l4 4 4-4"/></svg>
          </div>

          <button class="icon-btn mobile-only" (click)="mobileOpen.set(!mobileOpen())">
            @if(!mobileOpen()) {
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            } @else {
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            }
          </button>
        </div>
      </div>

      @if(mobileOpen()) {
        <div class="mobile-menu">
          <a routerLink="/" class="mobile-link" (click)="mobileOpen.set(false)">Home</a>
          <a routerLink="/movies" class="mobile-link" (click)="mobileOpen.set(false)">Movies</a>
          <a routerLink="/tv-shows" class="mobile-link" (click)="mobileOpen.set(false)">TV Shows</a>
          <a routerLink="/vj" class="mobile-link" (click)="mobileOpen.set(false)">VJ Dashboard</a>
          <a routerLink="/admin" class="mobile-link" (click)="mobileOpen.set(false)">Admin</a>
          <a routerLink="/movies" class="mobile-link" (click)="mobileOpen.set(false)">Action</a>
          <a routerLink="/movies" class="mobile-link" (click)="mobileOpen.set(false)">Horror</a>
          <div class="mobile-search">
            <input type="text" placeholder="Search..." [(ngModel)]="searchQuery" (keyup.enter)="doSearch(); mobileOpen.set(false)">
          </div>
        </div>
      }
    </header>
  `,
  styles: [`
    .header {
      position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
      padding: 0 24px;
      background: linear-gradient(135deg, rgba(6,78,59,0.93) 0%, rgba(16,185,129,0.68) 50%, rgba(5,150,105,0.9) 100%);
      backdrop-filter: blur(22px) saturate(180%);
      -webkit-backdrop-filter: blur(22px) saturate(180%);
      border-bottom: 1px solid rgba(52,211,153,0.28);
      box-shadow: 0 4px 28px rgba(0,0,0,0.32), inset 0 1px 0 rgba(255,255,255,0.1);
      transition: all 0.3s ease;
    }
    .header.scrolled {
      background: linear-gradient(135deg, rgba(4,47,36,0.97) 0%, rgba(6,95,70,0.96) 100%);
      backdrop-filter: blur(28px) saturate(220%);
      box-shadow: 0 4px 32px rgba(0,0,0,0.55), 0 0 0 1px rgba(52,211,153,0.18);
    }
    .header-inner {
      max-width: 1400px; margin: 0 auto; height: 64px;
      display: flex; align-items: center; justify-content: space-between; gap: 24px;
    }
    .header-left { display: flex; align-items: center; gap: 40px; }
    .header-right { display: flex; align-items: center; gap: 16px; }
    .logo { display: flex; align-items: center; text-decoration: none; flex-shrink: 0; }
    .desktop-nav { display: flex; align-items: center; gap: 4px; }
    .nav-link {
      color: rgba(255,255,255,0.9); font-size: 14px; font-weight: 500;
      padding: 8px 12px; border-radius: 6px; transition: color 0.2s, background 0.2s;
      text-decoration: none; white-space: nowrap;
      &:hover, &.active { color: #fff; background: rgba(52,211,153,0.2); }
    }
    .dropdown-btn {
      display: flex; align-items: center; gap: 5px;
      color: rgba(255,255,255,0.9); font-size: 14px; font-weight: 500;
      padding: 8px 12px; border-radius: 6px; transition: color 0.2s, background 0.2s;
      cursor: pointer; background: none; border: none;
      &:hover { color: #fff; background: rgba(52,211,153,0.2); }
      svg { opacity: 0.75; }
    }
    .nav-dropdown { position: relative; }
    .dropdown-menu {
      position: absolute; top: calc(100% + 8px); left: 0;
      background: rgba(4,47,36,0.96); backdrop-filter: blur(20px) saturate(180%);
      border: 1px solid rgba(52,211,153,0.22); border-radius: 10px; padding: 8px;
      min-width: 160px; box-shadow: 0 16px 40px rgba(0,0,0,0.65); z-index: 100;
    }
    .dropdown-item {
      display: block; padding: 9px 12px; color: rgba(255,255,255,0.82);
      font-size: 14px; border-radius: 6px; transition: all 0.15s; text-decoration: none;
      &:hover { color: #fff; background: rgba(52,211,153,0.18); }
    }
    .icon-btn {
      display: flex; align-items: center; justify-content: center;
      width: 36px; height: 36px; border-radius: 50%; color: rgba(255,255,255,0.88);
      transition: all 0.2s; background: none; border: none; cursor: pointer;
      &:hover { color: #fff; background: rgba(52,211,153,0.22); }
    }
    .search-wrap { display: flex; align-items: center; gap: 4px; }
    .search-input {
      background: rgba(255,255,255,0.1); border: 1px solid rgba(52,211,153,0.28);
      border-radius: 20px; padding: 6px 14px; color: #fff; font-size: 14px;
      outline: none; width: 220px; transition: all 0.2s;
      &::placeholder { color: rgba(255,255,255,0.45); }
      &:focus { border-color: rgba(52,211,153,0.6); background: rgba(255,255,255,0.13); }
    }
    .lang-selector {
      display: flex; align-items: center; gap: 6px; padding: 6px 12px;
      border: 1px solid rgba(52,211,153,0.32); border-radius: 20px;
      font-size: 12px; font-weight: 600; color: rgba(255,255,255,0.9);
      cursor: pointer; transition: all 0.2s; letter-spacing: 0.5px;
      &:hover { border-color: rgba(52,211,153,0.65); color: #fff; background: rgba(52,211,153,0.12); }
    }
    .mobile-menu {
      background: rgba(4,40,30,0.97); backdrop-filter: blur(20px);
      border-top: 1px solid rgba(52,211,153,0.15); padding: 12px 0;
    }
    .mobile-link {
      display: block; padding: 12px 24px; color: rgba(255,255,255,0.88);
      font-size: 15px; font-weight: 500; transition: color 0.2s; text-decoration: none;
      &:hover { color: #fff; background: rgba(52,211,153,0.12); }
    }
    .mobile-search {
      padding: 12px 24px;
      input {
        width: 100%; background: rgba(255,255,255,0.1);
        border: 1px solid rgba(52,211,153,0.22); border-radius: 20px;
        padding: 10px 16px; color: #fff; font-size: 14px; outline: none;
        &::placeholder { color: rgba(255,255,255,0.4); }
      }
    }
    @media (max-width: 768px) {
      .desktop-nav, .desktop-only { display: none !important; }
      .mobile-only { display: flex !important; }
    }
    @media (min-width: 769px) {
      .mobile-only { display: none !important; }
      .mobile-menu { display: none !important; }
    }
  `]
})
export class NavbarComponent {
  isScrolled = signal(false);
  searchOpen = signal(false);
  mobileOpen = signal(false);
  showExplore = signal(false);
  showCategories = signal(false);
  searchQuery = '';

  constructor(private router: Router) {}

  @HostListener('window:scroll')
  onScroll() {
    this.isScrolled.set(window.scrollY > 20);
  }

  toggleSearch() {
    this.searchOpen.update(v => !v);
    if (!this.searchOpen()) this.searchQuery = '';
  }

  doSearch() {
    if (this.searchQuery.trim()) {
      this.router.navigate(['/search'], { queryParams: { q: this.searchQuery } });
      this.searchOpen.set(false);
      this.searchQuery = '';
    }
  }
}
