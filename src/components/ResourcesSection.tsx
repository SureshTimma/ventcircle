
import { BookOpen, HeartHandshake, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";

const ResourcesSection = () => {
  return (
    <section id="resources" className="py-20">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Mental Health Resources</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="glass-card p-6 rounded-xl text-center">
            <BookOpen className="w-8 h-8 mx-auto mb-4 text-primary-foreground" />
            <h3 className="text-xl font-semibold mb-2">Self-Help Guides</h3>
            <p className="text-muted-foreground mb-4">Access our library of mental health resources and self-care guides.</p>
            <Button variant="outline" className="w-full">Learn More</Button>
          </div>
          
          <div className="glass-card p-6 rounded-xl text-center">
            <HeartHandshake className="w-8 h-8 mx-auto mb-4 text-primary-foreground" />
            <h3 className="text-xl font-semibold mb-2">Professional Help</h3>
            <p className="text-muted-foreground mb-4">Connect with licensed therapists and counselors in your area.</p>
            <Button variant="outline" className="w-full">Find Help</Button>
          </div>
          
          <div className="glass-card p-6 rounded-xl text-center">
            <Brain className="w-8 h-8 mx-auto mb-4 text-primary-foreground" />
            <h3 className="text-xl font-semibold mb-2">Mindfulness</h3>
            <p className="text-muted-foreground mb-4">Practice meditation and mindfulness with guided exercises.</p>
            <Button variant="outline" className="w-full">Start Now</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResourcesSection;
