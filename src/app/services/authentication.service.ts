import { Injectable } from '@angular/core';
import { User } from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {



  constructor() { }

  isAuthenticated(username: string) {
    var credsJson = sessionStorage.getItem('user') ?? '{}';
    var user: User = JSON.parse(credsJson);
    return username === user.username;
  }
}
