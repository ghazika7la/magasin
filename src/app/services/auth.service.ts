import { Injectable, signal } from '@angular/core';

interface AuthUser {
  name: string;
  email: string;
  avatar: string;
}

interface StoredUser {
  name: string;
  email: string;
  password: string;
}

interface AuthResult {
  ok: boolean;
  error?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly loginKey = 'isLoggedIn';
  private readonly currentUserKey = 'currentUser';
  private readonly registeredUsersKey = 'registeredUsers';

  readonly currentUser = signal<AuthUser | null>(null);
  private readonly loggedIn = signal(false);

  constructor() {
    this.restoreSession();
  }

  login(username: string, password: string): AuthResult {
    const normalized = username.trim().toLowerCase();
    const storedUsers = this.getRegisteredUsers();
    const matchedUser = storedUsers.find(
      user => user.email.toLowerCase() === normalized && user.password === password
    );

    if (matchedUser) {
      this.startSession(matchedUser.name, matchedUser.email);
      return { ok: true };
    }

    if ((normalized === 'admin' || normalized === 'admin@example.com') && password === 'password') {
      this.startSession('Admin', 'admin@example.com');
      return { ok: true };
    }

    return { ok: false, error: 'Identifiants incorrects.' };
  }

  register(name: string, email: string, password: string): AuthResult {
    const normalizedEmail = email.trim().toLowerCase();
    const users = this.getRegisteredUsers();

    if (users.some(user => user.email.toLowerCase() === normalizedEmail)) {
      return { ok: false, error: 'Cet email est deja utilise.' };
    }

    const newUser: StoredUser = {
      name: name.trim(),
      email: normalizedEmail,
      password
    };

    users.push(newUser);
    localStorage.setItem(this.registeredUsersKey, JSON.stringify(users));
    this.startSession(newUser.name, newUser.email);
    return { ok: true };
  }

  logout(): void {
    this.loggedIn.set(false);
    this.currentUser.set(null);
    localStorage.removeItem(this.loginKey);
    localStorage.removeItem(this.currentUserKey);
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn();
  }

  isLoggedIn(): boolean {
    this.restoreSession();
    return this.loggedIn();
  }

  getCurrentUser(): string | null {
    return this.currentUser()?.name ?? null;
  }

  private startSession(name: string, email: string): void {
    const user: AuthUser = {
      name,
      email,
      avatar: name.charAt(0).toUpperCase() || 'U'
    };

    this.loggedIn.set(true);
    this.currentUser.set(user);
    localStorage.setItem(this.loginKey, 'true');
    localStorage.setItem(this.currentUserKey, JSON.stringify(user));
  }

  private restoreSession(): void {
    if (typeof localStorage === 'undefined') {
      return;
    }

    const isLoggedIn = localStorage.getItem(this.loginKey) === 'true';
    const rawUser = localStorage.getItem(this.currentUserKey);

    if (!isLoggedIn || !rawUser) {
      return;
    }

    try {
      const user = JSON.parse(rawUser) as AuthUser;
      this.loggedIn.set(true);
      this.currentUser.set(user);
    } catch {
      this.logout();
    }
  }

  private getRegisteredUsers(): StoredUser[] {
    if (typeof localStorage === 'undefined') {
      return [];
    }

    const raw = localStorage.getItem(this.registeredUsersKey);
    if (!raw) {
      return [];
    }

    try {
      return JSON.parse(raw) as StoredUser[];
    } catch {
      return [];
    }
  }
}
