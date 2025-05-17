import * as React from "react";
import { Github, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="container py-8 mt-16 px-6">
      <div className="flex flex-col md:flex-row items-center justify-between border-t pt-8">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Serendipity Generator
        </p>
        
        <div className="flex items-center gap-4 mt-4 md:mt-0">
          <a 
            href="https://github.com/Vivek-736" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Github className="h-5 w-5" />
          </a>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <span>Made with</span>
            <Heart className="h-3 w-3 text-red-500 fill-red-500" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
