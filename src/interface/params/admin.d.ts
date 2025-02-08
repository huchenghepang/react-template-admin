interface AddUserParams {
    account: string;
    password: string;
}

interface AssignUserRoles {
    userId: string;
    roleIds: number[]
}


interface ChangeUserStatus {
    userId: string;
    /* password 重置密码 | account重置密码 */
    type: "password" | "account",
    isDelete?: 0 | 1
}

interface RemoveUserParam {
    userId: string
}
