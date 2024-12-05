import { Component, inject, output } from '@angular/core';
import { User } from '../../model/User';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  user: (User | null) = null;
  router = inject(Router);

  loginForm = new FormGroup({
    username: new FormControl('', Validators.required)
  });

  onLogin(): void {
    const username = this.loginForm.get('username')?.value;
    if (this.loginForm.get('username')?.valid) {
      this.user = { id: 1, username: username ?? '', email: `${username}@example.com` };
      sessionStorage.setItem('user', JSON.stringify(this.user));
      this.router.navigateByUrl('/chat');
    }
    else {
      alert('Invalid username');
    }
  }
}
