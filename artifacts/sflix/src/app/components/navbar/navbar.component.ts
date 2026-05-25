import { Component, HostListener, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

interface Plan {
  id: string; name: string; display: string; popular: boolean;
  features: string[]; nofeatures: string[];
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule, FormsModule],
  template: `
    <header class="header" [class.scrolled]="isScrolled()">
      <div class="header-inner">
        <div class="header-left">
          <a routerLink="/" class="logo">
            <svg width="130" height="28" viewBox="0 0 130 28" fill="none">
              <text x="0" y="22" font-family="Inter, sans-serif" font-weight="800" font-size="18" fill="url(#grad)">LUO WATCH</text>
              <defs><linearGradient id="grad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stop-color="#FF271C"/><stop offset="100%" stop-color="#F5852F"/>
              </linearGradient></defs>
            </svg>
          </a>
          <nav class="desktop-nav">
            <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}" class="nav-link">HOME</a>
            <a routerLink="/movies" routerLinkActive="active" class="nav-link">MOVIES</a>
            <a routerLink="/tv-shows" routerLinkActive="active" class="nav-link">TV SHOWS</a>
            <a routerLink="/vj" routerLinkActive="active" class="nav-link">VJ</a>
            <a routerLink="/admin" routerLinkActive="active" class="nav-link">ADMIN</a>
            <div class="nav-dropdown" (mouseenter)="showExplore.set(true)" (mouseleave)="showExplore.set(false)">
              <button class="nav-link dropdown-btn">EXPLORE <svg width="11" height="11" viewBox="0 0 12 12" fill="currentColor"><path d="M2 4l4 4 4-4"/></svg></button>
              @if(showExplore()) {
                <div class="dropdown-menu">
                  <a routerLink="/movies" class="dropdown-item">All Movies</a>
                  <a routerLink="/tv-shows" class="dropdown-item">TV Series</a>
                  <a routerLink="/movies" class="dropdown-item">Anime</a>
                  <a routerLink="/movies" class="dropdown-item">Documentaries</a>
                </div>
              }
            </div>
            <div class="nav-dropdown" (mouseenter)="showCats.set(true)" (mouseleave)="showCats.set(false)">
              <button class="nav-link dropdown-btn">CATEGORIES <svg width="11" height="11" viewBox="0 0 12 12" fill="currentColor"><path d="M2 4l4 4 4-4"/></svg></button>
              @if(showCats()) {
                <div class="dropdown-menu">
                  <a routerLink="/movies" class="dropdown-item">Action</a>
                  <a routerLink="/movies" class="dropdown-item">Horror</a>
                  <a routerLink="/movies" class="dropdown-item">Romance</a>
                  <a routerLink="/movies" class="dropdown-item">Comedy</a>
                  <a routerLink="/movies" class="dropdown-item">Drama</a>
                </div>
              }
            </div>
          </nav>
        </div>

        <div class="header-right">
          <div class="search-wrap desktop-only">
            @if(searchOpen()) {
              <input class="search-input" type="text" placeholder="Search movies..." [(ngModel)]="searchQuery"
                (keyup.enter)="doSearch()" (keyup.escape)="searchOpen.set(false)" autofocus/>
            }
            <button class="icon-btn" (click)="toggleSearch()">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            </button>
          </div>

          <a href="#" class="btn-app desktop-only" (click)="$event.preventDefault()">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.7 9.05 7.42c1.39.07 2.35.74 3.15.8 1.2-.24 2.35-.93 3.64-.84 1.54.13 2.7.73 3.44 1.85-3.15 1.88-2.4 5.98.48 7.13-.57 1.54-1.31 3.06-2.71 3.92zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/></svg>
            APP
          </a>

          <button class="btn-subscribe desktop-only" (click)="authService.subscribeModalOpen.set(true)">SUBSCRIBE</button>

          @if(authService.isLoggedIn()) {
            <div class="avatar-wrap" (mouseenter)="showUserMenu.set(true)" (mouseleave)="showUserMenu.set(false)">
              <button class="user-avatar">{{ authService.currentUser()?.initials }}</button>
              @if(showUserMenu()) {
                <div class="user-dropdown">
                  <div class="ud-user">
                    <div class="ud-av">{{ authService.currentUser()?.initials }}</div>
                    <div class="ud-info">
                      <div class="ud-name">{{ authService.currentUser()?.name }}</div>
                      <div class="ud-email">{{ authService.currentUser()?.email }}</div>
                    </div>
                  </div>
                  <div class="ud-div"></div>
                  @if(authService.hasSubscription()) {
                    <div class="ud-plan-badge">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="#10b981"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                      {{ authService.currentUser()?.plan | uppercase }} Active
                    </div>
                  } @else {
                    <button class="ud-subscribe" (click)="authService.subscribeModalOpen.set(true); showUserMenu.set(false)">
                      Subscribe Now
                    </button>
                  }
                  <a routerLink="/vj" class="ud-item" (click)="showUserMenu.set(false)">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
                    VJ Dashboard
                  </a>
                  <a routerLink="/admin" class="ud-item" (click)="showUserMenu.set(false)">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                    Admin Panel
                  </a>
                  <div class="ud-div"></div>
                  <button class="ud-logout" (click)="authService.logout(); showUserMenu.set(false)">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                    Log Out
                  </button>
                </div>
              }
            </div>
          } @else {
            <button class="btn-login" (click)="authService.loginModalOpen.set(true)">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              LOGIN
            </button>
          }

          <div class="lang-selector desktop-only">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
            <span>EN</span>
          </div>

          <button class="icon-btn mobile-only" (click)="mobileOpen.set(!mobileOpen())">
            @if(!mobileOpen()) {
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
            } @else {
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            }
          </button>
        </div>
      </div>

      @if(mobileOpen()) {
        <div class="mobile-menu">
          @if(authService.isLoggedIn()) {
            <div class="mobile-user">
              <div class="mu-av">{{ authService.currentUser()?.initials }}</div>
              <div>
                <div class="mu-name">{{ authService.currentUser()?.name }}</div>
                <div class="mu-sub">{{ authService.hasSubscription() ? (authService.currentUser()?.plan | uppercase) + ' Plan' : 'No active plan' }}</div>
              </div>
            </div>
          }
          <a routerLink="/" class="mobile-link" (click)="mobileOpen.set(false)">HOME</a>
          <a routerLink="/movies" class="mobile-link" (click)="mobileOpen.set(false)">MOVIES</a>
          <a routerLink="/tv-shows" class="mobile-link" (click)="mobileOpen.set(false)">TV SHOWS</a>
          <a routerLink="/vj" class="mobile-link" (click)="mobileOpen.set(false)">VJ DASHBOARD</a>
          <a routerLink="/admin" class="mobile-link" (click)="mobileOpen.set(false)">ADMIN</a>
          <div class="mobile-cta-row">
            <button class="btn-subscribe mobile-cta" (click)="mobileOpen.set(false); authService.subscribeModalOpen.set(true)">SUBSCRIBE</button>
            @if(authService.isLoggedIn()) {
              <button class="btn-login mobile-cta" (click)="mobileOpen.set(false); authService.logout()">LOG OUT</button>
            } @else {
              <button class="btn-login mobile-cta" (click)="mobileOpen.set(false); authService.loginModalOpen.set(true)">LOGIN</button>
            }
          </div>
          <div class="mobile-search">
            <input type="text" placeholder="Search..." [(ngModel)]="searchQuery" (keyup.enter)="doSearch(); mobileOpen.set(false)">
          </div>
        </div>
      }
    </header>

    @if(authService.loginModalOpen()) {
      <div class="modal-overlay" (click)="closeLogin()">
        <div class="login-modal" (click)="$event.stopPropagation()">
          <button class="modal-close" (click)="closeLogin()">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
          <div class="lm-logo">
            <svg width="110" height="22" viewBox="0 0 110 22" fill="none">
              <text x="0" y="18" font-family="Inter, sans-serif" font-weight="800" font-size="15" fill="url(#lg2)">LUO WATCH</text>
              <defs><linearGradient id="lg2" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#FF271C"/><stop offset="100%" stop-color="#F5852F"/></linearGradient></defs>
            </svg>
          </div>
          <h2 class="lm-title">Welcome back</h2>
          <p class="lm-sub">Sign in to continue watching</p>
          @if(!loginSuccess()) {
            @if(!showRegister()) {
              <form class="lm-form" (ngSubmit)="doLogin()">
                <div class="lm-field">
                  <label>EMAIL</label>
                  <input type="email" [(ngModel)]="loginEmail" name="email" placeholder="you@example.com" autocomplete="email" required>
                </div>
                <div class="lm-field">
                  <label>PASSWORD</label>
                  <div class="lm-pw-wrap">
                    <input [type]="showPw() ? 'text' : 'password'" [(ngModel)]="loginPassword" name="password" placeholder="••••••••" autocomplete="current-password" required>
                    <button type="button" class="lm-eye" (click)="showPw.set(!showPw())">
                      @if(showPw()) {
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                      } @else {
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                      }
                    </button>
                  </div>
                </div>
                @if(loginError()) {
                  <div class="lm-error">{{ loginError() }}</div>
                }
                <div class="lm-row">
                  <label class="lm-check"><input type="checkbox" [(ngModel)]="rememberMe" name="remember"><span>Remember me</span></label>
                  <a href="#" class="lm-forgot" (click)="$event.preventDefault()">Forgot password?</a>
                </div>
                <button type="submit" class="lm-submit" [class.loading]="loginLoading()">
                  {{ loginLoading() ? 'Signing in...' : 'SIGN IN' }}
                </button>
              </form>
              <div class="lm-divider"><span>or</span></div>
              <button class="lm-google-btn" (click)="loginWithGoogle()" [disabled]="loginLoading()">
                <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                Continue with Google
              </button>
              <p class="lm-register">Don't have an account? <a href="#" (click)="$event.preventDefault(); showRegister.set(true)">Register</a></p>
            } @else {
              <form class="lm-form" (ngSubmit)="doRegister()">
                <div class="lm-field">
                  <label>FULL NAME</label>
                  <input type="text" [(ngModel)]="registerName" name="rname" placeholder="Your full name" required>
                </div>
                <div class="lm-field">
                  <label>EMAIL</label>
                  <input type="email" [(ngModel)]="registerEmail" name="remail" placeholder="you@example.com" autocomplete="email" required>
                </div>
                <div class="lm-field">
                  <label>PASSWORD</label>
                  <input type="password" [(ngModel)]="registerPassword" name="rpw" placeholder="Min 6 characters" required>
                </div>
                @if(loginError()) {
                  <div class="lm-error">{{ loginError() }}</div>
                }
                <button type="submit" class="lm-submit" [class.loading]="loginLoading()">
                  {{ loginLoading() ? 'Creating account...' : 'CREATE ACCOUNT' }}
                </button>
              </form>
              <div class="lm-divider"><span>or</span></div>
              <button class="lm-google-btn" (click)="loginWithGoogle()" [disabled]="loginLoading()">
                <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                Sign up with Google
              </button>
              <p class="lm-register">Already have an account? <a href="#" (click)="$event.preventDefault(); showRegister.set(false)">Sign In</a></p>
            }
          } @else {
            <div class="lm-success">
              <div class="lm-success-icon">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              <p>Signed in successfully!</p>
            </div>
          }
        </div>
      </div>
    }

    @if(authService.subscribeModalOpen()) {
      <div class="modal-overlay" (click)="closeSubscribeModal()">
        <div class="subscribe-modal" (click)="$event.stopPropagation()">
          <button class="modal-close" (click)="closeSubscribeModal()">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>

          @if(subscribeStep() === 'plans') {
            <div class="sm-header">
              <h2 class="sm-title">Choose Your Plan</h2>
              <p class="sm-sub">Unlimited movies and TV shows. Cancel anytime.</p>
            </div>
            <div class="sm-plans">
              @for(plan of plans; track plan.id) {
                <div class="sm-plan" [class.sm-plan-featured]="plan.popular">
                  @if(plan.popular) { <div class="sm-popular">MOST POPULAR</div> }
                  <div class="sm-plan-name">{{ plan.name }}</div>
                  <div class="sm-plan-price">
                    <span class="sm-currency">UGX</span>
                    <span class="sm-amount">{{ plan.display }}</span>
                    <span class="sm-period">/mo</span>
                  </div>
                  <ul class="sm-features">
                    @for(f of plan.features; track f) {
                      <li>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                        {{ f }}
                      </li>
                    }
                    @for(f of plan.nofeatures; track f) {
                      <li class="sm-feat-no">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#6b7280" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                        {{ f }}
                      </li>
                    }
                  </ul>
                  <button class="sm-plan-btn"
                    [class.sm-btn-primary]="plan.popular"
                    [class.sm-btn-outline]="!plan.popular"
                    (click)="selectPlan(plan)">
                    GET {{ plan.name }}
                  </button>
                </div>
              }
            </div>
            <p class="sm-note">Pay via MTN MoMo, Airtel Money or bank card.</p>
          }

          @if(subscribeStep() === 'payment') {
            @let plan = selectedPlan();
            @if(plan) {
              <div class="sm-payment">
                <button class="sm-back" (click)="subscribeStep.set('plans')">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>
                  Back
                </button>
                <div class="sm-pay-head">
                  <h2 class="sm-title">Complete Payment</h2>
                  <div class="sm-pay-summary">
                    <span class="sm-pay-plan">{{ plan.name }}</span>
                    <span class="sm-pay-price">UGX {{ plan.display }}/month</span>
                  </div>
                </div>
                <div class="sm-pay-form">
                  <div class="sm-pay-field">
                    <label>SELECT NETWORK</label>
                    <div class="sm-network-grid">
                      @for(net of networks; track net) {
                        <button class="sm-net-btn" [class.active]="payNetwork === net" (click)="payNetwork = net">
                          {{ net }}
                        </button>
                      }
                    </div>
                  </div>
                  <div class="sm-pay-field">
                    <label>PHONE NUMBER</label>
                    <input type="tel" [(ngModel)]="payPhone" placeholder="+256 7XX XXX XXX" class="sm-pay-input">
                  </div>
                  <div class="sm-pay-amount-row">
                    <span class="sm-pay-amount-label">Total Amount</span>
                    <span class="sm-pay-amount-val">UGX {{ plan.display }}</span>
                  </div>
                  <button class="sm-pay-btn" [disabled]="isPayDisabled()" (click)="payNow()">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
                    Pay UGX {{ plan.display }}
                  </button>
                </div>
              </div>
            }
          }

          @if(subscribeStep() === 'processing') {
            <div class="sm-processing">
              <div class="sm-spinner"></div>
              <h3>Processing Payment...</h3>
              <p>Please wait while we verify your payment</p>
              <p class="sm-proc-hint">Check your phone for a payment prompt</p>
            </div>
          }

          @if(subscribeStep() === 'success') {
            <div class="sm-success">
              <div class="sm-success-icon">
                <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              <h3>Payment Successful!</h3>
              <p>Your {{ selectedPlan()?.name }} subscription is now active.</p>
              <p class="sm-suc-sub">Enjoy unlimited streaming on LUO WATCH</p>
            </div>
          }

        </div>
      </div>
    }
  `,
  styles: [`
    .header {
      position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
      padding: 0 20px;
      background: linear-gradient(135deg, rgba(6,78,59,0.93) 0%, rgba(16,185,129,0.68) 50%, rgba(5,150,105,0.9) 100%);
      backdrop-filter: blur(22px) saturate(180%);
      -webkit-backdrop-filter: blur(22px) saturate(180%);
      border-bottom: 1px solid rgba(52,211,153,0.28);
      box-shadow: 0 4px 28px rgba(0,0,0,0.32);
      transition: all 0.3s ease;
    }
    .header.scrolled {
      background: linear-gradient(135deg, rgba(4,47,36,0.97) 0%, rgba(6,95,70,0.96) 100%);
      backdrop-filter: blur(28px) saturate(220%);
      box-shadow: 0 4px 32px rgba(0,0,0,0.55), 0 0 0 1px rgba(52,211,153,0.18);
    }
    .header-inner {
      max-width: 1400px; margin: 0 auto; height: 48px;
      display: flex; align-items: center; justify-content: space-between; gap: 12px;
    }
    .header-left { display: flex; align-items: center; gap: 24px; min-width: 0; }
    .header-right { display: flex; align-items: center; gap: 6px; flex-shrink: 0; }
    .logo { display: flex; align-items: center; text-decoration: none; flex-shrink: 0; }
    .desktop-nav { display: flex; align-items: center; gap: 1px; }
    .nav-link {
      color: rgba(255,255,255,0.88); font-size: 10px; font-weight: 700;
      letter-spacing: 0.9px; text-transform: uppercase;
      padding: 5px 8px; border-radius: 5px; transition: color 0.2s, background 0.2s;
      text-decoration: none; white-space: nowrap;
      &:hover, &.active { color: #fff; background: rgba(52,211,153,0.2); }
    }
    .dropdown-btn {
      display: flex; align-items: center; gap: 3px;
      color: rgba(255,255,255,0.88); font-size: 10px; font-weight: 700;
      letter-spacing: 0.9px; text-transform: uppercase;
      padding: 5px 8px; border-radius: 5px; transition: color 0.2s, background 0.2s;
      cursor: pointer; background: none; border: none;
      &:hover { color: #fff; background: rgba(52,211,153,0.2); }
    }
    .nav-dropdown { position: relative; }
    .dropdown-menu {
      position: absolute; top: calc(100% + 8px); left: 0;
      background: rgba(4,47,36,0.97); backdrop-filter: blur(20px) saturate(180%);
      border: 1px solid rgba(52,211,153,0.22); border-radius: 10px; padding: 6px;
      min-width: 160px; box-shadow: 0 16px 40px rgba(0,0,0,0.65); z-index: 100;
    }
    .dropdown-item {
      display: block; padding: 8px 12px; color: rgba(255,255,255,0.82);
      font-size: 13px; border-radius: 6px; transition: all 0.15s; text-decoration: none;
      &:hover { color: #fff; background: rgba(52,211,153,0.18); }
    }
    .icon-btn {
      display: flex; align-items: center; justify-content: center;
      width: 32px; height: 32px; border-radius: 50%; color: rgba(255,255,255,0.88);
      transition: all 0.2s; background: none; border: none; cursor: pointer;
      &:hover { color: #fff; background: rgba(52,211,153,0.22); }
    }
    .search-wrap { display: flex; align-items: center; gap: 4px; }
    .search-input {
      background: rgba(255,255,255,0.1); border: 1px solid rgba(52,211,153,0.28);
      border-radius: 18px; padding: 5px 12px; color: #fff; font-size: 13px;
      outline: none; width: 180px; transition: all 0.2s;
      &::placeholder { color: rgba(255,255,255,0.4); }
      &:focus { border-color: rgba(52,211,153,0.6); }
    }
    .btn-app {
      display: flex; align-items: center; gap: 4px;
      color: rgba(255,255,255,0.8); font-size: 9.5px; font-weight: 700; letter-spacing: 1px;
      text-decoration: none; padding: 4px 9px; border-radius: 5px;
      border: 1px solid rgba(255,255,255,0.2); transition: all 0.2s;
      &:hover { color: #fff; border-color: rgba(52,211,153,0.5); background: rgba(52,211,153,0.1); }
    }
    .btn-subscribe {
      display: flex; align-items: center;
      background: linear-gradient(135deg, #FF271C, #F5852F);
      color: #fff; font-size: 9.5px; font-weight: 700; letter-spacing: 1px;
      padding: 5px 11px; border-radius: 5px; border: none; cursor: pointer;
      transition: opacity 0.2s, transform 0.2s;
      &:hover { opacity: 0.9; transform: translateY(-1px); }
    }
    .btn-login {
      display: flex; align-items: center; gap: 4px;
      color: rgba(255,255,255,0.9); font-size: 9.5px; font-weight: 700; letter-spacing: 1px;
      padding: 5px 10px; border-radius: 5px;
      border: 1px solid rgba(52,211,153,0.5); background: rgba(52,211,153,0.08);
      cursor: pointer; transition: all 0.2s;
      &:hover { color: #fff; background: rgba(52,211,153,0.2); border-color: rgba(52,211,153,0.8); }
    }
    .avatar-wrap { position: relative; }
    .user-avatar {
      width: 32px; height: 32px; border-radius: 50%;
      background: linear-gradient(135deg, #10b981, #059669);
      color: #fff; font-size: 11px; font-weight: 800; letter-spacing: 0.5px;
      border: 2px solid rgba(52,211,153,0.5); cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      transition: all 0.2s;
      &:hover { transform: scale(1.08); border-color: rgba(52,211,153,0.9); }
    }
    .user-dropdown {
      position: absolute; top: calc(100% + 10px); right: 0;
      background: rgba(4,47,36,0.97); backdrop-filter: blur(20px) saturate(180%);
      border: 1px solid rgba(52,211,153,0.22); border-radius: 12px; padding: 12px;
      min-width: 210px; box-shadow: 0 16px 40px rgba(0,0,0,0.65); z-index: 100;
    }
    .ud-user { display: flex; align-items: center; gap: 10px; padding: 4px 2px 8px; }
    .ud-av {
      width: 38px; height: 38px; border-radius: 50%; flex-shrink: 0;
      background: linear-gradient(135deg, #10b981, #059669);
      color: #fff; font-size: 13px; font-weight: 800;
      display: flex; align-items: center; justify-content: center;
    }
    .ud-info { min-width: 0; }
    .ud-name { color: #fff; font-size: 13px; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .ud-email { color: rgba(255,255,255,0.45); font-size: 11px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .ud-div { height: 1px; background: rgba(255,255,255,0.08); margin: 6px 0; }
    .ud-plan-badge {
      display: flex; align-items: center; gap: 6px;
      background: rgba(16,185,129,0.12); border: 1px solid rgba(16,185,129,0.25);
      border-radius: 6px; padding: 6px 10px; margin-bottom: 4px;
      color: #10b981; font-size: 11px; font-weight: 700; letter-spacing: 0.5px;
    }
    .ud-subscribe {
      width: 100%; background: linear-gradient(135deg, #FF271C, #F5852F);
      color: #fff; font-size: 11px; font-weight: 700; letter-spacing: 0.5px;
      padding: 7px 12px; border-radius: 7px; border: none; cursor: pointer;
      transition: opacity 0.2s; margin-bottom: 4px;
      &:hover { opacity: 0.9; }
    }
    .ud-item {
      display: flex; align-items: center; gap: 8px;
      padding: 8px 10px; color: rgba(255,255,255,0.75); font-size: 13px;
      border-radius: 6px; transition: all 0.15s; text-decoration: none;
      &:hover { color: #fff; background: rgba(52,211,153,0.15); }
    }
    .ud-logout {
      display: flex; align-items: center; gap: 8px; width: 100%;
      padding: 8px 10px; color: rgba(255,100,90,0.85); font-size: 13px;
      background: none; border: none; border-radius: 6px; cursor: pointer;
      transition: all 0.15s;
      &:hover { color: #ff6b5b; background: rgba(255,39,28,0.1); }
    }
    .lang-selector {
      display: flex; align-items: center; gap: 4px; padding: 4px 8px;
      border: 1px solid rgba(52,211,153,0.28); border-radius: 5px;
      font-size: 9.5px; font-weight: 700; color: rgba(255,255,255,0.85);
      cursor: pointer; transition: all 0.2s; letter-spacing: 0.8px;
      &:hover { border-color: rgba(52,211,153,0.6); color: #fff; background: rgba(52,211,153,0.1); }
    }
    .mobile-menu {
      background: rgba(4,40,30,0.97); backdrop-filter: blur(20px);
      border-top: 1px solid rgba(52,211,153,0.15); padding: 8px 0 16px;
    }
    .mobile-user {
      display: flex; align-items: center; gap: 12px;
      padding: 12px 20px 10px;
    }
    .mu-av {
      width: 38px; height: 38px; border-radius: 50%; flex-shrink: 0;
      background: linear-gradient(135deg, #10b981, #059669);
      color: #fff; font-size: 13px; font-weight: 800;
      display: flex; align-items: center; justify-content: center;
    }
    .mu-name { color: #fff; font-size: 13px; font-weight: 600; }
    .mu-sub { color: #10b981; font-size: 11px; font-weight: 600; }
    .mobile-link {
      display: block; padding: 11px 20px; color: rgba(255,255,255,0.88);
      font-size: 10.5px; font-weight: 700; letter-spacing: 1px;
      transition: color 0.2s; text-decoration: none;
      &:hover { color: #fff; background: rgba(52,211,153,0.1); }
    }
    .mobile-cta-row { display: flex; gap: 10px; padding: 10px 20px; }
    .mobile-cta { flex: 1; justify-content: center; }
    .mobile-search {
      padding: 8px 20px;
      input {
        width: 100%; box-sizing: border-box;
        background: rgba(255,255,255,0.08);
        border: 1px solid rgba(52,211,153,0.2); border-radius: 18px;
        padding: 9px 16px; color: #fff; font-size: 14px; outline: none;
        &::placeholder { color: rgba(255,255,255,0.38); }
      }
    }
    .modal-overlay {
      position: fixed; inset: 0; z-index: 2000;
      background: rgba(0,0,0,0.78); backdrop-filter: blur(6px);
      display: flex; align-items: center; justify-content: center;
      padding: 16px; overflow-y: auto;
    }
    .modal-close {
      position: absolute; top: 14px; right: 14px;
      width: 30px; height: 30px; border-radius: 50%;
      background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.12);
      color: rgba(255,255,255,0.65); cursor: pointer;
      display: flex; align-items: center; justify-content: center; transition: all 0.2s;
      &:hover { background: rgba(255,255,255,0.15); color: #fff; }
    }
    .login-modal {
      position: relative;
      background: linear-gradient(160deg, #0f1a15 0%, #1a2e22 100%);
      border: 1px solid rgba(52,211,153,0.2); border-radius: 16px;
      padding: 30px 26px 26px; width: 100%; max-width: 350px;
      box-shadow: 0 24px 60px rgba(0,0,0,0.65);
    }
    .lm-logo { margin-bottom: 18px; }
    .lm-title { color: #fff; font-size: 19px; font-weight: 700; margin: 0 0 4px; }
    .lm-sub { color: rgba(255,255,255,0.48); font-size: 13px; margin: 0 0 22px; }
    .lm-form { display: flex; flex-direction: column; gap: 14px; }
    .lm-field {
      display: flex; flex-direction: column; gap: 5px;
      label { font-size: 10px; font-weight: 700; letter-spacing: 0.7px; color: rgba(255,255,255,0.55); }
      input {
        background: rgba(255,255,255,0.06); border: 1px solid rgba(52,211,153,0.2);
        border-radius: 8px; padding: 9px 13px; color: #fff; font-size: 14px; outline: none;
        transition: border-color 0.2s;
        &::placeholder { color: rgba(255,255,255,0.22); }
        &:focus { border-color: rgba(52,211,153,0.55); }
      }
    }
    .lm-pw-wrap { position: relative; }
    .lm-pw-wrap input { width: 100%; box-sizing: border-box; padding-right: 38px; }
    .lm-eye {
      position: absolute; right: 10px; top: 50%; transform: translateY(-50%);
      background: none; border: none; color: rgba(255,255,255,0.38); cursor: pointer; padding: 4px;
      &:hover { color: rgba(255,255,255,0.7); }
    }
    .lm-error {
      background: rgba(239,68,68,0.12); border: 1px solid rgba(239,68,68,0.28);
      border-radius: 7px; padding: 7px 12px; color: #fca5a5; font-size: 12px;
    }
    .lm-row { display: flex; align-items: center; justify-content: space-between; }
    .lm-check {
      display: flex; align-items: center; gap: 6px;
      color: rgba(255,255,255,0.55); font-size: 12px; cursor: pointer;
      input { width: auto; accent-color: #10b981; }
    }
    .lm-forgot { color: rgba(52,211,153,0.75); font-size: 12px; text-decoration: none;
      &:hover { color: #10b981; } }
    .lm-submit {
      background: linear-gradient(135deg, #FF271C, #F5852F);
      color: #fff; font-size: 12px; font-weight: 800; letter-spacing: 1.2px;
      padding: 11px; border-radius: 8px; border: none; cursor: pointer;
      transition: opacity 0.2s, transform 0.2s;
      &:hover { opacity: 0.9; transform: translateY(-1px); }
      &.loading { opacity: 0.7; cursor: wait; }
    }
    .lm-divider {
      display: flex; align-items: center; gap: 10px; margin: 12px 0 4px;
      &::before, &::after { content: ''; flex: 1; height: 1px; background: rgba(255,255,255,0.1); }
      span { color: rgba(255,255,255,0.3); font-size: 11px; }
    }
    .lm-google-btn {
      display: flex; align-items: center; justify-content: center; gap: 10px;
      width: 100%; padding: 11px 16px; border-radius: 9px; margin-bottom: 12px;
      background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.14);
      color: rgba(255,255,255,0.85); font-size: 13px; font-weight: 500;
      cursor: pointer; transition: all 0.2s;
      &:hover:not(:disabled) { background: rgba(255,255,255,0.1); border-color: rgba(255,255,255,0.25); }
      &:disabled { opacity: 0.5; cursor: not-allowed; }
    }
    .lm-register {
      text-align: center; color: rgba(255,255,255,0.45); font-size: 12px; margin: 14px 0 0;
      a { color: rgba(52,211,153,0.8); text-decoration: none; &:hover { color: #10b981; } }
    }
    .lm-success { text-align: center; padding: 20px 0 8px; }
    .lm-success-icon {
      width: 52px; height: 52px; border-radius: 50%;
      background: rgba(16,185,129,0.14); border: 2px solid rgba(16,185,129,0.38);
      display: flex; align-items: center; justify-content: center; margin: 0 auto 12px;
      color: #10b981;
    }
    .lm-success p { color: rgba(255,255,255,0.78); font-size: 14px; }
    .subscribe-modal {
      position: relative; margin: auto;
      background: linear-gradient(160deg, #0f1a15 0%, #1a2e22 100%);
      border: 1px solid rgba(52,211,153,0.2); border-radius: 18px;
      padding: 30px 24px 26px; width: 100%; max-width: 800px;
      box-shadow: 0 24px 60px rgba(0,0,0,0.65);
    }
    .sm-header { text-align: center; margin-bottom: 24px; }
    .sm-title { color: #fff; font-size: 20px; font-weight: 800; margin: 0 0 5px; letter-spacing: -0.3px; }
    .sm-sub { color: rgba(255,255,255,0.48); font-size: 13px; margin: 0; }
    .sm-plans { display: flex; gap: 12px; }
    .sm-plan {
      flex: 1; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1);
      border-radius: 12px; padding: 20px 16px; display: flex; flex-direction: column; position: relative;
    }
    .sm-plan-featured {
      background: rgba(16,185,129,0.06); border-color: rgba(52,211,153,0.35);
      box-shadow: 0 0 0 1px rgba(52,211,153,0.12), 0 8px 28px rgba(0,0,0,0.3);
    }
    .sm-popular {
      position: absolute; top: -10px; left: 50%; transform: translateX(-50%);
      background: linear-gradient(135deg, #10b981, #059669);
      color: #fff; font-size: 8.5px; font-weight: 800; letter-spacing: 1px;
      padding: 3px 11px; border-radius: 20px; white-space: nowrap;
    }
    .sm-plan-name { color: rgba(255,255,255,0.55); font-size: 9.5px; font-weight: 800; letter-spacing: 2px; margin-bottom: 10px; }
    .sm-plan-featured .sm-plan-name { color: #10b981; }
    .sm-plan-price { display: flex; align-items: baseline; gap: 3px; margin-bottom: 18px; }
    .sm-currency { color: rgba(255,255,255,0.5); font-size: 11px; font-weight: 600; }
    .sm-amount { color: #fff; font-size: 26px; font-weight: 800; letter-spacing: -1px; }
    .sm-period { color: rgba(255,255,255,0.4); font-size: 12px; }
    .sm-features {
      list-style: none; padding: 0; margin: 0 0 18px; flex: 1;
      display: flex; flex-direction: column; gap: 8px;
      li { display: flex; align-items: center; gap: 7px; color: rgba(255,255,255,0.78); font-size: 12px; }
    }
    .sm-feat-no { color: rgba(255,255,255,0.3) !important; }
    .sm-plan-btn {
      width: 100%; padding: 10px; border-radius: 7px; font-size: 10px;
      font-weight: 800; letter-spacing: 1px; cursor: pointer; transition: all 0.2s;
    }
    .sm-btn-primary {
      background: linear-gradient(135deg, #10b981, #059669); color: #fff; border: none;
      &:hover { opacity: 0.9; transform: translateY(-1px); }
    }
    .sm-btn-outline {
      background: transparent; color: rgba(255,255,255,0.7);
      border: 1px solid rgba(255,255,255,0.2);
      &:hover { border-color: rgba(52,211,153,0.5); color: #fff; background: rgba(52,211,153,0.08); }
    }
    .sm-note { text-align: center; color: rgba(255,255,255,0.32); font-size: 11px; margin: 16px 0 0; }
    .sm-payment { display: flex; flex-direction: column; gap: 0; }
    .sm-back {
      display: inline-flex; align-items: center; gap: 5px;
      background: none; border: none; color: rgba(255,255,255,0.55); font-size: 13px;
      cursor: pointer; padding: 0 0 16px; transition: color 0.2s;
      &:hover { color: #fff; }
    }
    .sm-pay-head { margin-bottom: 20px; }
    .sm-pay-summary {
      display: flex; align-items: center; justify-content: space-between;
      background: rgba(52,211,153,0.08); border: 1px solid rgba(52,211,153,0.2);
      border-radius: 8px; padding: 10px 14px; margin-top: 8px;
    }
    .sm-pay-plan { color: #10b981; font-size: 12px; font-weight: 700; letter-spacing: 1px; }
    .sm-pay-price { color: #fff; font-size: 14px; font-weight: 700; }
    .sm-pay-form { display: flex; flex-direction: column; gap: 16px; }
    .sm-pay-field {
      display: flex; flex-direction: column; gap: 8px;
      label { font-size: 10px; font-weight: 700; letter-spacing: 0.7px; color: rgba(255,255,255,0.55); }
    }
    .sm-network-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; }
    .sm-net-btn {
      padding: 8px 6px; border-radius: 7px; font-size: 11px; font-weight: 600;
      background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.12);
      color: rgba(255,255,255,0.7); cursor: pointer; transition: all 0.2s; text-align: center;
      &:hover { border-color: rgba(52,211,153,0.4); color: #fff; }
      &.active { background: rgba(16,185,129,0.15); border-color: #10b981; color: #10b981; font-weight: 700; }
    }
    .sm-pay-input {
      background: rgba(255,255,255,0.06); border: 1px solid rgba(52,211,153,0.2);
      border-radius: 8px; padding: 10px 13px; color: #fff; font-size: 14px; outline: none;
      transition: border-color 0.2s;
      &::placeholder { color: rgba(255,255,255,0.25); }
      &:focus { border-color: rgba(52,211,153,0.55); }
    }
    .sm-pay-amount-row {
      display: flex; justify-content: space-between; align-items: center;
      padding: 10px 14px; background: rgba(255,255,255,0.04); border-radius: 8px;
    }
    .sm-pay-amount-label { color: rgba(255,255,255,0.55); font-size: 13px; }
    .sm-pay-amount-val { color: #fff; font-size: 16px; font-weight: 700; }
    .sm-pay-btn {
      display: flex; align-items: center; justify-content: center; gap: 8px;
      background: linear-gradient(135deg, #10b981, #059669);
      color: #fff; font-size: 14px; font-weight: 700; letter-spacing: 0.5px;
      padding: 13px; border-radius: 9px; border: none; cursor: pointer;
      transition: opacity 0.2s, transform 0.2s;
      &:hover:not(:disabled) { opacity: 0.9; transform: translateY(-1px); }
      &:disabled { opacity: 0.45; cursor: not-allowed; transform: none; }
    }
    .sm-processing {
      text-align: center; padding: 40px 20px;
      h3 { color: #fff; font-size: 18px; font-weight: 700; margin: 16px 0 8px; }
      p { color: rgba(255,255,255,0.55); font-size: 13px; margin: 0; }
    }
    .sm-proc-hint { color: rgba(52,211,153,0.65) !important; font-size: 12px !important; margin-top: 8px !important; }
    .sm-spinner {
      width: 48px; height: 48px; border-radius: 50%;
      border: 3px solid rgba(255,255,255,0.1); border-top-color: #10b981;
      animation: navSpin 0.8s linear infinite; margin: 0 auto;
    }
    @keyframes navSpin { to { transform: rotate(360deg); } }
    .sm-success {
      text-align: center; padding: 40px 20px;
      h3 { color: #fff; font-size: 20px; font-weight: 700; margin: 16px 0 8px; }
      p { color: rgba(255,255,255,0.65); font-size: 14px; margin: 0; }
    }
    .sm-suc-sub { color: rgba(52,211,153,0.75) !important; font-size: 12px !important; margin-top: 6px !important; }
    .sm-success-icon {
      width: 68px; height: 68px; border-radius: 50%;
      background: rgba(16,185,129,0.14); border: 2px solid rgba(16,185,129,0.4);
      display: flex; align-items: center; justify-content: center; margin: 0 auto;
      color: #10b981;
    }
    @media (max-width: 768px) {
      .desktop-nav, .desktop-only { display: none !important; }
      .mobile-only { display: flex !important; }
      .sm-plans { flex-direction: column; gap: 16px; }
      .sm-network-grid { grid-template-columns: repeat(2, 1fr); }
      .subscribe-modal { max-height: 88vh; overflow-y: auto; padding: 24px 18px 20px; }
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
  showCats = signal(false);
  showUserMenu = signal(false);
  showPw = signal(false);
  showRegister = signal(false);
  loginLoading = signal(false);
  loginSuccess = signal(false);
  loginError = signal('');
  subscribeStep = signal<'plans' | 'payment' | 'processing' | 'success'>('plans');
  selectedPlan = signal<Plan | null>(null);

  searchQuery = '';
  loginEmail = '';
  loginPassword = '';
  rememberMe = false;
  registerName = '';
  registerEmail = '';
  registerPassword = '';
  payNetwork = '';
  payPhone = '';

  plans: Plan[] = [
    { id: 'basic', name: 'BASIC', display: '5,000', popular: false,
      features: ['SD Quality (480p)', '1 Screen at a time', 'Unlimited movies'],
      nofeatures: ['Downloads', '4K Ultra HD'] },
    { id: 'standard', name: 'STANDARD', display: '15,000', popular: true,
      features: ['HD Quality (1080p)', '2 Screens at a time', 'Unlimited movies', '5 Downloads/month'],
      nofeatures: ['4K Ultra HD'] },
    { id: 'premium', name: 'PREMIUM', display: '30,000', popular: false,
      features: ['4K Ultra HD', '4 Screens at a time', 'Unlimited movies', 'Unlimited Downloads', 'Priority Support'],
      nofeatures: [] },
  ];

  networks = ['MTN MoMo', 'Airtel Money', 'Chipper Cash', 'Stanbic Mobile'];

  constructor(private router: Router, public authService: AuthService) {}

  @HostListener('window:scroll')
  onScroll() { this.isScrolled.set(window.scrollY > 20); }

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
    this.authService.loginModalOpen.set(false);
    this.loginSuccess.set(false);
    this.loginError.set('');
    this.loginEmail = '';
    this.loginPassword = '';
    this.registerName = '';
    this.registerEmail = '';
    this.registerPassword = '';
    this.showPw.set(false);
    this.showRegister.set(false);
  }

  async doLogin() {
    if (!this.loginEmail || !this.loginPassword) {
      this.loginError.set('Please enter your email and password.');
      return;
    }
    this.loginError.set('');
    this.loginLoading.set(true);
    try {
      await this.authService.loginWithEmail(this.loginEmail, this.loginPassword);
      this.loginSuccess.set(true);
      setTimeout(() => this.closeLogin(), 1600);
    } catch (err: unknown) {
      const msg = (err as { code?: string })?.code;
      if (msg === 'auth/invalid-credential' || msg === 'auth/user-not-found' || msg === 'auth/wrong-password') {
        this.loginError.set('Invalid email or password.');
      } else if (msg === 'auth/too-many-requests') {
        this.loginError.set('Too many attempts. Try again later.');
      } else {
        this.loginError.set('Sign in failed. Please try again.');
      }
    } finally {
      this.loginLoading.set(false);
    }
  }

  async loginWithGoogle() {
    this.loginError.set('');
    this.loginLoading.set(true);
    try {
      await this.authService.loginWithGoogle();
      this.loginSuccess.set(true);
      setTimeout(() => this.closeLogin(), 1600);
    } catch (err: unknown) {
      const msg = (err as { code?: string })?.code;
      if (msg !== 'auth/popup-closed-by-user') {
        this.loginError.set('Google sign-in failed. Please try again.');
      }
    } finally {
      this.loginLoading.set(false);
    }
  }

  async doRegister() {
    if (!this.registerName || !this.registerEmail || !this.registerPassword) {
      this.loginError.set('Please fill in all fields.');
      return;
    }
    if (this.registerPassword.length < 6) {
      this.loginError.set('Password must be at least 6 characters.');
      return;
    }
    this.loginError.set('');
    this.loginLoading.set(true);
    try {
      await this.authService.register(this.registerEmail, this.registerPassword, this.registerName);
      this.loginSuccess.set(true);
      setTimeout(() => this.closeLogin(), 1600);
    } catch (err: unknown) {
      const msg = (err as { code?: string })?.code;
      if (msg === 'auth/email-already-in-use') {
        this.loginError.set('Email already in use. Try signing in.');
      } else {
        this.loginError.set('Registration failed. Please try again.');
      }
    } finally {
      this.loginLoading.set(false);
    }
  }

  closeSubscribeModal() {
    this.authService.subscribeModalOpen.set(false);
    setTimeout(() => {
      this.subscribeStep.set('plans');
      this.selectedPlan.set(null);
      this.payNetwork = '';
      this.payPhone = '';
    }, 300);
  }

  selectPlan(plan: Plan) {
    this.selectedPlan.set(plan);
    this.subscribeStep.set('payment');
  }

  isPayDisabled() { return !this.payNetwork || !this.payPhone.trim(); }

  payNow() {
    if (this.isPayDisabled()) return;
    this.subscribeStep.set('processing');
    setTimeout(() => {
      this.subscribeStep.set('success');
      this.authService.activateSubscription(this.selectedPlan()!.id);
      setTimeout(() => this.closeSubscribeModal(), 2200);
    }, 2200);
  }
}
