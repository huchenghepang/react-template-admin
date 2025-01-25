import { lazy, memo, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, RouteObject, useRoutes } from "react-router-dom";
import PrivateRoute from "../components/PreviateRoute/PreviateRoute";
import { RootDispatch, RootState } from "../store";
import { fetchUserInfoData } from "../store/slices/userSlice";
import { filterRoutesByPermission } from "../utils/routeUtils";
import DynamicRoutesConfig from "./DynamicRoutes";
// 显式声明 Layout 组件的类型
// 定义懒加载组件，使用类型保护确保模块符合类型
const DashboardHome = lazy(() => import("../pages/Dashboard/Home/Home"));
const Login = lazy(() => import("../pages/Login/Login"));
const Layout = lazy(() => import("../layouts/Layout"));
const NoFound = lazy(() => import("../pages/NoFound/NoFound"));

const AppRoutesNoMemo = () => {
  /* 获取登录状态 */

  const isLogin = useSelector(
    (state: RootState) => state.user.isLogin,
    (prev, next) => prev === next,
  );
  const status = useSelector(
    (state: RootState) => state.user.status,
    (prev, next) => prev === next,
  );

  const dispatch = useDispatch<RootDispatch>();
  useEffect(() => {
    // 在页面加载时触发 fetchUserInfoData 异步请求
    if (isLogin && status === "idle") {
      dispatch(fetchUserInfoData()).catch((error) => {
        console.error("Failed to fetch user info:", error);
      });
    }
  }, [dispatch, isLogin, status]); // 确保在组件挂载时只调用一次

  const permissions = useSelector(
    (state: RootState) =>
      state.user.permissions?.map((perm) => perm.permission_name) || [],
    (prev, next) => JSON.stringify(prev) === JSON.stringify(next), // 自定义浅比较
  );

  // 根据权限动态过滤路由
  const filteredRoutes = useMemo(() => {
    return filterRoutesByPermission(DynamicRoutesConfig, permissions);
  }, [permissions]);

  const routes: RouteObject[] = useMemo(
    () => [
      {
        path: "/",
        element: <Navigate to={isLogin ? "/dashboard" : "/login"}></Navigate>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/dashboard",
        element: <PrivateRoute isLoggedIn={isLogin}></PrivateRoute>,
        children: [
          {
            path: "/dashboard",
            element: <Layout />, // 如果通过 PrivateRoute 检查，渲染 Layout
            children: [
              {
                index: true,
                element: <Navigate to="/dashboard/home" replace />,
              }, 
              {
                path: "/dashboard/home",
                element: <DashboardHome></DashboardHome>,
              },
              ...filteredRoutes,
            ],
          },
        ],
      },
      {
        path: "*",
        element: <NoFound></NoFound>,
      },
    ],
    [filteredRoutes, isLogin],
  );

  const element = useRoutes(routes);
  return element;
};

const AppRoutes = memo(AppRoutesNoMemo);

export default AppRoutes;
