import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { User } from '../../model/User';
import { Router } from '@angular/router';
import { MessageComponent } from '../message/message.component';
import { MessageToServer } from '../../model/MessageToServer';

// material
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';



const URL = `wss://95.182.120.168:8765`;
// const URL = `ws://localhost:8765/`;


@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    HttpClientModule,
    MessageComponent,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit{
  
  ws!: WebSocket;
  messages: MessageToServer[] = [];
  formGroup: FormGroup = new FormGroup({
    message: new FormControl(''),
  });

  http = inject(HttpClient);
  router = inject(Router);
  
  user: (User | null) = null;
  username: string = '';
  timestamp = new Date();

  ngOnInit(): void {

    var userJson = sessionStorage.getItem('user') ?? '{}';
    this.user = JSON.parse(userJson);
    this.username = this.user?.username ?? '';

    if (this.username) {
      this.ws = new WebSocket(URL);

      console.group(`** ngOnInit **`);
      console.log('User:', this.user);
      console.groupEnd();
      
      this.ws.onopen = () => {
        console.log('WebSocket connection established');
      };
      this.ws.onmessage = (event) => {
  
        var m = event.data;
        
        console.log('Received message:', event.data);
        
        var o:MessageToServer = JSON.parse(m) as MessageToServer;
        
        o.timestamp = (new Date(o.timestamp)).toLocaleString();

        console.log(`** o.timestamp: ${o.timestamp}`);
        
        console.log('Parsed message:', o);
        this.messages.push(o);
      };
      this.ws.onclose = () => {
        console.log('WebSocket connection closed');
      };
      this.ws.onerror = (error) => {
        console.error('WebSocket error:', error);
      };
    }
    else {
      console.log('No user found in session storage');
      this.router.navigateByUrl('');
    }


  }

  sendMessage(): void {

    var value = this.formGroup.controls['message'].value;

    this.timestamp = new Date();

    var valueToServer = {
      username: this.username,
      message: value,
      timestamp: this.timestamp.toISOString()
    }

    this.ws.send(JSON.stringify(valueToServer));
    this.formGroup.patchValue({ message: '' });
  }

}
