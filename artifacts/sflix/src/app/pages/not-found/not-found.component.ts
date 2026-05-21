import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="not-found">
      <div class="content">
        <div class="error-code">404</div>
        <h1>Page Not Found</h1>
        <p>The page you're looking for doesn't exist or has been moved.</p>
        <a routerLink="/" class="home-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
          Go Home
        </a>
      </div>
    </div>
  `,
  styles: [`
    .not-found {
      background: #1a1c24;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
    }
    .content {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;
    }
    .error-code {
      font-size: 120px;
      font-weight: 900;
      background: linear-gradient(135deg, #FF271C, #F5852F);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      line-height: 1;
    }
    h1 { font-size: 28px; font-weight: 700; color: #fff; }
    p { color: rgba(255,255,255,0.5); font-size: 15px; }
    .home-btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: linear-gradient(135deg, #FF271C, #F5852F);
      color: #fff;
      font-size: 15px;
      font-weight: 600;
      padding: 12px 28px;
      border-radius: 28px;
      text-decoration: none;
      margin-top: 8px;
      transition: transform 0.2s;
      &:hover { transform: translateY(-2px); }
    }
  `]
})
export class NotFoundComponent {}
