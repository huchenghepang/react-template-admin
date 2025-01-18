import React, {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./message-transition.scss";
import MessageStyle from "./Message.module.scss";
import MessageManagerStyle from "./MessageManager.module.scss";
interface Message {
  id: number;
  message: string;
  duration: number;
  style: React.CSSProperties;
}

interface MessageContextType {
  addMessage: (message: Omit<Message, "id">) => void;
  showMessage:ShowMessageFunc
}

interface ShowMessageParams {
  type: "success" | "error" | "info" | "tip";
  message: string;
  duration?: number;
}

type ShowMessageFunc  = (options: ShowMessageParams) => void

const MessageContext = createContext<MessageContextType | undefined>(undefined);

export const useMessage = () => {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error("useMessage must be used within a MessageProvider");
  }
  return context;
};

export const MessageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [idCounter, setIdCounter] = useState(0);

  // 添加消息到队列
  const addMessage = useCallback(
    (newMessage: Omit<Message, "id">) => {
      const id = idCounter;
      setIdCounter((prev) => prev + 1);
      // 添加到消息队列
      setMessages((prev) => [...prev, { ...newMessage, id }]);

      // 定时移除消息
      setTimeout(() => {
        setMessages((prev) => prev.slice(1));
      }, newMessage.duration);
    },
    [idCounter],
  );

  const showMessage: ShowMessageFunc = ({ type, message, duration = 3000 }) => {
    let style: React.CSSProperties = {};

    switch (type) {
      case "success":
        style = { backgroundColor: "#4CAF50", color: "#fff" };
        break;
      case "error":
        style = { backgroundColor: "#F44336", color: "#fff" };
        break;
      case "info":
        style = { backgroundColor: "#2196F3", color: "#fff" };
        break;
      case "tip":
        style = { backgroundColor: "#FFC107", color: "#fff" };
        break;
    }

    addMessage({
      message: message || `Default ${type} message`,
      duration,
      style,
    });
  };

  return (
    <MessageContext.Provider value={{ addMessage, showMessage }}>
      {children}
      <MessageList messages={messages} />
    </MessageContext.Provider>
  );
};

interface MessageListProps {
  messages: Message[];
}

// 消息列表组件
const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  const nodeRef = useRef(null);

  return (
    <TransitionGroup className={MessageManagerStyle["Message-Manager"]}>
      {messages.map((msg, index) => (
        <CSSTransition
          key={msg.id}
          timeout={300}
          classNames="message"
          nodeRef={nodeRef}
          unmountOnExit
        >
          <div
            ref={nodeRef} // 使用该 ref 来应用动画
            style={msg.style}
            className={MessageStyle["Message-Item"]}
          >
            {msg.message}
            {index}
          </div>
        </CSSTransition>
      ))}
    </TransitionGroup>
  );
};
