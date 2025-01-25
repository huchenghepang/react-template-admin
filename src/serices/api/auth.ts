import { register_login_Interface } from "../../interface/params";
import { LoginResponse } from "../../interface/response/login.r";
import Request from "../../utils/request";

/* 请求登录 */
export const reqLogin = async (data: register_login_Interface) => await Request.post<LoginResponse>("/auth/login", data)

