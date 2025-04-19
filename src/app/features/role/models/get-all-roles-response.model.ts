import { Status } from "src/app/shared/models/status.mode";
import { Role } from "./role.model";

export interface GetAllRolesResponse {
    status: Status;
    data: Role[];
}