import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GetAllUsersRequest } from '../models/get-all-users-request.model';
import { AddUserResponse } from '../models/add-user-response.model';
import { GetAllUsersResponse } from '../models/get-all-users-response.model';
import { GetUserResponse } from '../models/get-user-response.model';
import { EditUserRequest } from '../models/edit-user-request.model';
import { EditUserResponse } from '../models/edit-user-response.model';
import { DeleteUserResponse } from '../models/delete-user-response.model';
import { GetNewUserId } from '../models/get-new-user-id.model';
import { AddUserRequestNoCfPassword } from '../models/add-user-request-no-cfpassword.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  createUser(data: AddUserRequestNoCfPassword) : Observable<AddUserResponse> {
    return this.http.post<AddUserResponse>(`${environment.apiBaseUrl}/api/users?addAuth=true`, data);
  }

  getAllUsers(data: GetAllUsersRequest) : Observable<GetAllUsersResponse> {
    return this.http.post<GetAllUsersResponse>(`${environment.apiBaseUrl}/api/users/DataTable?addAuth=true`, data);
  }

  getUserById(id: string) : Observable<GetUserResponse> {
    return this.http.get<GetUserResponse>(`${environment.apiBaseUrl}/api/users/${id}?addAuth=true`);
  }

  updateUser(id: string, data: EditUserRequest) : Observable<EditUserResponse> {
    return this.http.put<EditUserResponse>(`${environment.apiBaseUrl}/api/users/${id}?addAuth=true`, data);
  }

  deleteUser(id: string) : Observable<DeleteUserResponse> {
    return this.http.delete<DeleteUserResponse>(`${environment.apiBaseUrl}/api/users/${id}?addAuth=true`);
  }

  getUserId() : Observable<GetNewUserId> {
    return this.http.get<GetNewUserId>(`${environment.apiBaseUrl}/api/users/get-id?addAuth=true`);
  }

}
