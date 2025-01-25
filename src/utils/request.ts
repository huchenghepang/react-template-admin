import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import * as nprogress from "nprogress";
import "nprogress/nprogress.css";
import { CustomErrorResponse, CustomResponse } from './../types/response.d';
import { getLocalStorage } from './localStorage';



// 创建 axios 实例
const instance = axios.create({
    baseURL: "/api",
    timeout: 30000,
    withCredentials: true
})





/**
 * 请求拦截器函数。
 * 添加授权 token 到请求头中，并启动进度条。
 * 
 * @param {InternalAxiosRequestConfig} config - 请求配置对象。
 * @returns {InternalAxiosRequestConfig} - 修改后的配置对象，包括 headers。
 */
function requestInterceptor(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig {
    const token = getLocalStorage("token")
    if (token) {
        config.headers.Authorization = token
    }
    nprogress.start();
    return config;
}

/**
 * 响应拦截器函数。
 * 处理响应数据，停止进度条，并返回响应数据。
 * 
 * @param {AxiosResponse} response - Axios 响应对象。
 * @returns {any} - 响应数据。
 */
function responseInterceptor(response: AxiosResponse) {
    nprogress.done();
    return response;
}


/**
 * 响应错误拦截器函数。
 * 处理错误时停止进度条，并弹出网络错误提示。
 * 
 * @param {any} error - 错误对象。
 * @returns {Promise<never>} - 返回拒绝的 Promise。
 */
function responseErrorInterceptor(error: AxiosError<CustomErrorResponse>) {
    // 处理响应的拦截错误
    nprogress.done();

    // 如果服务器有响应 这个根据情况处理可以返回错误去全局处理也可以合并处理
    if (error.response) {
        // 解构响应内容
        const { status, data } = error.response;
        return {
            type: 'response',
            status,
            data, // 服务器返回的数据
            errorMessage: data.errorMessage || '未知的错误'
        }
    }
    let errorMessage: string | null = null;
    if (error instanceof AxiosError) {
        switch (error.code) {
            case AxiosError.ERR_NETWORK:
                errorMessage = "网络错误，请检查您的网络连接！"
                console.error(errorMessage);
                break;
            case AxiosError.ERR_INVALID_URL:
                errorMessage = "URL 格式不正确！"
                console.error(errorMessage);
                break;
            case AxiosError.ERR_CANCELED:
                errorMessage = "请求已被取消！"
                console.error(errorMessage);
                break;
            case AxiosError.ECONNABORTED:
                errorMessage = "连接中断"
                console.error(errorMessage);
                break;
            case AxiosError.ETIMEDOUT:
                errorMessage = "连接超时"
                console.error(errorMessage);
                break;
            default:
                errorMessage = "其他错误：" + error.message
                console.error(errorMessage);
        }
    } else {
        console.error("未知的错误：", error)
    }
    if (errorMessage) {
        error.message = errorMessage
    }
    throw new Error(error.message)
}

// 使用拦截器
instance.interceptors.request.use(requestInterceptor, function (error: AxiosError) {
    // 当请求之前出现错误时的处理
    nprogress.done();
    // 对请求错误做些什么 可以选择抛出或者不抛出 
    return Promise.reject(error);
});

instance.interceptors.response.use(responseInterceptor, responseErrorInterceptor);



/**
 * 请求工具类，用于封装 Axios 请求，支持 GET、POST 和通用请求方法。
 */
class Request {
    /**
     * 发送一个 GET 请求
     * 
     * @template RD CustomResponse响应数据里面data的类型
     * @template RDI 响应数据的基本结构,是可扩展的结构
     * @template D 请求数据的类型
     * 
     * @param {string} url 请求的 URL 地址
     * @param {AxiosRequestConfig<D>} [config] 可选的请求配置
     * @returns {Promise<CustomResponse<RD> & CustomErrorResponse & RDI>} 返回响应的数据
     */
    static async get<RD = unknown, RDI = unknown, D = unknown>(url: string, config?: AxiosRequestConfig<D>) {
        // 发送 GET 请求，返回值包含响应数据类型 CustomResponse 和 CustomErrorResponse，以及自定义的响应数据类型 RDI
        return (await instance.get<CustomResponse<RD> & CustomErrorResponse & RD & RDI>(url, config)).data;
    }

    /**
     * 发送一个 POST 请求
     * 
     * @template RD CustomResponse响应数据里面data的类型
     * @template RDI 响应数据的基本结构,是可扩展的结构
     * @template D 请求数据的类型
     * 
     * @param {string} url 请求的 URL 地址
     * @param {D} data 请求的请求体数据
     * @param {AxiosRequestConfig<D>} [config] 可选的请求配置
     * @returns {Promise<CustomResponse<RD> & CustomErrorResponse & RDI>} 返回响应的数据
     */
    static async post<RD = unknown, RDI = unknown, D = unknown>(url: string, data: D, config?: AxiosRequestConfig<D>) {
        // 发送 POST 请求，返回值包含响应数据类型 CustomResponse 和 CustomErrorResponse，以及自定义的响应数据类型 RDI
        return (await instance.post<CustomResponse<RD> & CustomErrorResponse & RDI>(url, data, config)).data

    }

    /**
     * 发送一个通用 HTTP 请求（GET、POST、PUT、DELETE 等）
     * 
     * @template RD CustomResponse响应数据里面data的类型
     * @template RDI 响应数据的基本结构,是可扩展的结构
     * @template D 请求数据的类型
     * 
     * @param {AxiosRequestConfig<D>} config 请求配置对象
     * @returns {Promise<CustomResponse<RD> & CustomErrorResponse & RDI>} 返回响应的数据
     */
    static async Request<RD = unknown, RDI = unknown, D = unknown>(config: AxiosRequestConfig<D>) {
        // 发送请求，返回值包含响应数据类型 CustomResponse 和 CustomErrorResponse，以及自定义的响应数据类型 RDI
        return (await instance.request<CustomResponse<RD> & CustomErrorResponse & RDI>(config)).data;
    }
}



/* 示例 */

/**
 * 用户信息接口类型
 * 
 * @interface UserInfo
 */

/* interface UserInfo {
    name: string; // 用户的名字
} */

/*
(() => async () => {
    // 使用 Request.get 方法进行 GET 请求，指定响应的数据类型为 UserInfo
    const result = await Request.get<UserInfo>("/login", {});
    // 此时 result 的类型会被推导为 UserInfo，确保响应的数据符合该类型
    const name =result.data.name
    console.log(name);
})();  

*/

export default Request;
