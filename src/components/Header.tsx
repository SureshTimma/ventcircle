
import { Heart, MessageCircle, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-card">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Heart className="w-6 h-6 text-pink-500" />
            <span className="text-xl font-semibold">VentCircle</span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-sm font-medium hover:text-primary-foreground/80 transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="text-sm font-medium hover:text-primary-foreground/80 transition-colors">
              How it Works
            </a>
            <a href="#support" className="text-sm font-medium hover:text-primary-foreground/80 transition-colors">
              Support
            </a>
          </div>
          <Button variant="secondary" className="hover-scale">
            Get Started
          </Button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
