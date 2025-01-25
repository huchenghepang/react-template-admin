import { message } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import Button from "../../../components/button/Button";
import IconFont from "../../../components/Iconfont/Iconfont";
import { showMessage } from "../../../components/message/MessageManager";
import HomeStyle from "./Home.module.scss";

// 定义组件的 Props 类型
interface HomeProps {
  // 这里是组件的属性
}

// 根据文件名生成组件
const Home: React.FC<HomeProps> = (props: HomeProps) => {

 const handleClick = () => {
   message.success("成功了");
 };

  const success = () => showMessage({ type: "error", text: "失败了", duration: 3000 });
 
  return (
    <div className={HomeStyle["Home-Container"]}>
      <h2>Home</h2>
      <Link to="/dashboard/setting">跳转setting</Link>
      <Link to="/dashboard/user">跳转用户界面</Link>
      <Button onClick={success}>成功消息</Button>
      <Button onClick={() => showMessage({ type: "error", text: "失败了" })}>
        <IconFont name="icon-github"></IconFont>失败消息
      </Button>
      <Button type="text"  size="small" onClick={() => showMessage({ type: "info", text: "信息" })}>
        信息消息
      </Button>
      <Button onClick={() => showMessage({ type: "tip", text: "提醒" })}>
        提醒消息
      </Button>
      <Button onClick={handleClick}>提醒消息</Button>
      <Button
        type="primary"
        size="large"
        onClick={() => console.log("Primary button clicked")}
      >
        Primary Button
      </Button>
      <Button
        type="default"
        onClick={() => console.log("Default button clicked")}
      >
        Default Button
      </Button>

      <Button type="text" onClick={() => console.log("Text button clicked")}>
        Text Button
      </Button>

      <Button
        type="link"
        size="small"
        href="https://example.com"
        onClick={() => console.log("Link button clicked")}
      >
        Link Button
      </Button>

      <Button
        type="dashed"
        
        onClick={() => console.log("Dashed button clicked")}
      >
        Dashed Button
      </Button>
    </div>
  );
};

export default Home;
