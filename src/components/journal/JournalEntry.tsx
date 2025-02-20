
import { CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";

const JournalEntry = () => {
  return (
    <div className="glass-card p-6 rounded-xl">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <CalendarDays className="w-5 h-5 text-primary-foreground" />
          <span className="text-sm text-muted-foreground">Today, 2:30 PM</span>
        </div>
        <Button variant="ghost" size="sm">Edit</Button>
      </div>
      
      <h3 className="text-xl font-semibold mb-2">My Thoughts Today</h3>
      <p className="text-muted-foreground mb-4">
        This is a sample journal entry. Your thoughts and feelings are safe here.
      </p>
      
      <div className="p-4 bg-primary/10 rounded-lg">
        <p className="text-sm italic">
          "Remember, every small step forward is progress. You're doing great!"
        </p>
        <p className="text-xs text-muted-foreground mt-2">— AI-generated affirmation</p>
      </div>
    </div>
  );
};

export default JournalEntry;
