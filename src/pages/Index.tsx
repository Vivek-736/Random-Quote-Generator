import { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import { Sparkles } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import QuoteDisplay from "../components/QuoteDisplay";
import HowItWorks from "../components/HowItWorks";
import { generateRandomCombination } from "../utils/randomGenerator";
import { useFavorites } from "../utils/favoriteStore";
import * as React from "react";

const Index = () => {
  const [quote, setQuote] = useState({ text: "", author: "" });
  const [gradient, setGradient] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  
  const { addFavorite } = useFavorites();

  useEffect(() => {
    generateNew();
  }, []);

  const generateNew = () => {
    const combination = generateRandomCombination();
    setQuote(combination.quote);
    setGradient(combination.gradient);
    setImageUrl(combination.imageUrl);
  };

  const refreshQuote = () => {
    const { quote } = generateRandomCombination();
    setQuote(quote);
  };

  const refreshImage = () => {
    const { imageUrl } = generateRandomCombination();
    setImageUrl(imageUrl);
  };

  const saveCombination = () => {
    addFavorite({
      quote,
      gradient,
      imageUrl,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <section className="container mx-auto py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Serendipity Generator</h1>
          <p className="text-lg mb-8 max-w-2xl mx-auto text-muted-foreground">
            Discover unexpected inspiration through random combinations of quotes, colors, and images.
          </p>
          <Button
            size="lg"
            onClick={generateNew}
            className="animate-pulse-slow mb-12 group"
          >
            <Sparkles className="mr-2 h-5 w-5 transition-transform group-hover:rotate-12" />
            Generate New Combination
          </Button>
          <div className="space-y-10">
            {quote.text && imageUrl && (
              <QuoteDisplay
                quote={quote}
                gradient={gradient}
                imageUrl={imageUrl}
                onRefreshQuote={refreshQuote}
                onRefreshImage={refreshImage}
                onSave={saveCombination}
              />
            )}
          </div>
        </section>
        <HowItWorks />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
