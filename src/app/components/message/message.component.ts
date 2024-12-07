import { Component, inject, input, signal, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from '../../services/authentication.service';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule],
  templateUrl: './message.component.html',
  styleUrl: './message.component.css'
})
export class MessageComponent {
  message = input('');
  username = input('');
  timestamp = input('');

  authService = inject(AuthenticationService);
}
