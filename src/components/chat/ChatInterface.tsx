
import { useState, useEffect, useRef } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Message {
  id: string;
  content: string;
  sender_name: string;
  is_ai: boolean;
  emotion?: string;
  created_at: string;
}

const ChatInterface = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Load existing messages
    const loadMessages = async () => {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: true });
      
      if (error) {
        toast.error("Failed to load messages");
        return;
      }
      
      if (data) setMessages(data as Message[]);
    };

    loadMessages();

    // Subscribe to new messages
    const channel = supabase
      .channel('messages_channel')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages'
        },
        (payload) => {
          setMessages(prev => [...prev, payload.new as Message]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleSend = async () => {
    if (!message.trim()) return;

    setIsLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error("Please sign in to send messages");
        return;
      }

      const response = await fetch('/chat-ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`
        },
        body: JSON.stringify({
          message: message.trim(),
          userId: user.id
        })
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setMessage("");
    } catch (error) {
      toast.error("Failed to send message");
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getEmotionColor = (emotion?: string) => {
    const colors: Record<string, string> = {
      happy: 'text-green-500',
      sad: 'text-blue-500',
      angry: 'text-red-500',
      anxious: 'text-yellow-500',
      neutral: 'text-gray-500',
      excited: 'text-purple-500',
      confused: 'text-orange-500',
      frustrated: 'text-pink-500'
    };
    return emotion ? colors[emotion] || 'text-gray-500' : 'text-gray-500';
  };

  return (
    <div className="flex-1 flex flex-col bg-card/50 rounded-lg overflow-hidden">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.is_ai ? 'items-start' : 'items-end'}`}
          >
            <div 
              className={`max-w-[80%] ${
                msg.is_ai ? 'bg-primary/10' : 'bg-primary/20'
              } rounded-lg p-3`}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="font-medium">{msg.sender_name}</span>
                {msg.emotion && !msg.is_ai && (
                  <span className={`text-xs ${getEmotionColor(msg.emotion)}`}>
                    {msg.emotion}
                  </span>
                )}
              </div>
              <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="border-t p-4 bg-background/50">
        <div className="flex space-x-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 bg-background rounded-md border px-3 py-2"
            onKeyPress={(e) => e.key === "Enter" && !isLoading && handleSend()}
            disabled={isLoading}
          />
          <Button onClick={handleSend} disabled={isLoading}>
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
