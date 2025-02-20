
import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ResourceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const ResourceCard = ({ icon: Icon, title, description }: ResourceCardProps) => {
  return (
    <div className="glass-card p-6 rounded-xl">
      <Icon className="w-8 h-8 mb-4 text-primary-foreground" />
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground mb-4">{description}</p>
      <Button variant="outline" className="w-full">
        Learn More
      </Button>
    </div>
  );
};

export default ResourceCard;
