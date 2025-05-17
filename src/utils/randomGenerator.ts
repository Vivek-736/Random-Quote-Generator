const quotes = [
  {
    text: "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt",
  },
  {
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
  },
  {
    text: "It's not about ideas. It's about making ideas happen.",
    author: "Scott Belsky",
  },
  { text: "Creativity is intelligence having fun.", author: "Albert Einstein" },
  {
    text: "The best way to predict the future is to create it.",
    author: "Peter Drucker",
  },
  {
    text: "Don't count the days, make the days count.",
    author: "Muhammad Ali",
  },
  {
    text: "Genius is one percent inspiration and ninety-nine percent perspiration.",
    author: "Thomas Edison",
  },
  {
    text: "Life is trying things to see if they work.",
    author: "Ray Bradbury",
  },
  {
    text: "Simplicity is the ultimate sophistication.",
    author: "Leonardo da Vinci",
  },
  { text: "Everything you can imagine is real.", author: "Pablo Picasso" },
  {
    text: "The only limit to our realization of tomorrow will be our doubts of today.",
    author: "Franklin D. Roosevelt",
  },
  {
    text: "Be yourself; everyone else is already taken.",
    author: "Oscar Wilde",
  },
];

const gradients = [
  "linear-gradient(135deg, #fdfcfb 0%, #e2d1c3 100%)",
  "linear-gradient(to right, #ffc3a0 0%, #ffafbd 100%)",
  "linear-gradient(to top, #d299c2 0%, #fef9d7 100%)",
  "linear-gradient(to top, #accbee 0%, #e7f0fd 100%)",
  "linear-gradient(to right, #c1c161 0%, #c1c161 0%, #d4d4b1 100%)",
  "linear-gradient(90deg, hsla(24, 100%, 83%, 1) 0%, hsla(341, 91%, 68%, 1) 100%)",
  "linear-gradient(90deg, hsla(139, 70%, 75%, 1) 0%, hsla(63, 90%, 76%, 1) 100%)",
  "linear-gradient(90deg, hsla(186, 33%, 94%, 1) 0%, hsla(216, 41%, 79%, 1) 100%)",
  "linear-gradient(90deg, hsla(46, 73%, 75%, 1) 0%, hsla(176, 73%, 88%, 1) 100%)",
  "linear-gradient(to right, #ee9ca7, #ffdde1)",
];

const imageIds = [
  "photo-1469041797191-50ace28483c3",
  "photo-1433086966358-54859d0ed716",
  "photo-1465146344425-f00d5f5c8f07",
  "photo-1482938289607-e9573fc25ebb",
  "photo-1509316975850-ff9c5deb0cd9",
  "photo-1513836279014-a89f7a76ae86",
  "photo-1518495973542-4542c06a5843",
  "photo-1469474968028-56623f02e42e",
  "photo-1470071459604-3b5ec3a7fe05",
  "photo-1500375592092-40eb2168fd21",
  "photo-1458668383970-8ddd3927deed",
  "photo-1504893524553-b855bce32c67",
  "photo-1426604966848-d7adac402bff",
  "photo-1523712999610-f77fbcfc3843",
  "photo-1500673922987-e212871fec22",
];

const getRandomItem = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

export const getRandomQuote = () => {
  return getRandomItem(quotes);
};

export const getRandomGradient = () => {
  return getRandomItem(gradients);
};

export const getRandomImageUrl = () => {
  const imageId = getRandomItem(imageIds);
  return `https://images.unsplash.com/${imageId}?auto=format&fit=crop&w=1400&q=80`;
};

export const generateRandomCombination = () => {
  return {
    quote: getRandomQuote(),
    gradient: getRandomGradient(),
    imageUrl: getRandomImageUrl(),
  };
};