import { Status } from "src/app/shared/models/status.mode";
import { User } from "./user.model";

export interface GetUserResponse {
    status: Status;
    data: User;
}