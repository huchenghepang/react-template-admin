import { lazy } from "react";
import type { RouteObject } from "react-router-dom";
import { IconName } from "../components/Iconfont/Iconfont";

/* 导入路由组件 */

const DashboardSetting = lazy(
  () => import("../pages/Dashboard/Setting/Setting"),
);
const DashboardUser = lazy(() => import("../pages/Dashboard/User/User"));
const DashboardComponent = lazy(
  () => import("../pages/Dashboard/Component/Component"),
);

type Permission = "home" | "setting" | "user" | "component";

/* 定义路由与权限的映射关系 */
export type PermissionRoute = RouteObject & {
  permission?: Permission; // 添加权限标识
  children?: PermissionRoute[]; // 子路由递归定义
  routeName?:string;
  icon?:IconName
};

const DynamicRoutesConfig: PermissionRoute[] = [
  {
    path: "/dashboard/setting",
    element: <DashboardSetting></DashboardSetting>,
    permission: "setting",
    routeName:"设置",
    icon:"icon-shezhi"
  },
  {
    path: "/dashboard/user",
    element: <DashboardUser></DashboardUser>,
    permission: "user",
    routeName:"用户",
    icon:"icon-yonghuguanli_huaban"
  },
  {
    path: "/dashboard/component",
    element: <DashboardComponent></DashboardComponent>,
    permission: "component",
    routeName:"组件",
    icon:"icon-components"
  },
];

export default DynamicRoutesConfig;
