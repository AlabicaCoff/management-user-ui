export interface LoginResponse {
  token: string;
  email: string;
  firstname: string;
  lastname: string;
  permissionName: string;
  roles: string[];
}