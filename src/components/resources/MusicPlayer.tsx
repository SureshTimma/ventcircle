
import { Play, SkipBack, SkipForward, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

const MusicPlayer = () => {
  return (
    <div className="glass-card p-6 rounded-xl">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold">Calming Meditation</h3>
          <p className="text-sm text-muted-foreground">Nature Sounds</p>
        </div>
        <div className="flex items-center space-x-2">
          <Volume2 className="w-4 h-4" />
          <Slider
            defaultValue={[70]}
            max={100}
            step={1}
            className="w-[100px]"
          />
        </div>
      </div>
      
      <div className="flex items-center justify-center space-x-4">
        <Button variant="ghost" size="icon">
          <SkipBack className="h-4 w-4" />
        </Button>
        <Button size="icon" className="h-12 w-12">
          <Play className="h-6 w-6" />
        </Button>
        <Button variant="ghost" size="icon">
          <SkipForward className="h-4 w-4" />
        </Button>
      </div>
      
      <Slider
        defaultValue={[30]}
        max={100}
        step={1}
        className="mt-4"
      />
    </div>
  );
};

export default MusicPlayer;
