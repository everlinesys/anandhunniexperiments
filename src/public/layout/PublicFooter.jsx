import { Link } from "react-router-dom";
import { useBranding } from "../../shared/hooks/useBranding";
import { motion } from "framer-motion";

export default function PublicFooter() {
  const brand = useBranding();

  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.15 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <footer className="relative bg-[#0b0f1a] text-white overflow-hidden">

      {/* 🌈 glow */}
      <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-purple-500/10 blur-3xl rounded-full" />
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-green-500/10 blur-3xl rounded-full" />

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="relative z-10 max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-4 gap-10"
      >

        {/* BRAND */}
        <motion.div variants={item}>
          <h3 className="text-lg font-black mb-4">
            {brand.siteName}
          </h3>
          <p className="text-sm text-white/60 max-w-xs">
            {brand.tagline || "Build skills. Crack exams. Achieve your goals."}
          </p>
        </motion.div>

        {/* PLATFORM */}
        <motion.div variants={item}>
          <h4 className="font-semibold mb-4 text-white/90">Platform</h4>
          <ul className="space-y-2 text-sm text-white/60">
            <li>
              <Link to="/courses" className="hover:text-white transition">
                Courses
              </Link>
            </li>
            <li>
              <Link to="/pricing" className="hover:text-white transition">
                Pricing
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-white transition">
                Contact
              </Link>
            </li>
          </ul>
        </motion.div>

        {/* LEGAL */}
        <motion.div variants={item}>
          <h4 className="font-semibold mb-4 text-white/90">Legal</h4>
          <ul className="space-y-2 text-sm text-white/60">
            <li>
              <Link to="/terms" className="hover:text-white transition">
                Terms
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="hover:text-white transition">
                Privacy
              </Link>
            </li>
          </ul>
        </motion.div>

        {/* CTA */}
        <motion.div variants={item}>
          <h4 className="font-semibold mb-4 text-white/90">
            Start Your Journey
          </h4>

          <p className="text-sm text-white/60 mb-4">
            Join thousands of students preparing for NEET & KEAM.
          </p>

          <motion.div whileHover={{ scale: 1.05 }}>
            <Link
              to="/register"
              className="inline-block px-6 py-3 rounded-xl text-sm font-bold shadow-lg"
              style={{
                background: brand.colors.accent,
                color: brand.colors.primary,
              }}
            >
              🚀 Create Account
            </Link>
          </motion.div>
        </motion.div>

      </motion.div>

      {/* 🔥 BOTTOM BAR */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="border-t border-white/10 text-center py-5 text-sm text-white/50"
      >
        © {new Date().getFullYear()} {brand.siteName}. All rights reserved.
      </motion.div>
    </footer>
  );
}