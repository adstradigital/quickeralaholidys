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
        fullDescription: `Munnar, nestled in the Western Ghats of Kerala, is a serene hill station renowned for its rolling tea plantations, misty mountains, and lush green valleys. Situated at an altitude of around 1,600 meters above sea level, it offers a refreshing escape from the heat of the plains. The landscape, carpeted with endless tea gardens and dotted with colonial-era bungalows, reflects both natural beauty and historical charm.
The region is home to diverse flora and fauna, including the rare Neelakurinji flower that blooms once every 12 years and the endangered Nilgiri Tahr found in the Eravikulam National Park. Scenic spots like Mattupetty Dam, Echo Point, and Kundala Lake attract visitors with their tranquil waters and panoramic views. The cool, misty climate adds a magical touch, making it a favorite destination for honeymooners and nature lovers alike.
Beyond its natural splendor, Munnar has a vibrant local culture influenced by tea workers and tribal communities. Tourists can explore tea factories to witness the art of tea processing, visit spice gardens, or trek through forested hills. Combining adventure, relaxation, and culture, Munnar stands as one of Kerala's most enchanting and timeless travel destinations.`,
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
        fullDescription: `Wayanad, nestled in the Western Ghats, is a pristine district in Kerala known for its rich biodiversity, mist-covered mountains, and vibrant tribal culture. The region's name translates to "Land of Paddy Fields," and its lush green landscapes are dotted with spice plantations, waterfalls, and ancient caves. Wayanad offers a perfect blend of adventure, wildlife, and cultural experiences, making it an ideal destination for nature enthusiasts and adventure seekers.
The district is home to several wildlife sanctuaries, including the Wayanad Wildlife Sanctuary, which forms part of the Nilgiri Biosphere Reserve. Visitors can spot elephants, tigers, leopards, and various bird species in their natural habitat. The Edakkal Caves, with their ancient rock engravings dating back to the Neolithic age, provide a fascinating glimpse into prehistoric human settlements. The Banasura Sagar Dam, set against the backdrop of the Banasura Hills, offers breathtaking views and boating opportunities.
Wayanad's spice plantations, especially coffee, pepper, and cardamom, are major attractions where tourists can learn about spice cultivation and processing. The region's tribal communities preserve unique traditions and crafts, offering cultural immersion experiences. With its cool climate, scenic beauty, and diverse attractions, Wayanad promises an unforgettable journey into the heart of Kerala's wilderness.`,
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
        fullDescription: `Alappuzha, often called the Venice of the East, is a picturesque town in Kerala famous for its tranquil backwaters, houseboats, and network of canals. Nestled along the Arabian Sea coast, it serves as one of the most beautiful and historically rich destinations in South India. Its shimmering lagoons, palm-fringed waterways, and traditional wooden houseboats make it a dreamlike experience for travelers seeking peace and scenic charm.
The town's economy and culture revolve around its intricate water system and thriving coir industry. A cruise through the backwaters offers glimpses of everyday life — fishermen casting nets, lush paddy fields, and small village homes on the water's edge. The annual Nehru Trophy Boat Race, held on the Punnamada Lake, draws thousands of spectators and showcases Kerala's traditional vallam kali (snake boat race) spirit.
Beyond its natural allure, Alappuzha also has historical importance, with colonial-era architecture, old churches, and temples adding depth to its cultural landscape. Whether it's a peaceful stay on a houseboat, a sunset at Alappuzha Beach, or a walk through bustling canalside markets, the town perfectly captures the rhythm and soul of Kerala's backwater life.`,
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
        fullDescription: `Kovalam, located near Thiruvananthapuram in Kerala, is one of India's most celebrated beach destinations, known for its golden sands, swaying coconut palms, and calm azure waters. Once a quiet fishing village, Kovalam rose to fame in the 1970s as a hippie haven and has since evolved into a world-class seaside retreat attracting tourists from around the globe. The town's crescent-shaped coastline, divided into Lighthouse Beach, Hawah Beach, and Samudra Beach, offers a perfect blend of leisure and natural beauty.
The Lighthouse Beach, named after its iconic red-and-white Vizhinjam Lighthouse, provides stunning panoramic views of the Arabian Sea, especially at sunset. Kovalam's gentle waves make it ideal for swimming, surfing, and catamaran rides, while Ayurvedic spas and yoga centers offer rejuvenating experiences deeply rooted in Kerala's wellness traditions. The laid-back atmosphere, coupled with beachside cafes serving fresh seafood, creates a serene yet lively coastal vibe.
Beyond the beaches, Kovalam is a gateway to explore Kerala's coastal culture and marine heritage. Visitors can take short trips to nearby attractions like the Vizhinjam Marine Aquarium, Padmanabhapuram Palace, or the bustling city of Thiruvananthapuram. Whether for relaxation, adventure, or cultural immersion, Kovalam embodies the essence of Kerala's tropical charm and hospitality.`,
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
        fullDescription: `Kochi, often called the "Queen of the Arabian Sea," is a vibrant port city in Kerala that beautifully blends traditional Indian culture with colonial influences. Its strategic location on the southwest coast of India has made it a melting pot of various cultures, including Portuguese, Dutch, and British, each leaving their mark on the city's architecture, cuisine, and way of life. Fort Kochi, with its charming streets and historic buildings, is the cultural heart of the city.
The iconic Chinese fishing nets, believed to have been introduced by Chinese traders in the 14th century, are a defining feature of Kochi's waterfront. These massive fishing contraptions create a picturesque scene, especially during sunset. The city is also home to the Paradesi Synagogue, the oldest active synagogue in the Commonwealth, and the St. Francis Church, where Vasco da Gama was originally buried. The bustling spice markets and contemporary art galleries add to Kochi's unique character.
Kochi's culinary scene is as diverse as its culture, offering everything from traditional Kerala sadya to European-inspired dishes. The Kochi-Muziris Biennale, an international contemporary art exhibition, has put the city on the global art map. With its rich history, cultural diversity, and modern amenities, Kochi offers a fascinating glimpse into Kerala's past and present.`,
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
        fullDescription: `Thekkady, located in the Idukki district of Kerala, is renowned for the Periyar National Park and Wildlife Sanctuary, one of India's most fascinating wildlife reserves. Spread over 777 square kilometers, the sanctuary surrounds the picturesque Periyar Lake, formed by the Mullaperiyar Dam across the Periyar River. Thekkady offers a unique opportunity to observe wildlife in their natural habitat, with the boat cruise on Periyar Lake being the prime attraction for spotting elephants, tigers, bison, and various bird species.
The region is also famous for its spice plantations, where visitors can see cardamom, pepper, cinnamon, and cloves being cultivated. Guided tours through these plantations provide insights into spice cultivation and processing. Thekkady's cultural landscape is enriched by traditional performances like Kathakali and Kalaripayattu, showcasing Kerala's ancient art forms and martial traditions. The nearby plantations also offer opportunities for bamboo rafting, jungle walks, and elephant interactions.
The cool climate and misty mountains make Thekkady a pleasant destination throughout the year. The town serves as a perfect base for exploring the Western Ghats' biodiversity while enjoying comfortable accommodations and authentic Kerala cuisine. Whether you're a wildlife enthusiast, nature lover, or cultural explorer, Thekkady promises an immersive experience in Kerala's natural and cultural heritage.`,
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
        fullDescription: `Varkala, a coastal town in Kerala, is renowned for its unique laterite cliff formations that overlook the Arabian Sea, creating one of the most spectacular beach landscapes in India. Unlike typical Kerala beaches, Varkala's main beach is nestled at the bottom of these majestic cliffs, with a paved pathway running along the edge offering stunning sea views. The town is not just a beach destination but also an important Hindu pilgrimage center, home to the ancient Janardanaswamy Temple.
The mineral springs at Varkala are believed to have medicinal properties, and many visitors come specifically to take a dip in these holy waters. The beach is dotted with numerous cafes and shops built into the cliffside, offering a bohemian atmosphere that attracts backpackers, yoga enthusiasts, and spiritual seekers from around the world. The evenings come alive with the sound of waves crashing against the cliffs and the sight of spectacular sunsets painting the sky in hues of orange and purple.
Varkala's spiritual significance, combined with its natural beauty, makes it a unique destination that offers both relaxation and cultural enrichment. Whether you're practicing yoga at sunrise, exploring the local markets, or simply watching the fishermen bring in their catch, Varkala provides a serene escape from the hustle of modern life.`,
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
        fullDescription: `Kumarakom, a cluster of small islands on the Vembanad Lake in Kerala, is synonymous with luxury backwater experiences and pristine natural beauty. This picturesque destination, located near Kottayam, offers a more refined and tranquil alternative to the bustling backwaters of Alleppey. The region's star attraction is the Kumarakom Bird Sanctuary, spread over 14 acres, which serves as a haven for migratory birds like Siberian storks, herons, and egrets, especially between November and February.
The backwaters of Kumarakom are characterized by their calm, clear waters and abundant coconut palms. Luxury houseboats, often equipped with modern amenities and traditional Kerala decor, provide an unparalleled way to experience the serene waterways. These floating villas allow visitors to witness rural Kerala life up close – from farmers working in paddy fields to women washing clothes by the water's edge. The experience is complemented by freshly prepared Kerala cuisine served on board.
Kumarakom's commitment to sustainable tourism is evident in its responsible houseboat operations and conservation efforts. The destination offers various activities including canoe rides, village walks, and visits to local coir-making units. Whether you're seeking romantic solitude, bird watching opportunities, or cultural immersion, Kumarakom delivers an authentic yet luxurious Kerala backwater experience that stays with you long after your visit.`,
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
        fullDescription: `Bekal, located in the Kasaragod district of Kerala, is famous for the magnificent Bekal Fort, the largest fort in Kerala. This 17th-century fort, built by Shivappa Nayaka of the Keladi dynasty, stands on a promontory overlooking the Arabian Sea, offering breathtaking panoramic views of the coastline. Unlike many other Indian forts, Bekal Fort was not built for administrative purposes but purely for military defense, evident in its strategic design with holes on the outer walls for aiming and attacking enemies.
The fort's key features include the observation tower that provides a 360-degree view of the surroundings, the ancient mosque just outside the fort, and the well-maintained laterite structure that has withstood the test of time. The beach adjacent to the fort, with its clean sands and clear waters, complements the historical experience with natural beauty. Bekal gained additional fame as a filming location for several Indian movies, particularly the song sequences that showcased its scenic beauty.
Beyond the fort, Bekal offers beautiful beaches, backwaters, and the unique Theyyam ritual performances that are an integral part of North Malabar's cultural heritage. The recently developed Bekal Beach Park and the walking path along the coast make it an ideal destination for leisurely strolls and sunset viewing. Bekal represents the perfect blend of history, culture, and natural beauty that characterizes Kerala's northern region.`,
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
        fullDescription: `Athirappilly Waterfalls, often called the "Niagara of India," is one of Kerala's most spectacular natural attractions. Located on the Chalakudy River in Thrissur district, this majestic waterfall cascades down from a height of 80 feet, creating a thunderous roar and a misty spray that can be felt from a distance. The waterfall is situated in the midst of lush green rainforests that form part of the Western Ghats, recognized as a UNESCO World Heritage Site for their incredible biodiversity.
The area around Athirappilly is home to several indigenous tribal communities and rich wildlife, including elephants, tigers, leopards, and numerous bird species. The Vazhachal Waterfalls, located close to Athirappilly, offers another stunning cascade amidst dense forests. The entire region is part of the Sholayar forest range and provides excellent opportunities for nature walks, bird watching, and photography. The sound of the waterfall, combined with the chirping of birds and the rustling of leaves, creates a symphony of nature that soothes the soul.
Athirappilly has also gained fame as a popular filming location for Indian cinema, particularly for song sequences and dramatic scenes. The best time to visit is during the monsoon and post-monsoon seasons when the waterfall is at its most powerful and voluminous. However, the beauty of Athirappilly transcends seasons, offering a majestic spectacle of nature's power and beauty throughout the year.`,
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
        fullDescription: `Poovar Island, located near Thiruvananthapuram, is one of Kerala's best-kept secrets – a tranquil estuary where the backwaters meet the Arabian Sea. This secluded island paradise is characterized by its golden sand beaches, serene backwaters, and lush mangrove forests. What makes Poovar unique is its geographical formation: a small strip of land separates the backwaters from the sea, creating a natural channel that changes with the tides and seasons.
The island is accessible only by boat, which adds to its exclusive and untouched appeal. As you cruise through the backwaters, you'll witness a fascinating ecosystem where freshwater from the Neyyar River mixes with seawater, supporting diverse marine life and mangrove vegetation. The boat ride takes you through narrow canals flanked by coconut palms and traditional Chinese fishing nets, offering glimpses of local life and occasional sightings of migratory birds.
Poovar's beach is particularly special – pristine, relatively untouched, and perfect for those seeking solitude away from crowded tourist spots. The island features luxury resorts that blend seamlessly with the natural surroundings, offering private villas and personalized services. Whether you're watching the spectacular sunset over the confluence of river and sea, enjoying fresh seafood, or simply relaxing in a hammock between palm trees, Poovar offers a slice of paradise that feels worlds away from the hustle of modern life.`,
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
        fullDescription: `Silent Valley National Park, located in the Nilgiri Hills of Palakkad district, is one of the last remaining tracts of undisturbed tropical evergreen rainforest in India. Spanning approximately 89 square kilometers, this ecological treasure trove was declared a national park in 1984 following a successful environmental movement that prevented the construction of a hydroelectric project. The park gets its name from the absence of cicadas, which are typically heard in other forests, creating a relatively silent atmosphere.
The park is a biodiversity hotspot, home to numerous endangered species including the Lion-tailed Macaque, Nilgiri Langur, Malabar Giant Squirrel, and over 100 species of butterflies. The dense forest is crisscrossed by the Kunthi River, which originates from the park and remains unpolluted throughout its course. The vegetation includes multi-storied forests with towering trees, thick lianas, and rich undergrowth that support this incredible diversity of life.
Visiting Silent Valley is a truly immersive ecological experience. The park offers guided treks that take visitors through various forest types, from tropical evergreen to montane grasslands. The Sairandhri viewpoint provides a panoramic view of the entire valley, while the trek to the Kunthi River offers opportunities to spot wildlife and enjoy the pristine natural surroundings. Silent Valley represents Kerala's commitment to conservation and offers a rare glimpse into what the Western Ghats looked like before human intervention.`,
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
