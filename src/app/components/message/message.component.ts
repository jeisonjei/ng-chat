import { Component, input, signal, Signal } from '@angular/core';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [],
  templateUrl: './message.component.html',
  styleUrl: './message.component.css'
})
export class MessageComponent {
  message = input('');
  username = input('');
  timestamp = input('');
}
