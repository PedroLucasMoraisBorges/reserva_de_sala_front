import { Component, inject } from '@angular/core';
import { AuthenticationService } from '../../../services/authentication.service';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  authService = inject(AuthenticationService)
  private snackBar = inject(MatSnackBar)
  router = inject(Router);
  email = '';
  password = '';

  submitLogin() {
    this.authService.login({
      email: this.email,
      password: this.password
    }).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.snackBar.open("Email ou senha inválidos", "Fechar", {
          duration: 9000,
          panelClass: ['toast-error', 'toast']
        });
      }
    });
  }
}
