export const API_BASE_URL = 'http://localhost:8000/api';

export const natureColors = {
  primary: {
    green: '#10b981',      // Modern emerald
    teal: '#0d9488',       // Sophisticated teal
    blue: '#0369a1',       // Deep ocean blue
    lime: '#65a30d',       // Fresh lime
    dark: '#1f2937',       // Dark slate
  },
  secondary: {
    lightGreen: '#d1fae5', // Soft mint
    sand: '#fef3c7',       // Warm sand
    sky: '#e0f2fe',        // Light sky
    forest: '#065f46',     // Deep forest
    gray: '#f8fafc',       // Light background
  },
  gradients: {
    hero: 'linear-gradient(135deg, #0d9488 0%, #065f46 100%)',
    card: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
    button: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
  }
};

export const destinations = [
  {
    id: 1,
    name: "Munnar",
    description: "Experience the breathtaking beauty of rolling tea plantations and misty mountains in this picturesque hill station.",
    image: "/images/munnar.jpg",
    price: 5000,
    duration: "3 Days",
    bestTime: "September to May",
    highlights: ["Tea Plantations", "Eravikulam National Park", "Mattupetty Dam"]
  },
  {
    id: 2,
    name: "Alleppey",
    description: "Cruise through serene backwaters in traditional houseboats and witness the unique aquatic life of Kerala.",
    image: "/images/alleppey.jpg",
    price: 7000,
    duration: "2 Days",
    bestTime: "August to March",
    highlights: ["Houseboat Stay", "Backwaters", "Village Life"]
  },
  {
    id: 3,
    name: "Kochi",
    description: "Explore the historic port city blending Portuguese, Dutch, and British colonial influences with traditional Keralan culture.",
    image: "/images/kochi.jpg",
    price: 4000,
    duration: "2 Days",
    bestTime: "October to February",
    highlights: ["Fort Kochi", "Chinese Fishing Nets", "Jewish Synagogue"]
  },
  {
    id: 4,
    name: "Wayanad",
    description: "Discover lush rainforests, ancient caves, and magnificent waterfalls in this wildlife-rich district.",
    image: "/images/wayanad.jpg",
    price: 6000,
    duration: "3 Days",
    bestTime: "October to May",
    highlights: ["Edakkal Caves", "Chembra Peak", "Wildlife Sanctuary"]
  }
];