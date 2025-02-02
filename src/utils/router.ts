import { PermissionRoute } from "../router/DynamicRoutes";

/**
 * 移除 RouteObject 中的 element 属性
 * @param routes - 原始路由数组
 * @returns 只包含纯数据的路由数组
 */
export function removeElementFromRoutes(
    routes: PermissionRoute[],
): Partial<PermissionRoute>[] {
    return routes.map((route) => {
        // 使用解构剔除 element 属性
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { element, children, ...rest } = route;
        // 如果存在子路由，则递归处理
        return {
            ...rest,
            ...(children ? { children: removeElementFromRoutes(children) } : {}),
        };
    }) as Partial<PermissionRoute>[];
}