
import { Heart, Shield, MessageCircle, Brain, Music, BookOpen } from "lucide-react";

const Features = () => {
  return (
    <section id="features" className="py-20 bg-primary/10">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">How We Support You</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="glass-card p-6 rounded-xl">
            <Shield className="w-8 h-8 mb-4 text-primary-foreground" />
            <h3 className="text-xl font-semibold mb-2">Anonymous Support</h3>
            <p className="text-muted-foreground">Chat safely with random nicknames from Android versions.</p>
          </div>
          
          <div className="glass-card p-6 rounded-xl">
            <MessageCircle className="w-8 h-8 mb-4 text-primary-foreground" />
            <h3 className="text-xl font-semibold mb-2">24/7 AI Chat</h3>
            <p className="text-muted-foreground">Always have someone to talk to with our empathetic AI companion.</p>
          </div>
          
          <div className="glass-card p-6 rounded-xl">
            <Brain className="w-8 h-8 mb-4 text-primary-foreground" />
            <h3 className="text-xl font-semibold mb-2">Emotion Support</h3>
            <p className="text-muted-foreground">Smart responses based on your emotional state.</p>
          </div>
          
          <div className="glass-card p-6 rounded-xl">
            <Heart className="w-8 h-8 mb-4 text-primary-foreground" />
            <h3 className="text-xl font-semibold mb-2">SOS Help</h3>
            <p className="text-muted-foreground">Immediate access to crisis resources and local helplines.</p>
          </div>
          
          <div className="glass-card p-6 rounded-xl">
            <Music className="w-8 h-8 mb-4 text-primary-foreground" />
            <h3 className="text-xl font-semibold mb-2">Music Therapy</h3>
            <p className="text-muted-foreground">Personalized playlists to help manage your mood.</p>
          </div>
          
          <div className="glass-card p-6 rounded-xl">
            <BookOpen className="w-8 h-8 mb-4 text-primary-foreground" />
            <h3 className="text-xl font-semibold mb-2">Resources</h3>
            <p className="text-muted-foreground">Access to self-help guides and professional support.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
