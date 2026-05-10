"use client";
import { useState } from "react";
import Link from "next/link";

const spaceData: Record<string, {
  name: string; desc: string; icon: string; banner: string;
  accent: string; bg: string; members: string; posts: string; online: number;
  rules: string[]; moderators: { name: string; init: string }[];
}> = {
  nurses: {
    name: "Nurses PH", icon: "🏥", desc: "The home of Filipino nurses — local and abroad. Share knowledge, ask questions, find jobs, and connect with fellow healthcare professionals.",
    banner: "linear-gradient(135deg, #064E3B, #0F6E56)", accent: "#0F6E56", bg: "#E1F5EE",
    members: "4,821", posts: "1,204", online: 38,
    rules: ["Be respectful and professional", "No self-promotion without mod approval", "Cite sources for medical information", "No sharing of patient information"],
    moderators: [{ name: "Maria S.", init: "MS" }, { name: "Dr. Jose R.", init: "JR" }],
  },
  teachers: {
    name: "Teachers PH", icon: "📚", desc: "A community for Filipino educators. DepEd updates, classroom strategies, LET review tips, and everything in between.",
    banner: "linear-gradient(135deg, #1E3A5F, #185FA5)", accent: "#185FA5", bg: "#E6F1FB",
    members: "3,210", posts: "892", online: 21,
    rules: ["Keep discussions education-related", "No political debates", "Share resources freely", "Respect all teaching levels"],
    moderators: [{ name: "Ana M.", init: "AM" }, { name: "Rex T.", init: "RT" }],
  },
  gamers: {
    name: "Pinoy Gamers", icon: "🎮", desc: "The ultimate hub for Filipino gamers. ML, Valorant, PC builds, esports news, and everything gaming.",
    banner: "linear-gradient(135deg, #1A1040, #534AB7)", accent: "#534AB7", bg: "#EEEDFE",
    members: "6,540", posts: "2,341", online: 94,
    rules: ["No toxicity or trash talk", "No piracy links", "Spoiler tags for new game content", "Keep memes in the meme thread"],
    moderators: [{ name: "Mark R.", init: "MR" }, { name: "Kyle B.", init: "KB" }],
  },
  ofw: {
    name: "OFW Community", icon: "✈️", desc: "Support, advice, and connection for Overseas Filipino Workers and their families.",
    banner: "linear-gradient(135deg, #4A2000, #854F0B)", accent: "#854F0B", bg: "#FAEEDA",
    members: "5,120", posts: "1,780", online: 55,
    rules: ["Be kind — many are going through tough times", "No scam recruitment posts", "Verify information before sharing", "Support each other"],
    moderators: [{ name: "Rose G.", init: "RG" }, { name: "Ben C.", init: "BC" }],
  },
  freelancers: {
    name: "Pinoy Freelancers", icon: "💻", desc: "Where Filipino freelancers grow. Client tips, rate discussions, platform guides, and real talk about remote work.",
    banner: "linear-gradient(135deg, #3D0F00, #993C1D)", accent: "#993C1D", bg: "#FAECE7",
    members: "2,890", posts: "967", online: 29,
    rules: ["No fake rate advice", "Share wins and losses honestly", "No direct client poaching", "Credit original posts"],
    moderators: [{ name: "Juan D.", init: "JD" }, { name: "Lea P.", init: "LP" }],
  },
};

const samplePosts = [
  { id: 1, author: "Maria Santos", init: "MS", role: "ICU Nurse · Cebu", time: "2h ago", title: "How do I register for NCLEX from the Philippines in 2025?", body: "Hi community! I applied already but I'm confused about the PearsonVUE process. Has anyone gone through this recently?", likes: 61, comments: 44, isPremium: false, isHot: true },
  { id: 2, author: "Admin Team", init: "AT", role: "Official", time: "5h ago", title: "Complete NCLEX Study Guide 2025 + 200 practice questions with rationale", body: "This guide covers all eight NCLEX-RN test plan categories with updated 2025 content...", likes: 204, comments: 88, isPremium: true, isHot: false },
  { id: 3, author: "Rose Garcia", init: "RG", role: "OFW · Dubai", time: "1d ago", title: "Honest salary comparison: Philippines vs Singapore vs Dubai vs Canada", body: "Based on my 6 years of experience and network, here's a breakdown...", likes: 128, comments: 91, isPremium: false, isHot: true },
];

const tabs = ["Hot", "New", "Top", "Premium"];

