import React from "react";
import "./loading.scss"; // 引入样式文件

const Loading: React.FC = () => {
  return (
    <div className="loading-page">
      <div className="spinner"></div>
      <p className="loading-text">加载中, 请等待...</p>
    </div>
  );
};

export default Loading;
