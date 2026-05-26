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
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

export interface AppUser {
  uid: string;
  firstName: string;
  lastName: string;
  name: string;
  email: string;
  initials: string;
  plan: 'none' | 'basic' | 'standard' | 'premium';
  role: 'viewer' | 'vj' | 'musician' | 'tiktoker' | 'admin';
  photoURL?: string;
}

const ADMIN_EMAILS = ['luowatch0@gmail.com', 'mainplatform.nexus@gmail.com'];

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
    const profileRef = doc(this.firebase.db, 'profiles', firebaseUser.uid);
    const snapshot = await getDoc(profileRef);

    let profileData: Record<string, unknown> = {};
    if (snapshot.exists()) {
      profileData = snapshot.data() as Record<string, unknown>;
      await updateDoc(profileRef, { lastSeen: new Date().toISOString() });
    } else {
      const displayName = firebaseUser.displayName || '';
      const parts = displayName.split(' ');
      const firstName = parts[0] || firebaseUser.email?.split('@')[0] || 'User';
      const lastName = parts.slice(1).join(' ') || '';
      const isAdmin = ADMIN_EMAILS.includes(firebaseUser.email || '');
      profileData = {
        firstName,
        lastName,
        email: firebaseUser.email || '',
        role: isAdmin ? 'admin' : 'viewer',
        photoURL: firebaseUser.photoURL || '',
        lastSeen: new Date().toISOString(),
        watchCount: 0,
        status: 'active',
        plan: 'none',
      };
      await setDoc(profileRef, profileData);
    }

    const firstName = String(profileData['firstName'] || '');
    const lastName = String(profileData['lastName'] || '');
    const name = `${firstName} ${lastName}`.trim() || firebaseUser.displayName || 'User';
    const words = name.split(' ').filter((w: string) => w.length > 0);
    const initials = words.map((w: string) => w[0].toUpperCase()).join('').slice(0, 2) || 'U';

    const isAdmin = ADMIN_EMAILS.includes(firebaseUser.email || '');
    const storedRole = String(profileData['role'] || 'viewer') as AppUser['role'];
    const role: AppUser['role'] = isAdmin ? 'admin' : storedRole;

    const appUser: AppUser = {
      uid: firebaseUser.uid,
      firstName,
      lastName,
      name,
      email: String(profileData['email'] || firebaseUser.email || ''),
      initials,
      plan: (profileData['plan'] as AppUser['plan']) || 'none',
      role,
      photoURL: String(profileData['photoURL'] || firebaseUser.photoURL || ''),
    };

    this.currentUser.set(appUser);
    this.isLoggedIn.set(true);
    this.hasSubscription.set(appUser.plan !== 'none' || appUser.role === 'admin' || appUser.role === 'vj');
  }

  async loginWithEmail(email: string, password: string): Promise<void> {
    await signInWithEmailAndPassword(this.firebase.auth, email, password);
  }

  async loginWithGoogle(): Promise<void> {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(this.firebase.auth, provider);
  }

  async register(email: string, password: string, name: string, role: AppUser['role'] = 'viewer'): Promise<void> {
    const credential = await createUserWithEmailAndPassword(this.firebase.auth, email, password);
    await updateProfile(credential.user, { displayName: name });
    const parts = name.trim().split(' ');
    const firstName = parts[0] || name;
    const lastName = parts.slice(1).join(' ') || '';
    const profileRef = doc(this.firebase.db, 'profiles', credential.user.uid);
    await setDoc(profileRef, {
      firstName,
      lastName,
      email,
      role,
      plan: 'none',
      lastSeen: new Date().toISOString(),
      watchCount: 0,
      status: 'active',
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
      const profileRef = doc(this.firebase.db, 'profiles', user.uid);
      updateDoc(profileRef, { plan });
    }
    this.hasSubscription.set(true);
  }
}
