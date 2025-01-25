import { Navigate, Outlet } from "react-router-dom";

// PrivateRoute 组件
const PrivateRoute = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  if (!isLoggedIn) {
    /* 没有登录需要清除一些关键信息 */
    localStorage.clear()
    // 未登录，重定向到登录页面
    return <Navigate to="/login" />;
  }
  // 已登录，渲染内部的路由组件（Outlet 表示嵌套的子路由）
  return <Outlet />;
};



export default PrivateRoute
