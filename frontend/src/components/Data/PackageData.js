// packageData.js
// Kerala Tourism Packages Data
// Complete package information including itineraries, inclusions, and exclusions

const packagesData = [
  {
    id: 1,
    title: "Munnar Hill Station Escape",
    category: "kerala",
    days: 3,
    nights: 2,
    price: "₹14,200",
    originalPrice: "₹17,750",
    description: "Explore Munnar's misty mountains and tea plantations. Visit Cheyyappara & Valara waterfalls, Tea Museum, Photo Point, Mattupetty Dam, Echo Point, and Eravikulam National Park.",
    image: "/assets/destinations/munnar-tea-gardens.png",
    detailImages: [
        "/assets/destinations/munnar-tea-gardens.png",
        "/assets/destinations/details/munnar-gallery1.jpg",
        "/assets/destinations/details/munnar-gallery2.jpg",
      ],
    highlights: [
      "Tea Plantations",
      "Waterfalls Tour",
      "Eravikulam National Park",
      "Echo Point"
    ],
    rating: 4.7,
    reviews: 156,
    itinerary: [
      {
        day: 1,
        title: "Cochin to Munnar",
        activities: [
          "Pickup from Cochin Airport/Railway Station",
          "Scenic drive to Munnar (140 km, ~5 hours)",
          "Visit Cheyyappara & Valara waterfalls en route",
          "See cardamom & tea plantations",
          "Optional spice garden visit",
          "Evening shopping at Munnar Town"
        ],
        meals: ["Dinner"],
        accommodation: "Resort in Munnar"
      },
      {
        day: 2,
        title: "Munnar Sightseeing",
        activities: [
          "Photo Point & Mattupetty Dam",
          "Optional boating at Mattupetty",
          "Echo Point with natural echo phenomenon",
          "Shooting Point & Kundala Lake",
          "Eravikulam National Park (rare mountain goats)",
          "Evening at leisure in Munnar Town"
        ],
        meals: ["Breakfast", "Dinner"],
        accommodation: "Resort in Munnar"
      },
      {
        day: 3,
        title: "Munnar to Cochin - Departure",
        activities: [
          "Breakfast at resort",
          "Complete pending sightseeing if needed",
          "Transfer to Cochin Airport/Railway Station",
          "Depart with sweet memories of Kerala"
        ],
        meals: ["Breakfast"],
        accommodation: "None"
      }
    ],
    inclusions: [
      { type: "Accommodation", details: "2 nights in quality resort at Munnar" },
      { type: "Meals", details: "Complimentary breakfast daily" },
      { type: "Transport", details: "AC sedan for all transfers and sightseeing" },
      { type: "Driver", details: "English/Hindi speaking experienced driver" },
      { type: "Charges", details: "Fuel, toll, parking, and driver allowance included" }
    ],
    exclusions: [
      "Airfare and train tickets",
      "Entry fees at tourist spots",
      "Personal expenses (laundry, phone, drinks)",
      "Tips to driver, guide, and restaurants",
      "Optional activities (boating, spice garden)",
      "Any meals other than breakfast"
    ]
  },
  {
    id: 2,
    title: "Munnar & Backwaters Retreat",
    category: "kerala",
    days: 4,
    nights: 3,
    price: "₹30,300",
    originalPrice: "₹37,875",
    description: "Combine Munnar's misty hills with Alleppey's tranquil backwaters. Explore tea gardens, waterfalls, and mountain viewpoints before boarding a traditional houseboat through Vembanad Lake.",
    image: "/assets/destinations/alleppey-backwaters.png",
    detailImages: [
        "/assets/destinations/details/alleppey-hero.jpg",
        "/assets/destinations/details/alleppey-gallery1.jpg",
        "/assets/destinations/details/munnar-hero.jpg",
      ],
    highlights: [
      "Munnar Sightseeing",
      "Houseboat Cruise",
      "Traditional Meals",
      "Backwater Villages"
    ],
    rating: 4.8,
    reviews: 198,
    itinerary: [
      {
        day: 1,
        title: "Cochin to Munnar",
        activities: [
          "Pickup from Cochin Airport/Railway Station",
          "Drive to Munnar through scenic routes",
          "Visit Cheyyappara & Valara waterfalls",
          "Tea & cardamom plantations",
          "Check-in at resort",
          "Evening at Munnar Town"
        ],
        meals: ["Dinner"],
        accommodation: "Resort in Munnar"
      },
      {
        day: 2,
        title: "Munnar Full Day Sightseeing",
        activities: [
          "Photo Point, Mattupetty Dam, Echo Point",
          "Shooting Point & Kundala Lake",
          "Eravikulam National Park visit",
          "Tea Museum (closed Mondays)",
          "Evening shopping and relaxation"
        ],
        meals: ["Breakfast", "Dinner"],
        accommodation: "Resort in Munnar"
      },
      {
        day: 3,
        title: "Munnar to Alleppey Houseboat",
        activities: [
          "Breakfast and checkout",
          "Drive to Alleppey (140 km)",
          "Board deluxe houseboat at 12:00 PM",
          "Cruise through Vembanad Lake canals",
          "Traditional lunch & dinner onboard",
          "Overnight on houseboat"
        ],
        meals: ["Breakfast", "Lunch", "Dinner"],
        accommodation: "Deluxe Houseboat"
      },
      {
        day: 4,
        title: "Alleppey to Cochin - Departure",
        activities: [
          "Breakfast on houseboat",
          "Checkout by 9:00 AM",
          "Transfer to Cochin Airport/Railway Station",
          "Journey ends with wonderful memories"
        ],
        meals: ["Breakfast"],
        accommodation: "None"
      }
    ],
    inclusions: [
      { type: "Accommodation", details: "2 nights resort in Munnar + 1 night deluxe houseboat" },
      { type: "Meals", details: "Daily breakfast + all meals on houseboat (lunch, dinner, snacks)" },
      { type: "Transport", details: "AC sedan for all transfers and sightseeing" },
      { type: "Houseboat", details: "Deluxe 1-bedroom houseboat with AC (9 PM - 6 AM)" },
      { type: "Services", details: "English speaking driver, fuel, toll, parking included" }
    ],
    exclusions: [
      "Airfare and train tickets",
      "Entry fees at parks and museums",
      "Personal expenses and tips",
      "Optional activities (boating, spice garden)",
      "Any services not mentioned in inclusions"
    ]
  },
  {
    id: 3,
    title: "Kerala Wildlife & Backwaters",
    category: "kerala",
    days: 5,
    nights: 4,
    price: "₹36,200",
    originalPrice: "₹45,250",
    description: "Journey from Munnar's tea estates to Periyar Wildlife Sanctuary in Thekkady, then cruise Alleppey's backwaters. Includes Kathakali performances and spice plantation visits.",
    image: "/assets/destinations/wayanad-wildlife.png",
    detailImages: [
        "/assets/destinations/details/wayanad-hero.jpg",
        "/assets/destinations/details/alleppey-gallery1.jpg",
        "/assets/destinations/details/alleppey-gallery2.jpg",
      ],
    highlights: [
      "Periyar Wildlife Sanctuary",
      "Munnar Tea Gardens",
      "Houseboat Stay",
      "Spice Plantations"
    ],
    rating: 4.8,
    reviews: 142,
    itinerary: [
      {
        day: 1,
        title: "Cochin to Munnar",
        activities: [
          "Airport/Railway pickup",
          "Scenic drive to Munnar (140 km)",
          "Waterfalls and plantations en route",
          "Resort check-in",
          "Evening relaxation and town visit"
        ],
        meals: ["Dinner"],
        accommodation: "Resort in Munnar"
      },
      {
        day: 2,
        title: "Munnar Sightseeing",
        activities: [
          "Full day Munnar exploration",
          "Photo Point, Mattupetty, Echo Point",
          "Eravikulam National Park",
          "Tea gardens and viewpoints",
          "Local shopping"
        ],
        meals: ["Breakfast", "Dinner"],
        accommodation: "Resort in Munnar"
      },
      {
        day: 3,
        title: "Munnar to Thekkady",
        activities: [
          "Breakfast and checkout",
          "Drive to Thekkady (110 km, 4 hours)",
          "Periyar Lake boating (optional)",
          "Wildlife sanctuary visit",
          "Optional: Elephant safari, Kathakali show, Kalaripayattu",
          "Spice plantation tour"
        ],
        meals: ["Breakfast", "Dinner"],
        accommodation: "Resort in Thekkady"
      },
      {
        day: 4,
        title: "Thekkady to Alleppey Houseboat",
        activities: [
          "Breakfast at resort",
          "Drive to Alleppey (150 km)",
          "Board houseboat at noon",
          "Backwater cruise through villages",
          "Traditional meals onboard",
          "Overnight on houseboat"
        ],
        meals: ["Breakfast", "Lunch", "Dinner"],
        accommodation: "Deluxe Houseboat"
      },
      {
        day: 5,
        title: "Alleppey to Cochin - Departure",
        activities: [
          "Breakfast on houseboat",
          "Checkout by 9 AM",
          "Transfer to Cochin Airport/Station",
          "Tour concludes with memories"
        ],
        meals: ["Breakfast"],
        accommodation: "None"
      }
    ],
    inclusions: [
      { type: "Accommodation", details: "2N Munnar + 1N Thekkady resort + 1N houseboat" },
      { type: "Meals", details: "Daily breakfast + all houseboat meals" },
      { type: "Transport", details: "AC sedan for entire journey" },
      { type: "Houseboat", details: "1-bedroom deluxe houseboat with AC" },
      { type: "Services", details: "Driver, fuel, toll, parking charges" }
    ],
    exclusions: [
      "Flights and train tickets",
      "Periyar Lake boating tickets",
      "Entry fees and optional activities",
      "Elephant safari, cultural shows",
      "Personal expenses and tips"
    ]
  },
  {
    id: 4,
    title: "Complete Kerala Experience",
    category: "kerala",
    days: 6,
    nights: 5,
    price: "₹40,000",
    originalPrice: "₹50,000",
    description: "Comprehensive tour covering Munnar hills, Thekkady wildlife, Alleppey backwaters, and Cochin's heritage sites including Dutch Palace, Jewish Synagogue, Chinese fishing nets, and Lulu Mall.",
    image: "/assets/destinations/kochi-fort.png",
    detailImages: [
        "/assets/destinations/kovalam-beach.png",
        "/assets/destinations/details/kochi-gallery1.webp",
        "/assets/destinations/alleppey-backwaters.png",
      ],
    highlights: [
      "Munnar Hills",
      "Thekkady Wildlife",
      "Alleppey Backwaters",
      "Cochin Heritage"
    ],
    rating: 4.9,
    reviews: 224,
    itinerary: [
      {
        day: 1,
        title: "Cochin to Munnar",
        activities: [
          "Pickup from airport/station",
          "Scenic drive to Munnar",
          "Waterfalls and plantations en route",
          "Check-in at resort",
          "Evening at leisure"
        ],
        meals: ["Dinner"],
        accommodation: "Resort in Munnar"
      },
      {
        day: 2,
        title: "Munnar Sightseeing",
        activities: [
          "Full day Munnar tour",
          "Photo Point, Mattupetty, Echo Point",
          "Eravikulam National Park",
          "Tea Museum and gardens",
          "Shopping time"
        ],
        meals: ["Breakfast", "Dinner"],
        accommodation: "Resort in Munnar"
      },
      {
        day: 3,
        title: "Munnar to Thekkady",
        activities: [
          "Drive to Thekkady",
          "Periyar Wildlife Sanctuary",
          "Optional lake boating",
          "Spice plantation visit",
          "Cultural shows (optional)"
        ],
        meals: ["Breakfast", "Dinner"],
        accommodation: "Resort in Thekkady"
      },
      {
        day: 4,
        title: "Thekkady to Alleppey Houseboat",
        activities: [
          "Drive to Alleppey",
          "Board houseboat at noon",
          "Backwater cruise",
          "Village visits",
          "Overnight on houseboat"
        ],
        meals: ["Breakfast", "Lunch", "Dinner"],
        accommodation: "Deluxe Houseboat"
      },
      {
        day: 5,
        title: "Alleppey to Cochin City Tour",
        activities: [
          "Breakfast and houseboat checkout",
          "Drive to Cochin",
          "Fort Cochin heritage walk",
          "Dutch Palace, Jewish Synagogue",
          "Chinese Fishing Nets",
          "Lulu Mall visit"
        ],
        meals: ["Breakfast", "Dinner"],
        accommodation: "Hotel in Cochin"
      },
      {
        day: 6,
        title: "Cochin Departure",
        activities: [
          "Breakfast at hotel",
          "Last minute shopping",
          "Transfer to airport/station",
          "Tour ends"
        ],
        meals: ["Breakfast"],
        accommodation: "None"
      }
    ],
    inclusions: [
      { type: "Accommodation", details: "2N Munnar + 1N Thekkady + 1N Houseboat + 1N Cochin" },
      { type: "Meals", details: "Daily breakfast + all houseboat meals" },
      { type: "Transport", details: "AC sedan throughout the tour" },
      { type: "Houseboat", details: "Deluxe houseboat with AC" },
      { type: "Services", details: "Driver, fuel, toll, parking" }
    ],
    exclusions: [
      "Flight/train tickets",
      "Entry fees at attractions",
      "Boating and optional activities",
      "Cultural show tickets",
      "Personal expenses"
    ]
  },
  {
    id: 5,
    title: "Kerala Grand Tour with Beaches",
    category: "kerala",
    days: 7,
    nights: 6,
    price: "₹53,300",
    originalPrice: "₹66,625",
    description: "Extensive journey combining mountains, wildlife, backwaters, and beaches. Includes Kovalam beach resort and day trip to Kanyakumari with Vivekananda Rock Memorial and Thiruvalluvar statue.",
    image: "/assets/destinations/kovalam-beach.png",
    detailImages: [
        "/assets/destinations/details/kovalam-hero.webp",
        "/assets/destinations/details/thekkady-gallery1.webp",
        "/assets/destinations/details/varkala-hero.jpg",

      ],
    highlights: [
      "Hill Stations",
      "Houseboat Stay",
      "Kovalam Beach",
      "Kanyakumari Day Trip"
    ],
    rating: 4.9,
    reviews: 186,
    itinerary: [
      {
        day: 1,
        title: "Cochin to Munnar",
        activities: [
          "Airport/station pickup",
          "Drive to Munnar with waterfall stops",
          "Tea and spice plantations",
          "Resort check-in",
          "Evening leisure"
        ],
        meals: ["Dinner"],
        accommodation: "Resort in Munnar"
      },
      {
        day: 2,
        title: "Munnar Sightseeing",
        activities: [
          "Comprehensive Munnar tour",
          "All major viewpoints",
          "Eravikulam National Park",
          "Tea Museum",
          "Local markets"
        ],
        meals: ["Breakfast", "Dinner"],
        accommodation: "Resort in Munnar"
      },
      {
        day: 3,
        title: "Munnar to Thekkady",
        activities: [
          "Drive to Thekkady",
          "Periyar Wildlife Sanctuary",
          "Lake boating (optional)",
          "Spice plantation tour",
          "Evening cultural programs"
        ],
        meals: ["Breakfast", "Dinner"],
        accommodation: "Resort in Thekkady"
      },
      {
        day: 4,
        title: "Thekkady to Alleppey Houseboat",
        activities: [
          "Drive to Alleppey",
          "Houseboat check-in at 12 PM",
          "Backwater cruise",
          "Traditional Kerala meals",
          "Overnight on houseboat"
        ],
        meals: ["Breakfast", "Lunch", "Dinner"],
        accommodation: "Deluxe Houseboat"
      },
      {
        day: 5,
        title: "Alleppey to Kovalam",
        activities: [
          "Houseboat checkout",
          "Drive to Kovalam beach (160 km)",
          "Check-in at beach resort",
          "Relax on pristine beaches",
          "Beach activities and sunset"
        ],
        meals: ["Breakfast", "Dinner"],
        accommodation: "Beach Resort in Kovalam"
      },
      {
        day: 6,
        title: "Kovalam - Kanyakumari Day Trip",
        activities: [
          "Early breakfast",
          "Drive to Kanyakumari (90 km)",
          "Vivekananda Rock Memorial",
          "Thiruvalluvar Statue",
          "Triveni Sangam (3 seas meet)",
          "Return to Kovalam"
        ],
        meals: ["Breakfast", "Dinner"],
        accommodation: "Beach Resort in Kovalam"
      },
      {
        day: 7,
        title: "Kovalam to Cochin - Departure",
        activities: [
          "Breakfast at resort",
          "Beach leisure time",
          "Drive to Cochin (220 km)",
          "Transfer to airport/station",
          "Tour ends"
        ],
        meals: ["Breakfast"],
        accommodation: "None"
      }
    ],
    inclusions: [
      { type: "Accommodation", details: "2N Munnar + 1N Thekkady + 1N Houseboat + 2N Kovalam" },
      { type: "Meals", details: "Daily breakfast + all houseboat meals" },
      { type: "Transport", details: "AC sedan for entire journey including Kanyakumari trip" },
      { type: "Houseboat", details: "Deluxe houseboat with AC" },
      { type: "Services", details: "Driver, fuel, toll, parking" }
    ],
    exclusions: [
      "Flight/train tickets",
      "Kanyakumari boat ride tickets",
      "Entry fees at monuments",
      "Personal expenses and tips",
      "Optional beach activities"
    ]
  },
  {
    id: 6,
    title: "Kerala Heritage & Beach Escape",
    category: "kerala",
    days: 8,
    nights: 7,
    price: "₹58,500",
    originalPrice: "₹73,125",
    description: "Start in historic Cochin, journey through Munnar and Thekkady, cruise backwaters, then relax on Kovalam beaches. Day trip to Kanyakumari includes Padmanabhapuram Palace and Suchindram Temple.",
    image: "/assets/destinations/varkala-cliffs.png",
    detailImages: [
        "/assets/destinations/details/varkala-hero.jpg",
        "/assets/destinations/details/varkala-gallery1.webp",
        "/assets/destinations/details/varkala-gallery2.webp",
      ],
    highlights: [
      "Cochin Heritage Sites",
      "Wildlife Safari",
      "Backwater Cruise",
      "Beach Resort Stay"
    ],
    rating: 4.8,
    reviews: 167,
    itinerary: [
      {
        day: 1,
        title: "Cochin City Tour",
        activities: [
          "Airport/station pickup",
          "Fort Cochin heritage walk",
          "Dutch Palace, Jewish Synagogue",
          "Chinese Fishing Nets",
          "Marine Drive & Lulu Mall",
          "Hotel check-in"
        ],
        meals: ["Dinner"],
        accommodation: "Hotel in Cochin"
      },
      {
        day: 2,
        title: "Cochin to Munnar",
        activities: [
          "Drive to Munnar",
          "Waterfalls en route",
          "Tea plantations",
          "Resort check-in",
          "Evening in Munnar town"
        ],
        meals: ["Breakfast", "Dinner"],
        accommodation: "Resort in Munnar"
      },
      {
        day: 3,
        title: "Munnar Sightseeing",
        activities: [
          "Full day Munnar tour",
          "All major attractions",
          "Eravikulam Park",
          "Tea Museum",
          "Shopping"
        ],
        meals: ["Breakfast", "Dinner"],
        accommodation: "Resort in Munnar"
      },
      {
        day: 4,
        title: "Munnar to Thekkady",
        activities: [
          "Drive to Thekkady",
          "Wildlife sanctuary",
          "Periyar Lake",
          "Spice plantations",
          "Cultural shows"
        ],
        meals: ["Breakfast", "Dinner"],
        accommodation: "Resort in Thekkady"
      },
      {
        day: 5,
        title: "Thekkady to Alleppey Houseboat",
        activities: [
          "Drive to Alleppey",
          "Houseboat boarding",
          "Backwater cruise",
          "Village visits",
          "Overnight cruise"
        ],
        meals: ["Breakfast", "Lunch", "Dinner"],
        accommodation: "Deluxe Houseboat"
      },
      {
        day: 6,
        title: "Alleppey to Kovalam",
        activities: [
          "Houseboat checkout",
          "Drive to Kovalam",
          "Beach resort check-in",
          "Beach relaxation",
          "Water activities"
        ],
        meals: ["Breakfast", "Dinner"],
        accommodation: "Beach Resort in Kovalam"
      },
      {
        day: 7,
        title: "Kovalam - Kanyakumari Day Trip",
        activities: [
          "Early morning Kanyakumari trip",
          "Vivekananda Rock",
          "Thiruvalluvar Statue",
          "Padmanabhapuram Palace",
          "Suchindram Temple",
          "Return to Kovalam"
        ],
        meals: ["Breakfast", "Dinner"],
        accommodation: "Beach Resort in Kovalam"
      },
      {
        day: 8,
        title: "Kovalam to Cochin - Departure",
        activities: [
          "Morning beach time",
          "Drive to Cochin",
          "Last minute shopping",
          "Airport/station drop",
          "Tour ends"
        ],
        meals: ["Breakfast"],
        accommodation: "None"
      }
    ],
    inclusions: [
      { type: "Accommodation", details: "1N Cochin + 2N Munnar + 1N Thekkady + 1N Houseboat + 2N Kovalam" },
      { type: "Meals", details: "Daily breakfast + all houseboat meals" },
      { type: "Transport", details: "AC sedan for entire tour including Kanyakumari" },
      { type: "Houseboat", details: "Deluxe houseboat with AC" },
      { type: "Services", details: "Driver, fuel, toll, parking" }
    ],
    exclusions: [
      "Flight/train tickets",
      "All entry fees",
      "Boat rides at Kanyakumari",
      "Personal expenses",
      "Optional activities"
    ]
  },
  {
    id: 7,
    title: "Ultimate Kerala Discovery",
    category: "kerala",
    days: 10,
    nights: 9,
    price: "₹67,000",
    originalPrice: "₹83,750",
    description: "Most comprehensive Kerala tour covering Cochin, Athirapilly waterfalls, Munnar, Thekkady, Alleppey, Kovalam, Kanyakumari, Jatayu Nature Park, and Varkala cliff beaches.",
    image: "/assets/destinations/athirappilly-waterfalls.png",
    detailImages: [
        "/assets/destinations/details/athirappilly-hero.webp",
        "/assets/destinations/details/poovar-gallery2.webp",
        "/assets/destinations/details/bekal-gallery1.webp",
      ],
    highlights: [
      "Athirapilly Waterfalls",
      "Complete Sightseeing",
      "Jatayu Nature Park",
      "Varkala Cliffs"
    ],
    rating: 5.0,
    reviews: 143,
    itinerary: [
      {
        day: 1,
        title: "Cochin Arrival",
        activities: [
          "Airport/station pickup",
          "Hotel check-in",
          "Rest and relaxation",
          "Evening Marine Drive walk",
          "Welcome dinner"
        ],
        meals: ["Dinner"],
        accommodation: "Hotel in Cochin"
      },
      {
        day: 2,
        title: "Cochin to Athirapilly to Munnar",
        activities: [
          "Drive to Athirapilly (70 km)",
          "Visit Athirapilly Falls",
          "Vazhachal Falls",
          "Continue to Munnar",
          "Check-in at resort"
        ],
        meals: ["Breakfast", "Dinner"],
        accommodation: "Resort in Munnar"
      },
      {
        day: 3,
        title: "Munnar Sightseeing",
        activities: [
          "Photo Point, Mattupetty Dam",
          "Echo Point, Kundala Lake",
          "Eravikulam National Park",
          "Tea gardens",
          "Evening leisure"
        ],
        meals: ["Breakfast", "Dinner"],
        accommodation: "Resort in Munnar"
      },
      {
        day: 4,
        title: "Munnar to Thekkady",
        activities: [
          "Drive to Thekkady",
          "Periyar Wildlife Sanctuary",
          "Lake boating",
          "Spice plantations",
          "Cultural performances"
        ],
        meals: ["Breakfast", "Dinner"],
        accommodation: "Resort in Thekkady"
      },
      {
        day: 5,
        title: "Thekkady to Alleppey Houseboat",
        activities: [
          "Drive to Alleppey",
          "Houseboat check-in",
          "Backwater cruise",
          "Traditional meals",
          "Overnight on backwaters"
        ],
        meals: ["Breakfast", "Lunch", "Dinner"],
        accommodation: "Deluxe Houseboat"
      },
      {
        day: 6,
        title: "Alleppey to Kovalam",
        activities: [
          "Houseboat checkout",
          "Drive to Kovalam",
          "Beach resort check-in",
          "Beach activities",
          "Sunset views"
        ],
        meals: ["Breakfast", "Dinner"],
        accommodation: "Beach Resort in Kovalam"
      },
      {
        day: 7,
        title: "Kanyakumari Day Trip",
        activities: [
          "Full day Kanyakumari excursion",
          "Vivekananda Rock Memorial",
          "Thiruvalluvar Statue",
          "Triveni Sangam",
          "Temples and palaces",
          "Return to Kovalam"
        ],
        meals: ["Breakfast", "Dinner"],
        accommodation: "Beach Resort in Kovalam"
      },
      {
        day: 8,
        title: "Kovalam to Jatayu Park to Varkala",
        activities: [
          "Visit Jatayu Earth's Center",
          "World's largest bird sculpture",
          "Drive to Varkala",
          "Varkala Cliff and beach",
          "Evening at cliff restaurants"
        ],
        meals: ["Breakfast", "Dinner"],
        accommodation: "Cliff Resort in Varkala"
      },
      {
        day: 9,
        title: "Varkala to Cochin",
        activities: [
          "Morning beach time",
          "Varkala Temple visit",
          "Drive to Cochin",
          "Fort Cochin shopping",
          "Hotel check-in"
        ],
        meals: ["Breakfast", "Dinner"],
        accommodation: "Hotel in Cochin"
      },
      {
        day: 10,
        title: "Cochin Departure",
        activities: [
          "Breakfast at hotel",
          "Last minute sightseeing",
          "Shopping for souvenirs",
          "Airport/station drop",
          "Tour concludes"
        ],
        meals: ["Breakfast"],
        accommodation: "None"
      }
    ],
    inclusions: [
      { type: "Accommodation", details: "2N Cochin + 2N Munnar + 1N Thekkady + 1N Houseboat + 2N Kovalam + 1N Varkala" },
      { type: "Meals", details: "Daily breakfast + all houseboat meals" },
      { type: "Transport", details: "AC sedan for entire 10-day journey" },
      { type: "Houseboat", details: "Deluxe houseboat with AC" },
      { type: "Services", details: "Driver, fuel, toll, parking, Jatayu Park entry" }
    ],
    exclusions: [
      "Flight/train tickets",
      "Most entry fees",
      "Boat rides and optional activities",
      "Personal expenses and tips",
      "Lunch and other meals"
    ]
  }
];

export default packagesData;