
import React from "react";
import { useAuth } from "@/contexts/AuthContext";

const Header: React.FC = () => {
  const { user } = useAuth();
  
  if (!user) return null;

  return (
    <header className="w-full h-16 border-b bg-white/80 backdrop-blur-sm shadow-sm">
      <div className="h-full flex items-center justify-between px-6">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold text-lg mr-3">
            {user.username.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 className="font-medium text-lg">{user.displayName || user.username}</h2>
            <p className="text-sm text-muted-foreground">Dashboard de Conversas</p>
          </div>
        </div>
        
        <div className="flex items-center">
          <div className="px-4 py-2 rounded-md bg-primary/10">
            <span className="text-sm font-medium">{user.company}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
