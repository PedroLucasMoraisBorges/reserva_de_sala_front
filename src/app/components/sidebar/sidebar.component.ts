import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

export interface User {
  name: string;
  email: string;
  roles: any[];
  is_staff: boolean;
  is_superuser: boolean;
}

@Component({
  selector: 'app-sidebar',
  imports: [RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  authService = inject(AuthenticationService)
  router = inject(Router)
  user?: User;
  token = localStorage.getItem('token');

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  ngOnInit() {
    const token = localStorage.getItem('token');

    if (!token) {
      this.router.navigate(['/login']);
      return;
    }

    this.authService.getUserInfo(token).subscribe({
      next: (res) => {
        this.user = res; // ✔️ agora user tem dados
      },
      error: () => {
        this.router.navigate(['/login']);
      }
    });
  }
}
