
import React, { useRef, useEffect } from "react";
import { Send, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import MessageBubble from "@/components/MessageBubble";
import { Conversation } from "@/components/ConversationList";
import { toast } from "sonner";

type ChatAreaProps = {
  conversation: Conversation | null;
  onRefresh?: () => void;
};

const ChatArea: React.FC<ChatAreaProps> = ({ conversation, onRefresh }) => {
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

  const handleRefresh = () => {
    if (onRefresh) {
      onRefresh();
      toast.success("Conversa atualizada");
    }
  };

  if (!conversation) {
    return (
      <div className="flex items-center justify-center h-full bg-card/30 backdrop-blur-sm">
        <div className="text-center p-6 rounded-lg">
          <h3 className="text-2xl font-medium mb-2">Selecione uma conversa</h3>
          <p className="text-muted-foreground">
            Escolha uma conversa da barra lateral para começar a conversar
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-gradient-to-r from-blue-50/80 to-indigo-50/80">
      <div className="p-4 border-b flex items-center justify-between bg-white/80 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <img 
            src={conversation.avatar} 
            alt={conversation.name} 
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <h2 className="font-medium">{conversation.name}</h2>
            <p className="text-xs text-muted-foreground">ID: {conversation.id}</p>
          </div>
        </div>
        <Button variant="outline" size="icon" onClick={handleRefresh} title="Atualizar conversa">
          <RefreshCw className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDQwIDQwIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmMGYwZjAiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMjAgMGMxMS4wNDYgMCAyMCA4Ljk1NCAyMCAyMHMtOC45NTQgMjAtMjAgMjBTMCAzMS4wNDYgMCAyMCA4Ljk1NCAwIDIwIDB6bTAgM2MtOS4zOTEgMC0xNyA3LjYwOS0xNyAxN3M3LjYwOSAxNyAxNyAxNyAxNy03LjYwOSAxNy0xNy03LjYwOS0xNy0xNy0xN3oiLz48cGF0aCBkPSJNMjUuNyAyMy45NWEuNS41IDAgMCAxLS43MjQtLjY5bDIuNzg5LTIuOTI5YS41LjUgMCAxIDEgLjcyNC42OWwtMi43ODkgMi45M3oiLz48cGF0aCBkPSJNMTkuNSAyMmEyLjUgMi41IDAgMSAwIDAtNSAyLjUgMi41IDAgMCAwIDAgNXptMC0xYTEuNSAxLjUgMCAxIDEgMC0zIDEuNSAxLjUgMCAwIDEgMCAzeiIvPjwvZz48L2c+PC9zdmc+')] backdrop-opacity-10">
        {conversation.messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <form onSubmit={handleSendMessage} className="p-4 border-t bg-white/80 backdrop-blur-sm">
        <div className="flex gap-2">
          <Input
            placeholder="Digite uma mensagem..."
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
