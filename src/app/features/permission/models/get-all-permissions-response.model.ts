import { Status } from "src/app/shared/models/status.mode";
import { GetAllPermissions } from "./get-all-permissions.model";

export interface GetAllPermissionsResponse {
    status: Status;
    data: GetAllPermissions[];
}