import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private ACCESS_TOKEN_KEY = 'auth-token';
  private REFRESH_TOKEN_KEY = 'refresh-token';

  constructor() {
  }

  private isTokenExpired(token: string): boolean {
    const tokenParts = token.split('.');
    if (tokenParts.length !== 3) {
      throw new Error('Invalid token format');
    }

    const payload = JSON.parse(atob(tokenParts[1]));

    // Check for the exp property
    if (!payload.exp) {
      throw new Error('Token does not have an expiration time');
    }

    // Current time in seconds
    const currentTime = Math.floor(Date.now() / 1000);

    // Return true if the token is expired
    return payload.exp < currentTime;
  }

  public isRefreshTokenExpired(): boolean {
    const refreshToken = localStorage.getItem(this.REFRESH_TOKEN_KEY);
    if (!refreshToken) {
      return true;
    }
    return this.isTokenExpired(refreshToken);
  }

  public isAccessTokenExpired(): boolean {
    const accessToken = localStorage.getItem(this.ACCESS_TOKEN_KEY);
    if (!accessToken) {
      return true;
    }
    return this.isTokenExpired(accessToken);
  }

  /**
   * Is the current user authenticated?
   */
  public isAuthenticated(): boolean {
    const accessToken = localStorage.getItem(this.ACCESS_TOKEN_KEY);
    const refreshToken = localStorage.getItem(this.REFRESH_TOKEN_KEY);

    // both the refresh and access tokens are required.
    if (!accessToken || !refreshToken) {
      return false;
    }

    return !this.isAccessTokenExpired();
  }

  public async login(loginRequest: LoginRequest): Promise<boolean> {
    try {
      const result = await fetch(
        OBTAIN_TOKEN_PAIR_ENDPOINT,
        {
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginRequest),
          method: 'POST',
        }
      );

      if (result.status == 200) {
        const creds: LoginResponse = await result.json();
        localStorage.setItem(this.ACCESS_TOKEN_KEY, creds.access);
        localStorage.setItem(this.REFRESH_TOKEN_KEY, creds.refresh);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  }

}
