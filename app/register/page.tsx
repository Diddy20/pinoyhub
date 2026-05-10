"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";


export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [form, setForm] = useState({
    displayName: "",
    username: "",
    email: "",
    password: "",
    agree: false,
  });

  const update = (k: string, v: string | boolean) =>
    setForm((p) => ({ ...p, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          displayName: form.displayName,
          username: form.username,
          email: form.email,
          password: form.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        return;
      }

      // Success — go to step 2
      setStep(2);
    } catch {
      setError("Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ fontFamily: "'DM Sans', sans-serif", background: "#0A0A0F", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&family=Syne:wght@700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .inp { width: 100%; background: #13121E; border: 1px solid #2A2940; border-radius: 10px; padding: 12px 14px; font-size: 14px; color: #F0EFF8; font-family: 'DM Sans', sans-serif; transition: border-color 0.2s; outline: none; }
        .inp:focus { border-color: #534AB7; }
        .inp::placeholder { color: #3A3960; }
        .btn-prim { width: 100%; background: #534AB7; color: #EEEDFE; border: none; border-radius: 10px; padding: 13px; font-size: 14px; font-weight: 500; cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all 0.2s; }
        .btn-prim:hover:not(:disabled) { background: #3C3489; transform: translateY(-1px); }
        .btn-prim:disabled { opacity: 0.6; cursor: not-allowed; }
        .btn-google { width: 100%; background: #13121E; color: #F0EFF8; border: 1px solid #2A2940; border-radius: 10px; padding: 12px; font-size: 14px; font-weight: 500; cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all 0.2s; display: flex; align-items: center; justify-content: center; gap: 10px; }
        .btn-google:hover { border-color: #534AB7; background: #1A1830; }
        .err { background: #1E0F0F; border: 1px solid #993C1D; border-radius: 8px; padding: 10px 14px; font-size: 13px; color: #F0957A; }
        a { text-decoration: none; }
        .link { color: #A09EEA; font-size: 13px; transition: color 0.2s; }
        .link:hover { color: #F0EFF8; }
        .divider { display: flex; align-items: center; gap: 12px; }
        .divider-line { flex: 1; height: 1px; background: #1E1D2E; }
        .divider-text { font-size: 12px; color: #3A3960; }
        @keyframes spin { to { transform: rotate(360deg); } }
        .spinner { width: 16px; height: 16px; border: 2px solid #EEEDFE40; border-top-color: #EEEDFE; border-radius: 50%; animation: spin 0.7s linear infinite; display: inline-block; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        .fade-up { animation: fadeUp 0.4s ease both; }
        .benefit { display: flex; align-items: center; gap: 8px; font-size: 13px; color: #8887A8; margin-bottom: 8px; }
        .check { width: 18px; height: 18px; border-radius: 50%; background: #1E2E1E; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
      `}</style>

      <div style={{ width: "100%", maxWidth: "440px" }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <Link href="/">
            <div style={{ display: "inline-flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
              <div style={{ width: "38px", height: "38px", borderRadius: "10px", background: "linear-gradient(135deg,#534AB7,#3C3489)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px" }}>🇵🇭</div>
              <span style={{ fontFamily: "'Syne', sans-serif", fontSize: "20px", fontWeight: 800, color: "#F0EFF8", letterSpacing: "-0.02em" }}>PinoyHub</span>
            </div>
          </Link>
          <p style={{ fontSize: "13px", color: "#6B6A8A" }}>Join 22,000+ Filipinos — free forever.</p>
        </div>

        {step === 1 && (
          <div className="fade-up">
            <div style={{ background: "#13121E", border: "1px solid #1E1D2E", borderRadius: "20px", padding: "32px" }}>
              {/* Progress */}
              <div style={{ display: "flex", gap: "6px", marginBottom: "24px" }}>
                <div style={{ flex: 1, height: "3px", borderRadius: "2px", background: "#534AB7" }} />
                <div style={{ flex: 1, height: "3px", borderRadius: "2px", background: "#1E1D2E" }} />
              </div>
              <p style={{ fontSize: "11px", color: "#6B6A8A", marginBottom: "20px" }}>Step 1 of 2 — Your account</p>

              {/* Google */}
              <button className="btn-google">
                <svg width="18" height="18" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Sign up with Google
              </button>

              <div className="divider" style={{ margin: "20px 0" }}>
                <div className="divider-line" />
                <span className="divider-text">or with email</span>
                <div className="divider-line" />
              </div>

              {error && <div className="err" style={{ marginBottom: "16px" }}>{error}</div>}

              <form onSubmit={handleSubmit}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "14px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "12px", color: "#6B6A8A", marginBottom: "6px", fontWeight: 500 }}>Full name</label>
                    <input className="inp" type="text" placeholder="Juan dela Cruz" value={form.displayName} onChange={(e) => update("displayName", e.target.value)} required />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "12px", color: "#6B6A8A", marginBottom: "6px", fontWeight: 500 }}>Username</label>
                    <input className="inp" type="text" placeholder="juandelacruz" value={form.username} onChange={(e) => update("username", e.target.value.toLowerCase().replace(/\s/g, ""))} required />
                  </div>
                </div>

                <div style={{ marginBottom: "14px" }}>
                  <label style={{ display: "block", fontSize: "12px", color: "#6B6A8A", marginBottom: "6px", fontWeight: 500 }}>Email address</label>
                  <input className="inp" type="email" placeholder="you@email.com" value={form.email} onChange={(e) => update("email", e.target.value)} required />
                </div>

                <div style={{ marginBottom: "20px" }}>
                  <label style={{ display: "block", fontSize: "12px", color: "#6B6A8A", marginBottom: "6px", fontWeight: 500 }}>Password</label>
                  <div style={{ position: "relative" }}>
                    <input className="inp" type={showPass ? "text" : "password"} placeholder="Min. 8 characters" value={form.password} onChange={(e) => update("password", e.target.value)} required minLength={8} style={{ paddingRight: "44px" }} />
                    <button type="button" onClick={() => setShowPass(!showPass)} style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#3A3960", fontSize: "12px" }}>
                      {showPass ? "Hide" : "Show"}
                    </button>
                  </div>
                  {form.password.length > 0 && (
                    <div style={{ display: "flex", gap: "4px", marginTop: "8px" }}>
                      {[1,2,3,4].map((i) => (
                        <div key={i} style={{ flex: 1, height: "3px", borderRadius: "2px", background: form.password.length >= i * 2 ? (form.password.length >= 8 ? "#0F6E56" : "#854F0B") : "#1E1D2E", transition: "background 0.2s" }} />
                      ))}
                    </div>
                  )}
                </div>

                <div style={{ marginBottom: "20px" }}>
                  <label style={{ display: "flex", alignItems: "flex-start", gap: "8px", cursor: "pointer" }}>
                    <input type="checkbox" checked={form.agree} onChange={(e) => update("agree", e.target.checked)} required style={{ accentColor: "#534AB7", marginTop: "2px", flexShrink: 0 }} />
                    <span style={{ fontSize: "12px", color: "#6B6A8A", lineHeight: 1.6 }}>
                      I agree to the{" "}
                      <Link href="/terms" className="link" style={{ fontSize: "12px" }}>Terms of Service</Link>
                      {" "}and{" "}
                      <Link href="/privacy" className="link" style={{ fontSize: "12px" }}>Privacy Policy</Link>
                    </span>
                  </label>
                </div>

                <button className="btn-prim" type="submit" disabled={loading || !form.agree}>
                  {loading ? <span className="spinner" /> : "Create free account →"}
                </button>
              </form>

              <p style={{ textAlign: "center", marginTop: "20px", fontSize: "13px", color: "#6B6A8A" }}>
                Already have an account?{" "}
                <Link href="/login" className="link" style={{ fontWeight: 500 }}>Sign in →</Link>
              </p>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="fade-up">
            <div style={{ background: "#13121E", border: "1px solid #1E1D2E", borderRadius: "20px", padding: "40px 32px", textAlign: "center" }}>
              <div style={{ display: "flex", gap: "6px", marginBottom: "32px" }}>
                <div style={{ flex: 1, height: "3px", borderRadius: "2px", background: "#534AB7" }} />
                <div style={{ flex: 1, height: "3px", borderRadius: "2px", background: "#534AB7" }} />
              </div>

              <div style={{ fontSize: "48px", marginBottom: "16px" }}>🎉</div>
              <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "22px", fontWeight: 800, color: "#F0EFF8", marginBottom: "8px", letterSpacing: "-0.02em" }}>
                Welcome to PinoyHub!
              </h2>
              <p style={{ fontSize: "14px", color: "#6B6A8A", lineHeight: 1.7, marginBottom: "28px" }}>
                Your account has been created successfully. Start exploring your communities!
              </p>

              <div style={{ background: "#0A0A0F", border: "1px solid #1E1D2E", borderRadius: "12px", padding: "16px 20px", marginBottom: "24px", textAlign: "left" }}>
                <p style={{ fontSize: "12px", color: "#6B6A8A", marginBottom: "12px", fontWeight: 500 }}>What you get — for free:</p>
                {["Access to all 5 communities", "Post, comment, and connect", "Job board & events", "Upgrade to Premium anytime"].map((b) => (
                  <div key={b} className="benefit">
                    <div className="check">
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M2 5l2 2 4-4" stroke="#4ADE80" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    {b}
                  </div>
                ))}
              </div>

              <button className="btn-prim" onClick={() => router.push("/login")}>
                Sign in to your account →
              </button>
            </div>
          </div>
        )}

        <p style={{ textAlign: "center", marginTop: "20px", fontSize: "11px", color: "#3A3960" }}>
          © 2025 PinoyHub · Made for Filipinos 🇵🇭
        </p>
      </div>
    </main>
  );
}