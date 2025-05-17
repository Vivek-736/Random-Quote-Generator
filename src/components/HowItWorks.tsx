import * as React from "react";
import { Lightbulb, Paintbrush, Save, Sparkles } from "lucide-react";
import { Card, CardContent } from "./ui/card";

const HowItWorks = () => {
  const steps = [
    {
      icon: <Sparkles className="h-10 w-10 text-primary" />,
      title: "Generate Inspiration",
      description: "Click the generate button to create a unique combination of quotes, colors, and images."
    },
    {
      icon: <Paintbrush className="h-10 w-10 text-primary" />,
      title: "Explore Combinations",
      description: "Refresh individual elements or the entire page to discover endless creative possibilities."
    },
    {
      icon: <Save className="h-10 w-10 text-primary" />,
      title: "Save Favorites",
      description: "Found something you love? Save it to your favorites for easy access later."
    },
    {
      icon: <Lightbulb className="h-10 w-10 text-primary" />,
      title: "Get Inspired",
      description: "Use these unique combinations as a starting point for your next creative project."
    }
  ];

  return (
    <section id="how-it-works" className="container py-16">
      <h2 className="text-3xl font-bold text-center mb-2">How It Works</h2>
      <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
        Serendipity Generator helps you discover unexpected inspiration through random combinations of quotes, colors, and images.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step, index) => (
          <Card key={index} className="card-hover">
            <CardContent className="pt-6 text-center">
              <div className="mb-4 flex justify-center">{step.icon}</div>
              <h3 className="text-lg font-medium mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
