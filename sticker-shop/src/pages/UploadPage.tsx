import { useState } from "react";
import { useLocation } from "wouter";
import { ArrowLeft, Upload, CheckCircle2, AlertCircle } from "lucide-react";
import { categories } from "@/data/stickers";

export default function UploadPage() {
  const [, navigate] = useLocation();
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const selectedCategory = categories.find((c) => c.id === category);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !image || !category || !subcategory) {
      setStatus("error");
      setMessage("Please fill in all fields.");
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, image, category, subcategory }),
      });
      if (!res.ok) throw new Error("Upload failed");
      setStatus("success");
      setMessage("Sticker submitted! It will appear after admin approval.");
      setName("");
      setImage("");
      setCategory("");
      setSubcategory("");
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="fixed inset-0 z-0"
        style={{ backgroundImage: "url(/background.jpg)", backgroundSize: "cover", backgroundPosition: "center" }} />
      <div className="fixed inset-0 z-0 bg-black/55" />

      <div className="relative z-10 min-h-screen px-4 py-10 md:px-8">
        <button onClick={() => navigate("/")}
          className="flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-8 group">
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </button>

        <div className="max-w-lg mx-auto">
          <div className="text-center mb-8">
            <div className="text-5xl mb-3">📤</div>
            <h1 className="text-3xl font-black text-white">Upload a Sticker</h1>
            <p className="text-white/60 mt-1">Submit your sticker for review. It goes live after admin approval.</p>
          </div>

          <div className="relative rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl" />
            <form onSubmit={handleSubmit} className="relative p-6 flex flex-col gap-5">

              <div className="flex flex-col gap-1.5">
                <label className="text-white/70 text-sm font-medium">Sticker Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Scorpion Fatality"
                  className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/30 outline-none focus:border-pink-400 transition-colors"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-white/70 text-sm font-medium">Image URL</label>
                <input
                  type="url"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="https://example.com/sticker.png"
                  className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/30 outline-none focus:border-pink-400 transition-colors"
                />
                {image && (
                  <div className="mt-2 rounded-xl overflow-hidden w-24 h-24 border border-white/20">
                    <img src={image} alt="preview" className="w-full h-full object-cover"
                      onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }} />
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-white/70 text-sm font-medium">Category</label>
                <select
                  value={category}
                  onChange={(e) => { setCategory(e.target.value); setSubcategory(""); }}
                  className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white outline-none focus:border-pink-400 transition-colors appearance-none"
                >
                  <option value="" className="bg-gray-900">Select category...</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id} className="bg-gray-900">{c.name}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-white/70 text-sm font-medium">Sub-Category</label>
                <select
                  value={subcategory}
                  onChange={(e) => setSubcategory(e.target.value)}
                  disabled={!category}
                  className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white outline-none focus:border-pink-400 transition-colors appearance-none disabled:opacity-40"
                >
                  <option value="" className="bg-gray-900">Select sub-category...</option>
                  {selectedCategory?.subCategories.map((s) => (
                    <option key={s.id} value={s.id} className="bg-gray-900">{s.name}</option>
                  ))}
                </select>
              </div>

              {status === "success" && (
                <div className="flex items-center gap-2 bg-emerald-500/20 border border-emerald-500/30 rounded-xl px-4 py-3 text-emerald-300">
                  <CheckCircle2 className="w-5 h-5 shrink-0" />
                  <p className="text-sm">{message}</p>
                </div>
              )}
              {status === "error" && (
                <div className="flex items-center gap-2 bg-red-500/20 border border-red-500/30 rounded-xl px-4 py-3 text-red-300">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <p className="text-sm">{message}</p>
                </div>
              )}

              <button type="submit" disabled={status === "loading"}
                className="flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-white transition-all duration-300 disabled:opacity-60"
                style={{ background: "linear-gradient(to right, #ec4899, #8b5cf6)", boxShadow: "0 0 20px 4px rgba(236,72,153,0.3)" }}>
                <Upload className="w-5 h-5" />
                {status === "loading" ? "Submitting..." : "Submit Sticker"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
