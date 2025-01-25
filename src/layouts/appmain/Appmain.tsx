import React from "react";
import { Outlet } from "react-router-dom";
import AppmainStyle from "./Appmain.module.scss";

// 定义组件的 Props 类型
interface AppmainProps {
  // 这里是组件的属性
}

// 根据文件名生成组件
const Appmain: React.FC<AppmainProps> = () => {
  return (
    <div className={AppmainStyle["Appmain-Container"]}>
      <Outlet></Outlet>
    </div>
  );
};

export default Appmain;
