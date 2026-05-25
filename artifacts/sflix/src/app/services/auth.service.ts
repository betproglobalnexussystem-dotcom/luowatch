import { Injectable, signal } from '@angular/core';
import { FirebaseService } from './firebase.service';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
  updateProfile
} from 'firebase/auth';
import { ref, get, set, update } from 'firebase/database';

export interface AppUser {
  uid: string;
  name: string;
  email: string;
  initials: string;
  plan: 'none' | 'basic' | 'standard' | 'premium';
  role: 'user' | 'vj' | 'admin';
  photoURL?: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  loginModalOpen = signal(false);
  subscribeModalOpen = signal(false);
  isLoggedIn = signal(false);
  hasSubscription = signal(false);
  currentUser = signal<AppUser | null>(null);
  authLoading = signal(true);

  constructor(private firebase: FirebaseService) {
    onAuthStateChanged(this.firebase.auth, async (user) => {
      if (user) {
        await this.loadUserProfile(user);
      } else {
        this.isLoggedIn.set(false);
        this.hasSubscription.set(false);
        this.currentUser.set(null);
      }
      this.authLoading.set(false);
    });
  }

  private async loadUserProfile(firebaseUser: FirebaseUser): Promise<void> {
    const userRef = ref(this.firebase.db, `users/${firebaseUser.uid}`);
    const snapshot = await get(userRef);

    let userData: Record<string, unknown> = {};
    if (snapshot.exists()) {
      userData = snapshot.val() as Record<string, unknown>;
    } else {
      const namePart = firebaseUser.displayName || firebaseUser.email || 'User';
      userData = {
        name: namePart,
        email: firebaseUser.email || '',
        photoURL: firebaseUser.photoURL || '',
        plan: 'none',
        role: 'user',
        joinDate: new Date().toISOString().split('T')[0],
        lastSeen: new Date().toISOString(),
        watchCount: 0,
        status: 'active'
      };
      await set(userRef, userData);
    }

    await update(userRef, { lastSeen: new Date().toISOString() });

    const name = String(userData['name'] || firebaseUser.displayName || 'User');
    const words = name.split(' ').filter((w: string) => w.length > 0);
    const initials = words.map((w: string) => w[0].toUpperCase()).join('').slice(0, 2) || 'U';

    const appUser: AppUser = {
      uid: firebaseUser.uid,
      name,
      email: String(userData['email'] || firebaseUser.email || ''),
      initials,
      plan: (userData['plan'] as AppUser['plan']) || 'none',
      role: (userData['role'] as AppUser['role']) || 'user',
      photoURL: String(userData['photoURL'] || firebaseUser.photoURL || '')
    };

    this.currentUser.set(appUser);
    this.isLoggedIn.set(true);
    this.hasSubscription.set(appUser.plan !== 'none');
  }

  async loginWithEmail(email: string, password: string): Promise<void> {
    await signInWithEmailAndPassword(this.firebase.auth, email, password);
  }

  async loginWithGoogle(): Promise<void> {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(this.firebase.auth, provider);
  }

  async register(email: string, password: string, name: string): Promise<void> {
    const credential = await createUserWithEmailAndPassword(this.firebase.auth, email, password);
    await updateProfile(credential.user, { displayName: name });
    const userRef = ref(this.firebase.db, `users/${credential.user.uid}`);
    await set(userRef, {
      name,
      email,
      plan: 'none',
      role: 'user',
      joinDate: new Date().toISOString().split('T')[0],
      lastSeen: new Date().toISOString(),
      watchCount: 0,
      status: 'active'
    });
  }

  logout(): void {
    signOut(this.firebase.auth);
  }

  activateSubscription(plan: string): void {
    const user = this.currentUser();
    if (user) {
      const updated = { ...user, plan: plan as AppUser['plan'] };
      this.currentUser.set(updated);
      const userRef = ref(this.firebase.db, `users/${user.uid}`);
      update(userRef, { plan });
    }
    this.hasSubscription.set(true);
  }
}
