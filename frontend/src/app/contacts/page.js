// In your page component

import ContactSection from "@/components/Contacts/Contacts";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import WhatsAppBubble from "@/components/Whatsappbubble/WhatsappBubble";

export default function Home() {
  return (
    <div>
      <Header />
      <ContactSection />
      <WhatsAppBubble/>
      <Footer />
    </div>
  );
}
