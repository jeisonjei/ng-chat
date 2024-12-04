import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

const URL = `wss://95.182.120.168:8765`;
// const URL = `ws://localhost:8765/`;


@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit{
  
  ws: WebSocket = new WebSocket(URL);
  messages: string[] = [];
  formGroup: FormGroup = new FormGroup({
    message: new FormControl(''),
  })

  ngOnInit(): void {
    this.ws.onopen = () => {
      console.log('WebSocket connection established');
    };
    this.ws.onmessage = (event) => {

      var m = event.data;
      
      console.log('Received message:', event.data);
      this.messages.push(m);
    };
    this.ws.onclose = () => {
      console.log('WebSocket connection closed');
    };
    this.ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  }

  sendMessage(): void {

    var value = this.formGroup.controls['message'].value;

    console.group(`** sendMessage **`);
    console.log('Message:', value);
    console.groupEnd();
    
    this.ws.send(value);
    this.formGroup.patchValue({ message: '' });
  }

}
