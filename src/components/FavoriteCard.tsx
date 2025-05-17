import { Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import type { Combination } from "../utils/favoriteStore";
import { formatDistanceToNow } from "date-fns";
import * as React from "react";

interface FavoriteCardProps {
  favorite: Combination;
  onDelete: (id: string) => void;
}

const FavoriteCard = ({ favorite, onDelete }: FavoriteCardProps) => {
  const { id, quote, gradient, savedAt } = favorite;
  
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
