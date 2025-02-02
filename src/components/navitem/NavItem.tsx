import React, { useCallback, useMemo } from 'react';
import { To, useLocation, useNavigate } from 'react-router-dom';
import NavItemStyle from "./NavItem.module.scss";

// 定义组件的 Props 类型
interface NavItemProps {
  text:string;
  active?:boolean;
  leftElement?:React.ReactNode;
  rightElement?:React.ReactNode;
  to?:To,
  onClick?:React.MouseEventHandler<HTMLDivElement>;
  // 这里是组件的属性
}

// 根据文件名生成组件
const NavItem: React.FC<NavItemProps> = ({
  text,
  active,
  leftElement,
  rightElement,
  to,
  onClick
}: NavItemProps) => {
  const navigate = useNavigate()
  const currentRoute = useLocation()

  const onClickHandler = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (onClick) {
        onClick(event); // 调用传入的自定义点击处理函数
      }
      if (to) {
        void navigate(to); // 路由跳转
      }
    },
    [to, onClick, navigate],
  );
  return useMemo(
    () => (
      <div
        className={`${NavItemStyle["nav-item"]} ${active && NavItemStyle["nav-active-item"]} ${currentRoute.pathname === to ? NavItemStyle["nav-active-item"] : ""}`}
        onClick={onClickHandler}
      >
        <div className={NavItemStyle["left-info"]}>{leftElement}</div>
        <div className={NavItemStyle.middle}>
          <span>{text}</span>
        </div>
        <div className={NavItemStyle["right-info"]}>{rightElement}</div>
      </div>
    ),
    [
      active,
      leftElement,
      rightElement,
      onClickHandler,
      text,
      to,
      currentRoute,
    ],
  );
};

export default NavItem;