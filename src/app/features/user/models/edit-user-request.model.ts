import { EditUserPermission } from "../../permission/models/edit-user-permission.model";

export interface EditUserRequest {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    roleId: string;
    username: string;
    password: string;
    permissions: EditUserPermission[];
}