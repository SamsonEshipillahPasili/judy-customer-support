import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

  /**
   * Is the current user authenticated?
   */
  public isAuthenticated(): boolean {
    return false;
  }
}
