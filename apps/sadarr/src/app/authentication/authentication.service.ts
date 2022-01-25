import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AuthenticationResponseModel } from '../api/models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private cookieKey = 'Bearer';
  private currentUserKey = 'currentUser';

  constructor(private cookieService: CookieService) {}

  getCookie(): string {
    return this.cookieService.get(this.cookieKey);
  }

  getCurrentUser(): AuthenticationResponseModel | null {
    const currentUser = localStorage.getItem(this.currentUserKey);
    if (currentUser) {
      return JSON.parse(currentUser);
    }
    return null;
  }

  resetLocalStorageAndCookies(): void {
    localStorage.clear();
    this.cookieService.deleteAll();
  }

  setCookieToCurrentUserToken(): void {
    const authenticationResponse: AuthenticationResponseModel | null =
      this.getCurrentUser();
    if (authenticationResponse && !this.getCookie()) {
      this.cookieService.set('Bearer', authenticationResponse.token);
    }
  }

  setCurrentUser(authenticationResponse: AuthenticationResponseModel): void {
    localStorage.setItem(
      this.currentUserKey,
      JSON.stringify(authenticationResponse)
    );
    this.setCookieToCurrentUserToken();
  }
}
