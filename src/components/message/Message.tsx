import React, { CSSProperties, useEffect } from "react";
import MessageStyle from "./Message.module.scss";

interface MessageProps {
  /* 消息的id */
  id: number;
  /* 消息内容 */
  message: string;
  /* 消息的持续时间 */
  duration?: number;
  /* 消息的样式 */
  style?: CSSProperties;
  /* 消息的位置 */
  position?: { top: string; left: string; transform?: string };
  /* 关闭消息的回调 */
  onClose: (id: number) => void;
}

const Message: React.FC<MessageProps> = ({
  id,
  message,
  duration = 3000,
  style,
  onClose,
}: MessageProps) => {

  useEffect(() => {
    const removeTimer = setTimeout(() => {

      onClose(id);
    }, duration );

    return () => {
      clearTimeout(removeTimer);
    };
  }, [duration, onClose, id]);

  return (
   <div className={MessageStyle["Message-Item"]} style={{ ...style }}>
      {message}
    </div>
  );
};

export default Message;
