import { Component, OnDestroy, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared/services/shared.service';
import { AuthService } from '../../auth/services/auth.service';
import { UserService } from '../services/user.service';
import { Subscription } from 'rxjs';
import { LoginUser } from '../../auth/models/login-user.model';
import { GetAllUsersRequest } from '../models/get-all-users-request.model';
import { GetAllUsersResponse } from '../models/get-all-users-response.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, OnDestroy {
  model: GetAllUsersRequest
  response?: GetAllUsersResponse
  loginUser?: LoginUser
  pageLength: number = 0

  errorMessage?: string

  private getAllUsersSubscribtion?: Subscription;
  private deleteUserSubscription?: Subscription;

  constructor(private sharedService: SharedService,
    private userService: UserService,
    private authService: AuthService
  ) {
    this.model = {
      orderBy: '',
      orderDirection: '',
      pageNumber: 1,
      pageSize: 5,
      search: '',
    }
  }
  
  ngOnInit(): void {
    this.loginUser = this.authService.getUser();

    this.getAllUsersSubscribtion = this.userService.getAllUsers(this.model)
      .subscribe({
        next: (response) => {
          this.response = response

          this.pageLength = Math.ceil(response.totalCount / response.pageSize)
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
            this.errorMessage = "A getAllUsers unexpected error occurred.";
          }
        }
      })
  }

  onFormChange(): void {
    this.getAllUsersSubscribtion = this.userService.getAllUsers(this.model)
      .subscribe({
        next: (response) => {
          this.response = response

          this.pageLength = Math.ceil(response.totalCount / response.pageSize)
        }
      })
  }

  onDeleteUser(userId: string): void {
    this.deleteUserSubscription = this.userService.deleteUser(userId)
      .subscribe({
        next: (response) => {
          this.onFormChange()
        }
      })
  }
  
  sendClickAddUserModal(): void {
    this.sharedService.sendClickAddUserEvent("openAddUserModal")
  }

  sendClickEditUserModal(userId: string): void {
    this.sharedService.sendClickEditUserEvent("openEditUserModal", userId)
  }

  isAdmin(permission: string): boolean {
    return permission.includes('Admin')
  }

  isWritable(): boolean {
    if (this.loginUser) {
      return this.loginUser.roles.includes("isWritable")
    }
    return false
  }

  isDeletable(): boolean {
    if (this.loginUser) {
      return this.loginUser.roles.includes("isDeletable")
    }
    return false
  }

  sort(sortDirection: string): void {
    this.model.orderDirection = sortDirection
    this.onFormChange()
  }

  getPrevPage(): void {
    if (this.model.pageNumber - 1 < 1) {
      return;
    }

    this.model.pageNumber -= 1;
    this.onFormChange()
  }

  getNextPage(): void {
    if (this.model.pageNumber + 1 > this.pageLength) {
      return;
    }

    this.model.pageNumber += 1;
    this.onFormChange()
  }

  ngOnDestroy(): void {
    this.getAllUsersSubscribtion?.unsubscribe()
    this.deleteUserSubscription?.unsubscribe()
  }

}
