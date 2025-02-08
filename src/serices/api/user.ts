import { change_role_Interface } from "../../interface/params";
import { LoginResponse, Permission } from "../../interface/response/login.r";
import Request from "../../utils/request";

/* 获取用户信息 */
export const reqUserInfo = async () => await Request.get<LoginResponse>("/user/info")


type CurrentRole = {
    "roleId": number,
    "roleName": string
}
/* 切换角色 */
export const reqChangeRole = async (data: change_role_Interface) => await Request.post<{ token: string; permissions: Permission[], currentRole: CurrentRole }>("/user/change-role",data)

