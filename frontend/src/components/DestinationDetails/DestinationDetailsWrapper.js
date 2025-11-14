// components/DestinationDetails/DestinationDetailsWrapper.js
"use client";  // ⭐ Client component for interactivity

import { useRouter } from "next/navigation";
import DestinationDetails from "./DestinationDetails";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import FloatingPhone from "@/components/Mobilenumber/MobileNum";

export default function DestinationDetailsWrapper({ destination }) {
  const router = useRouter();

  if (!destination) {
    return (
      <>
        <Header />
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '60vh',
          padding: '2rem',
          textAlign: 'center'
        }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>
            Destination Not Found
          </h1>
          <p style={{ marginBottom: '2rem', color: '#666' }}>
            The destination you're looking for doesn't exist.
          </p>
          <button 
            onClick={() => router.push("/")}
            style={{
              padding: '0.75rem 2rem',
              backgroundColor: '#2d936c',
              color: 'white',
              border: 'none',
              borderRadius: '0.5rem',
              cursor: 'pointer'
            }}
          >
            Return to Homepage
          </button>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <DestinationDetails
        destination={destination}
        onBack={() => router.push("/")}
      />
      <FloatingPhone />
      <Footer />
    </>
  );
}
