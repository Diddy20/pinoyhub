"use client";
import { useState } from "react";
import Link from "next/link";

const plans = [
  { id: "monthly", label: "Monthly", price: 199, period: "per month", saving: null, perMonth: 199 },
  { id: "quarterly", label: "Quarterly", price: 499, period: "every 3 months", saving: "Save ₱98", perMonth: 166, popular: true },
  { id: "yearly", label: "Yearly", price: 1599, period: "per year", saving: "Save ₱789", perMonth: 133 },
];

const features = [
  "300+ exclusive guides & resources",
  "Premium job board access",
  "Live Q&A with industry experts",
  "Ad-free experience",
  "Early access to new features",
  "Premium member badge",
];

function GCashIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 40 40" fill="none">
      <rect width="40" height="40" rx="8" fill="#007DFE"/>
      <text x="20" y="27" textAnchor="middle" fontSize="14" fontWeight="800" fill="white" fontFamily="Arial">G</text>
    </svg>
  );
}

function MayaIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 40 40" fill="none">
      <rect width="40" height="40" rx="8" fill="#00A651"/>
      <text x="20" y="27" textAnchor="middle" fontSize="11" fontWeight="800" fill="white" fontFamily="Arial">MAYA</text>
    </svg>
  );
}

function CardIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#534AB7" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="4" width="22" height="16" rx="2"/>
      <line x1="1" y1="10" x2="23" y2="10"/>
    </svg>
  );
}

function BankIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#854F0B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="22" x2="21" y2="22"/>
      <line x1="6" y1="18" x2="6" y2="11"/>
      <line x1="10" y1="18" x2="10" y2="11"/>
      <line x1="14" y1="18" x2="14" y2="11"/>
      <line x1="18" y1="18" x2="18" y2="11"/>
      <polygon points="12 2 20 7 4 7"/>
    </svg>
  );
}

const methods = [
  { id: "gcash", label: "GCash", sub: "Instant · Secure", Icon: GCashIcon, color: "#007DFE", bg: "#E6F1FB" },
  { id: "maya", label: "Maya", sub: "PayMaya wallet", Icon: MayaIcon, color: "#00A651", bg: "#E1F5EE" },
  { id: "card", label: "Credit / Debit", sub: "Visa, Mastercard", Icon: CardIcon, color: "#534AB7", bg: "#EEEDFE" },
  { id: "bank", label: "Bank Transfer", sub: "1–2 business days", Icon: BankIcon, color: "#854F0B", bg: "#FAEEDA" },
];

