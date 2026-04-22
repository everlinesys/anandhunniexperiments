import { MdWhatsapp } from "react-icons/md";
import { useBranding } from "../../shared/hooks/useBranding";
import { useState } from "react";
import { motion } from "framer-motion";
import WhatsAppFloat from "./WhatsappFloat";

export default function Hero() {
  const brand = useBranding();
  const [open, setOpen] = useState(true);

  const initials =
    brand.name
      ?.replace(/[^A-Za-z ]/g, "")
      .split(" ")
      .filter(Boolean)
      .map((w) => w[0].toUpperCase())
      .slice(0, 2) || ["A", "U"];

  const avatarLetters = [...initials, ...initials].slice(0, 4);
  const whatsappNumber = brand.contact?.whatsapp;

  const openWhatsApp = () => {
    const text = `Hello ${brand.siteName}, I want to know more about your courses.`;
    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`,
      "_blank"
    );
  };

  // 🔥 animation system
  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.15 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section className={`${brand.theme.layout.container} relative overflow-hidden bg-[#0b0f1a] text-white`}>

      {/* URGENCY */}
      <div className="text-center text-xs py-2 font-bold bg-yellow-400 text-black">
        🚨 Limited Offer: Save 70% Today – Price Increasing Soon
      </div>

      {/* glow */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] blur-3xl opacity-30"
        style={{ background: "radial-gradient(circle, #6366f1, transparent)" }}
      />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] blur-3xl opacity-20"
        style={{ background: "radial-gradient(circle, #22c55e, transparent)" }}
      />

      <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center p-8 md:p-16">

        {/* LEFT */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-6 text-center md:text-left"
        >

          {/* Badge */}
          <motion.div variants={item} className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                style={{ backgroundColor: brand.colors.primary }}
              />
              <span className="relative inline-flex rounded-full h-2 w-2"
                style={{ backgroundColor: brand.colors.accent }}
              />
            </span>
            <span className="text-[10px] uppercase tracking-widest">
              AI Powered Learning Platform
            </span>
          </motion.div>

          {/* TITLE */}
          <motion.h1 variants={item} className="text-4xl md:text-5xl font-black leading-tight">
            {brand.hero?.title ||
              "Launch Your Own AI Learning Platform"}
          </motion.h1>

          {/* SUBTITLE */}
          <motion.p variants={item} className="text-white/70 max-w-lg text-lg">
            {brand.hero?.subtitle ||
              "Create, sell & automate your courses with AI tools."}
          </motion.p>

          {/* STATS */}
          <motion.div variants={item} className="flex flex-wrap gap-3 text-xs font-bold text-white/60 justify-center md:justify-start">
            {(brand.hero?.stats || [
              "₹5L+ Earnings",
              "10,000+ Students",
              "500+ Educators",
            ]).map((item, i) => (
              <span key={i}>{item}</span>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div variants={item} className="flex gap-4 justify-center md:justify-start">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#courses"
              className="px-8 py-4 font-bold rounded-xl"
              style={{
                background: brand.colors.accent,
                color: brand.colors.primary,
              }}
            >
              Get Started
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.05 }}
              href="#demo"
              className="px-6 py-4 border border-white/10 bg-white/5 rounded-xl"
            >
              Watch Demo
            </motion.a>
          </motion.div>

          {/* avatars */}
          <motion.div variants={item} className="flex items-center gap-4 justify-center md:justify-start">
            <div className="flex -space-x-3">
              {avatarLetters.map((l, i) => (
                <div
                  key={i}
                  className="h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold border border-white/10"
                  style={{
                    backgroundColor: brand.colors.primary,
                    color: brand.colors.accent,
                  }}
                >
                  {l}
                </div>
              ))}
            </div>

            <div className="text-xs text-white/50">
              +{brand.students} Students
            </div>
          </motion.div>
        </motion.div>

        {/* RIGHT */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="relative hidden md:block"
        >

          {/* image */}
          <motion.img
            src={brand.hero?.image}
            alt=""
            className="rounded-2xl"
            whileHover={{ scale: 1.03 }}
          />

          {/* floating cards */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4 }}
            className="absolute -top-6 -left-6 bg-white/5 border border-white/10 px-4 py-3 rounded-xl text-xs"
          >
            ₹3.2L Generated
          </motion.div>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 5 }}
            className="absolute bottom-6 -right-6 bg-white/5 border border-white/10 px-4 py-3 rounded-xl text-xs"
          >
            +1200 Students
          </motion.div>

        </motion.div>
      </div>

      {/* WhatsApp */}
      <WhatsAppFloat/>

    </section>
  );
}