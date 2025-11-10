// app/about/page.jsx
"use client";

import { useState, useEffect } from "react";
import "./AboutDetails.css";
import { useRouter } from "next/navigation";

export default function AboutPage() {
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const stats = [
    { number: "10+", label: "Years Experience" },
    { number: "50,000+", label: "Happy Travelers" },
    { number: "500+", label: "Destinations Covered" },
    { number: "24/7", label: "Customer Support" },
  ];

  const teamMembers = [
    {
      name: "Rajesh Kumar",
      role: "Founder & CEO",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      description:
        "Former Kerala Tourism Officer with 15+ years in travel industry",
      expertise: ["Kerala Tourism", "Sustainable Travel", "Cultural Heritage"],
    },
    {
      name: "Priya Nair",
      role: "Head of Operations",
      image:
        "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?w=400&h=400&fit=crop&crop=face",
      description:
        "Hospitality management expert with luxury resort background",
      expertise: ["Luxury Stays", "Customer Experience", "Quality Control"],
    },
    {
      name: "Arun Menon",
      role: "Adventure Specialist",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      description: "Certified adventure guide and wildlife enthusiast",
      expertise: ["Wildlife Safaris", "Adventure Sports", "Eco Tourism"],
    },
    {
      name: "Meera Pillai",
      role: "Cultural Curator",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
      description: "Art historian and cultural experience designer",
      expertise: ["Cultural Tours", "Art & Craft", "Culinary Experiences"],
    },
    {
      name: "Suresh Nambiar",
      role: "Transport & Logistics Manager",
      image:
        "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?w=400&h=400&fit=crop&crop=face",
      description:
        "Logistics expert with 12+ years in transportation management",
      expertise: ["Fleet Management", "Route Planning", "Safety Protocols"],
    },
    {
      name: "Anjali Krishnan",
      role: "Customer Relations Head",
      image:
        "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?w=400&h=400&fit=crop&crop=face",
      description:
        "Customer service specialist with background in luxury hospitality",
      expertise: [
        "Client Relations",
        "Service Excellence",
        "Feedback Management",
      ],
    }
  ];

  const values = [
    {
      icon: "🌿",
      title: "Sustainable Tourism",
      description:
        "We promote eco-friendly practices and support local communities",
    },
    {
      icon: "💝",
      title: "Authentic Experiences",
      description:
        "Curated journeys that showcase the real Kerala beyond tourist spots",
    },
    {
      icon: "🛡️",
      title: "Trust & Safety",
      description: "Your safety and comfort are our top priorities",
    },
    {
      icon: "🌟",
      title: "Excellence",
      description: "Consistently delivering exceptional service since 2010",
    },
  ];

  const milestones = [
    { year: "2010", event: "Founded in Kochi with 3 team members" },
    { year: "2013", event: "Expanded to international tourism" },
    { year: "2016", event: "Launched sustainable tourism initiatives" },
    { year: "2019", event: "Recognized by Kerala Tourism Department" },
    { year: "2022", event: "50,000+ travelers milestone" },
    { year: "2024", event: "Digital transformation with AI-powered bookings" },
  ];

  return (
    <div className={`about-page ${isVisible ? "visible" : ""}`}>
      {/* Hero Section */}
      <section className="about-hero">
        <div className="hero-background">
          <div className="hero-overlay"></div>
          <div className="hero-pattern"></div>
        </div>
        <div className="hero-content">
          <div className="container">
            <h1 className="hero-title">About Quick Kerala Holidays</h1>
            <p className="hero-subtitle">
              Crafting Unforgettable Kerala Experiences Since 2010
            </p>
            <div className="hero-stats">
              {stats.map((stat, index) => (
                <div key={index} className="stat  -item">
                  <div className="stat-number">{stat.number}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="story-section">
        <div className="container">
          <div className="story-grid">
            <div className="story-content">
              <h2>Our Story</h2>
              <p className="story-lead">
                Born from a deep love for God's Own Country, Quick Kerala
                Holidays began as a small family-run operation in the heart of
                Kochi.
              </p>
              <div className="story-text">
                <p>
                  Founded in 2010 by Rajesh Kumar, a former Kerala Tourism
                  Officer, our journey started with a simple mission: to share
                  the authentic beauty of Kerala with the world. What began as
                  personalized tours for friends and family has grown into a
                  trusted travel company serving thousands of travelers
                  annually.
                </p>
                <p>
                  Over the years, we've maintained our core values while
                  embracing innovation. From traditional houseboat stays to
                  cutting-edge digital booking systems, we've evolved to meet
                  modern traveler needs while preserving the soul of Kerala's
                  rich cultural heritage.
                </p>
                <p>
                  Today, we're proud to be one of Kerala's most recommended
                  travel companies, known for our deep local knowledge,
                  sustainable practices, and unwavering commitment to customer
                  satisfaction.
                </p>
              </div>
            </div>
            <div className="story-visual">
              <div className="story-image">
                <div className="image-placeholder">
                  <span>Kerala Backwaters Experience</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section">
        <div className="container">
          <div className="section-header">
            <h2>Our Values</h2>
            <p>The principles that guide every journey we create</p>
          </div>
          <div className="values-grid">
            {values.map((value, index) => (
              <div key={index} className="value-card">
                <div className="value-icon">{value.icon}</div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Milestones Section */}
      <section className="milestones-section">
        <div className="container">
          <div className="section-header">
            <h2>Our Journey</h2>
            <p>Key milestones in our growth story</p>
          </div>
          <div className="timeline">
            {milestones.map((milestone, index) => (
              <div key={index} className="timeline-item">
                <div className="timeline-year">{milestone.year}</div>
                <div className="timeline-content">
                  <p>{milestone.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Explore Kerala with Us?</h2>
            <p>
              Join thousands of satisfied travelers who've experienced the magic
              of Kerala through our curated journeys
            </p>
            <div className="cta-buttons">
              <button
                className="btn-primary"
                onClick={() => {
                  router.push("/planyourtrip");
                }}
              >
                Plan Your Trip
              </button>
              <button
                className="btn-secondary"
                onClick={() => {
                  router.push("/contacts");
                }}
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
