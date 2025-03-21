
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import ChatArea from "@/components/ChatArea";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { useAuth } from "@/contexts/AuthContext";
import { useConversations } from "@/hooks/useConversations";

const Dashboard = () => {
  const {
    conversations,
    activeConversation,
    isLoading,
    loadConversations,
    handleSelectConversation
  } = useConversations();
  
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    } else {
      loadConversations();
    }
  }, [isAuthenticated, navigate]);

  return (
    <DashboardLayout>
      <div className="w-80 h-full">
        <Sidebar
          conversations={conversations}
          activeConversationId={activeConversation?.id || null}
          onSelectConversation={handleSelectConversation}
          isLoading={isLoading}
          onRefresh={loadConversations}
        />
      </div>
      <div className="flex-1 h-full">
        <ChatArea 
          conversation={activeConversation} 
          onRefresh={loadConversations}
        />
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
