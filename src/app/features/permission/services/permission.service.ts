import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetAllPermissionsResponse } from '../models/get-all-permissions-response.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  constructor(private http: HttpClient) { }

  getAllPermissions(): Observable<GetAllPermissionsResponse> {
    return this.http.get<GetAllPermissionsResponse>(`${environment.apiBaseUrl}/api/permissions?sort=true&addAuth=true`);
  }
}
