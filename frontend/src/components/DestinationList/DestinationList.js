"use client";
import { useState, useRef, useEffect } from "react";
import DestinationDetails from "@/components/DestinationDetails/DestinationDetails";
import "./DestinationList.css";

export default function DestinationList() {
  const destinations = [
    {
      id: 1,
      name: "Munnar",
      title: "Munnar Tea Gardens",
      location: "Munnar, Kerala",
      image: "/assets/destinations/munnar-tea-gardens.png",
      detailImages: [
        "/assets/destinations/details/munnar-hero.jpg",
        "/assets/destinations/details/munnar-gallery1.jpg",
        "/assets/destinations/details/munnar-gallery2.jpg",
      ],
      shortDesc: "Lush tea gardens and misty hills of Kerala",
      description:
        "Explore the lush green tea plantations, misty mountains, and waterfalls in Kerala's famous hill station.",
      price: 7599,
      rating: 4.8,
      reviews: 287,
      bestTime: "September to May",
      highlights: ["Tea Plantations", "Waterfalls", "Wildlife", "Trekking"],
      features: [
        "Tea Plantation Tour",
        "Waterfall Visit",
        "Trekking",
        "Spice Garden",
      ],
      category: "Hill Station",
      type: "hillstation",
      badge: "Scenic",
      duration: "3-5 days",
      featured: true,
      packages: [
        {
          id: 101,
          name: "3 Days / 2 Nights",
          slug: "munnar-3d2n",
          days: 3,
          nights: 2,
        },
        {
          id: 102,
          name: "5 Days / 4 Nights",
          slug: "munnar-5d4n",
          days: 5,
          nights: 4,
        },
        {
          id: 103,
          name: "7 Days / 6 Nights",
          slug: "munnar-7d6n",
          days: 7,
          nights: 6,
        },
      ],
      details: {
        fullDescription: `Munnar, nestled in the Western Ghats of Kerala, is a serene hill station renowned for its rolling tea plantations, misty mountains, and lush green valleys. Its tea gardens and colonial charm make it one of South India's most popular hill destinations.`,
        climate: "Pleasant throughout the year (15°C to 25°C)",
        idealFor: ["Honeymooners", "Nature Lovers", "Photographers"],
        mustVisit: ["Eravikulam National Park", "Mattupetty Dam", "Tea Museum"],
      },
    },
    {
      id: 2,
      name: "Wayanad",
      title: "Wayanad Wildlife",
      location: "Wayanad, Kerala",
      image: "/assets/destinations/wayanad-wildlife.png",
      detailImages: [
        "/assets/destinations/details/wayanad-hero.jpg",
        "/assets/destinations/details/wayanad-gallery1.jpg",
        "/assets/destinations/details/wayanad-gallery2.webp",
      ],
      shortDesc: "Wildlife and waterfalls in the Western Ghats",
      description:
        "Embark on jungle safaris, explore ancient caves, and witness diverse wildlife in the Western Ghats.",
      price: 9499,
      rating: 4.8,
      reviews: 176,
      bestTime: "October to May",
      highlights: [
        "Wildlife Safari",
        "Waterfalls",
        "Ancient Caves",
        "Spice Plantations",
      ],
      features: [
        "Wildlife Safari",
        "Ancient Caves",
        "Trekking",
        "Coffee Plantation",
      ],
      category: "Wildlife & Nature",
      type: "wildlife",
      badge: "Adventure",
      duration: "3-4 days",
      featured: true,
      packages: [
        {
          id: 201,
          name: "3 Days / 2 Nights",
          slug: "wayanad-3d2n",
          days: 3,
          nights: 2,
        },
        {
          id: 202,
          name: "4 Days / 3 Nights",
          slug: "wayanad-4d3n",
          days: 4,
          nights: 3,
        },
        {
          id: 203,
          name: "6 Days / 5 Nights",
          slug: "wayanad-6d5n",
          days: 6,
          nights: 5,
        },
      ],
      details: {
        fullDescription: `Wayanad, a verdant region in the Western Ghats, is a haven for wildlife lovers and trekkers. The district’s forests and waterfalls make it a true natural paradise.`,
        climate: "Moderate climate (18°C to 28°C)",
        idealFor: [
          "Wildlife Enthusiasts",
          "Trekking Groups",
          "Family Vacation",
        ],
        mustVisit: [
          "Banasura Sagar Dam",
          "Edakkal Caves",
          "Wayanad Wildlife Sanctuary",
        ],
      },
    },
    {
      id: 3,
      name: "Alleppey",
      title: "Alleppey Backwaters",
      location: "Alleppey, Kerala",
      image: "/assets/destinations/alleppey-backwaters.png",
      detailImages: [
        "/assets/destinations/details/alleppey-hero.jpg",
        "/assets/destinations/details/alleppey-gallery1.jpg",
        "/assets/destinations/details/alleppey-gallery2.jpg",
      ],
      shortDesc: "Venice of the East with backwaters and houseboats",
      description:
        "Experience the serene backwaters of Kerala with traditional houseboat stays, coconut lagoons, and authentic local cuisine.",
      price: 8999,
      rating: 4.9,
      reviews: 342,
      bestTime: "August to March",
      highlights: [
        "Houseboat Stay",
        "Backwaters",
        "Beaches",
        "Ayurvedic Treatments",
      ],
      features: [
        "Houseboat Stay",
        "Village Tours",
        "Traditional Lunch",
        "Sunset Cruise",
      ],
      category: "Backwaters",
      type: "backwaters",
      badge: "Popular",
      duration: "2-3 days",
      featured: true,
      packages: [
        {
          id: 301,
          name: "2 Days / 1 Night",
          slug: "alleppey-2d1n",
          days: 2,
          nights: 1,
        },
        {
          id: 302,
          name: "3 Days / 2 Nights",
          slug: "alleppey-3d2n",
          days: 3,
          nights: 2,
        },
        {
          id: 303,
          name: "5 Days / 4 Nights",
          slug: "alleppey-5d4n",
          days: 5,
          nights: 4,
        },
      ],
      details: {
        fullDescription: `Alleppey, also known as Alappuzha, is famed for its mesmerizing backwaters and charming houseboats that glide through tranquil lagoons lined with coconut palms.`,
        climate: "Tropical (23°C to 32°C)",
        idealFor: ["Couples", "Family Trips", "Wellness Seekers"],
        mustVisit: [
          "Alleppey Backwaters",
          "Marari Beach",
          "Krishnapuram Palace",
        ],
      },
    },
    {
      id: 4,
      name: "Kovalam",
      title: "Kovalam Beach",
      location: "Kovalam, Kerala",
      image: "/assets/destinations/kovalam-beach.png",
      detailImages: [
        "/assets/destinations/details/kovalam-hero.webp",
        "/assets/destinations/details/kovalam-gallery1.jpg",
        "/assets/destinations/details/kovalam-gallery2.jpg",
      ],
      shortDesc: "Pristine beaches and lighthouse views",
      description:
        "Relax on pristine beaches, enjoy Ayurvedic treatments, and witness spectacular sunsets over the Arabian Sea.",
      price: 8299,
      rating: 4.6,
      reviews: 198,
      bestTime: "September to March",
      highlights: ["Beach Activities", "Lighthouse", "Ayurveda", "Seafood"],
      features: [
        "Beach Activities",
        "Ayurvedic Spa",
        "Lighthouse",
        "Seafood Dining",
      ],
      category: "Beach Destination",
      type: "beach",
      badge: "Relaxing",
      duration: "2-4 days",
      featured: false,
      packages: [
        {
          id: 401,
          name: "2 Days / 1 Night",
          slug: "kovalam-2d1n",
          days: 2,
          nights: 1,
        },
        {
          id: 402,
          name: "4 Days / 3 Nights",
          slug: "kovalam-4d3n",
          days: 4,
          nights: 3,
        },
        {
          id: 403,
          name: "7 Days / 6 Nights",
          slug: "kovalam-7d6n",
          days: 7,
          nights: 6,
        },
      ],
      details: {
        fullDescription: `Kovalam is Kerala’s coastal gem famous for its crescent-shaped beaches, iconic lighthouse, and rejuvenating Ayurvedic spas.`,
        climate: "Tropical (24°C to 32°C)",
        idealFor: ["Beach Lovers", "Wellness Seekers", "Couples"],
        mustVisit: ["Lighthouse Beach", "Hawa Beach", "Samudra Beach"],
      },
    },
    {
      id: 5,
      name: "Kochi",
      title: "Kochi Fort",
      location: "Kochi, Kerala",
      image: "/assets/destinations/kochi-fort.png",
      detailImages: [
        "/assets/destinations/details/kochi-hero.webp",
        "/assets/destinations/details/kochi-gallery1.webp",
        "/assets/destinations/details/kochi-gallery2.webp",
      ],
      shortDesc: "Historic port city with Chinese fishing nets",
      description:
        "Discover the rich colonial history, Chinese fishing nets, and vibrant art scene in this coastal city.",
      price: 6899,
      rating: 4.7,
      reviews: 231,
      bestTime: "October to March",
      highlights: [
        "Chinese Fishing Nets",
        "Fort Kochi",
        "Jewish Synagogue",
        "Art Galleries",
      ],
      features: [
        "Chinese Nets",
        "Jewish Synagogue",
        "Art Galleries",
        "Local Markets",
      ],
      category: "Cultural & Heritage",
      type: "cultural",
      badge: "Historic",
      duration: "2-3 days",
      featured: false,
      packages: [
        {
          id: 501,
          name: "2 Days / 1 Night",
          slug: "kochi-2d1n",
          days: 2,
          nights: 1,
        },
        {
          id: 502,
          name: "3 Days / 2 Nights",
          slug: "kochi-3d2n",
          days: 3,
          nights: 2,
        },
        {
          id: 503,
          name: "5 Days / 4 Nights",
          slug: "kochi-5d4n",
          days: 5,
          nights: 4,
        },
      ],
      details: {
        fullDescription: `Kochi, known as the Queen of the Arabian Sea, blends colonial charm and modern energy. Famous for its historic Fort Kochi area, the city showcases a mix of Portuguese, Dutch, and British influences.`,
        climate: "Tropical (23°C to 32°C)",
        idealFor: ["History Buffs", "Culture Enthusiasts", "Food Lovers"],
        mustVisit: [
          "Fort Kochi",
          "Chinese Fishing Nets",
          "Jewish Synagogue",
          "Marine Drive",
        ],
      },
    },
    {
      id: 6,
      name: "Thekkady",
      title: "Thekkady Periyar",
      location: "Thekkady, Kerala",
      image: "/assets/destinations/thekkady-periyar.png",
      detailImages: [
        "/assets/destinations/details/thekkady-hero.webp",
        "/assets/destinations/details/thekkady-gallery1.webp",
        "/assets/destinations/details/thekkady-gallery2.webp",
      ],
      shortDesc: "Wildlife sanctuary and spice plantations",
      description:
        "Experience wildlife in its natural habitat with boat cruises, spice plantations, and tribal culture.",
      price: 8799,
      rating: 4.7,
      reviews: 213,
      bestTime: "October to June",
      highlights: [
        "Periyar Lake",
        "Spice Gardens",
        "Elephant Rides",
        "Jungle Patrol",
      ],
      features: [
        "Boat Safari",
        "Spice Garden",
        "Elephant Ride",
        "Cultural Shows",
      ],
      category: "Wildlife & Nature",
      type: "wildlife",
      badge: "Nature",
      duration: "2-3 days",
      featured: false,
      packages: [
        {
          id: 601,
          name: "2 Days / 1 Night",
          slug: "thekkady-2d1n",
          days: 2,
          nights: 1,
        },
        {
          id: 602,
          name: "3 Days / 2 Nights",
          slug: "thekkady-3d2n",
          days: 3,
          nights: 2,
        },
        {
          id: 603,
          name: "5 Days / 4 Nights",
          slug: "thekkady-5d4n",
          days: 5,
          nights: 4,
        },
      ],
      details: {
        fullDescription: `Thekkady, home to the Periyar Wildlife Sanctuary, is Kerala’s ultimate eco-tourism destination. From boat safaris to spice plantation tours, every experience connects you with nature.`,
        climate: "Pleasant (18°C to 29°C)",
        idealFor: [
          "Wildlife Lovers",
          "Nature Photographers",
          "Adventure Seekers",
        ],
        mustVisit: [
          "Periyar Wildlife Sanctuary",
          "Spice Plantations",
          "Mullaperiyar Dam",
        ],
      },
    },
    {
      id: 7,
      name: "Varkala",
      title: "Varkala Cliffs",
      location: "Varkala, Kerala",
      image: "/assets/destinations/varkala-cliffs.png",
      detailImages: [
        "/assets/destinations/details/varkala-hero.jpg",
        "/assets/destinations/details/varkala-gallery1.webp",
        "/assets/destinations/details/varkala-gallery2.webp",
      ],
      shortDesc: "Cliffside beaches and spiritual vibes",
      description:
        "Stunning cliffside beaches with mineral springs, yoga retreats, and breathtaking ocean views.",
      price: 7699,
      rating: 4.9,
      reviews: 154,
      bestTime: "August to March",
      highlights: [
        "Cliff Views",
        "Mineral Springs",
        "Yoga Retreats",
        "Beach Shacks",
      ],
      features: [
        "Cliff Views",
        "Mineral Baths",
        "Yoga Retreats",
        "Beach Cafes",
      ],
      category: "Beach & Spiritual",
      type: "beach",
      badge: "Spiritual",
      duration: "2-4 days",
      featured: false,
      packages: [
        {
          id: 701,
          name: "2 Days / 1 Night",
          slug: "varkala-2d1n",
          days: 2,
          nights: 1,
        },
        {
          id: 702,
          name: "3 Days / 2 Nights",
          slug: "varkala-3d2n",
          days: 3,
          nights: 2,
        },
        {
          id: 703,
          name: "5 Days / 4 Nights",
          slug: "varkala-5d4n",
          days: 5,
          nights: 4,
        },
      ],
      details: {
        fullDescription: `Varkala, famous for its dramatic cliffs overlooking the Arabian Sea, is Kerala’s bohemian paradise blending spirituality and seaside relaxation.`,
        climate: "Tropical (24°C to 33°C)",
        idealFor: ["Spiritual Seekers", "Yoga Enthusiasts", "Beach Lovers"],
        mustVisit: ["Varkala Beach", "Janardanaswamy Temple", "Anjengo Fort"],
      },
    },
    {
      id: 8,
      name: "Kumarakom",
      title: "Kumarakom Backwaters",
      location: "Kumarakom, Kerala",
      image: "/assets/destinations/kumarakom-backwaters.png",
      detailImages: [
        "/assets/destinations/details/kumarakom-hero.webp",
        "/assets/destinations/details/kumarakom-gallery1.webp",
        "/assets/destinations/details/kumarakom-gallery2.webp",
      ],
      shortDesc: "Luxury backwater experience with bird sanctuary",
      description:
        "Luxury houseboat experience in tranquil backwaters with bird watching and village life experiences.",
      price: 11299,
      rating: 4.9,
      reviews: 189,
      bestTime: "September to March",
      highlights: [
        "Luxury Houseboats",
        "Bird Sanctuary",
        "Village Life",
        "Fishing",
      ],
      features: [
        "Luxury Houseboat",
        "Bird Sanctuary",
        "Fishing",
        "Village Walks",
      ],
      category: "Backwaters & Luxury",
      type: "backwaters",
      badge: "Luxury",
      duration: "2-3 days",
      featured: true,
      packages: [
        {
          id: 801,
          name: "2 Days / 1 Night",
          slug: "kumarakom-2d1n",
          days: 2,
          nights: 1,
        },
        {
          id: 802,
          name: "3 Days / 2 Nights",
          slug: "kumarakom-3d2n",
          days: 3,
          nights: 2,
        },
        {
          id: 803,
          name: "5 Days / 4 Nights",
          slug: "kumarakom-5d4n",
          days: 5,
          nights: 4,
        },
      ],
      details: {
        fullDescription: `Kumarakom offers a refined backwater experience filled with luxury, tranquility, and scenic charm. The bird sanctuary and lake-view houseboats define its beauty.`,
        climate: "Tropical (22°C to 32°C)",
        idealFor: ["Luxury Travelers", "Bird Watchers", "Honeymooners"],
        mustVisit: [
          "Kumarakom Bird Sanctuary",
          "Vembanad Lake",
          "Aruvikkuzhi Waterfall",
        ],
      },
    },
    {
      id: 9,
      name: "Bekal",
      title: "Bekal Fort Beach",
      location: "Bekal, Kerala",
      image: "/assets/destinations/bekal-fort.png",
      detailImages: [
        "/assets/destinations/details/bekal-hero.webp",
        "/assets/destinations/details/bekal-gallery1.webp",
        "/assets/destinations/details/bekal-gallery2.webp",
      ],
      shortDesc: "Historic fort with panoramic sea views",
      description:
        "Historic fort overlooking the Arabian Sea with pristine beaches and panoramic views.",
      price: 6999,
      rating: 4.6,
      reviews: 132,
      bestTime: "October to March",
      highlights: [
        "Bekal Fort",
        "Beach Activities",
        "Photography",
        "Local Cuisine",
      ],
      features: [
        "Fort Visit",
        "Beach Activities",
        "Photography",
        "Local Cuisine",
      ],
      category: "Heritage & Beach",
      type: "beach",
      badge: "Historic",
      duration: "2-3 days",
      featured: false,
      packages: [
        {
          id: 901,
          name: "2 Days / 1 Night",
          slug: "bekal-2d1n",
          days: 2,
          nights: 1,
        },
        {
          id: 902,
          name: "3 Days / 2 Nights",
          slug: "bekal-3d2n",
          days: 3,
          nights: 2,
        },
        {
          id: 903,
          name: "5 Days / 4 Nights",
          slug: "bekal-5d4n",
          days: 5,
          nights: 4,
        },
      ],
      details: {
        fullDescription: `Bekal, with its magnificent 17th-century fort and pristine shoreline, combines historical grandeur with natural serenity. The panoramic views of the Arabian Sea make it one of Kerala’s most photogenic locations.`,
        climate: "Tropical (23°C to 33°C)",
        idealFor: ["History Enthusiasts", "Photographers", "Beach Lovers"],
        mustVisit: ["Bekal Fort", "Bekal Beach", "Kappil Beach", "Nileshwaram"],
      },
    },
    {
      id: 10,
      name: "Athirappilly",
      title: "Athirappilly Waterfalls",
      location: "Thrissur, Kerala",
      image: "/assets/destinations/athirappilly-waterfalls.png",
      detailImages: [
        "/assets/destinations/details/athirappilly-hero.webp",
        "/assets/destinations/details/athirappilly-gallery1.webp",
        "/assets/destinations/details/athirappilly-gallery2.webp",
      ],
      shortDesc: "The Niagara of India with lush rainforests",
      description:
        "Witness the magnificent 'Niagara of India' surrounded by lush green forests and wildlife.",
      price: 5899,
      rating: 4.7,
      reviews: 167,
      bestTime: "June to January",
      highlights: [
        "Waterfall Views",
        "Rainforest Trek",
        "Wildlife Spotting",
        "Photography",
      ],
      features: [
        "Waterfall Views",
        "Rainforest Trek",
        "Wildlife Spotting",
        "Photography",
      ],
      category: "Nature & Waterfalls",
      type: "nature",
      badge: "Spectacular",
      duration: "1-2 days",
      featured: false,
      packages: [
        {
          id: 1001,
          name: "1 Day Tour",
          slug: "athirappilly-1d",
          days: 1,
          nights: 0,
        },
        {
          id: 1002,
          name: "2 Days / 1 Night",
          slug: "athirappilly-2d1n",
          days: 2,
          nights: 1,
        },
        {
          id: 1003,
          name: "3 Days / 2 Nights",
          slug: "athirappilly-3d2n",
          days: 3,
          nights: 2,
        },
      ],
      details: {
        fullDescription: `Athirappilly, Kerala’s most majestic waterfall, cascades from 80 feet amidst lush rainforests. A must-visit for photographers and nature lovers alike.`,
        climate: "Tropical (22°C to 35°C)",
        idealFor: ["Nature Lovers", "Photographers", "Adventure Seekers"],
        mustVisit: ["Athirappilly Falls", "Vazhachal Falls", "Chalakudy River"],
      },
    },
    {
      id: 11,
      name: "Poovar",
      title: "Poovar Island",
      location: "Trivandrum, Kerala",
      image: "/assets/destinations/poovar-island.png",
      detailImages: [
        "/assets/destinations/details/poovar-hero.webp",
        "/assets/destinations/details/poovar-gallery1.webp",
        "/assets/destinations/details/poovar-gallery2.webp",
      ],
      shortDesc: "Where backwaters meet the sea",
      description:
        "Unique island where the backwaters meet the sea, offering secluded beaches and mangrove forests.",
      price: 9899,
      rating: 4.8,
      reviews: 145,
      bestTime: "October to March",
      highlights: [
        "Island Resort",
        "Boat Cruise",
        "Mangrove Forest",
        "Secluded Beaches",
      ],
      features: [
        "Island Resort",
        "Boat Cruise",
        "Mangrove Forest",
        "Secluded Beaches",
      ],
      category: "Island & Backwaters",
      type: "backwaters",
      badge: "Exclusive",
      duration: "2-3 days",
      featured: true,
      packages: [
        {
          id: 1101,
          name: "2 Days / 1 Night",
          slug: "poovar-2d1n",
          days: 2,
          nights: 1,
        },
        {
          id: 1102,
          name: "3 Days / 2 Nights",
          slug: "poovar-3d2n",
          days: 3,
          nights: 2,
        },
        {
          id: 1103,
          name: "5 Days / 4 Nights",
          slug: "poovar-5d4n",
          days: 5,
          nights: 4,
        },
      ],
      details: {
        fullDescription: `Poovar Island, a tranquil paradise near Trivandrum, sits at the confluence of backwaters, river, and sea — a rare natural wonder of Kerala.`,
        climate: "Tropical (24°C to 32°C)",
        idealFor: ["Honeymooners", "Privacy Seekers", "Nature Lovers"],
        mustVisit: ["Poovar Beach", "Neyyar River", "Golden Sand Bar"],
      },
    },
    {
      id: 12,
      name: "Silent Valley",
      title: "Silent Valley National Park",
      location: "Palakkad, Kerala",
      image: "/assets/destinations/silent-valley.png",
      detailImages: [
        "/assets/destinations/details/silent-valley-hero.webp",
        "/assets/destinations/details/silent-valley-gallery1.webp",
        "/assets/destinations/details/silent-valley-gallery2.webp",
      ],
      shortDesc: "Pristine rainforest and biodiversity hotspot",
      description:
        "Explore one of the last undisturbed rainforests in Western Ghats with rich biodiversity.",
      price: 8199,
      rating: 4.7,
      reviews: 98,
      bestTime: "December to April",
      highlights: [
        "Jungle Trek",
        "Bird Watching",
        "Nature Photography",
        "Eco Tourism",
      ],
      features: [
        "Jungle Trek",
        "Bird Watching",
        "Nature Photography",
        "Eco Tourism",
      ],
      category: "Wildlife & Rainforest",
      type: "wildlife",
      badge: "Eco",
      duration: "2-3 days",
      featured: false,
      packages: [
        {
          id: 1201,
          name: "2 Days / 1 Night",
          slug: "silent-valley-2d1n",
          days: 2,
          nights: 1,
        },
        {
          id: 1202,
          name: "3 Days / 2 Nights",
          slug: "silent-valley-3d2n",
          days: 3,
          nights: 2,
        },
        {
          id: 1203,
          name: "4 Days / 3 Nights",
          slug: "silent-valley-4d3n",
          days: 4,
          nights: 3,
        },
      ],
      details: {
        fullDescription: `Silent Valley, a UNESCO-protected rainforest in Palakkad, preserves untouched wilderness. Ideal for trekkers and eco-travelers seeking raw natural beauty.`,
        climate: "Cool and humid (15°C to 25°C)",
        idealFor: ["Eco-Tourists", "Wildlife Enthusiasts", "Trekking Groups"],
        mustVisit: [
          "Sairandhri Viewpoint",
          "Kunthi River",
          "Lion-tailed Macaque Habitat",
        ],
      },
    },
  ];

  const [selectedDestination, setSelectedDestination] = useState(null);
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedDuration, setSelectedDuration] = useState(null);

  const categories = [
    "all",
    "Hill Station",
    "Wildlife & Nature",
    "Backwaters",
    "Beach Destination",
  ];

  // All available durations across destinations
  const allDurations = [
    { days: 2, nights: 1, label: "2 Days / 1 Night" },
    { days: 3, nights: 2, label: "3 Days / 2 Nights" },
    { days: 4, nights: 3, label: "4 Days / 3 Nights" },
    { days: 5, nights: 4, label: "5 Days / 4 Nights" },
    { days: 6, nights: 5, label: "6 Days / 5 Nights" },
    { days: 7, nights: 6, label: "7 Days / 6 Nights" },
  ];

  // Fixed filtering logic - now includes duration filter
  const filteredDestinations = destinations.filter((destination) => {
    // Category filter
    const categoryMatch =
      activeFilter === "all" || destination.category === activeFilter;

    // Duration filter
    const durationMatch =
      !selectedDuration ||
      destination.packages.some((pkg) => pkg.days === selectedDuration.days);

    return categoryMatch && durationMatch;
  });

  const DestinationCard = ({ destination }) => {
    const cardRef = useRef(null);

    return (
      <div
        ref={cardRef}
        className="destination-card"
        onClick={() => setSelectedDestination(destination)}
      >
        <div className="card-image">
          <img src={destination.image} alt={destination.name} />
          <div className="image-overlay">
            <div className="category-badge">{destination.category}</div>
            <div className="rating">
              <span className="star">⭐</span>
              <span className="rating-value">{destination.rating}</span>
            </div>
          </div>
        </div>

        <div className="card-content">
          <div className="card-header">
            <h3 className="destination-name">{destination.name}</h3>
            <div className="duration">{destination.duration}</div>
          </div>

          <p className="destination-desc">{destination.shortDesc}</p>

          <div className="destination-meta">
            <div className="meta-item">
              <span className="meta-icon">📅</span>
              <span className="meta-text">{destination.bestTime}</span>
            </div>
          </div>

          <div className="highlights-container">
            {destination.highlights.slice(0, 3).map((highlight, index) => (
              <span key={index} className="highlight-pill">
                {highlight}
              </span>
            ))}
            {destination.highlights.length > 3 && (
              <span className="highlight-pill more">
                +{destination.highlights.length - 3}
              </span>
            )}
          </div>

          <div className="available-durations">
            <span className="durations-label">Available Durations:</span>
            <div className="duration-pills">
              {destination.packages.slice(0, 3).map((pkg, index) => (
                <span key={pkg.id} className="duration-pill">
                  {pkg.days}D/{pkg.nights}N
                </span>
              ))}
              {destination.packages.length > 3 && (
                <span className="duration-pill more">
                  +{destination.packages.length - 3}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const DurationFilter = () => {
    return (
      <div className="duration-sidebar">
        <div className="duration-header">
          <h3>Filter by Duration</h3>
          <p>Choose your trip length</p>
        </div>

        <div className="duration-list">
          {allDurations.map((duration, index) => (
            <div
              key={index}
              className={`duration-item ${
                selectedDuration?.days === duration.days ? "active" : ""
              }`}
              onClick={() =>
                setSelectedDuration(
                  selectedDuration?.days === duration.days ? null : duration
                )
              }
            >
              <div className="duration-icon">🗓️</div>
              <div className="duration-info">
                <span className="duration-label">{duration.label}</span>
                <span className="duration-count">
                  {
                    destinations.filter((dest) =>
                      dest.packages.some((pkg) => pkg.days === duration.days)
                    ).length
                  }{" "}
                  destinations
                </span>
              </div>
              <div className="duration-arrow">→</div>
            </div>
          ))}
        </div>

        {selectedDuration && (
          <div className="selected-duration-info">
            <div className="selected-duration-header">
              <h4>{selectedDuration.label}</h4>
              <button
                className="clear-filter"
                onClick={() => setSelectedDuration(null)}
              >
                Clear
              </button>
            </div>
            <div className="matching-destinations">
              <span>Available in:</span>
              <div className="matching-tags">
                {destinations
                  .filter((dest) =>
                    dest.packages.some(
                      (pkg) => pkg.days === selectedDuration.days
                    )
                  )
                  .map((dest) => (
                    <span key={dest.id} className="matching-tag">
                      {dest.name}
                    </span>
                  ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <section className="destinations-modern">
      <div className="container">
        {!selectedDestination ? (
          <div className="layout-container">
            <div className="main-content">
              <div className="section-header">
                <h1 className="section-title">Discover Kerala</h1>
                <p className="section-subtitle">
                  Explore the most beautiful destinations in God's Own Country
                </p>

                <div className="filter-tabs">
                  {categories.map((category) => (
                    <button
                      key={category}
                      className={`filter-tab ${
                        activeFilter === category ? "active" : ""
                      }`}
                      onClick={() => setActiveFilter(category)}
                    >
                      {category === "all" ? "All Destinations" : category}
                    </button>
                  ))}
                </div>

                {/* Added filter status display */}
                {(activeFilter !== "all" || selectedDuration) && (
                  <div className="active-filters">
                    <span className="filters-label">Active Filters:</span>
                    {activeFilter !== "all" && (
                      <span className="active-filter-tag">
                        Category: {activeFilter}
                        <button
                          onClick={() => setActiveFilter("all")}
                          className="remove-filter"
                        >
                          ×
                        </button>
                      </span>
                    )}
                    {selectedDuration && (
                      <span className="active-filter-tag">
                        Duration: {selectedDuration.label}
                        <button
                          onClick={() => setSelectedDuration(null)}
                          className="remove-filter"
                        >
                          ×
                        </button>
                      </span>
                    )}
                  </div>
                )}
              </div>

              <div className="destinations-grid">
                {filteredDestinations.length > 0 ? (
                  filteredDestinations.map((destination) => (
                    <DestinationCard
                      key={destination.id}
                      destination={destination}
                    />
                  ))
                ) : (
                  <div className="no-results">
                    <h3>No destinations found</h3>
                    <p>Try adjusting your filters to see more results.</p>
                    <button
                      className="reset-filters-btn"
                      onClick={() => {
                        setActiveFilter("all");
                        setSelectedDuration(null);
                      }}
                    >
                      Reset All Filters
                    </button>
                  </div>
                )}
              </div>
            </div>

            <DurationFilter />
          </div>
        ) : (
          <DestinationDetails
            destination={selectedDestination}
            onBack={() => setSelectedDestination(null)}
          />
        )}
      </div>
    </section>
  );
}
