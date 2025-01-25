import { Middleware } from "@reduxjs/toolkit";



/* 错误捕获中间件 */
export const errorMiddleware: Middleware = () => (next) => (action) => {
    try {
        return next(action)
    } catch (error) {
        console.error('\x1b[31m%s\x1b[0m', "Caught an exception:", error)
        throw error
    }
}