import React from 'react';
import RoleStyle from "./Role.module.scss"

// 定义组件的 Props 类型
interface RoleProps {
  // 这里是组件的属性
}

// 根据文件名生成组件
const Role: React.FC<RoleProps> = (props:RoleProps) => {
  return (
    <div className={RoleStyle["Role-Container"]}>
      <h2>Role</h2>
      <p>这个是动态生成的带有类名的组件。</p>
    </div>
  );
};

export default Role;