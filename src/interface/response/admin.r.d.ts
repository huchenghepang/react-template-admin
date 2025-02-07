export interface UserInfoResponse {
    userList: UserList[];
    pagination: Pagination;
}
export interface Pagination {
    total: number;
    page: number;
    limit: number;
}

export interface UserList {
    account: string;
    avatar: null;
    email: null;
    is_delete: number;
    is_login: number;
    register_datetime: Date;
    password: string;
    role: null;
    signature: null;
    user_id: string;
    username: string;
}
