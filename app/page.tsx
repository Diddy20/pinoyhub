"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const spaces = [
  { slug: "nurses", name: "Nurses PH", desc: "NCLEX tips, local hospitals, salary talks, and so much more.", members: "4,821", posts: "1,204", color: "#E1F5EE", accent: "#0F6E56", icon: "🏥" },
  { slug: "teachers", name: "Teachers PH", desc: "DepEd updates, classroom tips, LET review resources.", members: "3,210", posts: "892", color: "#E6F1FB", accent: "#185FA5", icon: "📚" },
  { slug: "gamers", name: "Pinoy Gamers", desc: "ML, Valorant, PC builds, esports, and all things gaming.", members: "6,540", posts: "2,341", color: "#EEEDFE", accent: "#534AB7", icon: "🎮" },
  { slug: "ofw", name: "OFW Community", desc: "Remittance tips, legal advice, and support for Filipinos abroad.", members: "5,120", posts: "1,780", color: "#FAEEDA", accent: "#854F0B", icon: "✈️" },
  { slug: "freelancers", name: "Pinoy Freelancers", desc: "Client hunting, rates, Upwork, Fiverr, and remote work tips.", members: "2,890", posts: "967", color: "#FAECE7", accent: "#993C1D", icon: "💻" },
];

const stats = [
  { num: "22,581", label: "Total Members" },
  { num: "7,184", label: "Posts" },
  { num: "5", label: "Communities" },
  { num: "134", label: "Online Now" },
];

const testimonials = [
  { name: "Maria S.", role: "ICU Nurse · Cebu", text: "This is where I found everything I needed for my NCLEX. The community is incredibly helpful!", avatar: "MS" },
  { name: "Juan D.", role: "Freelancer · Manila", text: "I landed my first international client thanks to the tips I found here. Totally worth joining!", avatar: "JD" },
  { name: "Rose G.", role: "OFW · Dubai", text: "It feels like home even when I'm far away. My kababayans are always here.", avatar: "RG" },
];

