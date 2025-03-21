
import React, { useRef, useEffect } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import MessageBubble from "@/components/MessageBubble";
import { Conversation } from "@/components/ConversationList";

type ChatAreaProps = {
  conversation: Conversation | null;
};

const ChatArea: React.FC<ChatAreaProps> = ({ conversation }) => {
  const [newMessage, setNewMessage] = React.useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [conversation]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim() || !conversation) return;
    
    // This would be replaced with actual message sending logic
    console.log("Sending message:", newMessage);
    
    // Clear the input field
    setNewMessage("");
  };

  if (!conversation) {
    return (
      <div className="flex items-center justify-center h-full bg-card/30 backdrop-blur-sm">
        <div className="text-center p-6 rounded-lg">
          <h3 className="text-2xl font-medium mb-2">Select a conversation</h3>
          <p className="text-muted-foreground">
            Choose a conversation from the sidebar to start chatting
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b flex items-center gap-3">
        <img 
          src={conversation.avatar} 
          alt={conversation.name} 
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <h2 className="font-medium">{conversation.name}</h2>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {conversation.messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <form onSubmit={handleSendMessage} className="p-4 border-t">
        <div className="flex gap-2">
          <Input
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChatArea;
