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
            <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}" class="nav-link">HOME</a>
            <a routerLink="/movies" routerLinkActive="active" class="nav-link">MOVIES</a>
            <a routerLink="/tv-shows" routerLinkActive="active" class="nav-link">TV SHOWS</a>
            <a routerLink="/vj" routerLinkActive="active" class="nav-link">VJ DASHBOARD</a>
            <a routerLink="/admin" routerLinkActive="active" class="nav-link">ADMIN</a>
            <div class="nav-dropdown" (mouseenter)="showExplore.set(true)" (mouseleave)="showExplore.set(false)">
              <button class="nav-link dropdown-btn">
                EXPLORE
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
                CATEGORIES
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

          <a href="#" class="btn-app desktop-only" (click)="$event.preventDefault()">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.7 9.05 7.42c1.39.07 2.35.74 3.15.8 1.2-.24 2.35-.93 3.64-.84 1.54.13 2.7.73 3.44 1.85-3.15 1.88-2.4 5.98.48 7.13-.57 1.54-1.31 3.06-2.71 3.92zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/></svg>
            APP
          </a>

          <button class="btn-subscribe desktop-only" (click)="showSubscribeModal.set(true)">SUBSCRIBE</button>

          <button class="btn-login" (click)="showLoginModal.set(true)">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            LOGIN
          </button>

          <div class="lang-selector desktop-only">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
            <span>EN</span>
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
          <a routerLink="/" class="mobile-link" (click)="mobileOpen.set(false)">HOME</a>
          <a routerLink="/movies" class="mobile-link" (click)="mobileOpen.set(false)">MOVIES</a>
          <a routerLink="/tv-shows" class="mobile-link" (click)="mobileOpen.set(false)">TV SHOWS</a>
          <a routerLink="/vj" class="mobile-link" (click)="mobileOpen.set(false)">VJ DASHBOARD</a>
          <a routerLink="/admin" class="mobile-link" (click)="mobileOpen.set(false)">ADMIN</a>
          <div class="mobile-cta-row">
            <button class="btn-subscribe mobile-cta" (click)="mobileOpen.set(false); showSubscribeModal.set(true)">SUBSCRIBE</button>
            <button class="btn-login mobile-cta" (click)="mobileOpen.set(false); showLoginModal.set(true)">LOGIN</button>
          </div>
          <div class="mobile-search">
            <input type="text" placeholder="Search..." [(ngModel)]="searchQuery" (keyup.enter)="doSearch(); mobileOpen.set(false)">
          </div>
        </div>
      }
    </header>

    @if(showLoginModal()) {
      <div class="modal-overlay" (click)="closeLogin()">
        <div class="login-modal" (click)="$event.stopPropagation()">
          <button class="modal-close" (click)="closeLogin()">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
          <div class="lm-logo">
            <svg width="110" height="24" viewBox="0 0 110 24" fill="none">
              <text x="0" y="19" font-family="Inter, sans-serif" font-weight="800" font-size="16" fill="url(#lg2)">LUO WATCH</text>
              <defs>
                <linearGradient id="lg2" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stop-color="#FF271C"/>
                  <stop offset="100%" stop-color="#F5852F"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
          <h2 class="lm-title">Welcome back</h2>
          <p class="lm-sub">Sign in to continue watching</p>

          @if(!loginSuccess()) {
            <form class="lm-form" (ngSubmit)="doLogin()">
              <div class="lm-field">
                <label>Email</label>
                <input type="email" [(ngModel)]="loginEmail" name="email" placeholder="you@example.com" autocomplete="email" required>
              </div>
              <div class="lm-field">
                <label>Password</label>
                <div class="lm-pw-wrap">
                  <input [type]="showPw() ? 'text' : 'password'" [(ngModel)]="loginPassword" name="password" placeholder="••••••••" autocomplete="current-password" required>
                  <button type="button" class="lm-eye" (click)="showPw.set(!showPw())">
                    @if(showPw()) {
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                    } @else {
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                    }
                  </button>
                </div>
              </div>
              @if(loginError()) {
                <div class="lm-error">{{ loginError() }}</div>
              }
              <div class="lm-row">
                <label class="lm-check">
                  <input type="checkbox" [(ngModel)]="rememberMe" name="remember">
                  <span>Remember me</span>
                </label>
                <a href="#" class="lm-forgot" (click)="$event.preventDefault()">Forgot password?</a>
              </div>
              <button type="submit" class="lm-submit" [class.loading]="loginLoading()">
                @if(loginLoading()) { Signing in... } @else { SIGN IN }
              </button>
            </form>
            <p class="lm-register">Don't have an account? <a href="#" (click)="$event.preventDefault()">Register</a></p>
          } @else {
            <div class="lm-success">
              <div class="lm-success-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              <p>Signed in successfully!</p>
            </div>
          }
        </div>
      </div>
    }

    @if(showSubscribeModal()) {
      <div class="modal-overlay" (click)="showSubscribeModal.set(false)">
        <div class="subscribe-modal" (click)="$event.stopPropagation()">
          <button class="modal-close" (click)="showSubscribeModal.set(false)">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
          <div class="sm-header">
            <h2 class="sm-title">Choose Your Plan</h2>
            <p class="sm-sub">Unlimited movies & TV shows. Cancel anytime.</p>
          </div>
          <div class="sm-plans">
            <div class="sm-plan">
              <div class="sm-plan-name">BASIC</div>
              <div class="sm-plan-price">
                <span class="sm-currency">UGX</span>
                <span class="sm-amount">5,000</span>
                <span class="sm-period">/mo</span>
              </div>
              <ul class="sm-features">
                <li><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> SD Quality (480p)</li>
                <li><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> 1 Screen at a time</li>
                <li><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> Unlimited movies</li>
                <li class="sm-feat-no"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6b7280" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg> Downloads</li>
                <li class="sm-feat-no"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6b7280" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg> 4K Ultra HD</li>
              </ul>
              <button class="sm-btn sm-btn-outline">GET BASIC</button>
            </div>

            <div class="sm-plan sm-plan-featured">
              <div class="sm-popular">MOST POPULAR</div>
              <div class="sm-plan-name">STANDARD</div>
              <div class="sm-plan-price">
                <span class="sm-currency">UGX</span>
                <span class="sm-amount">15,000</span>
                <span class="sm-period">/mo</span>
              </div>
              <ul class="sm-features">
                <li><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> HD Quality (1080p)</li>
                <li><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> 2 Screens at a time</li>
                <li><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> Unlimited movies</li>
                <li><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> 5 Downloads/month</li>
                <li class="sm-feat-no"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6b7280" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg> 4K Ultra HD</li>
              </ul>
              <button class="sm-btn sm-btn-primary">GET STANDARD</button>
            </div>

            <div class="sm-plan">
              <div class="sm-plan-name">PREMIUM</div>
              <div class="sm-plan-price">
                <span class="sm-currency">UGX</span>
                <span class="sm-amount">30,000</span>
                <span class="sm-period">/mo</span>
              </div>
              <ul class="sm-features">
                <li><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> 4K Ultra HD</li>
                <li><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> 4 Screens at a time</li>
                <li><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> Unlimited movies</li>
                <li><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> Unlimited Downloads</li>
                <li><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> Priority Support</li>
              </ul>
              <button class="sm-btn sm-btn-outline">GET PREMIUM</button>
            </div>
          </div>
          <p class="sm-note">Payments processed securely via MTN MoMo, Airtel Money or bank card.</p>
        </div>
      </div>
    }
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
      max-width: 1400px; margin: 0 auto; height: 48px;
      display: flex; align-items: center; justify-content: space-between; gap: 16px;
    }
    .header-left { display: flex; align-items: center; gap: 28px; }
    .header-right { display: flex; align-items: center; gap: 8px; }
    .logo { display: flex; align-items: center; text-decoration: none; flex-shrink: 0; }
    .desktop-nav { display: flex; align-items: center; gap: 2px; }
    .nav-link {
      color: rgba(255,255,255,0.88); font-size: 10.5px; font-weight: 600;
      letter-spacing: 0.9px; text-transform: uppercase;
      padding: 6px 9px; border-radius: 5px; transition: color 0.2s, background 0.2s;
      text-decoration: none; white-space: nowrap;
      &:hover, &.active { color: #fff; background: rgba(52,211,153,0.2); }
    }
    .dropdown-btn {
      display: flex; align-items: center; gap: 4px;
      color: rgba(255,255,255,0.88); font-size: 10.5px; font-weight: 600;
      letter-spacing: 0.9px; text-transform: uppercase;
      padding: 6px 9px; border-radius: 5px; transition: color 0.2s, background 0.2s;
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
      font-size: 13px; border-radius: 6px; transition: all 0.15s; text-decoration: none;
      &:hover { color: #fff; background: rgba(52,211,153,0.18); }
    }
    .icon-btn {
      display: flex; align-items: center; justify-content: center;
      width: 34px; height: 34px; border-radius: 50%; color: rgba(255,255,255,0.88);
      transition: all 0.2s; background: none; border: none; cursor: pointer;
      &:hover { color: #fff; background: rgba(52,211,153,0.22); }
    }
    .search-wrap { display: flex; align-items: center; gap: 4px; }
    .search-input {
      background: rgba(255,255,255,0.1); border: 1px solid rgba(52,211,153,0.28);
      border-radius: 20px; padding: 5px 12px; color: #fff; font-size: 13px;
      outline: none; width: 190px; transition: all 0.2s;
      &::placeholder { color: rgba(255,255,255,0.45); }
      &:focus { border-color: rgba(52,211,153,0.6); background: rgba(255,255,255,0.13); }
    }
    .btn-app {
      display: flex; align-items: center; gap: 5px;
      color: rgba(255,255,255,0.82); font-size: 10px; font-weight: 700;
      letter-spacing: 1px; text-decoration: none;
      padding: 5px 10px; border-radius: 5px;
      border: 1px solid rgba(255,255,255,0.2);
      transition: all 0.2s;
      &:hover { color: #fff; border-color: rgba(52,211,153,0.5); background: rgba(52,211,153,0.12); }
    }
    .btn-subscribe {
      display: flex; align-items: center;
      background: linear-gradient(135deg, #FF271C, #F5852F);
      color: #fff; font-size: 10px; font-weight: 700; letter-spacing: 1px;
      padding: 5px 12px; border-radius: 5px; border: none; cursor: pointer;
      transition: opacity 0.2s, transform 0.2s;
      &:hover { opacity: 0.9; transform: translateY(-1px); }
    }
    .btn-login {
      display: flex; align-items: center; gap: 5px;
      color: rgba(255,255,255,0.9); font-size: 10px; font-weight: 700; letter-spacing: 1px;
      padding: 5px 12px; border-radius: 5px;
      border: 1px solid rgba(52,211,153,0.5);
      background: rgba(52,211,153,0.08);
      cursor: pointer; transition: all 0.2s;
      &:hover { color: #fff; background: rgba(52,211,153,0.2); border-color: rgba(52,211,153,0.8); }
    }
    .lang-selector {
      display: flex; align-items: center; gap: 4px; padding: 5px 8px;
      border: 1px solid rgba(52,211,153,0.28); border-radius: 5px;
      font-size: 10px; font-weight: 700; color: rgba(255,255,255,0.85);
      cursor: pointer; transition: all 0.2s; letter-spacing: 0.8px;
      &:hover { border-color: rgba(52,211,153,0.6); color: #fff; background: rgba(52,211,153,0.1); }
    }
    .mobile-menu {
      background: rgba(4,40,30,0.97); backdrop-filter: blur(20px);
      border-top: 1px solid rgba(52,211,153,0.15); padding: 12px 0;
    }
    .mobile-link {
      display: block; padding: 11px 24px; color: rgba(255,255,255,0.88);
      font-size: 11px; font-weight: 700; letter-spacing: 1px;
      transition: color 0.2s; text-decoration: none;
      &:hover { color: #fff; background: rgba(52,211,153,0.12); }
    }
    .mobile-cta-row { display: flex; gap: 10px; padding: 12px 24px; }
    .mobile-cta { width: 50%; justify-content: center; }
    .mobile-search {
      padding: 12px 24px;
      input {
        width: 100%; background: rgba(255,255,255,0.1);
        border: 1px solid rgba(52,211,153,0.22); border-radius: 20px;
        padding: 10px 16px; color: #fff; font-size: 14px; outline: none;
        box-sizing: border-box;
        &::placeholder { color: rgba(255,255,255,0.4); }
      }
    }
    .modal-overlay {
      position: fixed; inset: 0; z-index: 2000;
      background: rgba(0,0,0,0.75);
      backdrop-filter: blur(6px);
      display: flex; align-items: center; justify-content: center;
      padding: 16px;
    }
    .modal-close {
      position: absolute; top: 14px; right: 14px;
      width: 32px; height: 32px; border-radius: 50%;
      background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.12);
      color: rgba(255,255,255,0.7); cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      transition: all 0.2s;
      &:hover { background: rgba(255,255,255,0.15); color: #fff; }
    }
    .login-modal {
      position: relative;
      background: linear-gradient(160deg, #0f1a15 0%, #1a2e22 100%);
      border: 1px solid rgba(52,211,153,0.2);
      border-radius: 16px;
      padding: 32px 28px 28px;
      width: 100%; max-width: 360px;
      box-shadow: 0 24px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(52,211,153,0.08);
    }
    .lm-logo { margin-bottom: 20px; }
    .lm-title { color: #fff; font-size: 20px; font-weight: 700; margin: 0 0 4px; }
    .lm-sub { color: rgba(255,255,255,0.5); font-size: 13px; margin: 0 0 24px; }
    .lm-form { display: flex; flex-direction: column; gap: 16px; }
    .lm-field {
      display: flex; flex-direction: column; gap: 6px;
      label { font-size: 11px; font-weight: 600; letter-spacing: 0.5px; color: rgba(255,255,255,0.6); text-transform: uppercase; }
      input {
        background: rgba(255,255,255,0.06); border: 1px solid rgba(52,211,153,0.2);
        border-radius: 8px; padding: 10px 14px; color: #fff; font-size: 14px; outline: none;
        transition: border-color 0.2s;
        &::placeholder { color: rgba(255,255,255,0.25); }
        &:focus { border-color: rgba(52,211,153,0.55); background: rgba(255,255,255,0.09); }
      }
    }
    .lm-pw-wrap { position: relative; }
    .lm-pw-wrap input { width: 100%; box-sizing: border-box; padding-right: 40px; }
    .lm-eye {
      position: absolute; right: 10px; top: 50%; transform: translateY(-50%);
      background: none; border: none; color: rgba(255,255,255,0.4); cursor: pointer;
      padding: 4px; &:hover { color: rgba(255,255,255,0.7); }
    }
    .lm-error {
      background: rgba(239,68,68,0.15); border: 1px solid rgba(239,68,68,0.3);
      border-radius: 7px; padding: 8px 12px; color: #fca5a5; font-size: 13px;
    }
    .lm-row {
      display: flex; align-items: center; justify-content: space-between;
    }
    .lm-check {
      display: flex; align-items: center; gap: 7px;
      color: rgba(255,255,255,0.6); font-size: 12px; cursor: pointer;
      input { width: auto; accent-color: #10b981; }
    }
    .lm-forgot { color: rgba(52,211,153,0.8); font-size: 12px; text-decoration: none;
      &:hover { color: #10b981; } }
    .lm-submit {
      background: linear-gradient(135deg, #FF271C, #F5852F);
      color: #fff; font-size: 13px; font-weight: 700; letter-spacing: 1px;
      padding: 12px; border-radius: 8px; border: none; cursor: pointer;
      transition: opacity 0.2s, transform 0.2s;
      &:hover { opacity: 0.9; transform: translateY(-1px); }
      &.loading { opacity: 0.7; cursor: wait; }
    }
    .lm-register {
      text-align: center; color: rgba(255,255,255,0.5); font-size: 12px; margin: 16px 0 0;
      a { color: rgba(52,211,153,0.85); text-decoration: none;
        &:hover { color: #10b981; } }
    }
    .lm-success {
      text-align: center; padding: 24px 0 8px;
    }
    .lm-success-icon {
      width: 56px; height: 56px; border-radius: 50%;
      background: rgba(16,185,129,0.15); border: 2px solid rgba(16,185,129,0.4);
      display: flex; align-items: center; justify-content: center; margin: 0 auto 12px;
      color: #10b981;
    }
    .lm-success p { color: rgba(255,255,255,0.8); font-size: 15px; }
    .subscribe-modal {
      position: relative;
      background: linear-gradient(160deg, #0f1a15 0%, #1a2e22 100%);
      border: 1px solid rgba(52,211,153,0.2);
      border-radius: 18px;
      padding: 32px 28px 28px;
      width: 100%; max-width: 820px;
      box-shadow: 0 24px 60px rgba(0,0,0,0.65);
    }
    .sm-header { text-align: center; margin-bottom: 28px; }
    .sm-title { color: #fff; font-size: 22px; font-weight: 800; margin: 0 0 6px; letter-spacing: -0.3px; }
    .sm-sub { color: rgba(255,255,255,0.5); font-size: 13px; margin: 0; }
    .sm-plans { display: flex; gap: 16px; }
    .sm-plan {
      flex: 1; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1);
      border-radius: 14px; padding: 24px 20px; display: flex; flex-direction: column; gap: 0;
      position: relative;
    }
    .sm-plan-featured {
      background: rgba(16,185,129,0.06); border-color: rgba(52,211,153,0.35);
      box-shadow: 0 0 0 1px rgba(52,211,153,0.15), 0 8px 32px rgba(0,0,0,0.3);
    }
    .sm-popular {
      position: absolute; top: -11px; left: 50%; transform: translateX(-50%);
      background: linear-gradient(135deg, #10b981, #059669);
      color: #fff; font-size: 9px; font-weight: 800; letter-spacing: 1.2px;
      padding: 3px 12px; border-radius: 20px; white-space: nowrap;
    }
    .sm-plan-name {
      color: rgba(255,255,255,0.6); font-size: 10px; font-weight: 800;
      letter-spacing: 2px; margin-bottom: 12px;
    }
    .sm-plan-featured .sm-plan-name { color: #10b981; }
    .sm-plan-price {
      display: flex; align-items: baseline; gap: 4px; margin-bottom: 20px;
    }
    .sm-currency { color: rgba(255,255,255,0.55); font-size: 12px; font-weight: 600; }
    .sm-amount { color: #fff; font-size: 30px; font-weight: 800; letter-spacing: -1px; }
    .sm-period { color: rgba(255,255,255,0.45); font-size: 13px; }
    .sm-features {
      list-style: none; padding: 0; margin: 0 0 24px; display: flex; flex-direction: column; gap: 10px; flex: 1;
      li {
        display: flex; align-items: center; gap: 8px;
        color: rgba(255,255,255,0.8); font-size: 13px;
      }
    }
    .sm-feat-no { color: rgba(255,255,255,0.35) !important; }
    .sm-btn {
      width: 100%; padding: 11px; border-radius: 8px; font-size: 11px;
      font-weight: 800; letter-spacing: 1px; cursor: pointer; transition: all 0.2s;
    }
    .sm-btn-primary {
      background: linear-gradient(135deg, #10b981, #059669);
      color: #fff; border: none;
      &:hover { opacity: 0.9; transform: translateY(-1px); }
    }
    .sm-btn-outline {
      background: transparent; color: rgba(255,255,255,0.7);
      border: 1px solid rgba(255,255,255,0.2);
      &:hover { border-color: rgba(52,211,153,0.5); color: #fff; background: rgba(52,211,153,0.08); }
    }
    .sm-note {
      text-align: center; color: rgba(255,255,255,0.35); font-size: 11px; margin: 20px 0 0;
    }
    @media (max-width: 768px) {
      .desktop-nav, .desktop-only { display: none !important; }
      .mobile-only { display: flex !important; }
      .sm-plans { flex-direction: column; }
      .subscribe-modal { max-height: 90vh; overflow-y: auto; }
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
  showLoginModal = signal(false);
  showSubscribeModal = signal(false);
  showPw = signal(false);
  loginLoading = signal(false);
  loginSuccess = signal(false);
  loginError = signal('');

  searchQuery = '';
  loginEmail = '';
  loginPassword = '';
  rememberMe = false;

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

  closeLogin() {
    this.showLoginModal.set(false);
    this.loginSuccess.set(false);
    this.loginError.set('');
    this.loginEmail = '';
    this.loginPassword = '';
    this.showPw.set(false);
  }

  doLogin() {
    if (!this.loginEmail || !this.loginPassword) {
      this.loginError.set('Please enter your email and password.');
      return;
    }
    this.loginError.set('');
    this.loginLoading.set(true);
    setTimeout(() => {
      this.loginLoading.set(false);
      this.loginSuccess.set(true);
      setTimeout(() => this.closeLogin(), 1800);
    }, 1200);
  }
}