export default function UpgradePage() {
  const [selectedPlan, setSelectedPlan] = useState("quarterly");
  const [selectedMethod, setSelectedMethod] = useState("gcash");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  const plan = plans.find((p) => p.id === selectedPlan)!;
  const method = methods.find((m) => m.id === selectedMethod)!;

  const handlePay = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setStep(2);
  };

  return (
    <main style={{ fontFamily: "'DM Sans', sans-serif", background: "#0A0A0F", minHeight: "100vh", color: "#F0EFF8" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&family=Syne:wght@700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #0A0A0F; }
        a { text-decoration: none; color: inherit; }
        .plan-card { background: #13121E; border: 1.5px solid #1E1D2E; border-radius: 14px; padding: 20px; cursor: pointer; transition: all 0.2s; text-align: center; position: relative; }
        .plan-card:hover { border-color: #534AB7; }
        .plan-card.selected { border-color: #534AB7; background: #0F0E1C; box-shadow: 0 0 0 1px #534AB7; }
        .method-card { background: #13121E; border: 1.5px solid #1E1D2E; border-radius: 12px; padding: 14px 16px; cursor: pointer; transition: all 0.2s; display: flex; align-items: center; gap: 12px; }
        .method-card:hover { border-color: #2A2940; }
        .method-card.selected { border-color: #534AB7; background: #0F0E1C; }
        .btn-pay { width: 100%; background: #534AB7; color: #EEEDFE; border: none; border-radius: 12px; padding: 15px; font-size: 15px; font-weight: 500; cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all 0.2s; display: flex; align-items: center; justify-content: center; gap: 8px; }
        .btn-pay:hover:not(:disabled) { background: #3C3489; transform: translateY(-1px); box-shadow: 0 8px 24px rgba(83,74,183,0.3); }
        .btn-pay:disabled { opacity: 0.7; cursor: not-allowed; }
        .feat-row { display: flex; align-items: center; gap: 8px; margin-bottom: 8px; }
        .check { width: 18px; height: 18px; border-radius: 50%; background: #1A2E1A; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        @keyframes spin { to { transform: rotate(360deg); } }
        .spinner { width: 18px; height: 18px; border: 2px solid #EEEDFE40; border-top-color: #EEEDFE; border-radius: 50%; animation: spin 0.7s linear infinite; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .fade-up { animation: fadeUp 0.5s ease both; }
        .glow { position: absolute; border-radius: 50%; filter: blur(80px); pointer-events: none; }
        .method-icon-wrap { width: 40px; height: 40px; border-radius: 10px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #0A0A0F; }
        ::-webkit-scrollbar-thumb { background: #2A2940; border-radius: 2px; }
      `}</style>

      {/* NAV */}
      <nav style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(10,10,15,0.96)", backdropFilter: "blur(16px)", borderBottom: "1px solid #1E1D2E", padding: "0 32px", height: "56px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{ width: "30px", height: "30px", borderRadius: "8px", background: "linear-gradient(135deg,#534AB7,#3C3489)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "15px" }}>🇵🇭</div>
          <span style={{ fontFamily: "'Syne', sans-serif", fontSize: "16px", fontWeight: 800, color: "#F0EFF8", letterSpacing: "-0.02em" }}>PinoyHub</span>
        </Link>
        <Link href="/feed" style={{ fontSize: "13px", color: "#6B6A8A" }}>← Back to feed</Link>
      </nav>

      {step === 1 && (
        <div className="fade-up" style={{ maxWidth: "960px", margin: "0 auto", padding: "40px 24px" }}>
          <div style={{ textAlign: "center", marginBottom: "40px", position: "relative" }}>
            <div className="glow" style={{ width: "400px", height: "300px", background: "#534AB7", opacity: 0.07, top: "-100px", left: "50%", transform: "translateX(-50%)" }} />
            <div style={{ position: "relative" }}>
              <div style={{ display: "inline-block", background: "#13121E", border: "1px solid #2A2940", borderRadius: "20px", padding: "5px 14px", fontSize: "12px", color: "#A09EEA", fontWeight: 500, marginBottom: "16px" }}>⭐ Premium Membership</div>
              <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: "12px" }}>Unlock everything on PinoyHub</h1>
              <p style={{ fontSize: "15px", color: "#6B6A8A", maxWidth: "440px", margin: "0 auto", lineHeight: 1.7 }}>Join thousands of Filipino professionals with full access to all resources, job boards, and expert Q&As.</p>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: "20px", alignItems: "start" }}>
            <div>
              {/* Plans */}
              <p style={{ fontSize: "11px", color: "#6B6A8A", fontWeight: 500, marginBottom: "12px", textTransform: "uppercase", letterSpacing: "0.08em" }}>Choose your plan</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px", marginBottom: "24px" }}>
                {plans.map((p) => (
                  <div key={p.id} className={`plan-card ${selectedPlan === p.id ? "selected" : ""}`} onClick={() => setSelectedPlan(p.id)}>
                    {p.popular && <div style={{ position: "absolute", top: "-10px", left: "50%", transform: "translateX(-50%)", background: "#534AB7", color: "#EEEDFE", fontSize: "10px", fontWeight: 500, padding: "3px 10px", borderRadius: "20px", whiteSpace: "nowrap" }}>Most popular</div>}
                    {p.saving ? <div style={{ background: "#E1F5EE", color: "#085041", fontSize: "10px", fontWeight: 500, padding: "2px 8px", borderRadius: "20px", display: "inline-block", marginBottom: "8px" }}>{p.saving}</div> : <div style={{ height: "22px", marginBottom: "8px" }} />}
                    <div style={{ fontSize: "11px", color: "#6B6A8A", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.06em" }}>{p.label}</div>
                    <div style={{ fontFamily: "'Syne', sans-serif", fontSize: "28px", fontWeight: 800, color: selectedPlan === p.id ? "#F0EFF8" : "#8887A8" }}>₱{p.price.toLocaleString()}</div>
                    <div style={{ fontSize: "11px", color: "#3A3960", marginTop: "3px", marginBottom: "8px" }}>{p.period}</div>
                    <div style={{ fontSize: "11px", color: "#534AB7" }}>~₱{p.perMonth}/month</div>
                  </div>
                ))}
              </div>

              {/* Payment methods */}
              <p style={{ fontSize: "11px", color: "#6B6A8A", fontWeight: 500, marginBottom: "12px", textTransform: "uppercase", letterSpacing: "0.08em" }}>Payment method</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginBottom: "20px" }}>
                {methods.map((m) => (
                  <div key={m.id} className={`method-card ${selectedMethod === m.id ? "selected" : ""}`} onClick={() => setSelectedMethod(m.id)}>
                    <div className="method-icon-wrap" style={{ background: m.bg }}>
                      <m.Icon />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: "13px", fontWeight: 500, color: "#F0EFF8" }}>{m.label}</div>
                      <div style={{ fontSize: "11px", color: "#3A3960" }}>{m.sub}</div>
                    </div>
                    {selectedMethod === m.id && (
                      <div style={{ width: "18px", height: "18px", borderRadius: "50%", background: "#534AB7", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <svg width="9" height="9" viewBox="0 0 8 8" fill="none"><path d="M1 4l2 2 4-4" stroke="#EEEDFE" strokeWidth="1.5" strokeLinecap="round"/></svg>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Total */}
              <div style={{ background: "#E1F5EE", border: "1px solid #9FE1CB", borderRadius: "12px", padding: "14px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                <div>
                  <div style={{ fontSize: "13px", fontWeight: 500, color: "#085041" }}>Total due today</div>
                  <div style={{ fontSize: "11px", color: "#0F6E56", marginTop: "2px" }}>{plan.label} plan · {method.label} · auto-renews</div>
                </div>
                <div style={{ fontFamily: "'Syne', sans-serif", fontSize: "26px", fontWeight: 800, color: "#085041" }}>₱{plan.price.toLocaleString()}</div>
              </div>

              <button className="btn-pay" onClick={handlePay} disabled={loading}>
                {loading ? <span className="spinner" /> : `Pay ₱${plan.price.toLocaleString()} with ${method.label}`}
              </button>

              <div style={{ display: "flex", justifyContent: "center", gap: "20px", marginTop: "12px" }}>
                {["🔒 Secured by PayMongo", "Cancel anytime", "Receipt by email"].map((t) => (
                  <span key={t} style={{ fontSize: "11px", color: "#3A3960" }}>{t}</span>
                ))}
              </div>
            </div>

            {/* Right sidebar */}
            <div style={{ background: "#13121E", border: "1px solid #1E1D2E", borderRadius: "16px", padding: "24px", position: "sticky", top: "76px" }}>
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: "16px", fontWeight: 700, color: "#F0EFF8", marginBottom: "4px" }}>What you get</div>
              <div style={{ fontSize: "12px", color: "#6B6A8A", marginBottom: "20px" }}>Everything in free, plus:</div>
              {features.map((f) => (
                <div key={f} className="feat-row">
                  <div className="check">
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M1 4l2 2 4-4" stroke="#4ADE80" strokeWidth="1.3" strokeLinecap="round"/></svg>
                  </div>
                  <span style={{ fontSize: "13px", color: "#8887A8" }}>{f}</span>
                </div>
              ))}
              <div style={{ marginTop: "20px", paddingTop: "20px", borderTop: "1px solid #1E1D2E" }}>
                <div style={{ fontSize: "12px", color: "#6B6A8A", marginBottom: "10px" }}>Trusted by professionals from</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  {["PGH", "St. Luke's", "Makati Med", "DepEd", "OFW Network"].map((org) => (
                    <span key={org} style={{ background: "#0A0A0F", border: "1px solid #1E1D2E", borderRadius: "6px", padding: "4px 8px", fontSize: "11px", color: "#6B6A8A" }}>{org}</span>
                  ))}
                </div>
              </div>
              <div style={{ marginTop: "20px", paddingTop: "20px", borderTop: "1px solid #1E1D2E", display: "flex", gap: "10px" }}>
                <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "#E1F5EE", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: 500, color: "#0F6E56", flexShrink: 0 }}>MS</div>
                <div>
                  <p style={{ fontSize: "12px", color: "#8887A8", lineHeight: 1.6, fontStyle: "italic", marginBottom: "4px" }}>"Premium gave me access to the NCLEX guides that helped me pass on my first try."</p>
                  <div style={{ fontSize: "11px", color: "#3A3960" }}>Maria S. · ICU Nurse · Cebu</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="fade-up" style={{ maxWidth: "480px", margin: "60px auto", padding: "24px" }}>
          <div style={{ background: "#13121E", border: "1px solid #1E1D2E", borderRadius: "20px", padding: "48px 36px", textAlign: "center" }}>
            <div style={{ fontSize: "56px", marginBottom: "20px" }}>🎉</div>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "26px", fontWeight: 800, color: "#F0EFF8", marginBottom: "10px", letterSpacing: "-0.02em" }}>You're now Premium!</h2>
            <p style={{ fontSize: "14px", color: "#6B6A8A", lineHeight: 1.7, marginBottom: "28px" }}>Welcome to PinoyHub Premium. Your receipt has been sent to your email.</p>
            <div style={{ background: "#0A0A0F", border: "1px solid #1E1D2E", borderRadius: "12px", padding: "16px 20px", marginBottom: "24px", textAlign: "left" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                <span style={{ fontSize: "12px", color: "#6B6A8A" }}>Plan</span>
                <span style={{ fontSize: "12px", color: "#F0EFF8", fontWeight: 500 }}>{plan.label}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                <span style={{ fontSize: "12px", color: "#6B6A8A" }}>Amount paid</span>
                <span style={{ fontSize: "12px", color: "#4ADE80", fontWeight: 500 }}>₱{plan.price.toLocaleString()}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontSize: "12px", color: "#6B6A8A" }}>Payment method</span>
                <span style={{ fontSize: "12px", color: "#F0EFF8", fontWeight: 500 }}>{method.label}</span>
              </div>
            </div>
            <Link href="/feed">
              <button style={{ width: "100%", background: "#534AB7", color: "#EEEDFE", border: "none", borderRadius: "10px", padding: "13px", fontSize: "14px", fontWeight: 500, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>Go to my feed →</button>
            </Link>
          </div>
        </div>
      )}
    </main>
  );
}