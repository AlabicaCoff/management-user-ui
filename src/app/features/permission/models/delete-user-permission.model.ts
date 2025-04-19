export interface DeleteUserPermission {
    permissionId: string;
    isReadable: boolean;
    isWritable: boolean;
    isDeleatable: boolean;
}