import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthenticationService } from '../../../services/authentication.service';
import { Router, RouterLink } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-user',
  imports: [FormsModule, RouterLink],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css'
})
export class CreateUserComponent {
  authService = inject(AuthenticationService)
  private snackBar = inject(MatSnackBar)
  router = inject(Router)
  name = ''
  email = ''
  password = ''

  submitRegister() {
    this.authService.register({
      name: this.name,
      email: this.email,
      password: this.password
    }).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.snackBar.open("Puxar do backend", "Fechar", {
          duration: 9000,
          panelClass: ['toast-error', 'toast']
        });
      }
    });
  }
}
