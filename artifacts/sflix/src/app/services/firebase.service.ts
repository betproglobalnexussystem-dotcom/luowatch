import { Injectable } from '@angular/core';
import { initializeApp, FirebaseApp, getApps } from 'firebase/app';
import { getDatabase, Database } from 'firebase/database';
import { getAuth, Auth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBrvw6lZCFUMIQKPjbLQn88U8aYXSMBllo',
  authDomain: 'luo-watch.firebaseapp.com',
  databaseURL: 'https://luo-watch-default-rtdb.firebaseio.com',
  projectId: 'luo-watch',
  storageBucket: 'luo-watch.firebasestorage.app',
  messagingSenderId: '715391513900',
  appId: '1:715391513900:web:eb58773716134d3c60a889',
  measurementId: 'G-275C5X897V'
};

@Injectable({ providedIn: 'root' })
export class FirebaseService {
  readonly app: FirebaseApp;
  readonly db: Database;
  readonly auth: Auth;

  constructor() {
    this.app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
    this.db = getDatabase(this.app);
    this.auth = getAuth(this.app);
  }
}
