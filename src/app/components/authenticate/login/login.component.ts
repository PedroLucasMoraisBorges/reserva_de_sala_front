import { Component, inject } from '@angular/core';
import { AuthenticationService } from '../../../services/authentication.service';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  authService = inject(AuthenticationService)
  router = inject(Router);
  email = '';
  password = '';

  submitLogin() {
    this.authService.login({
      email: this.email,
      password: this.password
    }).subscribe({
      next: (res) => {
        console.log(res)
        localStorage.setItem('token', res.token);
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('Erro de login:', err);
      }
    });
  }
}
