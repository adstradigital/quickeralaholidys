import SpecialOffersClient from '@/components/SpecialOfferDetails/SpecialOfferDetails';
import { Suspense } from 'react';

export default function SpecialOffersPage() {
  return (
    <Suspense fallback={<div>Loading special offers...</div>}>
      <SpecialOffersClient />
    </Suspense>
  );
}

export const metadata = {
  title: 'Kerala Special Offers | Explore God\'s Own Country',
  description: 'Discover amazing Special Offers in Kerala - backwaters, hills, beaches, and wildlife',
};