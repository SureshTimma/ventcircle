
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmergencyHelpProps {
  onClose: () => void;
}

const EmergencyHelp = ({ onClose }: EmergencyHelpProps) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-background p-6 rounded-lg max-w-lg w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Emergency Help</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="space-y-4">
          <div className="p-4 bg-destructive/10 rounded-lg">
            <h3 className="font-semibold mb-2">Emergency Numbers</h3>
            <p className="text-sm">National Suicide Prevention Lifeline: 988</p>
            <p className="text-sm">Emergency Services: 911</p>
          </div>
          
          <div className="p-4 bg-primary/10 rounded-lg">
            <h3 className="font-semibold mb-2">Crisis Text Line</h3>
            <p className="text-sm">Text HOME to 741741 to connect with a Crisis Counselor</p>
          </div>
          
          <Button className="w-full" variant="default" size="lg">
            Call 988 Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EmergencyHelp;