export default function SpacePage({ params }: { params: { slug: string } }) {
  const space = spaceData[params.slug] || spaceData["nurses"];
  const [joined, setJoined] = useState(false);
  const [activeTab, setActiveTab] = useState("Hot");
  const [likedPosts, setLikedPosts] = useState<number[]>([]);
  const [composeText, setComposeText] = useState("");
  const [showCompose, setShowCompose] = useState(false);

  const toggleLike = (id: number) => setLikedPosts((p) => p.includes(id) ? p.filter((x) => x !== id) : [...p, id]);

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
        .tab-btn { background: none; border: none; cursor: pointer; font-size: 13px; font-family: 'DM Sans', sans-serif; padding: 8px 16px; border-radius: 8px; transition: all 0.2s; font-weight: 500; }
        .tab-btn.active { background: #13121E; color: #F0EFF8; }
        .tab-btn.inactive { color: #3A3960; }
        .tab-btn.inactive:hover { color: #6B6A8A; }
        .join-btn { border: none; border-radius: 10px; padding: 10px 24px; font-size: 14px; font-weight: 500; cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all 0.2s; }
        .sw-card { background: #13121E; border: 1px solid #1E1D2E; border-radius: 12px; padding: 16px; margin-bottom: 10px; }
        textarea { width: 100%; background: transparent; border: none; outline: none; color: #F0EFF8; font-family: 'DM Sans', sans-serif; font-size: 14px; resize: none; line-height: 1.6; }
        textarea::placeholder { color: #3A3960; }
        .premium-blur { filter: blur(4px); user-select: none; pointer-events: none; }
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
        <div style={{ flex: 1, maxWidth: "380px", margin: "0 24px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", background: "#13121E", border: "1px solid #2A2940", borderRadius: "8px", padding: "7px 12px" }}>
            <svg width="13" height="13" fill="none" stroke="#3A3960" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
            <input style={{ background: "transparent", border: "none", outline: "none", color: "#F0EFF8", fontFamily: "'DM Sans', sans-serif", fontSize: "13px", width: "100%" }} placeholder="Search in this space..." />
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Link href="/feed" style={{ fontSize: "13px", color: "#6B6A8A" }}>← Feed</Link>
          <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "linear-gradient(135deg,#534AB7,#3C3489)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: 500, color: "#EEEDFE", cursor: "pointer" }}>JD</div>
        </div>
      </nav>

      {/* BANNER */}
      <div style={{ height: "160px", background: space.banner, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.3)" }} />
        <div style={{ position: "absolute", bottom: "24px", left: "32px", display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={{ width: "64px", height: "64px", borderRadius: "16px", background: space.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "32px", border: "3px solid rgba(255,255,255,0.1)" }}>{space.icon}</div>
          <div>
            <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: "24px", fontWeight: 800, color: "#FFFFFF", letterSpacing: "-0.02em", textShadow: "0 2px 8px rgba(0,0,0,0.3)" }}>{space.name}</h1>
            <div style={{ display: "flex", gap: "16px", marginTop: "4px" }}>
              <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.7)" }}>{space.members} members</span>
              <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.7)" }}>{space.posts} posts</span>
              <span style={{ fontSize: "12px", color: "#4ADE80" }}>● {space.online} online</span>
            </div>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "20px 24px", display: "grid", gridTemplateColumns: "1fr 240px", gap: "16px" }}>

        {/* MAIN */}
        <div>
          {/* Action bar */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <div style={{ display: "flex", gap: "4px" }}>
              {tabs.map((t) => (
                <button key={t} className={`tab-btn ${activeTab === t ? "active" : "inactive"}`} onClick={() => setActiveTab(t)}>{t}</button>
              ))}
            </div>
            <button
              className="join-btn"
              onClick={() => setJoined(!joined)}
              style={{ background: joined ? "#13121E" : space.accent, color: joined ? "#6B6A8A" : "#FFFFFF", border: joined ? `1px solid #2A2940` : "none" }}
            >
              {joined ? "✓ Joined" : "Join space"}
            </button>
          </div>

          {/* Compose box */}
          <div style={{ background: "#13121E", border: "1px solid #2A2940", borderRadius: "12px", padding: "12px 16px", marginBottom: "14px" }}>
            <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
              <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "linear-gradient(135deg,#534AB7,#3C3489)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: 500, color: "#EEEDFE", flexShrink: 0 }}>JD</div>
              <textarea rows={showCompose ? 3 : 1} placeholder={`Share something with ${space.name}...`} value={composeText} onFocus={() => setShowCompose(true)} onChange={(e) => setComposeText(e.target.value)} />
            </div>
            {showCompose && (
              <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "10px", paddingTop: "10px", borderTop: "1px solid #1E1D2E" }}>
                <button style={{ background: space.accent, color: "#FFFFFF", border: "none", borderRadius: "8px", padding: "7px 16px", fontSize: "13px", fontWeight: 500, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }} disabled={!composeText.trim()}>Post</button>
              </div>
            )}
          </div>

          {/* Posts */}
          {samplePosts.map((post) => (
            <div key={post.id} className="post-card">
              <div style={{ display: "flex", gap: "6px", marginBottom: "10px" }}>
                {post.isHot && <div style={{ background: "#2A1010", borderRadius: "4px", padding: "2px 7px", fontSize: "10px", fontWeight: 500, color: "#E05C8A" }}>🔥 Hot</div>}
                {post.isPremium && <div style={{ background: "#1E1A08", borderRadius: "4px", padding: "2px 7px", fontSize: "10px", fontWeight: 500, color: "#D4A017" }}>⭐ Premium</div>}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
                <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: space.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", fontWeight: 500, color: space.accent, flexShrink: 0 }}>{post.init}</div>
                <div>
                  <div style={{ fontSize: "13px", fontWeight: 500, color: "#F0EFF8" }}>{post.author}</div>
                  <div style={{ fontSize: "11px", color: "#3A3960" }}>{post.role} · {post.time}</div>
                </div>
              </div>
              <div style={{ fontSize: "15px", fontWeight: 500, color: "#F0EFF8", marginBottom: "6px", lineHeight: 1.4, cursor: "pointer" }}>{post.title}</div>
              {post.isPremium ? (
                <>
                  <div className="premium-blur" style={{ fontSize: "13px", color: "#8887A8", lineHeight: 1.6, marginBottom: "8px" }}>{post.body}</div>
                  <div style={{ background: "#1A1830", border: "1px solid #2A2940", borderRadius: "8px", padding: "10px 14px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ fontSize: "12px", color: "#A09EEA" }}>⭐ Premium only — unlock 300+ resources</span>
                    <Link href="/upgrade"><button style={{ background: "#534AB7", color: "#EEEDFE", border: "none", borderRadius: "6px", padding: "5px 12px", fontSize: "11px", fontWeight: 500, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>Upgrade ₱199/mo</button></Link>
                  </div>
                </>
              ) : (
                <div style={{ fontSize: "13px", color: "#8887A8", lineHeight: 1.6, marginBottom: "10px" }}>{post.body}</div>
              )}
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
              </div>
            </div>
          ))}
        </div>

        {/* SIDEBAR */}
        <aside>
          <div style={{ position: "sticky", top: "76px" }}>
            <div className="sw-card">
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: "14px", fontWeight: 700, color: "#F0EFF8", marginBottom: "8px" }}>About</div>
              <p style={{ fontSize: "12px", color: "#6B6A8A", lineHeight: 1.7, marginBottom: "14px" }}>{space.desc}</p>
              <div style={{ display: "flex", gap: "12px", paddingTop: "12px", borderTop: "1px solid #1E1D2E" }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontFamily: "'Syne', sans-serif", fontSize: "16px", fontWeight: 700, color: "#F0EFF8" }}>{space.members}</div>
                  <div style={{ fontSize: "10px", color: "#3A3960" }}>Members</div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontFamily: "'Syne', sans-serif", fontSize: "16px", fontWeight: 700, color: "#F0EFF8" }}>{space.posts}</div>
                  <div style={{ fontSize: "10px", color: "#3A3960" }}>Posts</div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontFamily: "'Syne', sans-serif", fontSize: "16px", fontWeight: 700, color: "#4ADE80" }}>{space.online}</div>
                  <div style={{ fontSize: "10px", color: "#3A3960" }}>Online</div>
                </div>
              </div>
            </div>

            <div className="sw-card">
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: "14px", fontWeight: 700, color: "#F0EFF8", marginBottom: "10px" }}>Rules</div>
              {space.rules.map((r, i) => (
                <div key={i} style={{ display: "flex", gap: "8px", marginBottom: "7px", alignItems: "flex-start" }}>
                  <span style={{ fontSize: "11px", color: space.accent, fontWeight: 700, flexShrink: 0 }}>{i + 1}.</span>
                  <span style={{ fontSize: "12px", color: "#6B6A8A", lineHeight: 1.5 }}>{r}</span>
                </div>
              ))}
            </div>

            <div className="sw-card">
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: "14px", fontWeight: 700, color: "#F0EFF8", marginBottom: "10px" }}>Moderators</div>
              {space.moderators.map((m) => (
                <div key={m.name} style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                  <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: space.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", fontWeight: 500, color: space.accent }}>{m.init}</div>
                  <span style={{ fontSize: "12px", color: "#8887A8" }}>{m.name}</span>
                  <span style={{ fontSize: "10px", color: space.accent, marginLeft: "auto" }}>Mod</span>
                </div>
              ))}
            </div>

            <Link href="/spaces">
              <div style={{ background: "#13121E", border: "1px solid #1E1D2E", borderRadius: "12px", padding: "14px 16px", cursor: "pointer", textAlign: "center", fontSize: "13px", color: "#534AB7", fontWeight: 500 }}>
                Browse all spaces →
              </div>
            </Link>
          </div>
        </aside>
      </div>
    </main>
  );
}