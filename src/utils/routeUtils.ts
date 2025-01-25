import { PermissionRoute } from './../router/DynamicRoutes';


/**
 * 根据用户权限过滤路由
 * @param routes 路由配置
 * @param permissions 用户权限列表
 * @returns 过滤后的路由
 */
export const filterRoutesByPermission = (
    routes: PermissionRoute[],
    permissions: string[]
): PermissionRoute[] => {
    return routes
        .filter((route) => !route.permission || permissions.includes(route.permission))
        .map((route) => {
            if (route.children) {
                return {
                    ...route,
                    children: filterRoutesByPermission(route.children, permissions),
                };
            }
            return route;
        });
};
