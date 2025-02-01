import { ChatMessage } from "../ChatMessage";
import { TypingIndicator } from "../TypingIndicator";
import { useRef, useEffect } from "react";

interface Message {
  text: string;
  isBot: boolean;
}

interface ChatContainerProps {
  messages: Message[];
  isTyping: boolean;
}

export const ChatContainer = ({ messages, isTyping }: ChatContainerProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="space-y-4 pt-20">
      {messages.map((message, index) => (
        <ChatMessage
          key={index}
          message={message.text}
          isBot={message.isBot}
          animate={index === messages.length - 1}
        />
      ))}
      {isTyping && <TypingIndicator />}
      <div ref={messagesEndRef} />
    </div>
  );
};