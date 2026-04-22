import { useBranding } from "../../shared/hooks/useBranding";
import { motion } from "framer-motion";

export default function Testimonials() {
  const brand = useBranding();
  const reviews = brand.reviews || [];
  const primary = brand.colors?.primary || "#6366f1";

  if (!reviews.length) return null;

  // 🔥 animation variants
  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 40 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section className="relative w-full overflow-hidden py-24 bg-[#0b0f1a] text-white">

      {/* 🌈 SKEW BAND */}
      <div
        className="absolute top-0 left-0 w-full h-[420px] -translate-y-20 -skew-y-3 origin-top-right z-0"
        style={{ backgroundColor: primary }}
      >
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 lg:px-12">

        {/* 🔥 HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex flex-col items-center text-center mb-16"
        >

          <div className="px-4 py-1.5 text-[11px] uppercase tracking-[0.2em] font-black mb-6 bg-white/10 backdrop-blur border border-white/20 rounded-full">
            Real Results
          </div>

          <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
            People Are Growing With {brand.siteName}
          </h2>

          <p className="text-white/70 max-w-lg">
            Not just learning — building real skills, income, and results.
          </p>

          {/* 📊 PROOF */}
          <div className="flex flex-wrap gap-4 text-xs font-bold uppercase text-white/60 mt-6">
            <span>10,000+ Students</span>
            <span>•</span>
            <span>₹5L+ Earned</span>
            <span>•</span>
            <span>4.8 Rating</span>
          </div>
        </motion.div>

        {/* 💬 GRID */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8"
        >
          {reviews.slice(0, 3).map((t, i) => (
            <motion.div
              key={i}
              variants={item}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group relative flex flex-col h-full border border-white/10 rounded-3xl p-8 md:p-10 bg-white/5 backdrop-blur-xl shadow-xl"
            >

              {/* 💸 RESULT TAG */}
              <div className="absolute top-4 left-4 text-[10px] font-bold px-3 py-1 rounded-lg bg-emerald-400 text-black">
                ₹{(Math.random() * 20000 + 2000).toFixed(0)} Growth
              </div>

              {/* QUOTE ICON */}
              <div
                className="absolute top-8 right-10 opacity-60 group-hover:scale-110 transition"
                style={{ color: primary }}
              >
                <svg width="40" height="40" fill="currentColor">
                  <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V12C14.017 12.5523 13.5693 13 13.017 13H11.017V21H14.017Z" />
                </svg>
              </div>

              {/* CONTENT */}
              <div className="relative z-10 flex flex-col h-full">

                {/* STARS */}
                <div className="flex gap-1 mb-6 text-amber-400">
                  {[...Array(t.rating || 5)].map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>

                <p className="text-md italic mb-8 flex-grow text-white/80">
                  “{t.text}”
                </p>

                {/* AUTHOR */}
                <div className="flex items-center gap-4 pt-6 border-t border-white/10">
                  <div
                    className="w-12 h-12 flex items-center justify-center text-white font-black rounded-full"
                    style={{ backgroundColor: primary }}
                  >
                    {t.name?.charAt(0)}
                  </div>

                  <div>
                    <div className="font-semibold text-white">
                      {t.name}
                    </div>
                    <div className="text-xs text-white/50">
                      {t.role || "Verified Learner"}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* 🚀 CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center mt-16"
        >
          <a
            href="#pricing"
            className="inline-block px-10 py-4 font-black text-sm rounded-full bg-white text-black hover:scale-105 transition"
          >
            Join Them Today
          </a>
        </motion.div>

      </div>
    </section>
  );
}