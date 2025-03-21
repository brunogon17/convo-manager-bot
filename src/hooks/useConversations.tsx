
import { useState, useEffect } from "react";
import { Conversation } from "@/components/ConversationList";
import { fetchConversationsFromDB } from "@/services/database";
import { toast } from "sonner";

export const useConversations = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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

  return {
    conversations,
    activeConversation,
    isLoading,
    loadConversations,
    handleSelectConversation
  };
};
