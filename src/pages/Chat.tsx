
import { useEffect, useState } from "react";
import { Shield, MessageCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import ChatInterface from "@/components/chat/ChatInterface";
import EmergencyHelp from "@/components/EmergencyHelp";
import MoodThemeSwitcher from "@/components/MoodThemeSwitcher";

const Chat = () => {
  const [showEmergencyHelp, setShowEmergencyHelp] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/30 via-background to-secondary/30">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col h-[calc(100vh-2rem)]">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Shield className="w-6 h-6 text-primary-foreground" />
              <span className="text-xl font-semibold">Anonymous Chat</span>
            </div>
            <div className="flex items-center space-x-4">
              <MoodThemeSwitcher />
              <Button 
                variant="destructive" 
                onClick={() => setShowEmergencyHelp(true)}
                className="flex items-center space-x-2"
              >
                <AlertCircle className="w-4 h-4" />
                <span>SOS Help</span>
              </Button>
            </div>
          </div>
          
          <ChatInterface />
          
          {showEmergencyHelp && (
            <EmergencyHelp onClose={() => setShowEmergencyHelp(false)} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;
