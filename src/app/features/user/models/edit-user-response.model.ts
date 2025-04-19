import { Status } from "src/app/shared/models/status.mode";
import { User } from "./user.model";

export interface EditUserResponse {
    status: Status;
    data: User;
}