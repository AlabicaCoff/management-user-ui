import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetAllRolesResponse } from '../models/get-all-roles-response.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http: HttpClient) { }

  getAllRoles() : Observable<GetAllRolesResponse> {
    return this.http.get<GetAllRolesResponse>(`${environment.apiBaseUrl}/api/roles?addAuth=true`);
  }

}
