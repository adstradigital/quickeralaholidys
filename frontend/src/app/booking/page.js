import { Suspense } from "react";
import BookingPage from "@/components/Booking/Booking";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";

// Loading component for Suspense fallback
function BookingLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading booking page...</p>
      </div>
    </div>
  );
}

export default function BookingPages() {
  return (
    <>
      <Header />
      <Suspense fallback={<BookingLoading />}>
        <BookingPage />
      </Suspense>
      <Footer />
    </>
  );
}