import React, { ReactNode, useState } from "react";
import ButtonStyle from "./Button.module.scss";

// 定义组件的 Props 类型
interface ButtonProps {
  children?: ReactNode; // 使用 ReactNode 来接收任何嵌套内容
  onClick?: React.MouseEventHandler<HTMLButtonElement>; // 可选的点击事件
  type?: "primary" | "default" | "text" | "link" | "dashed"; // 按钮类型
  styles?: React.CSSProperties;
  classNames?: string[]; // 可选的额外类名
  href?: string; // 如果是链接按钮，提供一个 href 属性
  size?:"large" | "small" | "default"
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = "default",
  classNames = [],
  href,
  styles,
  size = "default",
}: ButtonProps) => {
  const [isClicked, setIsClicked] = useState(false);

  // 处理点击事件生成波浪，并调用父组件传递的 onClick
  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const button = e.currentTarget;
    const wave = document.createElement("div");

    // 获取点击位置
    const rect = button.getBoundingClientRect();
    const size = Math.max(button.offsetWidth, button.offsetHeight);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    // 设置波浪样式
    wave.className = ButtonStyle.wave;
    wave.style.width = wave.style.height = `${size}px`;
    wave.style.left = `${x}px`;
    wave.style.top = `${y}px`;

    // 添加波浪到按钮
    button.appendChild(wave);

    // 删除波浪元素
    wave.addEventListener("animationend", () => {
      wave.remove();
    });

    // 调用传入的 onClick 事件（如果有的话）
    if (onClick) {
      onClick(e); // 执行传递的 onClick 事件
    }

    // 激活光圈动画并设置点击状态
    setIsClicked(true);

    // 在光圈动画结束后移除点击状态
    setTimeout(() => {
      setIsClicked(false);
    }, 800); // 动画时长与 CSS 中设置的动画时长一致
  };

  const buttonClassNames = [
    ButtonStyle.button,
    ButtonStyle[type], // 根据类型选择不同的样式类
    ButtonStyle[size], // 根据大小选择不同的样式类
    "clearfix",
    ...classNames, // 允许传递额外的类名
    isClicked ? ButtonStyle.focused : "",
  ];

  if (href) {
    // 如果有 href 属性，则返回 a 标签，作为链接按钮
    return (
      <a href={href} style={styles} className={buttonClassNames.join(" ")}>
        {children}
      </a>
    );
  }

  // 默认是 button 标签
  return (
    <button
      className={buttonClassNames.join(" ")}
      onClick={handleClick}
      style={styles}
    >
      {children}
    </button>
  );
};

export default Button;
