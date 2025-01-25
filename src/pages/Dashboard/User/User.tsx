import React from 'react';
import UserStyle from "./User.module.scss"

// 定义组件的 Props 类型
interface UserProps {
  // 这里是组件的属性
}

// 根据文件名生成组件
const User: React.FC<UserProps> = (props:UserProps) => {
  return (
    <div className={UserStyle["User-Container"]}>
      <h2>User</h2>
      <p>这个是动态生成的带有类名的组件。</p>
    </div>
  );
};

export default User;