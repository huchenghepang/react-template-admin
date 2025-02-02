import { ConfigProvider } from "antd";
import zhCN from "antd/locale/zh_CN";
import { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.scss";
import Loading from "./pages/Dashboard/Loading/Loading";
import AppRoutes from "./router";






function App() {
  return (
    <ConfigProvider locale={zhCN}>
      <BrowserRouter>
        <Suspense fallback={<Loading></Loading>}>
          <AppRoutes></AppRoutes>
        </Suspense>
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;
