import { useState, useEffect } from "react";
import { register } from "../services/auth";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.margin = "0";
    document.body.style.overflowX = "hidden";
    document.body.style.background = "#f8a6b3";
    return () => {
      document.body.style.background = "";
      document.body.style.overflowX = "";
    };
  }, []);

  const submit = async (e) => {
  e.preventDefault();
  setError("");
  setLoading(true);

  if (!name.trim()) {
    setError("Please enter your full name.");
    setLoading(false);
    return;
  }

  if (!email.includes("@")) {
    setError("Please enter a valid email address.");
    setLoading(false);
    return;
  }

  if (password.length < 6) {
    setError("Password must be at least 6 characters long.");
    setLoading(false);
    return;
  }

  try {
    await register(name, email, password);
    navigate("/login");
  } catch (err) {
    const message =
      err?.response?.data?.message ||
      err?.response?.data?.error ||
      "";

if (
  message.toLowerCase().includes("exists") ||
  message.toLowerCase().includes("already")
) {
  setError("An account with this email already exists.");
} else if (
  message.toLowerCase().includes("invalid email") ||
  message.toLowerCase().includes("email format")
) {
  setError("The email format is invalid.");
}

  } finally {
    setLoading(false);
  }
};


  const scrollToForm = () => {
    document
      .getElementById("register-form")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="w-full min-h-screen overflow-x-hidden">
      <section className="relative flex justify-center pt-6">
        <div className="relative bg-[#e97882] rounded-[2.5rem] shadow-1xl max-w-5xl w-full mx-auto overflow-hidden">
          <div className="flex items-center justify-between px-6 py-3 bg-[#976653]">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-[#ffc75f] rounded-full" />
              <span className="w-3 h-3 bg-[#ffc75f] rounded-full" />
              <span className="w-3 h-3 bg-[#ffc75f] rounded-full" />
            </div>
            <span className="text-sm font-semibold text-[#7a2c3a]">
              Maternal Quest
            </span>
          </div>

          <div className="p-10 grid md:grid-cols-2 gap-10 items-center">
            <div className="text-[#5a1b2c]">
              <h1 className="font-semibold text-4xl md:text-5xl mb-3">
                Care, clarity, and confidence
              </h1>
<p
  className="text-lg leading-relaxed mb-6"
  style={{
    fontFamily: "Playfair Display, serif",
    fontWeight: 400,
    letterSpacing: "0.01em",
  }}
>
                Maternal Quest is a calm, supportive platform designed to help
                women understand their health. From cycle tracking to preventive
                awareness, everything is built with empathy, privacy, and trust
                at its core.
              </p>

              <button
                onClick={scrollToForm}
                className="px-8 py-4 rounded-full font-semibold text-lg shadow-xl transition hover:scale-105"
                style={{
                  background: "linear-gradient(to right, #e75480, #f07c9b)",
                  color: "#ffffff",
                }}
              >
                Get Started
              </button>
            </div>

            <div className="bg-[#fde3d5] rounded-3xl p-8 shadow-xl text-[#7a2c3a]">
              <h2 className="font-semibold text-xl mb-3">
                Designed for maternal wellbeing
                ────୨ৎ────∘₊✧──────✧₊∘
              </h2>

              <p className="text-sm leading-relaxed mb-4"
              style={{
    fontFamily: "Playfair Display, serif",
    fontWeight: 400,
    letterSpacing: "0.01em",
  }} >
                A single space where technology meets care, offering guidance
                without pressure and information without fear.
                °❀⋆.ೃ࿔*:･ <br></br>
                It involves every aspect essential to a women's wellbeing.
                <li>Personalized menstrual cycle tracking</li>
                <li>Educational breast health awareness tools</li>
                <li>Access to nearby healthcare professionals</li>
                <li>Privacy-first, judgment-free design</li>
                
                </p>
            </div>
          </div>
        </div>
      </section>

      <section
        id="register-form"
        className="relative min-h-screen flex items-start justify-center overflow-hidden pt-20"
        style={{
          position: "relative",
          left: "50%",
          right: "50%",
          marginLeft: "-50vw",
          marginRight: "-50vw",
          width: "100vw",
        }}
      >
        <div
          className="fixed inset-0 -z-10"
          style={{
            backgroundImage: 'url("/clouds.png")',
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />

        <div
          className="fixed inset-0 -z-10"
          style={{ backgroundColor: "rgba(255, 200, 215, 0.55)" }}
        />

        <form
          onSubmit={submit}
          className="relative z-10 bg-white/90 backdrop-blur-xl w-full max-w-md rounded-[2rem] shadow-2xl p-8"
          style={{ border: "4px solid #EA9CAF" }}
        >
          <div className="text-center mb-6">
            <span
              className="inline-block px-4 py-1 rounded-full text-sm font-semibold shadow"
              style={{ backgroundColor: "#E75480", color: "#ffffff" }}
            >
              Create an account
            </span>
          </div>

          <h3
            className="text-4xl font-bold text-center"
            style={{ color: "#E75480" }}
          >
            Welcome
          </h3>

          <p className="text-center text-gray-600 mt-2 mb-8">
            Begin your journey with Maternal Quest
          </p>
{error && (
  <div
    className="mb-5 rounded-xl px-4 py-3 text-sm"
    style={{
      backgroundColor: "#fde2e7",
      color: "#9b1248",
      border: "1px solid #f3a4b7",
    }}
  >
    {error}
  </div>
)}

          <div className="space-y-5">
            <input
              className="w-full p-3 rounded-xl border-2 focus:outline-none"
              style={{ borderColor: "#EA9CAF" }}
              placeholder="Full name"
              onChange={(e) => setName(e.target.value)}
            />

            <input
              className="w-full p-3 rounded-xl border-2 focus:outline-none"
              style={{ borderColor: "#EA9CAF" }}
              placeholder="Email address"
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              className="w-full p-3 rounded-xl border-2 focus:outline-none"
              style={{ borderColor: "#EA9CAF" }}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

         <button
  disabled={loading}
  className="mt-8 w-full py-4 rounded-2xl font-semibold text-lg shadow-lg transition"
  style={{
    background: loading
      ? "#f0a3b5"
      : "linear-gradient(to right, #E75480, #F07C9B)",
    color: "#ffffff",
    cursor: loading ? "not-allowed" : "pointer",
  }}
>
  {loading ? "Creating account..." : "Create account"}
</button>

        </form>
      </section>
    </main>
  );
}
