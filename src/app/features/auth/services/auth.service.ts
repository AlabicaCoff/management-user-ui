import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, first, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginRequest } from '../models/login-request.model';
import { LoginResponse } from '../models/login-response.model';
import { LoginUser } from '../models/login-user.model';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  $user = new BehaviorSubject<LoginUser | undefined>(undefined);

  constructor(private http: HttpClient,
    private cookieService: CookieService
  ) {

  }

  login(request: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${environment.apiBaseUrl}/api/auth/login`, {
      email: request.email,
      password: request.password
    });
  }

  setUser(user: LoginUser): void {
    this.$user.next(user);
    localStorage.setItem('user-email', user.email);
    localStorage.setItem('user-roles', user.roles.join(','));
    localStorage.setItem('user-firstname', user.firstname);
    localStorage.setItem('user-lastname', user.lastname);
    localStorage.setItem('user-permission-name', user.permissionName);
  }

  user(): Observable<LoginUser | undefined> {
    return this.$user.asObservable();
  }

  getUser(): LoginUser | undefined {
    const email = localStorage.getItem('user-email');
    const roles = localStorage.getItem('user-roles');
    const firstname = localStorage.getItem('user-firstname');
    const lastname = localStorage.getItem('user-lastname');
    const permissionName = localStorage.getItem('user-permission-name');
    
    if (email && roles?.split(',') && firstname && lastname && permissionName) {
      const user: LoginUser = {
        email: email,
        roles: roles.split(','),
        firstname: firstname,
        lastname: lastname,
        permissionName: permissionName
      };

      return user;
    }

    return undefined;
  }

  logout(): void {
    localStorage.clear();
    this.cookieService.delete('Authorization', '/');
    this.$user.next(undefined);
  }

}
