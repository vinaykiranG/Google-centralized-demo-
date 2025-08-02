import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'firebase/auth'; // We can still use the type

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser = signal<User | null>(null);

  constructor(private router: Router) { }

  // Mock login with email and password
  loginWithEmail(email: string, pass: string) {
    console.log(`Attempting login with email: ${email}`);
    // Simulate a successful login
    const mockUser: User = {
      uid: 'mock-uid-123',
      email: email,
      displayName: 'Mock User',
      photoURL: '',
      emailVerified: true,
      isAnonymous: false,
      metadata: {},
      providerData: [],
      providerId: 'password',
      tenantId: null,
      refreshToken: '',
      phoneNumber: null,
      delete: () => Promise.resolve(),
      getIdToken: () => Promise.resolve('mock-token'),
      getIdTokenResult: () => Promise.resolve({
        token: 'mock-token',
        expirationTime: '',
        authTime: '',
        issuedAtTime: '',
        signInProvider: null,
        signInSecondFactor: null,
        claims: {},
      }),
      reload: () => Promise.resolve(),
      toJSON: () => ({}),
    };
    this.currentUser.set(mockUser);
    this.router.navigate(['/dashboard']);
  }

  // Mock login with Google
  loginWithGoogle() {
    console.log('Attempting login with Google');
    const mockUser: User = {
      uid: 'mock-uid-google-456',
      email: 'mock.user@google.com',
      displayName: 'Mock Google User',
      photoURL: '',
      emailVerified: true,
      isAnonymous: false,
      metadata: {},
      providerData: [],
      providerId: 'google.com',
      tenantId: null,
      refreshToken: '',
      phoneNumber: null,
      delete: () => Promise.resolve(),
      getIdToken: () => Promise.resolve('mock-google-token'),
      getIdTokenResult: () => Promise.resolve({
        token: 'mock-google-token',
        expirationTime: '',
        authTime: '',
        issuedAtTime: '',
        signInProvider: null,
        signInSecondFactor: null,
        claims: {},
      }),
      reload: () => Promise.resolve(),
      toJSON: () => ({}),
    };
    this.currentUser.set(mockUser);
    this.router.navigate(['/dashboard']);
  }

  // Mock logout
  logout() {
    this.currentUser.set(null);
    this.router.navigate(['/login']);
  }
}
