import React from 'react';
import ComponentStyle from "./Component.module.scss"

// 定义组件的 Props 类型
interface ComponentProps {
  // 这里是组件的属性
}

// 根据文件名生成组件
const Component: React.FC<ComponentProps> = (props:ComponentProps) => {
  return (
    <div className={ComponentStyle["Component-Container"]}>
      <h2>Component</h2>
      <p>这个是动态生成的带有类名的组件。</p>
    </div>
  );
};

export default Component;