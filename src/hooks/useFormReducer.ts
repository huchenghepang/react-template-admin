import { ChangeEvent, useCallback, useReducer } from "react";




/**
 * 表单状态管理的 reducer 函数。
 * @param {Record<string, string>} state - 当前表单的状态。
 * @param {Object} action - 描述状态变化的操作对象。
 * @param {string} action.type - 操作类型。
 * @param {string} [action.name] - 要更新的字段名称（仅适用于 `UPDATE_FIELD` 操作）。
 * @param {string} [action.value] - 要更新的字段值（仅适用于 `UPDATE_FIELD` 操作）。
 * @param {Record<string, string>} [action.payload] - 新的表单状态（仅适用于 `SET_FORM` 操作）。
 * @returns {Record<string, string>} 更新后的表单状态。
 */
const formReducer = (
    state: Record<string, string>,
    action: { type: string; name?: string; value?: string; payload?: Record<string, string> }
): Record<string, string> => {
    switch (action.type) {
        case "UPDATE_FIELD":
            if (!action.name || action.value === undefined) {
                throw new Error("UPDATE_FIELD action requires both 'name' and 'value'");
            }
            return { ...state, [action.name]: action.value };

        case "RESET":
            return { ...action.payload }; // 使用传入的初始状态进行重置

        case "SET_FORM":
            return { ...state, ...(action.payload || {}) };

        default:
            throw new Error(`Unsupported action type: ${action.type}`);
    }
};

/**
 * 自定义 Hook，用于管理表单状态和事件处理。
 * @param {Record<string, string>} initialState - 表单的初始状态。
 * @returns {{
 *   formState: Record<string, string>;
 *   handleChange: (e: ChangeEvent<HTMLInputElement>, fieldName?: string) => void;
 *   updateField: (name: string, value: string) => void;
 *   resetForm: () => void;
 *   setForm: (payload: Record<string, string>) => void;
 * }} 表单状态和操作方法。
 */
export const useFormReducer = (initialState: Record<string, string>) => {
    const [formState, dispatch] = useReducer(formReducer, initialState);

    /**
     * 处理输入字段的变化事件。支持自定义字段名称。
     * @param {ChangeEvent<HTMLInputElement>} e - 输入字段的事件对象。
     * @param {string} [fieldName] - 自定义字段名称。如果不传入，则使用事件的 `name` 属性。
     */
    const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>, fieldName?: string) => {
        const { name, value } = e.target;
        const field = fieldName || name; // 如果传入了自定义字段名称，则使用自定义名称，否则使用默认的 `name`。
        dispatch({ type: "UPDATE_FIELD", name: field, value });
    }, []);

    /**
     * 更新表单的特定字段值。
     * @param {string} name - 字段名称。
     * @param {string} value - 字段值。
     */
    const updateField = useCallback((name: string, value: string) => {
        dispatch({ type: "UPDATE_FIELD", name, value });
    }, []);



    /**
     * 重置表单为初始状态。
     */
    // 重置表单
    const resetForm = useCallback(() => {
        dispatch({ type: "RESET", payload: initialState }); // 使用初始状态重置
    }, []);

    /**
     * 设置整个表单的状态。
     * @param {Record<string, string>} payload - 表单的完整状态值。
     */
    const setForm = useCallback((payload: Record<string, string>) => {
        dispatch({ type: "SET_FORM", payload });
    }, []);

    return {
        formState,
        handleChange,
        updateField,
        resetForm,
        setForm,
    };
};
