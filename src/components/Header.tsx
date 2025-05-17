import * as React from "react";
import { useEffect } from "react";
import { GraduationCap, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

const Header = () => {
  useEffect(() => {
    const howItWorksLink = document.querySelector(
      '[href="#how-it-works"]'
    ) as HTMLAnchorElement;
    if (window.location.pathname === "/favorites") {
      howItWorksLink.style.display = "none";
    }
  }, []);

  return (
    <header className="container py-6 flex items-center justify-between px-6">
      <div className="flex items-center gap-2">
        <Sparkles className="h-6 w-6 text-primary" />
        <h1 className="text-xl font-bold">Serendipity</h1>
      </div>
      <nav className="flex items-center gap-4">
        <Button className="md:block hidden" variant="ghost" asChild>
          <Link to="/">Home</Link>
        </Button>
        <Button variant="ghost" asChild>
          <Link to="/favorites">Favorites</Link>
        </Button>
        <Button variant="ghost" className="md:flex hidden gap-2 items-center" asChild>
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
