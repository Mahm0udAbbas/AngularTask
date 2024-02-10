import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserAuthService {
  isLogedInStatus: BehaviorSubject<boolean>;
  constructor() {
    this.isLogedInStatus = new BehaviorSubject<boolean>(this.isLogedIn());
  }
  login(email: string, password: string) {
    let token = `${email}${password}`;
    localStorage.setItem('token', token);
    this.isLogedInStatus.next(true);
  }

  logOut() {
    localStorage.removeItem('token');
    this.isLogedInStatus.next(true);
  }
  isLogedIn(): boolean {
    let token = localStorage.getItem('token');
    return token != null;
  } 
  getLogedStatus(): BehaviorSubject<boolean> {
    return this.isLogedInStatus;
  }
}
