import { useState, useEffect } from "react";
import { useLocation, useParams } from "wouter";
import { categories } from "@/data/stickers";
import { ArrowLeft, Download, CheckCircle2 } from "lucide-react";

interface ApiSticker {
  id: string;
  name: string;
  image: string;
  category: string;
  subcategory: string;
}

export default function StickersPage() {
  const params = useParams<{ categoryId: string; subId: string }>();
  const [, navigate] = useLocation();
  const [downloadedAll, setDownloadedAll] = useState(false);
  const [downloadedIds, setDownloadedIds] = useState<Set<string>>(new Set());
  const [apiStickers, setApiStickers] = useState<ApiSticker[]>([]);

  const category = categories.find((c) => c.id === params.categoryId);
  const sub = category?.subCategories.find((s) => s.id === params.subId);

  useEffect(() => {
    fetch(`/api/stickers/by-sub?category=${params.categoryId}&subcategory=${params.subId}`)
      .then((r) => r.json())
      .then((data) => setApiStickers(data))
      .catch(() => setApiStickers([]));
  }, [params.categoryId, params.subId]);

  if (!category || !sub) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <div className="text-center">
          <p className="text-2xl mb-4">Not found</p>
          <button onClick={() => navigate("/")} className="text-pink-400 hover:text-pink-300">
            ← Back to Home
          </button>
        </div>
      </div>
    );
  }

  const allStickers = [
    ...sub.stickers,
    ...apiStickers.map((s) => ({ id: `api-${s.id}`, name: s.name, image: s.image })),
  ];

  const handleDownloadAll = () => {
    allStickers.forEach((sticker) => {
      const link = document.createElement("a");
      link.href = sticker.image;
      link.download = `${sticker.name}.png`;
      link.target = "_blank";
      link.click();
    });
    setDownloadedAll(true);
    setDownloadedIds(new Set(allStickers.map((s) => s.id)));
    setTimeout(() => setDownloadedAll(false), 3000);
  };

  const handleDownloadSingle = (sticker: { id: string; name: string; image: string }) => {
    const link = document.createElement("a");
    link.href = sticker.image;
    link.download = `${sticker.name}.png`;
    link.target = "_blank";
    link.click();
    setDownloadedIds((prev) => new Set([...prev, sticker.id]));
  };

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
      <div className="fixed inset-0 z-0 bg-black/55" />

      <div className="relative z-10 min-h-screen">
        <header className="pt-10 pb-6 px-4 md:px-8">
          <button
            onClick={() => navigate(`/category/${category.id}`)}
            className="flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-8 group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Back to {category.name}
          </button>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-2">
            <div className="flex items-center gap-3">
              <span className="text-4xl">{sub.icon}</span>
              <div>
                <p className="text-white/50 text-sm font-medium uppercase tracking-wider">
                  {category.name}
                </p>
                <h1 className="text-3xl md:text-4xl font-black text-white">{sub.name}</h1>
              </div>
            </div>

            <button
              onClick={handleDownloadAll}
              className="group flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white transition-all duration-300 focus:outline-none shrink-0"
              style={{
                background: downloadedAll
                  ? "linear-gradient(to right, #10b981, #059669)"
                  : "linear-gradient(to right, #ec4899, #8b5cf6)",
                boxShadow: downloadedAll
                  ? "0 0 20px 4px rgba(16, 185, 129, 0.4)"
                  : "0 0 20px 4px rgba(236, 72, 153, 0.4)",
              }}
            >
              {downloadedAll ? (
                <>
                  <CheckCircle2 className="w-5 h-5" />
                  Downloaded!
                </>
              ) : (
                <>
                  <Download className="w-5 h-5 group-hover:animate-bounce" />
                  Download All ({allStickers.length})
                </>
              )}
            </button>
          </div>
        </header>

        <main className="px-4 md:px-8 pb-16">
          <div className="max-w-6xl mx-auto">
            <p className="text-white/50 text-sm mb-6">{allStickers.length} stickers available</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {allStickers.map((sticker) => (
                <StickerCard
                  key={sticker.id}
                  sticker={sticker}
                  downloaded={downloadedIds.has(sticker.id)}
                  onDownload={() => handleDownloadSingle(sticker)}
                />
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function StickerCard({
  sticker,
  downloaded,
  onDownload,
}: {
  sticker: { id: string; name: string; image: string };
  downloaded: boolean;
  onDownload: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative rounded-2xl overflow-hidden cursor-pointer group"
      style={{
        transform: hovered ? "translateY(-4px) scale(1.05)" : "translateY(0) scale(1)",
        boxShadow: hovered
          ? "0 0 24px 6px rgba(168, 85, 247, 0.5), 0 0 40px 10px rgba(236, 72, 153, 0.2)"
          : "0 0 0px 0px rgba(168, 85, 247, 0)",
        transition: "all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)",
      }}
    >
      <div className="absolute inset-0 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl" />
      <div className="relative p-3">
        <div className="relative aspect-square rounded-xl overflow-hidden mb-2">
          <img src={sticker.image} alt={sticker.name} className="w-full h-full object-cover" />
          <div
            className="absolute inset-0 flex items-center justify-center transition-all duration-200"
            style={{ background: hovered ? "rgba(0,0,0,0.4)" : "transparent" }}
          >
            {hovered && (
              <button
                onClick={onDownload}
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all"
                style={{
                  background: downloaded
                    ? "linear-gradient(to right, #10b981, #059669)"
                    : "linear-gradient(to right, #ec4899, #8b5cf6)",
                }}
              >
                {downloaded ? (
                  <CheckCircle2 className="w-5 h-5 text-white" />
                ) : (
                  <Download className="w-5 h-5 text-white" />
                )}
              </button>
            )}
          </div>
        </div>
        <p className="text-white text-xs font-medium text-center truncate">{sticker.name}</p>
        {downloaded && (
          <p className="text-emerald-400 text-xs text-center mt-0.5">✓ Downloaded</p>
        )}
      </div>
    </div>
  );
}
