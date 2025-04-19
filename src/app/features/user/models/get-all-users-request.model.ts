export interface GetAllUsersRequest {
    orderBy: string;
    orderDirection: string;
    pageNumber: number;
    pageSize: number;
    search: string;
}