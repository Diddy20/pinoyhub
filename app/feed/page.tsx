"use client";
import { useState } from "react";
import Link from "next/link";

const spaces = [
  { slug: "nurses", name: "Nurses PH", icon: "🏥", accent: "#0F6E56" },
  { slug: "teachers", name: "Teachers PH", icon: "📚", accent: "#185FA5" },
  { slug: "gamers", name: "Pinoy Gamers", icon: "🎮", accent: "#534AB7" },
  { slug: "ofw", name: "OFW Community", icon: "✈️", accent: "#854F0B" },
  { slug: "freelancers", name: "Pinoy Freelancers", icon: "💻", accent: "#993C1D" },
];

const posts = [
  {
    id: 1, space: "Nurses PH", spaceSlug: "nurses", spaceColor: "#E1F5EE", spaceAccent: "#0F6E56",
    author: "Maria Santos", authorInitials: "MS", authorRole: "ICU Nurse · Cebu",
    time: "2h ago", title: "How do I register for NCLEX from the Philippines in 2025?",
    body: "Hi community! I applied already but I'm confused about the PearsonVUE process. Has anyone gone through this recently? Are the steps different from 2023?",
    likes: 61, comments: 44, isPremium: false, isHot: true,
  },
  {
    id: 2, space: "Nurses PH", spaceSlug: "nurses", spaceColor: "#E1F5EE", spaceAccent: "#0F6E56",
    author: "Admin Team", authorInitials: "AT", authorRole: "Official",
    time: "5h ago", title: "Complete NCLEX Study Guide 2025 + 200 practice questions with rationale",
    body: "This guide covers all eight NCLEX-RN test plan categories with updated 2025 content including Next Generation NCLEX formats...",
    likes: 204, comments: 88, isPremium: true, isHot: false,
  },
  {
    id: 3, space: "OFW Community", spaceSlug: "ofw", spaceColor: "#FAEEDA", spaceAccent: "#854F0B",
    author: "Rose Garcia", authorInitials: "RG", authorRole: "OFW · Dubai",
    time: "1d ago", title: "Honest salary comparison: Philippines vs Singapore vs Dubai vs Canada",
    body: "Based on my 6 years of experience and network, here's a breakdown. Philippines (gov hospital): ₱18–25k/mo. Singapore: S$2,800–3,400. Dubai: AED 6,000–8,500...",
    likes: 128, comments: 91, isPremium: false, isHot: true,
  },
  {
    id: 4, space: "Pinoy Freelancers", spaceSlug: "freelancers", spaceColor: "#FAECE7", spaceAccent: "#993C1D",
    author: "Juan dela Cruz", authorInitials: "JD", authorRole: "Freelancer · Manila",
    time: "3h ago", title: "How I went from ₱15k/mo to $3,000/mo in 18 months — my honest journey",
    body: "A lot of people ask me how I scaled my freelance income. I'll share everything — the good, bad, and the platforms that actually worked for me...",
    likes: 312, comments: 156, isPremium: false, isHot: true,
  },
  {
    id: 5, space: "Pinoy Gamers", spaceSlug: "gamers", spaceColor: "#EEEDFE", spaceAccent: "#534AB7",
    author: "Mark Reyes", authorInitials: "MR", authorRole: "Gamer · Davao",
    time: "6h ago", title: "Best budget gaming PC build under ₱25,000 in 2025",
    body: "I just built my setup last week and wanted to share the parts list. Total came out to ₱24,800 and it runs Valorant at 144fps easily...",
    likes: 89, comments: 63, isPremium: false, isHot: false,
  },
];

const categories = ["All posts", "NCLEX Prep", "Jobs Abroad", "Local Hospitals", "Tips & Cases", "Licensure"];

