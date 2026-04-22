import { useState } from "react";
import { useBranding } from "../../shared/hooks/useBranding";
import { motion } from "framer-motion";

export default function Enroll() {
  const brand = useBranding();
  const whatsappNumber = brand.contact?.whatsapp;

  const [form, setForm] = useState({
    name: "",
    phone: "",
    course: "",
    message: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const text = `
📚 *Enrollment Request — ${brand.siteName}*

👤 Name: ${form.name}
📞 Phone: ${form.phone}
🎓 Course: ${form.course}

📝 Message:
${form.message || "N/A"}
`;

    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  }

  return (
    <div className="min-h-screen grid md:grid-cols-2 bg-[#0b0f1a] text-white">

      {/* 🌈 LEFT */}
      <motion.div
        initial={{ opacity: 0, x: -60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        className="hidden md:flex flex-col justify-center p-16 relative overflow-hidden"
        style={{ background: brand.colors.primary }}
      >

        {/* Glow */}
        <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-purple-500/20 blur-3xl rounded-full" />
        <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-green-500/20 blur-3xl rounded-full" />

        <div className="relative z-10 space-y-6">

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl font-black leading-tight"
          >
            {brand.enroll?.title ||
              `Start Your Journey with ${brand.siteName}`}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-white/80 max-w-md"
          >
            {brand.enroll?.subtitle ||
              "Join thousands of students already learning and growing."}
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap gap-4 text-xs font-bold uppercase text-white/70"
          >
            <span>10,000+ Students</span>
            <span>•</span>
            <span>₹5L+ Earnings</span>
            <span>•</span>
            <span>4.8 Rating</span>
          </motion.div>

          {/* Urgency */}
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5 }}
            className="inline-block bg-yellow-400 text-black px-4 py-2 text-xs font-bold rounded-full"
          >
            🚨 Limited Seats Available
          </motion.div>

          {/* Image */}
          {brand.hero?.image && (
            <motion.img
              src={brand.hero.image}
              alt="Preview"
              className="mt-6 rounded-2xl shadow-2xl max-w-md"
              whileHover={{ scale: 1.03 }}
            />
          )}
        </div>
      </motion.div>

      {/* 📝 RIGHT FORM */}
      <motion.div
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        className="flex items-center justify-center p-6"
      >

        <motion.div
          whileHover={{ scale: 1.01 }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-8 w-full max-w-md space-y-6"
        >

          <div>
            <h2 className="text-3xl font-black">
              Enroll Now
            </h2>

            <p className="text-white/60 text-sm mt-1">
              Takes less than 30 seconds
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">

            <input
              type="text"
              name="name"
              placeholder="Your Name"
              required
              onChange={handleChange}
              className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:ring-2 focus:outline-none"
            />

            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              required
              onChange={handleChange}
              className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40"
            />

            <input
              type="text"
              name="course"
              placeholder="Course Interested In"
              required
              onChange={handleChange}
              className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40"
            />

            <textarea
              name="message"
              placeholder="Additional Message"
              onChange={handleChange}
              className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40"
              rows={3}
            />

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              type="submit"
              className="w-full py-4 rounded-full text-white font-black shadow-lg"
              style={{ backgroundColor: brand.colors.primary }}
            >
              🚀 Continue on WhatsApp
            </motion.button>

          </form>

          <p className="text-xs text-white/40 text-center">
            No spam • Quick response • Secure
          </p>

        </motion.div>
      </motion.div>
    </div>
  );
}