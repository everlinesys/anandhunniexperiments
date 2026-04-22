import { useNavigate } from "react-router-dom";
import { useBranding } from "../../shared/hooks/useBranding";

export default function CTASection() {
  const navigate = useNavigate();
  const brand = useBranding();

  return (
    <section className="relative overflow-hidden py-20">

      {/* 🌈 BACKGROUND GLOW */}
      <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-purple-500/20 blur-3xl rounded-full" />
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-green-500/20 blur-3xl rounded-full" />

      <div
        className="relative z-10 max-w-6xl mx-auto px-6 text-center space-y-8 rounded-3xl py-16"
        style={{ background: brand.colors.primary }}
      >

        {/* 🔥 HEADLINE */}
        <h2 className="text-3xl md:text-5xl font-black leading-tight">
          {brand.cta?.title ||
            "Start Your Learning Platform Today"}
        </h2>

        {/* 💬 SUBTEXT */}
        <p className="text-white/80 max-w-xl mx-auto text-base md:text-lg">
          {brand.cta?.subtitle ||
            `Join thousands of educators already using ${brand.siteName} to create, sell, and scale their courses.`}
        </p>

        {/* 📊 PROOF BAR */}
        <div className="flex flex-wrap justify-center gap-4 text-xs font-bold uppercase text-white/70">
          {(brand.cta?.stats || [
            "10,000+ Students",
            "₹5L+ Earnings",
            "500+ Educators",
          ]).map((item, i) => (
            <span key={i}>{item}</span>
          ))}
        </div>

        {/* ⏳ URGENCY */}
        <div className="text-sm font-bold bg-yellow-400 text-black inline-block px-4 py-2 rounded-full">
          🚨 Limited Offer – Price Increasing Soon
        </div>

        {/* 🚀 CTA BUTTON */}
        <div className="pt-4">
          <button
            onClick={() => navigate("/register")}
            className="px-10 py-4 font-black text-sm rounded-full shadow-xl hover:scale-105 transition"
            style={{
              backgroundColor: brand.colors.accent,
              color: brand.colors.primary,
            }}
          >
            🚀 Get Started Now
          </button>
        </div>

        {/* 💡 MICRO TRUST */}
        <p className="text-xs text-white/50">
          No setup fee • Instant access • Cancel anytime
        </p>

      </div>
    </section>
  );
}