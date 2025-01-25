export interface CustomResponse<T = any> {
    success: boolean;
    code: number;
    message: string;
    data: T ;
    timestamp: string;
    requestId: string;
    detail?: string | null;
}

/* 错误的响应 */
export interface CustomErrorResponse {
    code: number;
    detail: string | null;
    errorMessage: string | null;
}