import * as Yup from "yup";

function isYupValidationError(error: unknown): error is Yup.ValidationError {
    return error instanceof Yup.ValidationError;
}

export const validate = async <T extends Record<string, unknown>>(
    schema: Yup.ObjectSchema<T>,
    data: T
): Promise<{ valid: boolean; errors: { errorName: string; message: string }[] }> => {
    try {
        await schema.validate(data, { abortEarly: false }); // 禁止提前退出
        return {
            valid: true,
            errors: [],
        };
    } catch (error) {
        if (isYupValidationError(error)) {
            // 将 inner 转换为所需的数组对象格式
            const fieldErrors = error.inner.map((err) => ({
                errorName: err.path || "unknown", // 字段名，可能为 undefined，因此提供默认值
                message: err.message, // 错误信息
            }));
            return {
                valid: false,
                errors: fieldErrors, // 返回数组对象
            };
        }
        throw error; // 其他错误抛出
    }
};
