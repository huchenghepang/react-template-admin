import { RolesInfoResponse } from "../../interface/response/role.r";
import Request from "../../utils/request";

/* 获取角色信息 */
export const reqRolesInfo = async () => await Request.get<RolesInfoResponse[]>("/role/info")