"use client";
import { FaWhatsapp } from "react-icons/fa";
import "./WhatsappBubble.css";
import { useState } from "react";

export default function WhatsAppBubble() {
  const [hover, setHover] = useState(false);

  return (
    <div
      className="whatsapp-container"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* WhatsApp Button */}
      <a
        href="https://wa.me/your-number-here"
        className="whatsapp-bubble"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaWhatsapp size={28} />
      </a>

      {/* Tooltip / Modal - Now on the left side */}
      {hover && <div className="whatsapp-tooltip">Join us on WhatsApp</div>}
    </div>
  );
}