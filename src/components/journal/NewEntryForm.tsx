
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface NewEntryFormProps {
  onClose: () => void;
}

const NewEntryForm = ({ onClose }: NewEntryFormProps) => {
  return (
    <div className="glass-card p-6 rounded-xl">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">New Journal Entry</h3>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium mb-2 block">Title</label>
          <input
            type="text"
            placeholder="How are you feeling today?"
            className="w-full px-3 py-2 rounded-md border bg-background"
          />
        </div>
        
        <div>
          <label className="text-sm font-medium mb-2 block">Your thoughts</label>
          <Textarea
            placeholder="Write your thoughts here..."
            className="min-h-[200px]"
          />
        </div>
        
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button>Save Entry</Button>
        </div>
      </div>
    </div>
  );
};

export default NewEntryForm;
