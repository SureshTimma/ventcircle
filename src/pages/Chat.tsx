
import { useEffect, useState } from "react";
import { Shield, MessageCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import ChatInterface from "@/components/chat/ChatInterface";
import EmergencyHelp from "@/components/EmergencyHelp";
import MoodThemeSwitcher from "@/components/MoodThemeSwitcher";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const androidVersions = [
  "Cupcake", "Donut", "Eclair", "Froyo", "Gingerbread", "Honeycomb", "IceCreamSandwich",
  "JellyBean", "KitKat", "Lollipop", "Marshmallow", "Nougat", "Oreo", "Pie", "Quince",
  "RedVelvet", "Snow", "Tiramisu", "Unicorn", "Vanilla", "Waffle", "Yogurt", "Zebra"
];

const generateNickname = () => {
  const adjectives = ["Happy", "Clever", "Swift", "Gentle", "Brave", "Bright", "Kind"];
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const version = androidVersions[Math.floor(Math.random() * androidVersions.length)];
  const number = Math.floor(Math.random() * 1000);
  return `${adjective}${version}${number}`;
};

const generateValidEmail = () => {
  // Generate a unique email with only lowercase letters and numbers
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 6);
  return `anon${timestamp}${random}@ventcircle.com`;
};

const Chat = () => {
  const [showEmergencyHelp, setShowEmergencyHelp] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const initializeUser = async () => {
      try {
        setIsLoading(true);
        
        // Check if user is already authenticated
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          // Create new anonymous user
          const email = generateValidEmail();
          const password = crypto.randomUUID();

          // Always try to sign up first since we're generating a new email
          const { data: authData, error: authError } = await supabase.auth.signUp({
            email,
            password,
            options: {
              emailRedirectTo: window.location.origin
            }
          });

          if (authError) {
            console.error('Auth Error:', authError);
            throw authError;
          }

          if (!authData.user) {
            throw new Error('No user data returned after signup');
          }

          // Generate and store nickname
          const nickname = generateNickname();
          const { error: nickError } = await supabase
            .from('anonymous_users')
            .insert([
              { id: authData.user.id, nickname }
            ]);

          if (nickError) {
            console.error('Nickname Error:', nickError);
            throw nickError;
          }
          
          toast.success(`Welcome, ${nickname}!`);
        } else {
          // Get existing nickname for returning user
          const { data: userData, error: userError } = await supabase
            .from('anonymous_users')
            .select('nickname')
            .eq('id', session.user.id)
            .single();

          if (userError) {
            console.error('User Data Error:', userError);
            throw userError;
          }

          toast.success(`Welcome back, ${userData.nickname}!`);
        }
      } catch (error) {
        console.error('Initialization Error:', error);
        toast.error("Failed to initialize chat. Please try again.");
        navigate('/');
      } finally {
        setIsLoading(false);
      }
    };

    initializeUser();
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

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
