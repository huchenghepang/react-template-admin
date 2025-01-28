import React, { memo } from 'react';
import NavItemStyle from "./NavItem.module.scss";

// 定义组件的 Props 类型
interface NavItemProps {
  text:string;
  active?:boolean;
  leftElement?:React.ReactNode;
  rightElement?:React.ReactNode;
  onClick?:React.MouseEventHandler<HTMLDivElement>;
  // 这里是组件的属性
}

// 根据文件名生成组件
const NavItem: React.FC<NavItemProps> = ({
  text,
  active,
  leftElement,
  rightElement,
  onClick
}: NavItemProps) => {
  return (
    <div
      className={`${NavItemStyle["nav-item"]} ${active && NavItemStyle["nav-active-item"]}`}
      onClick={onClick}
    > 
      <div className={NavItemStyle['left-info']}>{leftElement}</div>
      <div className={NavItemStyle.middle}>
        <span>{text}</span>
      </div>
      <div className={NavItemStyle['right-info']}>{rightElement}</div>
    </div>
  );
};

export default memo(NavItem);