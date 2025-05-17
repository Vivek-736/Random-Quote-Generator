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
  {
    text: "Arise! Awake! and stop not until the goal is reached.",
    author: "Swami Vivekananda",
  },
  {
    text: "You have to grow from the inside out. None can teach you, none can make you spiritual.",
    author: "Swami Vivekananda",
  },
  {
    text: "Take risks in your life. If you win, you can lead; if you lose, you can guide.",
    author: "Swami Vivekananda",
  },
  {
    text: "In a conflict between the heart and the brain, follow your heart.",
    author: "Swami Vivekananda",
  },
  {
    text: "The greatest sin is to think yourself weak.",
    author: "Swami Vivekananda",
  },
  {
    text: "All power is within you; you can do anything and everything.",
    author: "Swami Vivekananda",
  },
  {
    text: "Talk to yourself once in a day, otherwise you may miss meeting an excellent person in this world.",
    author: "Swami Vivekananda",
  },
  {
    text: "Be a hero. Always say, I have no fear.",
    author: "Swami Vivekananda",
  },
  {
    text: "We are what our thoughts have made us; so take care of what you think.",
    author: "Swami Vivekananda",
  },
  {
    text: "The world is the great gymnasium where we come to make ourselves strong.",
    author: "Swami Vivekananda",
  },
  {
    text: "Truth can be stated in a thousand different ways, yet each one can be true.",
    author: "Swami Vivekananda",
  },
  { text: "Strength is life, weakness is death.", author: "Swami Vivekananda" },
  {
    text: "The fire that warms us can also consume us; it is not the fault of the fire.",
    author: "Swami Vivekananda",
  },
  { text: "They alone live who live for others.", author: "Swami Vivekananda" },
  {
    text: "Comfort is no test of truth. Truth is often far from being comfortable.",
    author: "Swami Vivekananda",
  },
  {
    text: "Do one thing at a time, and while doing it put your whole soul into it.",
    author: "Swami Vivekananda",
  },
  {
    text: "Learn everything that is good from others, but bring it in, and in your own way absorb it.",
    author: "Swami Vivekananda",
  },
  {
    text: "Stand up, be bold, be strong. Take the whole responsibility on your own shoulders.",
    author: "Swami Vivekananda",
  },
  {
    text: "Believe in yourself and the world will be at your feet.",
    author: "Swami Vivekananda",
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