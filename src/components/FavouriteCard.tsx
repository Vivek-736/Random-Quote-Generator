
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { Combination } from "@/utils/favoriteStore";
import { formatDistanceToNow } from "date-fns";
import * as React from "react";

interface FavoriteCardProps {
  favorite: Combination;
  onDelete: (id: string) => void;
}

const FavoriteCard = ({ favorite, onDelete }: FavoriteCardProps) => {
  const { id, quote, gradient, colorPalette, savedAt } = favorite;
  
  return (
    <Card className="h-full flex flex-col overflow-hidden">
      <div 
        className="p-6" 
        style={{ background: gradient }}
      >
        <div className="text-lg font-serif italic text-shadow">
          "{quote.text}"
        </div>
        <p className="mt-2 font-medium text-sm">— {quote.author}</p>
      </div>
      
      <div className="grid grid-cols-4 gap-px">
        {colorPalette.map((color, i) => (
          <TooltipProvider key={i}>
            <Tooltip>
              <TooltipTrigger asChild>
                <div 
                  className="h-8 cursor-copy transition-all hover:h-10" 
                  style={{ backgroundColor: color }}
                  onClick={() => navigator.clipboard.writeText(color)}
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>{color} (Click to copy)</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
      
      <div className="p-4 mt-auto flex items-center justify-between">
        <p className="text-xs text-muted-foreground">
          Saved {formatDistanceToNow(savedAt, { addSuffix: true })}
        </p>
        
        <Button 
          variant="ghost" 
          size="sm"
          className="text-destructive"
          onClick={() => onDelete(id)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
};

export default FavoriteCard;
