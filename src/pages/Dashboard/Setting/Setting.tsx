import React from 'react';
import SettingStyle from "./Setting.module.scss";

// 定义组件的 Props 类型
interface SettingProps {
  // 这里是组件的属性
}

// 根据文件名生成组件
const Setting: React.FC<SettingProps> = (props:SettingProps) => {
  return (
    <div className={SettingStyle["Setting-Container"]}>
      <h2>Setting</h2>
      <p>这个是动态生成的带有类名的组件。</p>
    </div>
  );
};

export default Setting;