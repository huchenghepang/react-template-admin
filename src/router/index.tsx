import { lazy, memo, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useRoutes } from "react-router-dom";
import PrivateRoute from "../components/PreviateRoute/PreviateRoute";
import { RootDispatch, RootState } from "../store";
import { saveRouters } from "../store/slices/routerSlice";
import { fetchUserInfoData } from "../store/slices/userSlice";
import { removeElementFromRoutes } from "../utils/router";
import { filterRoutesByPermission } from "../utils/routeUtils";
import DynamicRoutesConfig from "./DynamicRoutes";
// 显式声明 Layout 组件的类型
// 定义懒加载组件，使用类型保护确保模块符合类型
const DashboardHome = lazy(() => import("../pages/Dashboard/Home/Home"));
const Login = lazy(() => import("../pages/Login/Login"));
const Layout = lazy(() => import("../layouts/Layout"));
const NoFound = lazy(() => import("../pages/NoFound/NoFound"));




const AppRoutesNoMemo = () => {
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
    if (isLogin && status === "idle") {
      dispatch(fetchUserInfoData()).catch((error) => {
        console.error("Failed to fetch user info:", error);
      });
    }
  }, [dispatch, isLogin, status]);

  // 优化 `permissions`
  const permissions = useSelector(
    (state: RootState) => state.user.permissions,
    (prev, next) => prev === next,
  );

  const permissionNames = useMemo(() => {
    return permissions?.map((perm) => perm.permission_name) || [];
  }, [permissions]);

  // 优化 `filteredRoutes`
  const filteredRoutes = useMemo(() => {
    return filterRoutesByPermission(DynamicRoutesConfig, permissionNames);
  }, [permissionNames]);

  useEffect(() => {
    dispatch(saveRouters(removeElementFromRoutes(filteredRoutes)));
  }, [filteredRoutes, dispatch]);

  // 预先计算静态 routes
  const staticRoutes = useMemo(
    () => [
      {
        path: "/",
        element: <Navigate to={isLogin ? "/dashboard" : "/login"} />,
      },
      { path: "/login", element: <Login /> },
      { path: "*", element: <NoFound /> },
    ],
    [isLogin],
  );

  // 计算 `dashboardRoutes`
  const dashboardRoutes = useMemo(
    () => [
      {
        path: "/dashboard",
        element: <PrivateRoute isLoggedIn={isLogin} />,
        children: [
          {
            path: "/dashboard",
            element: <Layout />,
            children: [
              {
                index: true,
                element: <Navigate to="/dashboard/home" replace />,
              },
              { path: "/dashboard/home", element: <DashboardHome /> },
              ...filteredRoutes,
            ],
          },
        ],
      },
    ],
    [filteredRoutes, isLogin],
  );

  // 最终 routes
  const routes = useMemo(
    () => [...staticRoutes, ...dashboardRoutes],
    [staticRoutes, dashboardRoutes],
  );

  return useRoutes(routes);
};

const AppRoutes = memo(AppRoutesNoMemo);

export default AppRoutes;
