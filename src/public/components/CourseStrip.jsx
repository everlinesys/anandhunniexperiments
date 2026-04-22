import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import api from "../../shared/api";
import { useBranding } from "../../shared/hooks/useBranding";
import { BookOpen, ChevronRight, Star } from "lucide-react";
import { motion } from "framer-motion";

export default function FeaturedCoursesStrip() {
  const [courses, setCourses] = useState([]);
  const brand = useBranding();
  const [scrollProgress, setScrollProgress] = useState(0);
  const scrollRef = useRef(null);

  useEffect(() => {
    async function load() {
      try {
        const { data } = await api.get("/courses");
        setCourses(data);
      } catch (err) {
        console.error(err);
      }
    }
    load();
  }, []);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const progress = (scrollLeft / (scrollWidth - clientWidth)) * 100;
      setScrollProgress(progress);
    }
  };

  // 🔥 animation variants
  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 40 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section className="relative overflow-hidden bg-[#0b0f1a] text-white py-20" id="courses">

      {/* 🌈 GLOW */}
      <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-purple-500/20 blur-3xl rounded-full" />
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-green-500/20 blur-3xl rounded-full" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative z-10 max-w-screen mx-auto px-6 md:px-16"
      >

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">

          <div>
            <h2 className="text-3xl md:text-4xl font-black">
              Explore High-Converting Courses
            </h2>

            <p className="text-sm text-white/60 mt-2">
              Built by top educators. Designed to scale.
            </p>
          </div>

          <Link
            to="/courses"
            className="text-sm font-bold flex items-center gap-1 hover:gap-2 transition-all"
          >
            View All <ChevronRight size={16} />
          </Link>
        </div>

        {/* PROOF BAR */}
        <div className="flex flex-wrap gap-4 text-xs font-bold uppercase text-white/50 mb-10">
          <span>₹5L+ Earned</span>
          <span>•</span>
          <span>10,000+ Students</span>
          <span>•</span>
          <span>4.8 Rating</span>
        </div>

        {/* COURSES */}
        <motion.div
          ref={scrollRef}
          onScroll={handleScroll}
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="flex flex-col md:flex-row gap-6 md:overflow-x-auto pb-8 no-scrollbar"
        >
          {courses.slice(0, 10).map((course) => (
            <motion.div
              key={course.id}
              variants={item}
              whileHover={{ y: -8, scale: 1.02 }}
              className="relative w-full md:min-w-[320px] md:max-w-[320px] flex-shrink-0"
            >
              <Link
                to={`/courses/${course.id}`}
                className="block bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-xl"
              >

                {/* 💸 TAG */}
                <div className="absolute top-4 right-4 z-20 px-3 py-1 text-[10px] font-black bg-emerald-400 text-black rounded-lg">
                  ₹{(Math.random() * 50000 + 5000).toFixed(0)}
                </div>

                {/* IMAGE */}
                <div className="h-48 overflow-hidden relative">
                  {course.thumbnail ? (
                    <img
                      src={`${api.defaults.baseURL.replace("/api", "")}${course.thumbnail}`}
                      alt={course.title}
                      className="w-full h-full object-cover transition duration-700 hover:scale-110"
                    />
                  ) : (
                    <div className="h-full flex items-center justify-center text-xs text-white/40">
                      No Preview
                    </div>
                  )}

                  <div className="absolute top-4 left-4 px-3 py-1 bg-white/10 text-[10px] font-bold rounded-lg">
                    {course.type || "Course"}
                  </div>
                </div>

                {/* CONTENT */}
                <div className="p-6 space-y-3">

                  <div className="flex items-center gap-2 text-white/50 text-[11px] uppercase">
                    {brand.siteName}
                  </div>

                  <h3 className="font-bold text-lg text-white">
                    {course.title}
                  </h3>

                  {/* STATS */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/10">

                    <div className="flex items-center gap-3 text-xs">

                      <div className="flex items-center gap-1 text-amber-400 font-bold">
                        <Star size={14} fill="currentColor" /> {course.rating || 4.8}
                      </div>

                      <div className="flex items-center gap-1 text-white/50">
                        <BookOpen size={14} /> {course.lessonsCount || 12}
                      </div>

                    </div>

                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-emerald-500 transition">
                      <ChevronRight size={16} />
                    </div>

                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* SCROLL BAR */}
        <div className="hidden md:flex mt-6 justify-center">
          <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-white transition-all duration-200"
              style={{ width: `${scrollProgress}%` }}
            />
          </div>
        </div>

      </motion.div>
    </section>
  );
}