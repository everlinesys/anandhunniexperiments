import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import api from "../../shared/api";
import { useBranding } from "../../shared/hooks/useBranding";
import { BookOpen, ChevronRight, Star } from "lucide-react";

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

    return (
        <section className="bg-white overflow-hidden" id="courses">
            <div className="max-w-screen mx-auto px-6 py-10 md:px-16" style={{ backgroundColor: brand.colors.primary }}>
                
                {/* Header */}
                <div className="flex items-center justify-between mb-8 text-white">
                    <h2 className="text-2xl font-bold">Our Courses</h2>
                    <Link
                        to="/courses"
                        className="text-sm font-medium opacity-80 hover:opacity-100 flex items-center gap-1"
                    >
                        See all <ChevronRight size={16} />
                    </Link>
                </div>

                {/* Courses Container: Vertical on mobile, Horizontal on desktop */}
                <div
                    ref={scrollRef}
                    onScroll={handleScroll}
                    className="relative z-10 flex flex-col md:flex-row gap-6 md:overflow-x-auto pb-8 no-scrollbar md:snap-x md:snap-mandatory"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {courses.slice(0, 10).map((course) => (
                        <Link
                            to={`/courses/${course.id}`}
                            key={course.id}
                            // Changed min-width to full on mobile, fixed width on desktop
                            className="w-full md:min-w-[320px] bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 group md:snap-start"
                        >
                            {/* Thumbnail */}
                            <div className="h-48 md:h-44 bg-slate-100 overflow-hidden relative">
                                {course.thumbnail ? (
                                    <img
                                        src={`${api.defaults.baseURL.replace("/api", "")}${course.thumbnail}`}
                                        alt={course.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                                    />
                                ) : (
                                    <div className="h-full flex items-center justify-center text-xs text-slate-400">No Preview</div>
                                )}
                                <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur text-[10px] font-bold uppercase tracking-wider rounded-lg text-slate-800 shadow-sm">
                                    {course.type || "Course"}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6 space-y-3">
                                <div className="flex items-center gap-2">
                                    <div className="w-5 h-5 rounded-md bg-slate-100 flex items-center justify-center text-[10px] font-bold">E</div>
                                    <span className="text-[11px] text-slate-400 font-bold uppercase tracking-tighter">
                                       {brand.siteName || "LMS Platform"}
                                    </span>
                                </div>

                                <h3 className="font-bold text-slate-900 text-lg leading-snug line-clamp-2 h-14 md:h-10">
                                    {course.title}
                                </h3>

                                <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center gap-1 text-amber-500 font-bold text-xs">
                                            <Star size={14} fill="currentColor" /> {course.rating || 4.8}
                                        </div>
                                        <div className="flex items-center gap-1 text-slate-400 font-bold text-xs">
                                            <BookOpen size={14} /> {course.lessonsCount?.toString() || 12} Lessons
                                        </div>
                                    </div>
                                    <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                                        <ChevronRight size={16} />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Hide scrollbar indicators on mobile since it's a vertical list */}
                <div className="hidden md:flex relative z-10 mt-4 justify-center items-center gap-2">
                    <div className="relative w-48 h-1.5 bg-white/20 rounded-full overflow-hidden">
                        <div
                            className="absolute top-0 left-0 h-full bg-white transition-all duration-200 ease-out rounded-full"
                            style={{ width: `${scrollProgress}%` }}
                        />
                    </div>
                    <div className="flex gap-1.5">
                        {[...Array(5)].map((_, i) => (
                            <div
                                key={i}
                                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${(scrollProgress / 20) >= i ? 'bg-white scale-125' : 'bg-white/30'}`}
                            />
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}