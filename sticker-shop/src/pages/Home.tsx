import { useState, useRef } from "react";
import { useLocation } from "wouter";
import { categories } from "@/data/stickers";
import { Search, Upload, ShieldCheck } from "lucide-react";

export default function Home() {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const [, navigate] = useLocation();
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = categories.filter(
    (c) =>
      query === "" ||
      c.name.toLowerCase().includes(query.toLowerCase()) ||
      c.description.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: "url(/background.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div className="fixed inset-0 z-0 bg-black/40" />

      <div className="relative z-10 min-h-screen flex flex-col">
        <header className="pt-10 pb-8 text-center px-4">
          <div className="flex justify-end gap-2 mb-6 max-w-6xl mx-auto">
            <button
              onClick={() => navigate("/upload")}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-white border border-white/20 hover:border-pink-400/50 transition-all"
              style={{ background: "rgba(236,72,153,0.15)" }}
            >
              <Upload className="w-4 h-4" />
              Upload Sticker
            </button>
            <button
              onClick={() => navigate("/admin")}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-white border border-white/20 hover:border-violet-400/50 transition-all"
              style={{ background: "rgba(139,92,246,0.15)" }}
            >
              <ShieldCheck className="w-4 h-4" />
              Admin
            </button>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-3 tracking-tight drop-shadow-2xl">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-violet-400">
              StickerVault
            </span>
          </h1>
          <p className="text-white/70 text-lg md:text-xl font-medium">
            Download premium stickers for every vibe
          </p>
        </header>

        <div className="flex justify-center px-4 mb-12">
          <div
            className={`relative w-full max-w-xl transition-all duration-300 ${
              focused ? "scale-105" : "scale-100"
            }`}
          >
            <div
              className={`absolute inset-0 rounded-2xl transition-all duration-300 blur-md ${
                focused
                  ? "bg-gradient-to-r from-pink-500 via-purple-500 to-violet-500 opacity-80"
                  : "bg-gradient-to-r from-pink-500/30 via-purple-500/30 to-violet-500/30 opacity-50"
              }`}
            />
            <div className="relative flex items-center bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden">
              <Search
                className={`ml-4 transition-all duration-300 ${
                  focused ? "text-pink-300 w-6 h-6" : "text-white/50 w-5 h-5"
                }`}
              />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search stickers, games, anime..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                className="flex-1 bg-transparent px-4 py-4 text-white placeholder-white/40 outline-none text-lg"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="mr-4 text-white/40 hover:text-white transition-colors text-xl font-bold"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="flex-1 px-4 pb-16">
          <div className="max-w-6xl mx-auto">
            {query && filtered.length === 0 ? (
              <div className="text-center text-white/60 text-lg mt-12">
                No categories found for "{query}"
              </div>
            ) : (
              <>
                <h2 className="text-white/80 text-sm font-semibold uppercase tracking-widest mb-6 text-center">
                  {query ? `Results for "${query}"` : "Browse Categories"}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {filtered.map((category) => (
                    <CategoryCard
                      key={category.id}
                      category={category}
                      onClick={() => navigate(`/category/${category.id}`)}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function CategoryCard({
  category,
  onClick,
}: {
  category: (typeof categories)[number];
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative group text-left rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 focus:outline-none"
      style={{
        transform: hovered ? "translateY(-6px) scale(1.03)" : "translateY(0) scale(1)",
        boxShadow: hovered
          ? "0 0 30px 8px rgba(168, 85, 247, 0.6), 0 0 60px 16px rgba(236, 72, 153, 0.3)"
          : "0 0 0px 0px rgba(168, 85, 247, 0)",
        transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/20 rounded-2xl" />
      {hovered && (
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-pink-500/20 via-purple-500/20 to-violet-500/20 animate-pulse" />
      )}
      <div className="relative p-8 flex flex-col items-center text-center gap-4">
        <div
          className="text-6xl transition-all duration-300"
          style={{ transform: hovered ? "scale(1.2) rotate(-5deg)" : "scale(1) rotate(0deg)" }}
        >
          {category.icon}
        </div>
        <div>
          <h3 className="text-white font-bold text-xl mb-1">{category.name}</h3>
          <p className="text-white/60 text-sm">{category.description}</p>
        </div>
        <div className="text-white/40 text-xs mt-1">
          {category.subCategories.length} sub-categories
        </div>
        <div
          className="mt-2 px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-300"
          style={{
            background: hovered
              ? "linear-gradient(to right, #ec4899, #8b5cf6)"
              : "rgba(255,255,255,0.1)",
            color: "white",
          }}
        >
          Explore →
        </div>
      </div>
    </button>
  );
}
