import { LoginResponse } from "../../interface/response/login.r";
import Request from "../../utils/request";

/* 获取用户信息 */
export const reqUserInfo = async () => await Request.get<LoginResponse>("/user/info")