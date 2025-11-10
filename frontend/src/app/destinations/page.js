import DestinationList from '@/components/DestinationList/DestinationList';
// import DestinationsMenu from '@/components/DestinationList/DestinationList';
import Header from '@/components/Header/Header';

export default function DestinationsPage() {
  return (
    <>
    <Header />
    <DestinationList />
    </>
  )
}

export const metadata = {
  title: 'Kerala Destinations | Explore God\'s Own Country',
  description: 'Discover amazing destinations in Kerala - backwaters, hills, beaches, and wildlife',
};