import { Component, HostListener, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChatComponent } from "./components/chat/chat.component";



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ChatComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent{
  title = 'ng-chat';

  @HostListener('window:onbeforeunload', ['$event'])
  clearLocalStorage(event:Event) {
    localStorage.clear();
    return true; // Prevent default behavior
  }
  

}
