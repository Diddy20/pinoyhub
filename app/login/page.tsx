"use client";
import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError("Invalid email or password. Please try again.");
      setLoading(false);
      return;
    }

    router.push("/feed");
  };

  const handleGoogle = () => {
    signIn("google", { callbackUrl: "/feed" });
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
      `}</style>

      <div style={{ width: "100%", maxWidth: "420px" }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "36px" }}>
          <Link href="/">
            <div style={{ display: "inline-flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
              <div style={{ width: "38px", height: "38px", borderRadius: "10px", background: "linear-gradient(135deg,#534AB7,#3C3489)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px" }}>🇵🇭</div>
              <span style={{ fontFamily: "'Syne', sans-serif", fontSize: "20px", fontWeight: 800, color: "#F0EFF8", letterSpacing: "-0.02em" }}>PinoyHub</span>
            </div>
          </Link>
          <p style={{ fontSize: "13px", color: "#6B6A8A", marginTop: "4px" }}>Welcome back! Sign in to your account.</p>
        </div>

        {/* Card */}
        <div style={{ background: "#13121E", border: "1px solid #1E1D2E", borderRadius: "20px", padding: "32px" }}>

          {/* Google */}
          <button className="btn-google" onClick={handleGoogle}>
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>

          <div className="divider" style={{ margin: "20px 0" }}>
            <div className="divider-line" />
            <span className="divider-text">or sign in with email</span>
            <div className="divider-line" />
          </div>

          {error && <div className="err" style={{ marginBottom: "16px" }}>{error}</div>}

          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: "14px" }}>
              <label style={{ display: "block", fontSize: "12px", color: "#6B6A8A", marginBottom: "6px", fontWeight: 500 }}>Email address</label>
              <input className="inp" type="email" placeholder="you@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>

            <div style={{ marginBottom: "6px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                <label style={{ fontSize: "12px", color: "#6B6A8A", fontWeight: 500 }}>Password</label>
                <Link href="/forgot-password" className="link">Forgot password?</Link>
              </div>
              <div style={{ position: "relative" }}>
                <input className="inp" type={showPass ? "text" : "password"} placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ paddingRight: "44px" }} />
                <button type="button" onClick={() => setShowPass(!showPass)} style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#3A3960", fontSize: "12px" }}>
                  {showPass ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <div style={{ marginBottom: "20px", marginTop: "16px" }}>
              <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                <input type="checkbox" style={{ accentColor: "#534AB7" }} />
                <span style={{ fontSize: "13px", color: "#6B6A8A" }}>Keep me signed in</span>
              </label>
            </div>

            <button className="btn-prim" type="submit" disabled={loading}>
              {loading ? <span className="spinner" /> : "Sign in"}
            </button>
          </form>

          <p style={{ textAlign: "center", marginTop: "20px", fontSize: "13px", color: "#6B6A8A" }}>
            Don't have an account?{" "}
            <Link href="/register" className="link" style={{ fontWeight: 500 }}>Create one free →</Link>
          </p>
        </div>

        <p style={{ textAlign: "center", marginTop: "24px", fontSize: "11px", color: "#3A3960" }}>
          By signing in, you agree to our{" "}
          <Link href="/terms" className="link" style={{ fontSize: "11px" }}>Terms</Link>
          {" "}and{" "}
          <Link href="/privacy" className="link" style={{ fontSize: "11px" }}>Privacy Policy</Link>.
        </p>
      </div>
    </main>
  );
}