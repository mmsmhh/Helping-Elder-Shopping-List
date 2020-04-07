import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as config from '../configurations';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private _router: Router) {}

  signUp(signUpObj: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.post<any>(
      `${config.URL}/user/sign-up`,
      signUpObj,
      httpOptions
    );
  }

  signIn(signInObj: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.post<any>(
      `${config.URL}/user/sign-in`,
      signInObj,
      httpOptions
    );
  }

  signOut() {
    localStorage.removeItem(config.AUTH_TOKEN);
    this._router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(config.AUTH_TOKEN);
  }

  getProfile() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem(config.AUTH_TOKEN),
      }),
    };
    return this.http.get<any>(`${config.URL}/user/profile`, httpOptions);
  }

  getId() {
    return localStorage.getItem(config.USER_ID);
  }

  getUser(id: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem(config.AUTH_TOKEN),
      }),
    };
    return this.http.get<any>(`${config.URL}/user/getUser/${id}`, httpOptions);
  }

  saveUser(token: string, id: string): void {
    localStorage.setItem(config.AUTH_TOKEN, token);
    localStorage.setItem(config.USER_ID, id);
  }

  verifyEmail(verifyEmailObj: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.post<any>(
      `${config.URL}/user/verify-email`,
      verifyEmailObj,
      httpOptions
    );
  }

  forgetPassword(forgetPasswordObj: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.post<any>(
      `${config.URL}/user/forget-password`,
      forgetPasswordObj,
      httpOptions
    );
  }

  resetPassword(resetPasswordObj: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.post<any>(
      `${config.URL}/user/forget-password`,
      resetPasswordObj,
      httpOptions
    );
  }

  updatePasswod(updatePasswordObj: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem(config.AUTH_TOKEN),
      }),
    };

    return this.http.patch<any>(
      `${config.URL}/user/update-password`,
      updatePasswordObj,
      httpOptions
    );
  }

  updateUser(updateUserObj: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem(config.AUTH_TOKEN),
      }),
    };

    return this.http.patch<any>(
      `${config.URL}/user/update-profile`,
      updateUserObj,
      httpOptions
    );
  }
}
