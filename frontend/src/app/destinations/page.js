import DestinationList from '@/components/DestinationList/DestinationList';
import Footer from '@/components/Footer/Footer';
// import DestinationsMenu from '@/components/DestinationList/DestinationList';
import Header from '@/components/Header/Header';

export default function DestinationsPage() {
  return (
    <>
    <Header />
    <DestinationList />
    <Footer/>
    </>
  )
}

export const metadata = {
  title: 'Kerala Destinations | Explore God\'s Own Country',
  description: 'Discover amazing destinations in Kerala - backwaters, hills, beaches, and wildlife',
};