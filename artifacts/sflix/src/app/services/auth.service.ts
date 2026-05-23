import { Injectable, signal } from '@angular/core';

export interface AppUser {
  name: string;
  email: string;
  initials: string;
  plan: 'none' | 'basic' | 'standard' | 'premium';
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  loginModalOpen = signal(false);
  subscribeModalOpen = signal(false);
  isLoggedIn = signal(false);
  hasSubscription = signal(false);
  currentUser = signal<AppUser | null>(null);

  login(email: string) {
    const namePart = email.split('@')[0].replace(/[._-]+/g, ' ').trim();
    const words = namePart.split(' ').filter(w => w.length > 0);
    const displayName = words.map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    const initials = words.map(w => w.charAt(0).toUpperCase()).join('').slice(0, 2) || 'U';
    this.currentUser.set({ name: displayName || email, email, initials, plan: 'none' });
    this.isLoggedIn.set(true);
  }

  logout() {
    this.isLoggedIn.set(false);
    this.hasSubscription.set(false);
    this.currentUser.set(null);
  }

  activateSubscription(plan: string) {
    const user = this.currentUser();
    if (user) {
      this.currentUser.set({ ...user, plan: plan as AppUser['plan'] });
    }
    this.hasSubscription.set(true);
  }
}
