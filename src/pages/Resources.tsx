
import { BookOpen, HeartHandshake, Music } from "lucide-react";
import ResourceCard from "@/components/resources/ResourceCard";
import MusicPlayer from "@/components/resources/MusicPlayer";

const Resources = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/30 via-background to-secondary/30">
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-semibold mb-8">Mental Health Resources</h1>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ResourceCard
            icon={BookOpen}
            title="Self-Care Guides"
            description="Access comprehensive guides for managing mental health and daily well-being."
          />
          <ResourceCard
            icon={HeartHandshake}
            title="Professional Help"
            description="Find licensed therapists and counselors in your area."
          />
          <ResourceCard
            icon={Music}
            title="Meditation Resources"
            description="Guided meditation sessions and mindfulness exercises."
          />
        </div>

        <div className="mt-12">
          <h2 className="text-xl font-semibold mb-6">Calming Music</h2>
          <MusicPlayer />
        </div>
      </div>
    </div>
  );
};

export default Resources;
