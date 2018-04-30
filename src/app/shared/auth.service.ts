import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import {AppUrls} from './app.constants';
import {CanActivate, Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class AuthService {
  private headers: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  constructor(private http: HttpClient,
              private appUrls: AppUrls,
              private router: Router) {}
  login(user): Promise<any> {
    return this.http.post(this.appUrls.login, user, {headers: this.headers}).toPromise();
  }
  register(user): Promise<any> {
    return this.http.post(this.appUrls.register, user, {headers: this.headers}).toPromise();
  }
  // ...
  public isAuthenticated(): boolean {
    const token = localStorage.getItem('access_token');
    return !!(token);
  }
  public setToken(token): boolean {
    localStorage.setItem('access_token', token);
    return true;
  }
  public getToken(token: string): string {
    return localStorage.getItem(token);
  }
  public removeToken(): boolean {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    this.router.navigate(['/welcome']);
    return true;
  }
  public getUser(): any {
    return JSON.parse(localStorage.getItem('user'));
  }
}


@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(public auth: AuthService, public router: Router) {}
  canActivate(): boolean {
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['/register']);
      return false;
    }
    return true;
  }
}
