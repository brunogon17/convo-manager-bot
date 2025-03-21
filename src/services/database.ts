
import { toast } from "sonner";

// Database configuration
const DB_CONFIG = {
  url: "http://teste.com",
  port: 1234,
  user: "admin",
  password: "teste",
  db_name: "db_empresa",
  tables: {
    users: "tbl_usuarios",
    conversations: "tbl_n8n_conversas"
  }
};

// Type for user data
export type UserData = {
  username: string;
  displayName?: string;
  company: string;
};

// Type for message data
export type MessageData = {
  id: string;
  session_id: string;
  timestamp: string;
  content: string;
  type: "human" | "ai";
  additional_kwargs?: any;
  response_metadata?: any;
};

// Mock function to authenticate user
export const authenticateUser = async (username: string, password: string): Promise<UserData | null> => {
  console.log(`Attempting to authenticate user ${username} with DB:`, DB_CONFIG);
  
  try {
    // In a real app, this would be a fetch to your Postgres API
    // For now, we'll simulate a DB check with a delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Simulating a successful database query
    if (username === "admin" && password === "admin") {
      toast.success("Conexão com banco de dados realizada com sucesso");
      
      // Return mocked user data that would normally come from the database
      return {
        username: "admin",
        displayName: "Pessoa Teste",
        company: "Empresa PVG"
      };
    }
    
    // Authentication failed
    toast.error("Credenciais inválidas");
    return null;
  } catch (error) {
    console.error("Erro ao conectar com o banco de dados:", error);
    toast.error("Falha na conexão com o banco de dados");
    return null;
  }
};

// Function to fetch conversations from DB
export const fetchConversationsFromDB = async () => {
  console.log("Fetching conversations from DB:", DB_CONFIG);
  
  try {
    // In a real app, this would be a fetch to your Postgres API
    // For now, we'll return mock data with a simulated delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Simulate a successful database connection
    toast.success("Conexão com banco de dados realizada com sucesso");
    
    // Return mocked data that would normally come from the database
    return mockConversations;
  } catch (error) {
    console.error("Erro ao buscar conversas:", error);
    toast.error("Falha ao buscar conversas do banco de dados");
    throw error;
  }
};

// Mock data for conversations (in a real app this would come from Postgres)
const mockConversations = [
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

// In a real app, you would implement these functions to convert the raw database data
// into the format expected by your application
export const parseMessageData = (data: any[]): any[] => {
  // Parse raw message data from database
  return data;
};

export const groupMessagesBySession = (messages: any[]): any[] => {
  // Group messages by session_id
  return [];
};
