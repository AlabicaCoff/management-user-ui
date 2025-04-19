import { Permission } from "../../permission/models/permission.model";
import { Role } from "../../role/models/role.model";

export interface User {
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    role: Role;
    userName: string;
    permissions: Permission[];
    createdDate: Date;
}