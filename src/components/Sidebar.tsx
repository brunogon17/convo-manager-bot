
import React, { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import ConversationList, { Conversation } from "@/components/ConversationList";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "./ui/button";

type SidebarProps = {
  conversations: Conversation[];
  activeConversationId: string | null;
  onSelectConversation: (conversation: Conversation) => void;
};

const Sidebar: React.FC<SidebarProps> = ({
  conversations,
  activeConversationId,
  onSelectConversation,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const { logout } = useAuth();

  const filteredConversations = conversations.filter((conversation) =>
    conversation.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full border-r bg-sidebar">
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-semibold">Conversations</h2>
        <Button variant="ghost" size="sm" onClick={logout}>
          Logout
        </Button>
      </div>
      
      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search contacts..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <div className="flex-1 overflow-hidden">
        <ConversationList
          conversations={filteredConversations}
          activeConversationId={activeConversationId}
          onSelectConversation={onSelectConversation}
        />
      </div>
    </div>
  );
};

export default Sidebar;
