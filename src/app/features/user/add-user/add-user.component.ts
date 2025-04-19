import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { PermissionService } from 'src/app/features/permission/services/permission.service';
import { RoleService } from 'src/app/features/role/services/role.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { AddUserPermission } from 'src/app/features/permission/models/add-user-permission.model';
import { Role } from 'src/app/features/role/models/role.model';
import { GetAllPermissions } from 'src/app/features/permission/models/get-all-permissions.model';
import { AddUserRequestNoCfPassword } from '../models/add-user-request-no-cfpassword.model';
import { AddUserRequest } from '../models/add-user-request.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit, OnDestroy {
  model: AddUserRequest
  apiModel?: AddUserRequestNoCfPassword

  roles?: Role[]
  permissions?: GetAllPermissions[]
  newUserId?: string
  employeePermission: GetAllPermissions = {
    permissionId: "94f06510-d4ac-4594-9462-79553d7a686d",
    permissionName: "Employee",
    isReadable: true,
    isWritable: false,
    isDeleatable: false
  }

  mismatchPasswordCfPassword?: string
  errorMessage?: string;

  requestPermission?: AddUserPermission
  selectedPermissionIndex?: number

  clickEventsubscription?: Subscription
  getUserIdSubscription?: Subscription
  addUserSubscription?: Subscription
  getAllRolesSubscription?: Subscription
  getAllPermissionsSubscription?: Subscription

  constructor(private sharedService: SharedService,
    private userService: UserService,
    private permissionService: PermissionService,
    private roleService: RoleService,
  ) {
    this.model = {
      id: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      roleId: '',
      username: '',
      password: '',
      confirmPassword: '',
      permissions: [{
        permissionId: '',
        isReadable: false,
        isWritable: false,
        isDeleatable: false,
      }]
    }

    this.clickEventsubscription = this.sharedService.getClickAddUserEvent()
      .subscribe((value) => {
        if (value === "openAddUserModal") {
          this.getUserIdSubscription = userService.getUserId()
            .subscribe({
              next: (object) => {
                this.newUserId = object.newUserId
                this.model.id = this.newUserId

                this.selectedPermissionIndex = this.permissions?.findIndex((permission) => {
                  return permission.permissionId === this.employeePermission.permissionId
                })

                this.model.permissions = [{
                  permissionId: this.employeePermission.permissionId,
                  isReadable: this.employeePermission.isReadable,
                  isWritable: this.employeePermission.isWritable,
                  isDeleatable: this.employeePermission.isDeleatable
                }]
              }
            })
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
            this.errorMessage = "An roles unexpected error occurred.";
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
            this.errorMessage = "An permissions unexpected error occurred.";
          }
        }
      })
  }

  onFormSubmit(): void {
    if (this.model.password === this.model.confirmPassword) {
      this.apiModel = {
        id: this.model.id,
        firstName: this.model.firstName,
        lastName: this.model.lastName,
        email: this.model.email,
        phone: this.model.phone,
        roleId: this.model.roleId,
        username: this.model.username,
        password: this.model.password,
        permissions: this.model.permissions
      }

      this.addUserSubscription = this.userService.createUser(this.apiModel)
        .subscribe({
          next: (response) => {
            window.location.reload();
          }
        })

      this.closeAddUserModal()
    }
    else {
      this.mismatchPasswordCfPassword = "Password & Confirm Password do not match!"
    }
  }

  closeAddUserModal(): void {
    this.sharedService.sendClickAddUserEvent("closeAddUserModal")
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
    this.addUserSubscription?.unsubscribe()
    this.getAllRolesSubscription?.unsubscribe()
    this.getAllPermissionsSubscription?.unsubscribe()
  }

}
