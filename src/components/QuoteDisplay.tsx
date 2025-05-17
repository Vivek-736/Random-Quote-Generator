import * as React from "react";
import { RefreshCw, Save } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { useToast } from "../hooks/use-toast";

interface QuoteDisplayProps {
  quote: {
    text: string;
    author: string;
  };
  gradient: string;
  onRefresh: () => void;
  onSave: () => void;
}

const QuoteDisplay = ({ quote, gradient, onRefresh, onSave }: QuoteDisplayProps) => {
  const { toast } = useToast();

  const handleSave = () => {
    onSave();
    toast({
      title: "Saved to favorites",
      description: "You can find this in your favorites page",
    });
  };

  return (
    <Card className="animate-fade-in w-full max-w-2xl mx-auto p-8 shadow-lg rounded-2xl card-hover">
      <div 
        className="mb-4 p-8 rounded-xl relative" 
        style={{ background: gradient }}
      >
        <blockquote className="text-2xl font-serif italic text-center text-shadow">
          "{quote.text}"
        </blockquote>
      </div>
      
      <div className="flex justify-between items-center">
        <p className="text-lg font-medium">— {quote.author}</p>
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={onRefresh}
            className="flex gap-1 items-center"
          >
            <RefreshCw className="h-4 w-4" />
            <span>Refresh</span>
          </Button>
          
          <Button 
            variant="default" 
            size="sm"
            onClick={handleSave}
            className="flex gap-1 items-center"
          >
            <Save className="h-4 w-4" />
            <span>Save</span>
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default QuoteDisplay;
