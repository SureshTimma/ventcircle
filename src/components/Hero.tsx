
import { Heart, MessageCircle, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen flex items-center justify-center pt-20 pb-16 px-6">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto space-y-8">
          <span className="inline-flex items-center rounded-full px-4 py-1 text-sm font-medium bg-primary/20 text-primary-foreground">
            Safe Space for Mental Health Support
          </span>
          
          <h1 className="text-4xl md:text-6xl font-bold leading-tight md:leading-tight text-balance fade-in">
            Anonymous Support When You Need It Most
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto slide-up">
            Connect with understanding listeners or our AI companion in a safe, anonymous environment. You're never alone in your journey.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button 
              size="lg" 
              className="hover-scale w-full sm:w-auto"
              onClick={() => navigate('/chat')}
            >
              Start Chatting
              <MessageCircle className="w-5 h-5 ml-2" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="hover-scale w-full sm:w-auto"
              onClick={() => navigate('/chat')}
            >
              Learn More
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="glass-card p-6 rounded-xl text-center">
              <Shield className="w-8 h-8 mx-auto mb-4 text-primary-foreground" />
              <h3 className="font-semibold mb-2">100% Anonymous</h3>
              <p className="text-sm text-muted-foreground">Your privacy is our top priority</p>
            </div>
            
            <div className="glass-card p-6 rounded-xl text-center">
              <MessageCircle className="w-8 h-8 mx-auto mb-4 text-primary-foreground" />
              <h3 className="font-semibold mb-2">24/7 Support</h3>
              <p className="text-sm text-muted-foreground">Always here when you need to talk</p>
            </div>
            
            <div className="glass-card p-6 rounded-xl text-center">
              <Heart className="w-8 h-8 mx-auto mb-4 text-primary-foreground" />
              <h3 className="font-semibold mb-2">Caring Community</h3>
              <p className="text-sm text-muted-foreground">Join our supportive environment</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
