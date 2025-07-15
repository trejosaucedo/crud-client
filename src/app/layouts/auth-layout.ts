// auth-layout.ts
import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    AsyncPipe,
  ],
  templateUrl: './auth-layout.html',
})
export class AuthLayout {
  private auth = inject(AuthService);
  user$ = this.auth.userChanges$;

  logout() {
    this.auth.logout().subscribe();
  }

  getInitial(name?: string | null): string {
    if (!name) return '?';
    return name.slice(0, 1).toUpperCase();
  }
}
