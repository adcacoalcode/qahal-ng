import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import jwtDecode from 'jwt-decode'; 
import { IgrejagrupoService } from './igrejagrupo.service';

@Injectable({providedIn: "root"})
export class AccountService {

  constructor(private http: HttpClient, private igrejagrupoService: IgrejagrupoService) { }

  async login(user: any) {
    try {
      const result = await this.http.post<any>(`${environment.api}/auth/login`, user).toPromise();
    if (result && result.access_token) {
      window.localStorage.setItem('token', result.access_token);
      return true;
    }

    return false;
    } catch (error) {
      return false;
    }
  }

  async createAccount(account: any) {
    const result = await this.http.post<any>(`${environment.api}/users`, account).toPromise();
    return result;
  }

  getAuthorizationToken() {
    const token = window.localStorage.getItem('token');
    return token;
  }

  getTokenExpirationDate(token: string): Date {
    const decoded: any = jwtDecode(token);

    if (decoded.exp === undefined) {
      return null;
    }

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  isTokenExpired(token?: string): boolean {
    if (!token) {
      return true;
    }

    const date = this.getTokenExpirationDate(token);
    if (date === undefined) {
      return false;
    }

    return !(date.valueOf() > new Date().valueOf());
  }

  isUserLoggedIn() {
    const token = this.getAuthorizationToken();
    if (!token) {
      return false;
    } else if (this.isTokenExpired(token)) {
      return false;
    }

    return true;
  }

  removeToken() {
    window.localStorage.removeItem('token');
  }

  getUserInfo() {
    const token = this.getAuthorizationToken();
    if (!token) {
      return null;
    }

    const decoded: any = jwtDecode(token);
    return decoded;
  }
}
