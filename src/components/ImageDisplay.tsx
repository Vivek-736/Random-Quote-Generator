import { RefreshCw, Download } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { useToast } from "../hooks/use-toast";
import * as React from "react";

interface ImageDisplayProps {
  imageUrl: string;
  onRefresh: () => void;
  quote?: {
    text: string;
    author: string;
  };
  gradient?: string;
}

const ImageDisplay = ({ imageUrl, onRefresh, quote, gradient }: ImageDisplayProps) => {
  const { toast } = useToast();
  const handleDownload = async () => {
    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      const img = new Image();
      img.crossOrigin = "anonymous"; 
      
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        
        ctx.drawImage(img, 0, 0);
        
        if (gradient) {
          ctx.save();
          const gradientObj = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
          gradientObj.addColorStop(0, gradient.split('(')[1].split(')')[0].split(',')[0]);
          gradientObj.addColorStop(1, gradient.split('(')[1].split(')')[0].split(',')[1]);
          ctx.fillStyle = gradientObj;
          ctx.globalAlpha = 0.7;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.restore();
        }
        
        if (quote && quote.text) {
          ctx.save();
          
          ctx.fillStyle = 'white';
          ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
          ctx.shadowBlur = 10;
          ctx.textAlign = 'center';
          
          ctx.font = 'italic bold 30px serif';
          const maxWidth = canvas.width * 0.8;
          wrapText(ctx, `"${quote.text}"`, canvas.width / 2, canvas.height / 2, maxWidth, 40);
          
          ctx.font = 'normal 24px sans-serif';
          ctx.fillText(`— ${quote.author}`, canvas.width / 2, canvas.height / 2 + 100);
          
          ctx.restore();
        }
        
        const dataURL = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.download = 'serendipity-inspiration.png';
        link.href = dataURL;
        link.click();
        
        toast({
          title: "Image downloaded",
          description: "Your inspiration image has been downloaded",
        });
      };
      
      img.onerror = () => {
        toast({
          title: "Download failed",
          description: "Could not download the image. Try again later.",
          variant: "destructive",
        });
      };
      
      img.src = imageUrl;
      
    } catch (error) {
      console.error('Error downloading image:', error);
      toast({
        title: "Download failed",
        description: "Could not download the image. Try again later.",
        variant: "destructive",
      });
    }
  };
  
  const wrapText = (context: CanvasRenderingContext2D, text: string, x: number, y: number, maxWidth: number, lineHeight: number) => {
    const words = text.split(' ');
    let line = '';
    let testLine = '';
    let lineCount = 0;
    
    for (let n = 0; n < words.length; n++) {
      testLine = line + words[n] + ' ';
      const metrics = context.measureText(testLine);
      const testWidth = metrics.width;
      
      if (testWidth > maxWidth && n > 0) {
        context.fillText(line, x, y + lineCount * lineHeight);
        line = words[n] + ' ';
        lineCount++;
      } else {
        line = testLine;
      }
    }
    
    context.fillText(line, x, y + lineCount * lineHeight);
  };
  
  return (
    <Card className="w-full max-w-2xl mx-auto p-6 shadow-lg animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium">Inspiration Image</h3>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" onClick={onRefresh}>
            <RefreshCw className="h-4 w-4 mr-1" />
            New Image
          </Button>
          <Button variant="outline" size="sm" onClick={handleDownload}>
            <Download className="h-4 w-4 mr-1" />
            Download
          </Button>
        </div>
      </div>
      
      <div className="relative overflow-hidden rounded-lg h-80 mt-2">
        <img 
          src={imageUrl} 
          alt="Random inspiration" 
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          crossOrigin="anonymous"
        />
      </div>
      
      <p className="text-xs text-muted-foreground mt-2">
        Images provided by Unsplash
      </p>
    </Card>
  );
};

export default ImageDisplay;
