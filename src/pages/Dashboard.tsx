
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
      const data = await fetchConversationsFromDB();
      setConversations(data);
      
      // Set the first conversation as active if there's no active one
      if (data.length > 0 && !activeConversation) {
        setActiveConversation(data[0]);
      } else if (activeConversation) {
        // Update the active conversation with fresh data
        const updatedActive = data.find(c => c.id === activeConversation.id);
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
