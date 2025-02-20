
import { useState } from "react";
import { Book, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import JournalEntry from "@/components/journal/JournalEntry";
import NewEntryForm from "@/components/journal/NewEntryForm";

const Journal = () => {
  const [showNewEntry, setShowNewEntry] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/30 via-background to-secondary/30">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-2">
            <Book className="w-6 h-6 text-primary-foreground" />
            <h1 className="text-2xl font-semibold">My Journal</h1>
          </div>
          <Button onClick={() => setShowNewEntry(true)} className="flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>New Entry</span>
          </Button>
        </div>

        {showNewEntry ? (
          <NewEntryForm onClose={() => setShowNewEntry(false)} />
        ) : (
          <div className="grid gap-6">
            <JournalEntry />
          </div>
        )}
      </div>
    </div>
  );
};

export default Journal;
