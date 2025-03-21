
import React from "react";
import { format } from "date-fns";
import { Message } from "./ConversationList";

type MessageBubbleProps = {
  message: Message;
};

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isHuman = message.sender === "human";
  
  return (
    <div className={`flex ${isHuman ? "justify-start" : "justify-end"} mb-3`}>
      <div className={`${isHuman ? "message-human" : "message-ai"} shadow-sm`}>
        <div className="mb-1">{message.content}</div>
        <div className="text-xs opacity-70 text-right">
          {format(message.timestamp, "HH:mm, MMM d")}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
