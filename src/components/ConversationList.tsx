
import React from "react";
import { formatDistanceToNow } from "date-fns";

export type Conversation = {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  unreadCount: number;
  lastUpdate: Date;
  messages: Message[];
};

export type Message = {
  id: string;
  content: string;
  sender: "human" | "ai";
  timestamp: Date;
};

type ConversationListProps = {
  conversations: Conversation[];
  activeConversationId: string | null;
  onSelectConversation: (conversation: Conversation) => void;
};

const ConversationList: React.FC<ConversationListProps> = ({
  conversations,
  activeConversationId,
  onSelectConversation,
}) => {
  return (
    <div className="h-full overflow-y-auto py-2 pr-1">
      {conversations.map((conversation) => (
        <div
          key={conversation.id}
          className={`sidebar-contact transition-colors duration-200 ${
            activeConversationId === conversation.id 
              ? "bg-primary/15 text-primary-foreground border-l-4 border-primary" 
              : "hover:bg-accent/50"
          }`}
          onClick={() => onSelectConversation(conversation)}
        >
          <div className="relative">
            <img
              src={conversation.avatar}
              alt={conversation.name}
              className="w-10 h-10 rounded-full object-cover"
              loading="lazy"
            />
            {conversation.unreadCount > 0 && (
              <div className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 bg-primary text-white text-xs font-semibold rounded-full">
                {conversation.unreadCount}
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-center">
              <h3 className={`font-medium truncate ${activeConversationId === conversation.id ? "text-primary font-semibold" : ""}`}>
                {conversation.name}
              </h3>
              <span className="text-xs text-muted-foreground whitespace-nowrap ml-1">
                {formatDistanceToNow(conversation.lastUpdate, { addSuffix: true })}
              </span>
            </div>
            <p className="text-sm text-muted-foreground truncate">{conversation.lastMessage}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ConversationList;
