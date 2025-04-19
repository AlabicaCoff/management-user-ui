import { Status } from "src/app/shared/models/status.mode";

export interface DeleteUserResponse {
    status: Status;
    data: {
        result: boolean;
        message: string
    }
}