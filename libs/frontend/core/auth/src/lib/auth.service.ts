import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public isConnected = false;

  constructor() {
    return;
  }

  public tryToSign(): boolean {
    this.isConnected = true;
    return true;
  }

  public isSign(): boolean {
    return this.isConnected;
  }
}