export default function HomePage() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSpace, setActiveSpace] = useState(0);
  const [activeTesti, setActiveTesti] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setActiveSpace((p) => (p + 1) % spaces.length), 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setActiveTesti((p) => (p + 1) % testimonials.length), 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main style={{ fontFamily: "'DM Sans', sans-serif", background: "#0A0A0F", minHeight: "100vh", color: "#F0EFF8" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=Syne:wght@700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #0A0A0F; }
        .nav-link:hover { color: #A09EEA !important; }
        .btn-prim { background: #534AB7; color: #EEEDFE; border: none; border-radius: 10px; padding: 12px 24px; font-size: 14px; font-weight: 500; cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all 0.2s; }
        .btn-prim:hover { background: #3C3489; transform: translateY(-1px); box-shadow: 0 8px 24px rgba(83,74,183,0.3); }
        .btn-out { background: transparent; color: #A09EEA; border: 1px solid #2A2940; border-radius: 10px; padding: 12px 24px; font-size: 14px; font-weight: 500; cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all 0.2s; }
        .btn-out:hover { border-color: #534AB7; color: #EEEDFE; background: rgba(83,74,183,0.08); }
        .space-card { background: #13121E; border: 1px solid #1E1D2E; border-radius: 16px; padding: 20px; cursor: pointer; transition: all 0.25s; position: relative; overflow: hidden; }
        .space-card:hover { border-color: #534AB7; transform: translateY(-3px); box-shadow: 0 12px 40px rgba(83,74,183,0.15); }
        .space-card.active-card { border-color: #534AB7; box-shadow: 0 0 0 1px #534AB7, 0 12px 40px rgba(83,74,183,0.2); }
        .join-btn { background: #534AB7; color: #EEEDFE; border: none; border-radius: 8px; padding: 7px 14px; font-size: 12px; font-weight: 500; cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all 0.2s; flex-shrink: 0; }
        .join-btn:hover { background: #3C3489; }
        .glow { position: absolute; border-radius: 50%; filter: blur(80px); pointer-events: none; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulse { 0%, 100% { opacity: 0.5; } 50% { opacity: 1; } }
        .fade-up { animation: fadeUp 0.7s ease both; }
        .fade-up-1 { animation: fadeUp 0.7s ease 0.1s both; }
        .fade-up-2 { animation: fadeUp 0.7s ease 0.2s both; }
        .fade-up-3 { animation: fadeUp 0.7s ease 0.3s both; }
        .fade-up-4 { animation: fadeUp 0.7s ease 0.5s both; }
        .online-dot { width: 8px; height: 8px; border-radius: 50%; background: #4ADE80; display: inline-block; animation: pulse 2s infinite; }
        a { text-decoration: none; color: inherit; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: #0A0A0F; }
        ::-webkit-scrollbar-thumb { background: #2A2940; border-radius: 3px; }
        .step-card { background: #13121E; border: 1px solid #1E1D2E; border-radius: 16px; padding: 28px; transition: all 0.2s; }
        .step-card:hover { border-color: #2A2940; transform: translateY(-2px); }
        .section-tag { font-size: 11px; color: #534AB7; font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 10px; }
        .section-title { font-family: 'Syne', sans-serif; font-size: clamp(26px, 3vw, 36px); font-weight: 700; color: #F0EFF8; margin-bottom: 8px; line-height: 1.2; letter-spacing: -0.02em; }
        .section-sub { font-size: 14px; color: #6B6A8A; line-height: 1.6; }
        .footer-link:hover { color: #6B6A8A !important; }
      `}</style>

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "0 40px", height: "62px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: scrolled ? "rgba(10,10,15,0.96)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid #1E1D2E" : "none",
        transition: "all 0.3s",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ width: "34px", height: "34px", borderRadius: "9px", background: "linear-gradient(135deg,#534AB7,#3C3489)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "17px" }}>🇵🇭</div>
          <span style={{ fontFamily: "'Syne', sans-serif", fontSize: "18px", fontWeight: 800, color: "#F0EFF8", letterSpacing: "-0.02em" }}>PinoyHub</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "2px" }}>
          {["Feed", "Spaces", "Events", "Jobs"].map((item) => (
            <a key={item} href="#" className="nav-link" style={{ fontSize: "13px", color: "#6B6A8A", padding: "6px 12px", borderRadius: "7px", transition: "color 0.2s", fontWeight: 500 }}>{item}</a>
          ))}
        </div>
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <Link href="/login"><button className="btn-out" style={{ padding: "7px 18px", fontSize: "13px" }}>Log in</button></Link>
          <Link href="/register"><button className="btn-prim" style={{ padding: "7px 18px", fontSize: "13px" }}>Join for free</button></Link>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ position: "relative", padding: "148px 40px 80px", maxWidth: "1100px", margin: "0 auto", overflow: "hidden" }}>
        <div className="glow" style={{ width: "600px", height: "600px", background: "#534AB7", opacity: 0.07, top: "-150px", left: "-200px" }} />
        <div className="glow" style={{ width: "400px", height: "400px", background: "#0F6E56", opacity: 0.05, top: "50px", right: "-100px" }} />

        <div style={{ position: "relative", zIndex: 1, maxWidth: "780px" }}>
          <div className="fade-up" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#13121E", border: "1px solid #2A2940", borderRadius: "20px", padding: "6px 16px", marginBottom: "32px" }}>
            <span className="online-dot" />
            <span style={{ fontSize: "12px", color: "#A09EEA", fontWeight: 500 }}>134 Filipinos online right now</span>
          </div>

          <h1 className="fade-up-1" style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(42px, 6vw, 74px)", fontWeight: 800, lineHeight: 1.05, letterSpacing: "-0.03em", marginBottom: "24px" }}>
            One community for{" "}
            <span style={{ background: "linear-gradient(135deg, #A09EEA 0%, #534AB7 60%, #7B6EE8 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              every Filipino
            </span>
          </h1>

          <p className="fade-up-2" style={{ fontSize: "17px", color: "#8887A8", lineHeight: 1.75, maxWidth: "520px", marginBottom: "40px", fontWeight: 400 }}>
            Where nurses, teachers, gamers, OFWs, and freelancers all come together.
            Connect, ask questions, and grow — with thousands of your kababayans.
          </p>

          <div className="fade-up-3" style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "56px" }}>
            <Link href="/register"><button className="btn-prim" style={{ fontSize: "15px", padding: "14px 32px" }}>Get started — it's free 🎉</button></Link>
            <Link href="/feed"><button className="btn-out" style={{ fontSize: "15px", padding: "14px 28px" }}>Browse the feed</button></Link>
          </div>

          {/* Stats */}
          <div className="fade-up-4" style={{ display: "flex", flexWrap: "wrap", background: "#13121E", border: "1px solid #1E1D2E", borderRadius: "16px", overflow: "hidden", width: "fit-content" }}>
            {stats.map((s, i) => (
              <div key={s.label} style={{ padding: "18px 28px", borderRight: i < stats.length - 1 ? "1px solid #1E1D2E" : "none" }}>
                <div style={{ fontFamily: "'Syne', sans-serif", fontSize: "22px", fontWeight: 700, color: "#F0EFF8" }}>{s.num}</div>
                <div style={{ fontSize: "11px", color: "#6B6A8A", marginTop: "3px" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SPACES */}
      <section style={{ padding: "60px 40px", maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "28px" }}>
          <div>
            <div className="section-tag">Communities</div>
            <div className="section-title">Choose your space</div>
            <div className="section-sub">Join one or all — completely up to you.</div>
          </div>
          <Link href="/spaces"><button className="btn-out" style={{ padding: "8px 18px", fontSize: "13px" }}>View all →</button></Link>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))", gap: "10px" }}>
          {spaces.map((space, i) => (
            <div key={space.slug} className={`space-card ${i === activeSpace ? "active-card" : ""}`} onClick={() => setActiveSpace(i)}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: i === activeSpace ? space.accent : "transparent", transition: "background 0.3s", borderRadius: "16px 16px 0 0" }} />
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{ width: "42px", height: "42px", borderRadius: "12px", background: space.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", flexShrink: 0 }}>{space.icon}</div>
                  <div>
                    <div style={{ fontSize: "14px", fontWeight: 500, color: "#F0EFF8" }}>{space.name}</div>
                    <div style={{ fontSize: "11px", color: "#6B6A8A", marginTop: "2px" }}>{space.members} members</div>
                  </div>
                </div>
                <button className="join-btn">Join</button>
              </div>
              <p style={{ fontSize: "12px", color: "#6B6A8A", lineHeight: 1.65, marginBottom: "14px" }}>{space.desc}</p>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontSize: "11px", color: "#3A3960" }}>{space.posts} posts</span>
                <span style={{ fontSize: "11px", color: space.accent, fontWeight: 500 }}>● Active</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ padding: "60px 40px", maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ marginBottom: "32px" }}>
          <div className="section-tag">Simple</div>
          <div className="section-title">How it works</div>
          <div className="section-sub">Three steps and you're in.</div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px" }}>
          {[
            { num: "01", title: "Create an account", desc: "Completely free. Sign up with your email or Google account. No credit card required.", icon: "👤", color: "#EEEDFE" },
            { num: "02", title: "Pick your spaces", desc: "Follow the communities most relevant to your work or interests. Join as many as you like.", icon: "🏠", color: "#E1F5EE" },
            { num: "03", title: "Dive right in", desc: "Post, ask questions, share knowledge. Your community is waiting.", icon: "💬", color: "#FAEEDA" },
          ].map((step) => (
            <div key={step.num} className="step-card">
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: "11px", color: "#3A3960", fontWeight: 700, marginBottom: "18px", letterSpacing: "0.05em" }}>{step.num}</div>
              <div style={{ width: "44px", height: "44px", borderRadius: "12px", background: step.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px", marginBottom: "14px" }}>{step.icon}</div>
              <div style={{ fontSize: "16px", fontWeight: 500, color: "#F0EFF8", marginBottom: "8px" }}>{step.title}</div>
              <div style={{ fontSize: "13px", color: "#6B6A8A", lineHeight: 1.65 }}>{step.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ padding: "60px 40px", maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ marginBottom: "28px" }}>
          <div className="section-tag">Testimonials</div>
          <div className="section-title">What members are saying</div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px" }}>
          {testimonials.map((t, i) => (
            <div key={i} style={{ background: "#13121E", border: `1px solid ${i === activeTesti ? "#534AB7" : "#1E1D2E"}`, borderRadius: "16px", padding: "24px", transition: "border-color 0.5s" }}>
              <p style={{ fontSize: "14px", color: "#8887A8", lineHeight: 1.75, marginBottom: "20px", fontStyle: "italic" }}>"{t.text}"</p>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "linear-gradient(135deg,#534AB7,#3C3489)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: 500, color: "#EEEDFE", flexShrink: 0 }}>{t.avatar}</div>
                <div>
                  <div style={{ fontSize: "13px", fontWeight: 500, color: "#F0EFF8" }}>{t.name}</div>
                  <div style={{ fontSize: "11px", color: "#6B6A8A" }}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "60px 40px 100px", maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ background: "linear-gradient(135deg, #13121E 0%, #1A1830 100%)", border: "1px solid #2A2940", borderRadius: "24px", padding: "64px 48px", textAlign: "center", position: "relative", overflow: "hidden" }}>
          <div className="glow" style={{ width: "500px", height: "500px", background: "#534AB7", opacity: 0.1, top: "50%", left: "50%", transform: "translate(-50%,-50%)" }} />
          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{ fontSize: "40px", marginBottom: "20px" }}>🇵🇭</div>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: "16px", color: "#F0EFF8" }}>
              Ready to join?
            </h2>
            <p style={{ fontSize: "15px", color: "#6B6A8A", marginBottom: "36px", maxWidth: "420px", margin: "0 auto 36px", lineHeight: 1.7 }}>
              Join 22,000+ Filipinos. Free forever — upgrade only when you want premium features.
            </p>
            <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/register"><button className="btn-prim" style={{ fontSize: "15px", padding: "14px 36px" }}>Get started for free 🎉</button></Link>
              <Link href="/feed"><button className="btn-out" style={{ fontSize: "15px", padding: "14px 28px" }}>Browse first</button></Link>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid #1E1D2E", padding: "36px 40px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ width: "28px", height: "28px", borderRadius: "8px", background: "linear-gradient(135deg,#534AB7,#3C3489)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px" }}>🇵🇭</div>
          <span style={{ fontFamily: "'Syne', sans-serif", fontSize: "15px", fontWeight: 800, color: "#F0EFF8" }}>PinoyHub</span>
        </div>
        <div style={{ display: "flex", gap: "20px" }}>
          {["Privacy", "Terms", "About Us", "Contact"].map((item) => (
            <a key={item} href="#" className="footer-link" style={{ fontSize: "12px", color: "#3A3960", transition: "color 0.2s" }}>{item}</a>
          ))}
        </div>
        <p style={{ fontSize: "12px", color: "#3A3960" }}>© 2025 PinoyHub · Made for Filipinos</p>
      </footer>
    </main>
  );
}