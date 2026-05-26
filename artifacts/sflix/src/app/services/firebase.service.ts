import { Injectable } from '@angular/core';
import { initializeApp, FirebaseApp, getApps } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getAuth, Auth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBrvw6lZCFUMIQKPjbLQn88U8aYXSMBllo',
  authDomain: 'luo-watch.firebaseapp.com',
  projectId: 'luo-watch',
  storageBucket: 'luo-watch.firebasestorage.app',
  messagingSenderId: '715391513900',
  appId: '1:715391513900:web:eb58773716134d3c60a889',
  measurementId: 'G-275C5X897V'
};

@Injectable({ providedIn: 'root' })
export class FirebaseService {
  readonly app: FirebaseApp;
  readonly db: Firestore;
  readonly auth: Auth;

  constructor() {
    this.app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
    this.db = getFirestore(this.app);
    this.auth = getAuth(this.app);
  }
}
