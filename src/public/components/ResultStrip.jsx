import { useBranding } from "../../shared/hooks/useBranding";
import { motion } from "framer-motion";

export default function ResultsStrip() {
  const brand = useBranding();

  const results = brand.results || [
    { label: "Students Qualified", value: "200+" },
    { label: "Top Rank", value: "AIR 120" },
    { label: "Success Rate", value: "85%" },
    { label: "Avg Score", value: "620+" },
  ];

  // animation system
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
    <section className="relative py-16 bg-[#0b0f1a] text-white overflow-hidden">

      {/* glow */}
      <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-purple-500/20 blur-3xl rounded-full" />
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-green-500/20 blur-3xl rounded-full" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-black">
            Proven Results That Matter
          </h2>

          <p className="text-white/60 mt-3">
            Real students. Real ranks. Real success.
          </p>
        </motion.div>

        {/* RESULTS GRID */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {results.map((r, i) => (
            <motion.div
              key={i}
              variants={item}
              whileHover={{ scale: 1.05 }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-center shadow-xl"
            >

              <div
                className="text-3xl md:text-4xl font-black mb-2 "
                style={{ color:"white" }}
              >
                {r.value}
              </div>

              <div className="text-xs uppercase tracking-wide text-white/60 font-bold">
                {r.label}
              </div>

            </motion.div>
          ))}
        </motion.div>

        {/* TOPPERS STRIP */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12 flex flex-wrap justify-center gap-4 text-sm font-bold text-white/70"
        >
          <span>🏆 AIR 120</span>
          <span>•</span>
          <span>🏆 AIR 340</span>
          <span>•</span>
          <span>🏆 AIR 890</span>
        </motion.div>

      </div>
    </section>
  );
}