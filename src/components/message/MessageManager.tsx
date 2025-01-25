import React from "react";
import { createRoot, Root } from "react-dom/client";
import { MessageComponentIcon } from "../../types/iconfont";
import IconFont from "../Iconfont/Iconfont";
import MessageManagerContainer from "./MessageManagerContainer";

export interface MessageItem {
  id: number;
  message: string;
  duration: number;
  Icon?: React.ReactNode;
  style: React.CSSProperties;
}

class MessageManager {
  private idCounter = 0;
  container: HTMLDivElement | null = null;
  private root: Root | null = null;

  // 用于在 React 中管理消息状态
  private addMessageCallback: React.Dispatch<
    React.SetStateAction<MessageItem[]>
  > | null = null;

  constructor() {
    this.initContainer();
  }

  private initContainer() {
    const container = document.createElement("div");
    container.id = "message-container";
    document.body.appendChild(container);
    this.container = container;

    // 初始化 React 渲染
    this.root = createRoot(container);
    this.root.render(
      <MessageManagerContainer
        destroyCallback={this.destroy}
        registerCallback={this.registerAddMessageCallback}
      />,
    );
  }

  private registerAddMessageCallback = (
    callback: React.Dispatch<React.SetStateAction<MessageItem[]>>,
  ) => {
    this.addMessageCallback = callback;
  };

  public addMessage(message: Omit<MessageItem, "id">) {
    if (this.addMessageCallback) {
      const id = this.idCounter++;
      this.addMessageCallback((prevMessages) => [
        ...prevMessages,
        { ...message, id },
      ]);
    }
  }

  // 移除MessageManager实例及其渲染的容器
  public destroy = () => {
    // 使用 setTimeout 延迟卸载操作，确保 React 渲染完成后再执行
    setTimeout(() => {
      if (this.root) {
        this.root.unmount(); // 延迟卸载 React 渲染
        this.root = null;
      }

      if (this.container) {
        document.body.removeChild(this.container); // 从 DOM 中移除容器
        this.container = null;
      }

      // 清除回调
      this.addMessageCallback = null;
    }, 0);
  };
}

// 单例导出
let messageManager = new MessageManager();

export const showMessage = ({
  type,
  text,
  duration = 3000,
}: {
  type: "success" | "error" | "info" | "tip";
  text: string;
  duration?: number;
}) => {
  // 如果 MessageManager 被销毁，则重新创建实例
  if (!messageManager.container) {
    messageManager = new MessageManager(); // 重新初始化
  }

  let style: React.CSSProperties = {};
  let iconName: MessageComponentIcon;
  switch (type) {
    case "success":
      style = { backgroundColor: "#4CAF50", color: "#fff" };
      iconName = "icon-success";
      break;
    case "error":
      style = { backgroundColor: "#F44336", color: "#fff" };
      iconName = "icon-error";
      break;
    case "info":
      style = { backgroundColor: "#2196F3", color: "#fff" };
      iconName = "icon-tixing";
      break;
    case "tip":
      style = { backgroundColor: "#FFC107", color: "#fff" };
      iconName = "icon-tips";
      break;
  }

  messageManager.addMessage({
    message: text,
    duration,
    style,
    Icon: <IconFont name={iconName}></IconFont>,
  });
};

export default messageManager;
