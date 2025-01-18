import { Button, ConfigProvider } from "antd";
import zhCN from "antd/locale/zh_CN";
import "./App.scss";
import { useMessage } from "./components/message/MessageManager";

import Login from "./pages/Login/Login";
function App() {
    const { showMessage } = useMessage();
    // 动态消息调用


  return (
    <ConfigProvider locale={zhCN}>
        <Login />
        <Button type="dashed" onClick={() => showMessage({message:"dashed",type:"success"})}>
          Show Success
        </Button>
        <Button type="default" onClick={()=>showMessage({message:"基本信息",type:"info"})} >
          Show Error
        </Button>
        <Button
          type="link"
          onClick={()=>showMessage({message:"错误信息",type:"error"})}
        >
          Show Info
        </Button>
        <Button
          type="primary"
          onClick={()=>showMessage({message:"成功消息",type:"success"})}
        >
          Show Tip
        </Button>
        <Button type="link" disabled>
          跳转
        </Button>
    </ConfigProvider>
  );
}

export default App;
