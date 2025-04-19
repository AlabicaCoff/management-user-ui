import { Component } from '@angular/core';
import { LoginRequest } from '../models/login-request.model';
import { AuthService } from '../services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { LoginUser } from '../models/login-user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  model: LoginRequest
  user?: LoginUser;
  errorMessage?: string;

  constructor(private authService: AuthService,
    private cookieService: CookieService,
    private router: Router
  ) {

    this.model = {
      email: '',
      password: ''
    }

    this.user = this.authService.getUser();
    if (this.user) {
      this.router.navigateByUrl('/dashboard')
    }

  }

  onFormSubmit(): void {
    this.authService.login(this.model)
      .subscribe({
        next: (response) => {
          // Set Auth Cookie
          this.cookieService.set('Authorization', `Bearer ${response.token}`,
            undefined, '/', undefined, true, 'Strict');

          console.log(response.roles);
          
          // Set User
          this.authService.setUser({
            email: response.email,
            roles: response.roles,
            firstname: response.firstname,
            lastname: response.lastname,
            permissionName: response.permissionName
          });

          // Redirect back to Home
          this.router.navigateByUrl('/');
        },
        error: (error) => {
          if (error.status === 400 && error.error?.errors) {
            const errorList = error.error.errors[""];
            if (errorList && errorList.length > 0) {
              this.errorMessage = errorList[0];
            } else {
              this.errorMessage = "Invalid login credentials.";
            }
          } else {
            this.errorMessage = "A login unexpected error occurred.";
          }
        }
      })

  }

}
