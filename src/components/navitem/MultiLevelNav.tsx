import React, { memo, useCallback, useState } from "react";
import { To } from "react-router-dom";
import IconFont, { IconName } from "../Iconfont/Iconfont";
import MultiLevelNavStyle from "./MultiLevelNav.module.scss";
import NavItem from "./NavItem";

// 定义组件的 Props 类型
export interface MultiLevelNavProps {
  text: string;
  active?: boolean;
  leftIcon?: IconName;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  childrenInfo?: MultiLevelNavProps[];
  to?:To;
}

// 根据文件名生成组件
const MultiLevelNav: React.FC<MultiLevelNavProps> = ({
  text,
  active,
  leftIcon,
  onClick,
  to,
  childrenInfo,
}: MultiLevelNavProps) => {
  const [isExpanded, setExpanded] = useState(false);
  const toggleExpandedHandler = useCallback(
    () => setExpanded(!isExpanded),
    [isExpanded],
  );

  return (
    <div className={MultiLevelNavStyle["MultiLevelNav-Container"]}>
      <NavItem
        text={text}
        leftElement={leftIcon && <IconFont name={leftIcon}></IconFont>}
        active={active}
        to={to}
        onClick={onClick}
        rightElement={
          childrenInfo &&
          (isExpanded ? (
            <IconFont
              name="icon-top"
              onClick={toggleExpandedHandler}
            ></IconFont>
          ) : (
            <IconFont
              name="icon-right"
              onClick={toggleExpandedHandler}
            ></IconFont>
          ))
        }
      ></NavItem>
      {isExpanded && childrenInfo && (
        <div className={MultiLevelNavStyle["ChildContainer"]}>
          {childrenInfo.map((child, index) => (
            <MultiLevelNav key={index} {...child} />
          ))}
        </div>
      )}{" "}
    </div>
  )
}
export default memo(MultiLevelNav);
