import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { ArrowLeft, CheckCircle2, XCircle, RefreshCw, Clock, ShieldCheck, Eye, EyeOff } from "lucide-react";

// ⬇ Change this to your own secret password
const ADMIN_PASSWORD = "LEGION_KING";

interface PendingSticker {
  id: string;
  name: string;
  image: string;
  category: string;
  subcategory: string;
  uploaded_at: string;
}

function PasswordGate({ onUnlock }: { onUnlock: () => void }) {
  const [, navigate] = useLocation();
  const [input, setInput] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input === ADMIN_PASSWORD) {
      sessionStorage.setItem("admin_auth", "1");
      onUnlock();
    } else {
      setError(true);
      setInput("");
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center">
      <div className="fixed inset-0 z-0"
        style={{ backgroundImage: "url(/background.jpg)", backgroundSize: "cover", backgroundPosition: "center" }} />
      <div className="fixed inset-0 z-0 bg-black/65" />

      <div className="relative z-10 w-full max-w-sm px-4">
        <button onClick={() => navigate("/")}
          className="flex items-center gap-2 text-white/50 hover:text-white transition-colors mb-8 group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </button>

        <div className="relative rounded-2xl overflow-hidden">
          <div className={`absolute inset-0 backdrop-blur-md border rounded-2xl transition-colors duration-300 ${
            error ? "bg-red-500/15 border-red-500/40" : "bg-white/8 border-white/15"
          }`} />
          <form onSubmit={handleSubmit} className="relative p-8 flex flex-col items-center gap-5">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center"
              style={{ background: "linear-gradient(to bottom right, #ec4899, #8b5cf6)" }}>
              <ShieldCheck className="w-7 h-7 text-white" />
            </div>

            <div className="text-center">
              <h1 className="text-xl font-bold text-white">Admin Access</h1>
              <p className="text-white/45 text-sm mt-1">Enter your password to continue</p>
            </div>

            <div className="w-full relative">
              <input
                type={show ? "text" : "password"}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Password"
                autoFocus
                className={`w-full bg-white/10 border rounded-xl px-4 py-3 pr-11 text-white placeholder-white/30 outline-none transition-colors ${
                  error ? "border-red-400/60" : "border-white/20 focus:border-pink-400"
                }`}
              />
              <button type="button" onClick={() => setShow((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors">
                {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {error && (
              <p className="text-red-400 text-sm -mt-2">Incorrect password. Try again.</p>
            )}

            <button type="submit"
              className="w-full py-3 rounded-xl font-bold text-white transition-all hover:brightness-110 active:scale-95"
              style={{ background: "linear-gradient(to right, #ec4899, #8b5cf6)", boxShadow: "0 0 20px 4px rgba(236,72,153,0.25)" }}>
              Unlock
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function AdminPage() {
  const [, navigate] = useLocation();
  const [authed, setAuthed] = useState(() => sessionStorage.getItem("admin_auth") === "1");
  const [pending, setPending] = useState<PendingSticker[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionId, setActionId] = useState<string | null>(null);

  const fetchPending = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/pending");
      const data = await res.json();
      setPending(data);
    } catch {
      console.error("Failed to fetch pending stickers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authed) fetchPending();
  }, [authed]);

  if (!authed) {
    return <PasswordGate onUnlock={() => setAuthed(true)} />;
  }

  const handleApprove = async (id: string) => {
    setActionId(id);
    try {
      const res = await fetch(`/api/approve/${id}`, { method: "POST" });
      if (res.ok) setPending((prev) => prev.filter((s) => s.id !== id));
    } catch {
      console.error("Failed to approve");
    } finally {
      setActionId(null);
    }
  };

  const handleReject = async (id: string) => {
    setActionId(id);
    try {
      const res = await fetch(`/api/stickers/${id}`, { method: "DELETE" });
      if (res.ok) setPending((prev) => prev.filter((s) => s.id !== id));
    } catch {
      console.error("Failed to reject");
    } finally {
      setActionId(null);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("admin_auth");
    setAuthed(false);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="fixed inset-0 z-0"
        style={{ backgroundImage: "url(/background.jpg)", backgroundSize: "cover", backgroundPosition: "center" }} />
      <div className="fixed inset-0 z-0 bg-black/60" />

      <div className="relative z-10 min-h-screen px-4 py-10 md:px-8">
        <button onClick={() => navigate("/")}
          className="flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-8 group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </button>

        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-black text-white flex items-center gap-2">
                <ShieldCheck className="w-6 h-6 text-violet-400" />
                Admin Panel
              </h1>
              <p className="text-white/50 text-sm mt-0.5">Approve or reject submitted stickers</p>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={fetchPending}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm text-white/60 hover:text-white border border-white/15 hover:border-white/30 transition-all">
                <RefreshCw className="w-3.5 h-3.5" />
                Refresh
              </button>
              <button onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm text-white/60 hover:text-red-400 border border-white/15 hover:border-red-400/30 transition-all">
                Logout
              </button>
            </div>
          </div>

          {loading ? (
            <div className="text-center text-white/40 py-24">Loading...</div>
          ) : pending.length === 0 ? (
            <div className="relative rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-white/8 backdrop-blur-md border border-white/15 rounded-2xl" />
              <div className="relative py-24 text-center">
                <div className="text-4xl mb-4">✅</div>
                <p className="text-white font-semibold text-lg">All caught up!</p>
                <p className="text-white/40 text-sm mt-1">No stickers waiting for approval.</p>
              </div>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-2 mb-5">
                <Clock className="w-4 h-4 text-amber-400" />
                <span className="text-white/60 text-sm">
                  {pending.length} sticker{pending.length !== 1 ? "s" : ""} awaiting review
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {pending.map((sticker) => (
                  <StickerReviewCard
                    key={sticker.id}
                    sticker={sticker}
                    isActing={actionId === sticker.id}
                    onApprove={() => handleApprove(sticker.id)}
                    onReject={() => handleReject(sticker.id)}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function StickerReviewCard({
  sticker,
  isActing,
  onApprove,
  onReject,
}: {
  sticker: PendingSticker;
  isActing: boolean;
  onApprove: () => void;
  onReject: () => void;
}) {
  return (
    <div className="relative rounded-2xl overflow-hidden">
      <div className="absolute inset-0 bg-white/8 backdrop-blur-md border border-white/15 rounded-2xl" />
      <div className="relative p-4 flex flex-col gap-3">
        <div className="aspect-square rounded-xl overflow-hidden bg-black/20">
          <img
            src={sticker.image}
            alt={sticker.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src =
                "https://placehold.co/200x200/1a1a2e/ffffff?text=No+Image";
            }}
          />
        </div>
        <div>
          <div className="flex items-center justify-between gap-2">
            <p className="text-white font-semibold text-base truncate">{sticker.name}</p>
            <span className="shrink-0 text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
              Pending
            </span>
          </div>
          <p className="text-white/40 text-xs mt-1 capitalize">
            {sticker.category} › {sticker.subcategory}
          </p>
          {sticker.uploaded_at && (
            <p className="text-white/25 text-xs mt-0.5">
              {new Date(sticker.uploaded_at).toLocaleDateString()}
            </p>
          )}
        </div>
        <div className="flex gap-2 pt-1">
          <button
            onClick={onApprove}
            disabled={isActing}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all disabled:opacity-40 hover:brightness-110 active:scale-95"
            style={{ background: "linear-gradient(to right, #10b981, #059669)" }}
          >
            <CheckCircle2 className="w-4 h-4" />
            Approve
          </button>
          <button
            onClick={onReject}
            disabled={isActing}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all disabled:opacity-40 hover:brightness-110 active:scale-95"
            style={{ background: "linear-gradient(to right, #ef4444, #dc2626)" }}
          >
            <XCircle className="w-4 h-4" />
            Reject
          </button>
        </div>
      </div>
    </div>
  );
}
