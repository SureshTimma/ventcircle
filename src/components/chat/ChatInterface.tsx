
import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";

const ChatInterface = () => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!message.trim()) return;
    // TODO: Implement chat functionality after Supabase connection
    setMessage("");
  };

  return (
    <div className="flex-1 flex flex-col bg-card/50 rounded-lg overflow-hidden">
      <div className="flex-1 overflow-y-auto p-4">
        {/* Messages will be rendered here */}
      </div>
      
      <div className="border-t p-4 bg-background/50">
        <div className="flex space-x-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 bg-background rounded-md border px-3 py-2"
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
          />
          <Button onClick={handleSend}>
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
