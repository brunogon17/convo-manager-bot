
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import ChatArea from "@/components/ChatArea";
import Header from "@/components/Header";
import { Conversation, Message } from "@/components/ConversationList";
import { useAuth } from "@/contexts/AuthContext";
import { fetchConversationsFromDB } from "@/services/database";
import { toast } from "sonner";

const Dashboard = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    } else {
      loadConversations();
    }
  }, [isAuthenticated, navigate]);

  const loadConversations = async () => {
    try {
      setIsLoading(true);
      // Fetch data and ensure it has the correct types by mapping the sender to the expected union type
      const data = await fetchConversationsFromDB();
      
      // Ensure the type of 'sender' is correct ('human' | 'ai')
      const typedData: Conversation[] = data.map(conversation => ({
        ...conversation,
        messages: conversation.messages.map(message => ({
          ...message,
          // Cast sender to the expected union type
          sender: message.sender as "human" | "ai"
        }))
      }));
      
      setConversations(typedData);
      
      // Set the first conversation as active if there's no active one
      if (typedData.length > 0 && !activeConversation) {
        setActiveConversation(typedData[0]);
      } else if (activeConversation) {
        // Update the active conversation with fresh data
        const updatedActive = typedData.find(c => c.id === activeConversation.id);
        if (updatedActive) {
          setActiveConversation(updatedActive);
        }
      }
    } catch (error) {
      console.error("Error loading conversations:", error);
      toast.error("Falha ao carregar conversas do banco de dados");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectConversation = (conversation: Conversation) => {
    setActiveConversation(conversation);
  };

  const handleRefreshConversation = () => {
    loadConversations();
  };

  return (
    <div className="h-full flex flex-col overflow-hidden animate-fade-in">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <div className="w-80 h-full">
          <Sidebar
            conversations={conversations}
            activeConversationId={activeConversation?.id || null}
            onSelectConversation={handleSelectConversation}
            isLoading={isLoading}
            onRefresh={handleRefreshConversation}
          />
        </div>
        <div className="flex-1 h-full">
          <ChatArea 
            conversation={activeConversation} 
            onRefresh={handleRefreshConversation}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
