import { AddUserPermission } from "../../permission/models/add-user-permission.model";

export interface AddUserRequestNoCfPassword {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    roleId: string;
    username: string;
    password: string;
    permissions: AddUserPermission[];
}