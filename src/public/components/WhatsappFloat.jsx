import { motion } from "framer-motion";
import { MdWhatsapp } from "react-icons/md";
import { useState } from "react";

export default function WhatsAppFloat({ openWhatsApp }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">

      {/* 💬 Tooltip */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : 20 }}
        className="hidden md:block bg-[#111827] text-white text-xs px-4 py-2 rounded-full border border-white/10 shadow-lg"
      >
        Need help? Chat with us 👋
      </motion.div>

      {/* 🔥 Button */}
      <motion.button
        onClick={openWhatsApp}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="relative w-14 h-14 rounded-full flex items-center justify-center text-white shadow-2xl"
        style={{ background: "rgb(5 150 105)" }}
      >

        {/* 🔥 pulse ring */}
        <span className="absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-20 animate-ping" />

        {/* icon */}
        <MdWhatsapp size={26} className="relative z-10" />
      </motion.button>

    </div>
  );
}