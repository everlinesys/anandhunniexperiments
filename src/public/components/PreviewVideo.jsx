import { useBranding } from "../../shared/hooks/useBranding";
import { Play } from "lucide-react";
import { useState } from "react";
import VideoPlayer from "../../shared/video/VideoPlayer";
import { motion } from "framer-motion";

export default function PreviewVideo() {
  const brand = useBranding();
  const preview = brand.preview || {};
  const [play, setPlay] = useState(false);

  const videoId =
    preview.bunnyVideoId ||
    brand.hero?.bunnyVideoId;

  const poster =
    preview.poster ||
    brand.hero?.poster ||
    "/hero.png";

  return (
    <section className="relative overflow-hidden py-20 bg-[#0b0f1a] text-white">

      {/* 🌈 GLOW */}
      <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-purple-500/20 blur-3xl rounded-full" />
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-green-500/20 blur-3xl rounded-full" />

      <div className="relative z-10 grid lg:grid-cols-2 gap-10 items-center max-w-7xl mx-auto px-6">

        {/* 🎥 VIDEO */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative"
        >

          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-white/5 backdrop-blur-xl">

            {!play ? (
              <>
                {/* Poster */}
                <motion.img
                  src={poster}
                  alt="Preview"
                  className="w-full object-cover"
                  initial={{ scale: 1.05 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.6 }}
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />

                {/* Play */}
                <motion.button
                  onClick={() => setPlay(true)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-xl"
                  >
                    <Play className="text-black ml-1" />
                  </motion.div>
                </motion.button>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <VideoPlayer
                  videoId={videoId}
                  autoplay={true}
                />
              </motion.div>
            )}
          </div>

          {/* 💸 FLOATING CARDS */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="absolute -top-5 -left-5 bg-white/10 backdrop-blur-xl border border-white/10 text-xs px-4 py-2 rounded-xl"
          >
            +1200 Students Joined
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="absolute bottom-5 -right-5 bg-white/10 backdrop-blur-xl border border-white/10 text-xs px-4 py-2 rounded-xl"
          >
            ₹3L+ Generated
          </motion.div>

        </motion.div>

        {/* 📝 TEXT */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-6 md:space-y-8"
        >

          <h2 className="text-3xl md:text-5xl font-black leading-tight">
            {preview.title || "See How It Works"}{" "}
            <span style={{ color: brand.colors.primary }}>
              {preview.highlight || "In Minutes"}
            </span>
          </h2>

          <p className="text-white/70 max-w-xl text-base md:text-lg">
            {preview.description ||
              "Create, sell & automate your courses with built-in AI, payments, and growth tools."}
          </p>

          {/* BULLETS */}
          <div className="space-y-3 text-sm md:text-base font-medium text-white/80">
            <div>✔ Create courses in minutes</div>
            <div>✔ Accept payments instantly</div>
            <div>✔ Track student progress</div>
            <div>✔ Automate your business</div>
          </div>

          {/* CTA */}
          <motion.div whileHover={{ scale: 1.05 }}>
            <a
              href="#pricing"
              className="inline-block px-8 py-4 font-bold text-sm rounded-xl shadow-lg"
              style={{
                background: brand.colors.primary,
                color: "white",
              }}
            >
              Start Your Platform
            </a>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}