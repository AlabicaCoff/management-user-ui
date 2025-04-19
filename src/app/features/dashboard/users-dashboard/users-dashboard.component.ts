import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { SharedService } from 'src/app/shared/services/shared.service';
import { GetAllUsersResponse } from '../../user/models/get-all-users-response.model';
import { UserService } from '../../user/services/user.service';
import { GetAllUsersRequest } from '../../user/models/get-all-users-request.model';
import { AuthService } from '../../auth/services/auth.service';
import { LoginUser } from '../../auth/models/login-user.model';


@Component({
  selector: 'app-users-dashboard',
  templateUrl: './users-dashboard.component.html',
  styleUrls: ['./users-dashboard.component.css']
})
export class UsersDashboardComponent implements OnInit, OnDestroy {
  isAddUserModalVisible: boolean = false;
  isEditUserModalVisible: boolean = false;

  clickAddUserEventsubscription?: Subscription;
  clickEditUserEventsubscription?: Subscription;

  constructor(private sharedService: SharedService,
  ) {
    this.clickAddUserEventsubscription = this.sharedService.getClickAddUserEvent()
      .subscribe((value) => {

        if (value === "openAddUserModal") {
          this.openAddUserModal()
        }
        else if (value === "closeAddUserModal") {
          this.closeAddUserModal()
        }

      })

    this.clickEditUserEventsubscription = this.sharedService.getClickEditUserEvent()
      .subscribe((response) => {

        if (response.action === "openEditUserModal") {
          this.openEditUserModal()
        }
        else if (response.action === "closeEditUserModal") {
          this.closeEditUserModal()
        }

      })
  }

  ngOnInit(): void {

  }

  openAddUserModal(): void {
    this.isAddUserModalVisible = true
  }

  closeAddUserModal(): void {
    this.isAddUserModalVisible = false
  }

  openEditUserModal(): void {
    this.isEditUserModalVisible = true
  }

  closeEditUserModal(): void {
    this.isEditUserModalVisible = false
  }

  ngOnDestroy(): void {
    this.clickAddUserEventsubscription?.unsubscribe()
    this.clickEditUserEventsubscription?.unsubscribe()
  }
}
