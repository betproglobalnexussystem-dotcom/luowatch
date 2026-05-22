import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  template: `
    <footer class="footer">
      <div class="footer-inner">
        <div class="footer-top">
          <div class="footer-brand">
            <a routerLink="/" class="footer-logo">
              <svg width="80" height="26" viewBox="0 0 80 26" fill="none">
                <text x="0" y="21" font-family="Inter, sans-serif" font-weight="800" font-size="16" fill="url(#fgrad)">LUO WATCH</text>
                <defs>
                  <linearGradient id="fgrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stop-color="#FF271C"/>
                    <stop offset="100%" stop-color="#F5852F"/>
                  </linearGradient>
                </defs>
              </svg>
            </a>
            <p class="footer-desc">Watch movies and TV shows online. Stream thousands of hit movies and TV shows on your device.</p>
            <div class="footer-social">
              <a href="#" class="social-icon" aria-label="Facebook">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="#" class="social-icon" aria-label="Twitter">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></svg>
              </a>
              <a href="#" class="social-icon" aria-label="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              <a href="#" class="social-icon" aria-label="YouTube">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#1a1c24"/></svg>
              </a>
            </div>
          </div>

          <div class="footer-links">
            <div class="links-col">
              <h4>Explore</h4>
              <a routerLink="/movies">Movies</a>
              <a routerLink="/tv-shows">TV Shows</a>
              <a routerLink="/movies">New Releases</a>
              <a routerLink="/movies">Upcoming</a>
              <a routerLink="/movies">Top Rated</a>
            </div>
            <div class="links-col">
              <h4>Genres</h4>
              <a routerLink="/movies">Action</a>
              <a routerLink="/movies">Horror</a>
              <a routerLink="/movies">Comedy</a>
              <a routerLink="/movies">Drama</a>
              <a routerLink="/movies">Sci-Fi</a>
            </div>
            <div class="links-col">
              <h4>Help</h4>
              <a href="#">About Us</a>
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Use</a>
              <a href="#">Contact Us</a>
              <a href="#">FAQ</a>
            </div>
          </div>
        </div>

        <div class="footer-bottom">
          <p class="copyright">© 2024 LUO WATCH. All rights reserved. Made for entertainment.</p>
          <p class="disclaimer">LUO WATCH does not store any files on its server. All content is provided by non-affiliated third parties.</p>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background: #0e1018;
      border-top: 1px solid rgba(255,255,255,0.07);
      margin-top: 40px;
    }
    .footer-inner {
      max-width: 1400px;
      margin: 0 auto;
      padding: 48px 32px 24px;
    }
    .footer-top {
      display: grid;
      grid-template-columns: 1fr 2fr;
      gap: 48px;
      margin-bottom: 36px;
    }
    .footer-brand {
      display: flex;
      flex-direction: column;
      gap: 14px;
    }
    .footer-logo {
      display: inline-flex;
    }
    .footer-desc {
      color: rgba(255,255,255,0.45);
      font-size: 13px;
      line-height: 1.6;
      max-width: 260px;
    }
    .footer-social {
      display: flex;
      gap: 10px;
    }
    .social-icon {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: rgba(255,255,255,0.08);
      color: rgba(255,255,255,0.6);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s;
      &:hover { background: linear-gradient(135deg, #FF271C, #F5852F); color: #fff; }
    }
    .footer-links {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 24px;
    }
    .links-col {
      display: flex;
      flex-direction: column;
      gap: 10px;
      h4 {
        color: #fff;
        font-size: 14px;
        font-weight: 700;
        margin-bottom: 4px;
        letter-spacing: 0.5px;
        text-transform: uppercase;
      }
      a {
        color: rgba(255,255,255,0.45);
        font-size: 13px;
        transition: color 0.2s;
        &:hover { color: #FF271C; }
      }
    }
    .footer-bottom {
      border-top: 1px solid rgba(255,255,255,0.07);
      padding-top: 20px;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .copyright {
      color: rgba(255,255,255,0.4);
      font-size: 12px;
    }
    .disclaimer {
      color: rgba(255,255,255,0.25);
      font-size: 11px;
      line-height: 1.5;
    }
    @media (max-width: 900px) {
      .footer-top { grid-template-columns: 1fr; gap: 32px; }
    }
    @media (max-width: 600px) {
      .footer-inner { padding: 32px 16px 20px; }
      .footer-links { grid-template-columns: repeat(2, 1fr); }
    }
  `]
})
export class FooterComponent {}