export default function FeedPage() {
  const [activeCategory, setActiveCategory] = useState("All posts");
  const [likedPosts, setLikedPosts] = useState<number[]>([]);
  const [activeSpace, setActiveSpace] = useState<string | null>(null);
  const [showCompose, setShowCompose] = useState(false);
  const [composeText, setComposeText] = useState("");

  const toggleLike = (id: number) => {
    setLikedPosts((p) => p.includes(id) ? p.filter((x) => x !== id) : [...p, id]);
  };

  const filteredPosts = activeSpace
    ? posts.filter((p) => p.spaceSlug === activeSpace)
    : posts;

  return (
    <main style={{ fontFamily: "'DM Sans', sans-serif", background: "#0A0A0F", minHeight: "100vh", color: "#F0EFF8" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&family=Syne:wght@700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #0A0A0F; }
        a { text-decoration: none; color: inherit; }
        .post-card { background: #13121E; border: 1px solid #1E1D2E; border-radius: 14px; padding: 18px 20px; margin-bottom: 10px; transition: border-color 0.2s; }
        .post-card:hover { border-color: #2A2940; }
        .act-btn { background: none; border: none; cursor: pointer; display: flex; align-items: center; gap: 5px; font-size: 12px; color: #3A3960; font-family: 'DM Sans', sans-serif; padding: 5px 8px; border-radius: 6px; transition: all 0.15s; }
        .act-btn:hover { background: #1E1D2E; color: #A09EEA; }
        .act-btn.liked { color: #E05C8A; }
        .cat-pill { padding: 6px 14px; border-radius: 20px; font-size: 12px; cursor: pointer; white-space: nowrap; border: none; font-family: 'DM Sans', sans-serif; font-weight: 500; transition: all 0.2s; }
        .cat-pill.on { background: #534AB7; color: #EEEDFE; }
        .cat-pill.off { background: #13121E; color: #6B6A8A; border: 1px solid #1E1D2E; }
        .cat-pill.off:hover { border-color: #534AB7; color: #A09EEA; }
        .space-pill { display: flex; align-items: center; gap: 6px; padding: 7px 10px; border-radius: 8px; cursor: pointer; transition: all 0.2s; border: 1px solid transparent; }
        .space-pill:hover { background: #13121E; }
        .space-pill.active { background: #13121E; border-color: #2A2940; }
        .sw-card { background: #13121E; border: 1px solid #1E1D2E; border-radius: 12px; padding: 14px; margin-bottom: 10px; }
        .compose-area { background: #13121E; border: 1px solid #2A2940; border-radius: 12px; padding: 12px 16px; margin-bottom: 14px; }
        textarea { width: 100%; background: transparent; border: none; outline: none; color: #F0EFF8; font-family: 'DM Sans', sans-serif; font-size: 14px; resize: none; line-height: 1.6; }
        textarea::placeholder { color: #3A3960; }
        .btn-post { background: #534AB7; color: #EEEDFE; border: none; border-radius: 8px; padding: 7px 16px; font-size: 13px; font-weight: 500; cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all 0.2s; }
        .btn-post:hover { background: #3C3489; }
        .upgrade-card { border: 1.5px solid #534AB7; border-radius: 12px; padding: 16px; background: #0F0E1C; margin-bottom: 10px; }
        .premium-blur { filter: blur(4px); user-select: none; pointer-events: none; }
        .lock-bar { background: #1A1830; border: 1px solid #2A2940; border-radius: 8px; padding: 10px 14px; display: flex; align-items: center; justify-content: space-between; margin-top: 6px; }
        .online-dot { width: 7px; height: 7px; border-radius: 50%; background: #4ADE80; display: inline-block; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #0A0A0F; }
        ::-webkit-scrollbar-thumb { background: #2A2940; border-radius: 2px; }
      `}</style>

      {/* NAV */}
      <nav style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(10,10,15,0.96)", backdropFilter: "blur(16px)", borderBottom: "1px solid #1E1D2E", padding: "0 24px", height: "56px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{ width: "30px", height: "30px", borderRadius: "8px", background: "linear-gradient(135deg,#534AB7,#3C3489)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "15px" }}>🇵🇭</div>
          <span style={{ fontFamily: "'Syne', sans-serif", fontSize: "16px", fontWeight: 800, color: "#F0EFF8", letterSpacing: "-0.02em" }}>PinoyHub</span>
        </Link>

        <div style={{ flex: 1, maxWidth: "400px", margin: "0 24px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", background: "#13121E", border: "1px solid #2A2940", borderRadius: "8px", padding: "7px 12px" }}>
            <svg width="13" height="13" fill="none" stroke="#3A3960" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
            <input style={{ background: "transparent", border: "none", outline: "none", color: "#F0EFF8", fontFamily: "'DM Sans', sans-serif", fontSize: "13px", width: "100%" }} placeholder="Search posts, people, topics..." />
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ position: "relative", cursor: "pointer" }}>
            <svg width="18" height="18" fill="none" stroke="#6B6A8A" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"/></svg>
            <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#E05C8A", position: "absolute", top: "-1px", right: "-1px", border: "1.5px solid #0A0A0F" }} />
          </div>
          <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "linear-gradient(135deg,#534AB7,#3C3489)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: 500, color: "#EEEDFE", cursor: "pointer" }}>JD</div>
        </div>
      </nav>

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "20px 24px", display: "grid", gridTemplateColumns: "200px 1fr 220px", gap: "16px" }}>

        {/* LEFT SIDEBAR */}
        <aside>
          <div style={{ position: "sticky", top: "76px" }}>
            <p style={{ fontSize: "10px", color: "#3A3960", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "10px" }}>My Spaces</p>
            {spaces.map((s) => (
              <div key={s.slug} className={`space-pill ${activeSpace === s.slug ? "active" : ""}`} onClick={() => setActiveSpace(activeSpace === s.slug ? null : s.slug)}>
                <span style={{ fontSize: "16px" }}>{s.icon}</span>
                <span style={{ fontSize: "13px", color: activeSpace === s.slug ? "#F0EFF8" : "#6B6A8A", fontWeight: activeSpace === s.slug ? 500 : 400 }}>{s.name}</span>
              </div>
            ))}
            <div style={{ marginTop: "16px", paddingTop: "16px", borderTop: "1px solid #1E1D2E" }}>
              <Link href="/spaces">
                <div style={{ display: "flex", alignItems: "center", gap: "6px", padding: "7px 10px", borderRadius: "8px", cursor: "pointer", color: "#534AB7", fontSize: "13px", fontWeight: 500 }}>
                  <span>+</span> Explore more spaces
                </div>
              </Link>
            </div>
          </div>
        </aside>

        {/* MAIN FEED */}
        <main>
          {/* Hero bar */}
          <div style={{ background: "#13121E", border: "1px solid #1E1D2E", borderRadius: "14px", padding: "16px 20px", marginBottom: "14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: "18px", fontWeight: 700, color: "#F0EFF8", letterSpacing: "-0.02em" }}>Welcome back, Juan 👋</div>
              <div style={{ fontSize: "12px", color: "#6B6A8A", marginTop: "2px" }}>Stay connected with 22,000+ Filipinos.</div>
            </div>
            <div style={{ display: "flex", gap: "20px", textAlign: "right" }}>
              <div><div style={{ fontFamily: "'Syne', sans-serif", fontSize: "18px", fontWeight: 700, color: "#F0EFF8" }}>22,581</div><div style={{ fontSize: "10px", color: "#6B6A8A" }}>Members</div></div>
              <div><div style={{ fontFamily: "'Syne', sans-serif", fontSize: "18px", fontWeight: 700, color: "#4ADE80" }}>134</div><div style={{ fontSize: "10px", color: "#6B6A8A" }}>Online</div></div>
            </div>
          </div>

          {/* Category strip */}
          <div style={{ display: "flex", gap: "6px", marginBottom: "14px", overflowX: "auto", paddingBottom: "4px" }}>
            {categories.map((c) => (
              <button key={c} className={`cat-pill ${activeCategory === c ? "on" : "off"}`} onClick={() => setActiveCategory(c)}>{c}</button>
            ))}
          </div>

          {/* Compose box */}
          <div className="compose-area">
            <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
              <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "linear-gradient(135deg,#534AB7,#3C3489)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: 500, color: "#EEEDFE", flexShrink: 0 }}>JD</div>
              <textarea
                rows={showCompose ? 3 : 1}
                placeholder="Share something with the community..."
                value={composeText}
                onFocus={() => setShowCompose(true)}
                onChange={(e) => setComposeText(e.target.value)}
              />
            </div>
            {showCompose && (
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "10px", paddingTop: "10px", borderTop: "1px solid #1E1D2E" }}>
                <div style={{ display: "flex", gap: "8px" }}>
                  {["📷 Photo", "🔗 Link"].map((item) => (
                    <button key={item} style={{ background: "none", border: "1px solid #2A2940", borderRadius: "6px", padding: "5px 10px", color: "#6B6A8A", fontSize: "12px", cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>{item}</button>
                  ))}
                </div>
                <button className="btn-post" disabled={!composeText.trim()}>Post</button>
              </div>
            )}
          </div>

          {/* Posts */}
          {filteredPosts.map((post) => (
            <div key={post.id} className="post-card">
              {/* Space tag */}
              <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "10px" }}>
                <div style={{ background: post.spaceColor, borderRadius: "4px", padding: "2px 7px", fontSize: "10px", fontWeight: 500, color: post.spaceAccent }}>{post.space}</div>
                {post.isHot && <div style={{ background: "#2A1010", borderRadius: "4px", padding: "2px 7px", fontSize: "10px", fontWeight: 500, color: "#E05C8A" }}>🔥 Hot</div>}
                {post.isPremium && <div style={{ background: "#1E1A08", borderRadius: "4px", padding: "2px 7px", fontSize: "10px", fontWeight: 500, color: "#D4A017" }}>⭐ Premium</div>}
              </div>

              {/* Author */}
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
                <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: `${post.spaceColor}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", fontWeight: 500, color: post.spaceAccent, flexShrink: 0 }}>{post.authorInitials}</div>
                <div>
                  <div style={{ fontSize: "13px", fontWeight: 500, color: "#F0EFF8" }}>{post.author}</div>
                  <div style={{ fontSize: "11px", color: "#3A3960" }}>{post.authorRole} · {post.time}</div>
                </div>
              </div>

              {/* Content */}
              <div style={{ fontSize: "15px", fontWeight: 500, color: "#F0EFF8", marginBottom: "6px", lineHeight: 1.4, cursor: "pointer" }}>{post.title}</div>

              {post.isPremium ? (
                <>
                  <div className="premium-blur" style={{ fontSize: "13px", color: "#8887A8", lineHeight: 1.6, marginBottom: "8px" }}>{post.body}</div>
                  <div className="lock-bar">
                    <span style={{ fontSize: "12px", color: "#A09EEA" }}>⭐ Premium members only — unlock 300+ resources</span>
                    <Link href="/upgrade"><button style={{ background: "#534AB7", color: "#EEEDFE", border: "none", borderRadius: "6px", padding: "5px 12px", fontSize: "11px", fontWeight: 500, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>Upgrade ₱199/mo</button></Link>
                  </div>
                </>
              ) : (
                <div style={{ fontSize: "13px", color: "#8887A8", lineHeight: 1.6, marginBottom: "10px" }}>{post.body}</div>
              )}

              {/* Actions */}
              <div style={{ display: "flex", gap: "4px", paddingTop: "10px", borderTop: "1px solid #1E1D2E" }}>
                <button className={`act-btn ${likedPosts.includes(post.id) ? "liked" : ""}`} onClick={() => toggleLike(post.id)}>
                  <svg width="13" height="13" fill={likedPosts.includes(post.id) ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                  {post.likes + (likedPosts.includes(post.id) ? 1 : 0)}
                </button>
                <button className="act-btn">
                  <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
                  {post.comments}
                </button>
                <button className="act-btn">
                  <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13"/></svg>
                  Share
                </button>
                <button className="act-btn" style={{ marginLeft: "auto" }}>
                  <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
                </button>
              </div>
            </div>
          ))}
        </main>

        {/* RIGHT SIDEBAR */}
        <aside>
          <div style={{ position: "sticky", top: "76px" }}>
            {/* Upgrade card */}
            <div className="upgrade-card">
              <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "#534AB7", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "10px", fontSize: "16px" }}>⭐</div>
              <div style={{ fontSize: "14px", fontWeight: 500, color: "#F0EFF8", marginBottom: "4px" }}>Go Premium</div>
              <div style={{ fontSize: "12px", color: "#A09EEA", marginBottom: "12px", lineHeight: 1.5 }}>Access everything PinoyHub has to offer.</div>
              {["300+ exclusive guides", "Premium job board", "Live Q&A with experts", "No ads"].map((f) => (
                <div key={f} style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "5px" }}>
                  <div style={{ width: "14px", height: "14px", borderRadius: "50%", background: "#534AB7", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <svg width="7" height="7" viewBox="0 0 8 8" fill="none"><path d="M1 4l2 2 4-4" stroke="#EEEDFE" strokeWidth="1.2" strokeLinecap="round"/></svg>
                  </div>
                  <span style={{ fontSize: "11px", color: "#8887A8" }}>{f}</span>
                </div>
              ))}
              <div style={{ fontSize: "20px", fontWeight: 700, color: "#F0EFF8", marginTop: "12px", fontFamily: "'Syne', sans-serif" }}>₱199<span style={{ fontSize: "12px", fontWeight: 400, color: "#6B6A8A" }}>/mo</span></div>
              <div style={{ fontSize: "10px", color: "#6B6A8A", marginBottom: "12px" }}>or ₱499/quarter · ₱1,599/year</div>
              <Link href="/upgrade"><button style={{ width: "100%", background: "#534AB7", color: "#EEEDFE", border: "none", borderRadius: "8px", padding: "9px", fontSize: "13px", fontWeight: 500, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>Upgrade now</button></Link>
            </div>

            {/* Online now */}
            <div className="sw-card">
              <p style={{ fontSize: "12px", fontWeight: 500, color: "#F0EFF8", marginBottom: "10px" }}>Online now</p>
              {[
                { name: "Maria S.", role: "ICU · Cebu", init: "MS", color: "#E1F5EE", accent: "#0F6E56" },
                { name: "Rose G.", role: "OFW · Dubai", init: "RG", color: "#FAEEDA", accent: "#854F0B" },
                { name: "John M.", role: "OB · Manila", init: "JM", color: "#EEEDFE", accent: "#534AB7" },
              ].map((u) => (
                <div key={u.name} style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                  <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: u.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", fontWeight: 500, color: u.accent, flexShrink: 0 }}>{u.init}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: "12px", color: "#F0EFF8", fontWeight: 500 }}>{u.name}</div>
                    <div style={{ fontSize: "10px", color: "#3A3960" }}>{u.role}</div>
                  </div>
                  <span className="online-dot" />
                </div>
              ))}
              <div style={{ fontSize: "11px", color: "#3A3960", marginTop: "4px" }}>+131 more online</div>
            </div>

            {/* Top categories */}
            <div className="sw-card">
              <p style={{ fontSize: "12px", fontWeight: 500, color: "#F0EFF8", marginBottom: "10px" }}>Top categories</p>
              {[["NCLEX Prep", "342"], ["Jobs Abroad", "218"], ["Local Hospitals", "189"], ["Tips & Cases", "156"]].map(([name, count]) => (
                <div key={name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "7px" }}>
                  <span style={{ fontSize: "12px", color: "#6B6A8A" }}>{name}</span>
                  <span style={{ fontSize: "11px", color: "#3A3960", background: "#0A0A0F", borderRadius: "20px", padding: "1px 8px" }}>{count}</span>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}