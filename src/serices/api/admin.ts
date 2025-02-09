import { UserInfoResponse } from "../../interface/response/admin.r";
import Request from "../../utils/request";

/* 查询用户 */
export const reqUsersInfo = async (params: { page: number, limit: number }) => await Request.get<UserInfoResponse>("/admin/user/list", { params: params })
export const reqUsersRolesInfo = async (params: { page: number, limit: number }) => await Request.get<UserInfoResponse>("/admin/user/role/list", { params: params })

/* 添加用户 */
export const reqAddUser = async (params: AddUserParams) => await Request.post("/admin/user/add",params)
/* 删除用户 */
export const reqDeleteUser = async (params: RemoveUserParam) => await Request.post("/admin/user/remove",params)

/* 更新用户状态 */
export const reqChangeUserStatus = async (params: ChangeUserStatus) => await Request.post("/admin/user/status", params)

/* 分配用户角色 */
export const reqAssignUserRoles = async (params: AssignUserRoles) => await Request.post("/admin/user/role/assign",params)