import { UserInfoResponse } from "../../interface/response/admin.r";
import Request from "../../utils/request";

/* 查询用户 */
export const reqUsersInfo = async (params: { page: number, limit: number }) => await Request.get<UserInfoResponse>("/admin/user/list", { params: params })