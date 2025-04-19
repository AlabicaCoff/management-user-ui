import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginUser } from 'src/app/features/auth/models/login-user.model';
import { AuthService } from 'src/app/features/auth/services/auth.service';

@Component({
  selector: 'app-user-profile-bar',
  templateUrl: './user-profile-bar.component.html',
  styleUrls: ['./user-profile-bar.component.css']
})
export class UserProfileBarComponent implements OnInit {
  user?: LoginUser;

  constructor(private authService: AuthService,
    private router: Router) {

  }

  ngOnInit(): void {
    this.authService.user()
      .subscribe({
        next: (response) => {
          this.user = response;
        }
      });

    this.user = this.authService.getUser();
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }

}
