import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { PermissionService } from 'src/app/features/permission/services/permission.service';
import { RoleService } from 'src/app/features/role/services/role.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { EditUserPermission } from 'src/app/features/permission/models/edit-user-permission.model';
import { GetAllPermissions } from 'src/app/features/permission/models/get-all-permissions.model';
import { Role } from 'src/app/features/role/models/role.model';
import { EditUserRequest } from '../models/edit-user-request.model';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent {
  model: EditUserRequest

  roles?: Role[]
  permissions?: GetAllPermissions[]
  user?: User
  userId?: string

  errorMessage?: string;

  requestPermission?: EditUserPermission
  selectedPermissionIndex?: number

  clickEventsubscription?: Subscription
  getUserIdSubscription?: Subscription
  editUserSubscription?: Subscription
  getAllPermissionsSubscription?: Subscription
  getAllRolesSubscription?: Subscription

  constructor(private sharedService: SharedService,
    private userService: UserService,
    private permissionService: PermissionService,
    private roleService: RoleService,
  ) {
    this.model = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      roleId: '',
      username: '',
      password: '',
      permissions: [{
        permissionId: '',
        isReadable: false,
        isWritable: false,
        isDeleatable: false,
      }]
    }

    this.clickEventsubscription = this.sharedService.getClickEditUserEvent()
      .subscribe((response) => {

        if (response.action === "openEditUserModal") {
          this.userId = response.userId

          if (this.userId) {
            this.userService.getUserById(this.userId).subscribe({
              next: (response) => {
                this.user = response.data

                if (this.user) {
                  this.model = {
                    firstName: this.user.firstName,
                    lastName: this.user.lastName,
                    email: this.user.email,
                    phone: this.user.phone,
                    roleId: this.user.role.roleId,
                    username: this.user.userName,
                    password: '',
                    permissions: [{
                      permissionId: this.user.permissions[0].permissionId,
                      isReadable: false,
                      isWritable: false,
                      isDeleatable: false,
                    }]
                  }

                  this.selectedPermissionIndex = this.permissions?.findIndex((permission) => {
                    return permission.permissionId === this.user?.permissions[0].permissionId
                  })
                }
              }
            })
          }
        }
      })
  }

  ngOnInit(): void {
    this.getAllRolesSubscription = this.roleService.getAllRoles()
      .subscribe({
        next: (response) => {
          this.roles = response.data
        },
        error: (error) => {
          if (error.status === 400 && error.error?.errors) {
            const errorList = error.error.errors[""];
            if (errorList && errorList.length > 0) {
              this.errorMessage = errorList[0];
            }
          } else {
            this.errorMessage = "A roles unexpected error occurred.";
          }
        }
      })

    this.getAllPermissionsSubscription = this.permissionService.getAllPermissions()
      .subscribe({
        next: (response) => {
          this.permissions = response.data
        },
        error: (error) => {
          if (error.status === 400 && error.error?.errors) {
            const errorList = error.error.errors[""];
            if (errorList && errorList.length > 0) {
              this.errorMessage = errorList[0];
            }
          } else {
            this.errorMessage = "A permissions unexpected error occurred.";
          }
        }
      })
  }

  onFormSubmit(): void {
    this.model = {
      firstName: this.model.firstName,
      lastName: this.model.lastName,
      email: this.model.email,
      phone: this.model.phone,
      roleId: this.model.roleId,
      username: this.model.username,
      password: this.model.password,
      permissions: this.model.permissions
    }

    if (this.userId) {
      this.editUserSubscription = this.userService.updateUser(this.userId, this.model)
        .subscribe({
          next: (response) => {
            window.location.reload()
          }
        })
    }

    this.closeEditUserModal()
  }

  closeEditUserModal(): void {
    this.sharedService.sendClickEditUserEvent("closeEditUserModal", "")
  }

  selectPermission(index: number, permissionId: string,
    isReadable: boolean, isWritable: boolean, isDeletable: boolean
  ) {
    this.selectedPermissionIndex = index;

    this.requestPermission = {
      permissionId: permissionId,
      isReadable: isReadable,
      isWritable: isWritable,
      isDeleatable: isDeletable
    }

    this.model?.permissions.pop()
    this.model?.permissions.push(this.requestPermission)
  }

  ngOnDestroy(): void {
    this.clickEventsubscription?.unsubscribe()
    this.getUserIdSubscription?.unsubscribe()
    this.editUserSubscription?.unsubscribe()
  }
}
