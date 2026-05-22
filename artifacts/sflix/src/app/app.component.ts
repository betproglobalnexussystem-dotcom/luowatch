import { Component } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { CommonModule } from '@angular/common';
import { filter, map } from 'rxjs/operators';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent, CommonModule],
  template: `
    <div class="app-wrapper">
      @if(!isDashboard()) {
        <app-navbar></app-navbar>
      }
      <main class="main-content" [class.dashboard-main]="isDashboard()">
        <router-outlet></router-outlet>
      </main>
      @if(!isDashboard()) {
        <app-footer></app-footer>
      }
    </div>
  `,
  styles: [`
    .app-wrapper {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
      background-color: #1a1c24;
    }
    .main-content {
      flex: 1;
    }
    .dashboard-main {
      padding: 0;
    }
  `]
})
export class AppComponent {
  isDashboard = toSignal(
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      map((e: any) => e.urlAfterRedirects?.startsWith('/vj') || e.urlAfterRedirects?.startsWith('/admin'))
    ),
    { initialValue: false }
  );

  constructor(private router: Router) {}
}
