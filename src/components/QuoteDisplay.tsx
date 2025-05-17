import * as React from "react";
import { useState } from "react";
import { RefreshCw, Save, Download, Palette } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { useToast } from "../hooks/use-toast";

interface QuoteDisplayProps {
  quote: {
    text: string;
    author: string;
  };
  gradient: string;
  imageUrl: string;
  onRefreshQuote: () => void;
  onRefreshImage: () => void;
  onSave: () => void;
}

const QuoteDisplay = ({ quote, gradient, imageUrl, onRefreshQuote, onRefreshImage, onSave }: QuoteDisplayProps) => {
  const { toast } = useToast();
  const [textColor, setTextColor] = useState("#000000");

  const handleSave = () => {
    onSave();
    toast({
      title: "Saved to favorites",
      description: "You can find this in your favorites page",
    });
  };

  const generateRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const handleChangeColor = () => {
    setTextColor(generateRandomColor());
  };

  const handleDownload = async () => {
    try {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const canvasWidth = 1920;
      const canvasHeight = 1080;
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;

      const img = new Image();
      img.crossOrigin = "anonymous";

      img.onload = () => {
        const imgAspect = img.width / img.height;
        const canvasAspect = canvasWidth / canvasHeight;
        let drawWidth, drawHeight, offsetX, offsetY;

        if (imgAspect > canvasAspect) {
          drawHeight = canvasHeight;
          drawWidth = drawHeight * imgAspect;
          offsetX = (canvasWidth - drawWidth) / 2;
          offsetY = 0;
        } else {
          drawWidth = canvasWidth;
          drawHeight = drawWidth / imgAspect;
          offsetX = 0;
          offsetY = (canvasHeight - drawHeight) / 2;
        }

        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);

        if (gradient && typeof gradient === 'string') {
          ctx.save();
          const colors = gradient.match(/#[0-9a-fA-F]{6}/g) || [];
          if (colors.length >= 2) {
            const gradientObj = ctx.createLinearGradient(0, 0, canvasWidth, canvasHeight);
            if (colors[0] && colors[1]) {
              gradientObj.addColorStop(0, colors[0]);
              gradientObj.addColorStop(1, colors[1]);
              ctx.fillStyle = gradientObj;
              ctx.globalAlpha = 0.5;
              ctx.fillRect(0, 0, canvasWidth, canvasHeight);
            }
          }
          ctx.restore();
        }

        if (quote && quote.text) {
          ctx.save();
          ctx.fillStyle = textColor;
          ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
          ctx.shadowBlur = 20;
          ctx.textAlign = "center";

          ctx.font = "italic bold 60px serif";
          const maxWidth = canvasWidth * 0.8;
          wrapText(ctx, `"${quote.text}"`, canvasWidth / 2, canvasHeight / 2, maxWidth, 80);

          ctx.font = "normal 48px sans-serif";
          ctx.fillText(`— ${quote.author}`, canvasWidth / 2, canvasHeight / 2 + 200);

          ctx.restore();
        }

        const dataURL = canvas.toDataURL("image/png", 1.0);
        const link = document.createElement("a");
        link.download = "serendipity-inspiration.png";
        link.href = dataURL;
        link.click();

        toast({
          title: "Image downloaded",
          description: "Your high-resolution inspiration image has been downloaded",
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
      console.error("Error downloading image:", error);
      toast({
        title: "Download failed",
        description: "Could not download the image. Try again later.",
        variant: "destructive",
      });
    }
  };

  const wrapText = (context: CanvasRenderingContext2D, text: string, x: number, y: number, maxWidth: number, lineHeight: number) => {
    const words = text.split(" ");
    let line = "";
    let testLine = "";
    let lineCount = 0;

    for (let n = 0; n < words.length; n++) {
      testLine = line + words[n] + " ";
      const metrics = context.measureText(testLine);
      const testWidth = metrics.width;

      if (testWidth > maxWidth && n > 0) {
        context.fillText(line, x, y + lineCount * lineHeight);
        line = words[n] + " ";
        lineCount++;
      } else {
        line = testLine;
      }
    }

    context.fillText(line, x, y + lineCount * lineHeight);
  };

  return (
    <Card className="animate-fade-in w-full max-w-2xl mx-auto p-6 shadow-lg rounded-2xl card-hover">
      <div
        className="relative overflow-hidden rounded-lg h-80 mb-4"
        style={{ backgroundImage: `url(${imageUrl})`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div
          className="absolute inset-0 p-8 flex flex-col justify-center items-center"
          style={{ background: gradient, opacity: 0.5 }}
        ></div>
        <div className="absolute inset-0 p-8 flex flex-col justify-center items-center">
          <blockquote className="text-2xl font-serif italic text-center text-shadow" style={{ color: textColor }}>
            "{quote.text}"
          </blockquote>
          <p className="text-lg font-medium mt-4" style={{ color: textColor }}>
            — {quote.author}
          </p>
        </div>
      </div>
      <div className="flex justify-between items-center flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onRefreshQuote}
            className="flex gap-1 items-center"
          >
            <RefreshCw className="h-4 w-4" />
            <span>New Quote</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onRefreshImage}
            className="flex gap-1 items-center"
          >
            <RefreshCw className="h-4 w-4" />
            <span>New Image</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleChangeColor}
            className="flex gap-1 items-center"
          >
            <Palette className="h-4 w-4" />
            <span>Change Color</span>
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
          <Button
            variant="default"
            size="sm"
            onClick={handleDownload}
            className="flex gap-1 items-center"
          >
            <Download className="h-4 w-4" />
            <span>Download</span>
          </Button>
        </div>
    </Card>
  );
};

export default QuoteDisplay;
