import React from 'react';
import Appmain from './appmain/Appmain';
import { FooTer } from './footer/Footer';
import LayoutStyle from "./Layout.module.scss";
import './main.scss';
import { Sidebar } from './sidebar/Sidebar';
import TopNav from "./topnav/Topnav";



// 定义组件的 Props 类型
interface LayoutProps {
  // 这里是组件的属性
}

// 根据文件名生成组件
const Layout: React.FC<LayoutProps> = () => {
  return (
    <div className={LayoutStyle["Layout-Container"]}>
          <div className="dashboard-container clearfix">
              <Sidebar></Sidebar>
              <div className="appmain">
                  <TopNav></TopNav>
                  <Appmain></Appmain>
                  <FooTer></FooTer>
              </div>
          </div>
    </div>
  );
};



export default Layout;