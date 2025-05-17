import * as React from "react";
import { GraduationCap, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="container py-6 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Sparkles className="h-6 w-6 text-primary" />
        <h1 className="text-xl font-bold">Serendipity</h1>
      </div>
      <nav className="flex items-center gap-4">
        <Button variant="ghost" asChild>
          <Link to="/">Home</Link>
        </Button>
        <Button variant="ghost" asChild>
          <Link to="/favorites">Favorites</Link>
        </Button>
        <Button variant="ghost" className="flex gap-2 items-center" asChild>
          <a href="#how-it-works">
            <GraduationCap className="h-4 w-4" />
            <span>How It Works</span>
          </a>
        </Button>
      </nav>
    </header>
  );
};

export default Header;
