
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import ChatArea from "@/components/ChatArea";
import { Conversation, Message } from "@/components/ConversationList";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

// Database configuration
const DB_CONFIG = {
  url: "http://teste.com",
  port: 1234,
  user: "admin",
  password: "teste",
  db_name: "db_empresa",
  table_name: "tbl_n8n_conversas"
};

// Mock function to simulate database fetch
const fetchConversationsFromDB = async (): Promise<Conversation[]> => {
  console.log("Fetching conversations from DB:", DB_CONFIG);
  
  // In a real app, this would be a fetch to your database API
  // For now, we'll return mock data with a simulated delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Simulate a successful database connection
  toast.success("Connected to database successfully");
  
  return mockConversations;
};

// Mock data for conversations
const mockConversations: Conversation[] = [
  {
    id: "1",
    name: "João Silva",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    lastMessage: "Como posso ajudar com sua automação?",
    unreadCount: 3,
    lastUpdate: new Date(2023, 4, 5, 14, 30),
    messages: [
      {
        id: "msg1",
        content: "Olá, preciso de ajuda com o fluxo de automação.",
        sender: "human",
        timestamp: new Date(2023, 4, 5, 14, 22),
      },
      {
        id: "msg2",
        content: "Claro, qual é o problema específico que você está enfrentando?",
        sender: "ai",
        timestamp: new Date(2023, 4, 5, 14, 24),
      },
      {
        id: "msg3",
        content: "Estou tentando conectar o Webhook ao Google Sheets.",
        sender: "human",
        timestamp: new Date(2023, 4, 5, 14, 26),
      },
      {
        id: "msg4",
        content: "Você precisa usar um nó HTTP Request para isso. Posso te mostrar como.",
        sender: "ai",
        timestamp: new Date(2023, 4, 5, 14, 30),
      },
    ],
  },
  {
    id: "2",
    name: "Maria Santos",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    lastMessage: "Vamos verificar a integração API.",
    unreadCount: 0,
    lastUpdate: new Date(2023, 4, 4, 9, 12),
    messages: [
      {
        id: "msg1",
        content: "Bom dia, preciso integrar o Slack ao meu workflow.",
        sender: "human",
        timestamp: new Date(2023, 4, 4, 9, 5),
      },
      {
        id: "msg2",
        content: "Bom dia Maria! Vamos começar configurando o token de API do Slack.",
        sender: "ai",
        timestamp: new Date(2023, 4, 4, 9, 8),
      },
      {
        id: "msg3",
        content: "Onde posso encontrar esse token?",
        sender: "human",
        timestamp: new Date(2023, 4, 4, 9, 10),
      },
      {
        id: "msg4",
        content: "Você precisa acessar o painel de desenvolvedor do Slack. Vamos verificar a integração API.",
        sender: "ai",
        timestamp: new Date(2023, 4, 4, 9, 12),
      },
    ],
  },
  {
    id: "3",
    name: "Carlos Oliveira",
    avatar: "https://randomuser.me/api/portraits/men/75.jpg",
    lastMessage: "O workflow foi atualizado com sucesso!",
    unreadCount: 2,
    lastUpdate: new Date(2023, 4, 3, 16, 45),
    messages: [
      {
        id: "msg1",
        content: "Preciso automatizar o envio de e-mails semanais.",
        sender: "human",
        timestamp: new Date(2023, 4, 3, 16, 30),
      },
      {
        id: "msg2",
        content: "Podemos usar um nó de cronograma para isso. Que dia da semana você prefere?",
        sender: "ai",
        timestamp: new Date(2023, 4, 3, 16, 33),
      },
      {
        id: "msg3",
        content: "Prefiro às segundas-feiras, às 9h.",
        sender: "human",
        timestamp: new Date(2023, 4, 3, 16, 40),
      },
      {
        id: "msg4",
        content: "Configurado! O workflow foi atualizado com sucesso!",
        sender: "ai",
        timestamp: new Date(2023, 4, 3, 16, 45),
      },
    ],
  },
  {
    id: "4",
    name: "Ana Pereira",
    avatar: "https://randomuser.me/api/portraits/women/63.jpg",
    lastMessage: "Vamos agendar uma chamada para discutir.",
    unreadCount: 0,
    lastUpdate: new Date(2023, 4, 2, 11, 20),
    messages: [
      {
        id: "msg1",
        content: "Olá, estou com dificuldades para configurar o trigger HTTP.",
        sender: "human",
        timestamp: new Date(2023, 4, 2, 11, 10),
      },
      {
        id: "msg2",
        content: "Entendo. É um pouco complexo. Poderia me dar mais detalhes?",
        sender: "ai",
        timestamp: new Date(2023, 4, 2, 11, 15),
      },
      {
        id: "msg3",
        content: "Estou tentando fazer um webhook que aceite JSON, mas recebo erros.",
        sender: "human",
        timestamp: new Date(2023, 4, 2, 11, 18),
      },
      {
        id: "msg4",
        content: "Isso pode ser um problema de formato. Vamos agendar uma chamada para discutir.",
        sender: "ai",
        timestamp: new Date(2023, 4, 2, 11, 20),
      },
    ],
  },
  {
    id: "5",
    name: "Roberto Almeida",
    avatar: "https://randomuser.me/api/portraits/men/22.jpg",
    lastMessage: "Seu problema deve estar resolvido agora.",
    unreadCount: 1,
    lastUpdate: new Date(2023, 4, 1, 15, 5),
    messages: [
      {
        id: "msg1",
        content: "Ajuda! Meu workflow está dando erro 502.",
        sender: "human",
        timestamp: new Date(2023, 4, 1, 14, 50),
      },
      {
        id: "msg2",
        content: "Isso parece ser um problema de timeout. Vamos verificar os logs.",
        sender: "ai",
        timestamp: new Date(2023, 4, 1, 14, 55),
      },
      {
        id: "msg3",
        content: "Onde encontro os logs?",
        sender: "human",
        timestamp: new Date(2023, 4, 1, 15, 0),
      },
      {
        id: "msg4",
        content: "Vá até Configurações > Logs. Fiz algumas alterações no seu workflow. Seu problema deve estar resolvido agora.",
        sender: "ai",
        timestamp: new Date(2023, 4, 1, 15, 5),
      },
    ],
  },
];

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
      toast.error("Failed to load conversations from database");
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
    <div className="h-full flex overflow-hidden animate-fade-in">
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
  );
};

export default Dashboard;
