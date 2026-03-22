import { useState } from "react";
import { useLocation, useParams } from "wouter";
import { categories } from "@/data/stickers";
import { ArrowLeft } from "lucide-react";

export default function CategoryPage() {
  const params = useParams<{ categoryId: string }>();
  const [, navigate] = useLocation();

  const category = categories.find((c) => c.id === params.categoryId);

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <div className="text-center">
          <p className="text-2xl mb-4">Category not found</p>
          <button
            onClick={() => navigate("/")}
            className="text-pink-400 hover:text-pink-300"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    );
  }

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
      <div className="fixed inset-0 z-0 bg-black/50" />

      <div className="relative z-10 min-h-screen">
        <header className="pt-10 pb-6 px-4 md:px-8">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-8 group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Back to Categories
          </button>
          <div className="flex items-center gap-4 mb-2">
            <span className="text-5xl">{category.icon}</span>
            <div>
              <h1 className="text-4xl md:text-5xl font-black text-white">
                {category.name}
              </h1>
              <p className="text-white/60 mt-1">{category.description}</p>
            </div>
          </div>
        </header>

        <main className="px-4 md:px-8 pb-16">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-white/70 text-sm font-semibold uppercase tracking-widest mb-6">
              Select a Sub-Category
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {category.subCategories.map((sub) => (
                <SubCategoryCard
                  key={sub.id}
                  sub={sub}
                  onClick={() =>
                    navigate(`/category/${category.id}/${sub.id}`)
                  }
                />
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function SubCategoryCard({
  sub,
  onClick,
}: {
  sub: { id: string; name: string; icon: string; stickers: unknown[] };
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative text-left rounded-2xl overflow-hidden cursor-pointer focus:outline-none"
      style={{
        transform: hovered ? "translateY(-6px) scale(1.03)" : "translateY(0) scale(1)",
        boxShadow: hovered
          ? "0 0 28px 6px rgba(168, 85, 247, 0.55), 0 0 50px 12px rgba(236, 72, 153, 0.25)"
          : "0 0 0px 0px rgba(168, 85, 247, 0)",
        transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/20 rounded-2xl" />
      {hovered && (
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-pink-500/15 via-purple-500/15 to-violet-500/15" />
      )}
      <div className="relative p-6 flex flex-col items-center text-center gap-3">
        <div
          className="text-5xl transition-all duration-300"
          style={{
            transform: hovered ? "scale(1.2)" : "scale(1)",
          }}
        >
          {sub.icon}
        </div>
        <div>
          <h3 className="text-white font-bold text-lg">{sub.name}</h3>
          <p className="text-white/50 text-sm mt-0.5">
            {(sub.stickers as unknown[]).length} stickers
          </p>
        </div>
        <div
          className="mt-1 px-3 py-1 rounded-full text-xs font-semibold transition-all duration-300"
          style={{
            background: hovered
              ? "linear-gradient(to right, #ec4899, #8b5cf6)"
              : "rgba(255,255,255,0.1)",
            color: "white",
          }}
        >
          View Stickers
        </div>
      </div>
    </button>
  );
}
