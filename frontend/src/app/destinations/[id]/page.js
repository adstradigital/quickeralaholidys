// app/destinations/[id]/page.js
// ⭐ NO "use client" here - this is a SERVER component

import { destinations, getDestinationById } from "@/components/Data/DestinationData";
import DestinationDetailsWrapper from "@/components/DestinationDetails/DestinationDetailsWrapper";

// ✅ This function generates static pages at build time
export function generateStaticParams() {
  return destinations.map((destination) => ({
    id: destination.id.toString(),
  }));
}

// ✅ Optional: Dynamic metadata for SEO
export function generateMetadata({ params }) {
  const destination = getDestinationById(params.id);
  
  if (!destination) {
    return { title: 'Destination Not Found' };
  }

  return {
    title: `${destination.name} - Kerala Tourism`,
    description: destination.shortDesc || destination.description,
  };
}

// Server component - passes data to wrapper
export default function DestinationPage({ params }) {
  const destination = getDestinationById(params.id);
  
  return <DestinationDetailsWrapper destination={destination} />;
}
