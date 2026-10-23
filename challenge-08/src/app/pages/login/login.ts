import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private auth = inject(AuthService);
  private router = inject(Router);

  email = signal('');
  password = signal('');
  error = signal('');

  submit(): void {
    if (this.auth.login(this.email(), this.password())) {
      this.error.set('');
      this.router.navigate(['/libros']);
    } else {
      this.error.set('Correo o contraseña incorrectos');
    }
  }
}