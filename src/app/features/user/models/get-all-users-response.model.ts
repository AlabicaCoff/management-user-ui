import { User } from "./user.model";

export interface GetAllUsersResponse {
    dataSource: User[];
    page: number;
    pageSize: number;
    totalCount: number
}