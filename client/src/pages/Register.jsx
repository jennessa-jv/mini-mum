import { useState } from "react";
import { register } from "../services/auth";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    await register(name, email, password);
    navigate("/dashboard");
  };

  const scrollToForm = () => {
    document
      .getElementById("register-form")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      className="min-h-screen"
      style={{
        background: `
          linear-gradient(
            to bottom,
            #E75480 0%,
            #EA9CAF 35%,
            #F6B1C5 65%,
            #FDF4F7 100%
          )
        `,
      }}
    >
      {/* 🌸 HERO SECTION */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-4 relative overflow-hidden">

        {/* Soft pink light blobs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-24 left-10 w-80 h-32 bg-white/40 rounded-full blur-3xl" />
          <div className="absolute top-40 right-16 w-96 h-36 bg-white/35 rounded-full blur-3xl" />
          <div className="absolute bottom-32 left-1/3 w-72 h-28 bg-white/30 rounded-full blur-3xl" />
        </div>

        {/* Sparkles */}
        <div className="absolute inset-0 pointer-events-none text-white/80">
          <span className="absolute top-[22%] left-[18%] sparkle">✦</span>
          <span className="absolute top-[38%] right-[22%] sparkle">✧</span>
          <span className="absolute bottom-[30%] left-[45%] sparkle">✦</span>
        </div>

        <h1 className="font-game text-5xl md:text-6xl text-white drop-shadow">
          Start Your
        </h1>

        <h2
          className="font-game text-6xl md:text-7xl drop-shadow mt-2"
          style={{ color:  "#FFDE21" }}
        >
          Mini-mum Adventure
        </h2>

        <p className="mt-6 text-white/90 max-w-xl text-lg">
          A gentle, heart-soft journey into maternal health ✨
        </p>

        <button
          onClick={scrollToForm}
          className="mt-10 px-8 py-4 rounded-xl font-extrabold text-lg
                     shadow-lg transition hover:scale-105"
            style={{
    backgroundColor: "#F43F5F",
    color: "#FDF4F7",
  }}
        >
           Get Started
        </button>
      </section>
      {/* register form section */}
      <section
        id="register-form"
        className="min-h-screen flex items-center justify-center px-4"
        style={{
          background:
            "linear-gradient(to bottom, #FDF4F7 0%, #F6B1C5 100%)",
        }}
      >
        <form
          onSubmit={submit}
          className="bg-white/95 backdrop-blur-xl
                     w-full max-w-md rounded-[2rem]
                     shadow-2xl p-8"
          style={{ border: "4px solid #EA9CAF" }}
        >
          {/* Badge */}
          <div className="text-center mb-6">
            <span
              className="inline-block px-4 py-1 rounded-full text-sm font-bold shadow"
              style={{
                backgroundColor: "#E75480",
                color: "#FDF4F7",
              }}
            >
              🌸 NEW QUEST
            </span>
          </div>

          <h3
            className="text-4xl font-extrabold text-center"
            style={{ color: "#E75480" }}
          >
            Create Your Hero
          </h3>

          <p className="text-center text-gray-600 mt-2 mb-8">
            Your journey begins ✨
          </p>

          <div className="space-y-5">
            <input
              className="w-full p-3 rounded-xl border-2 focus:outline-none"
              style={{ borderColor: "#EA9CAF" }}
              placeholder="🧙 Hero Name"
              onChange={(e) => setName(e.target.value)}
            />

            <input
              className="w-full p-3 rounded-xl border-2 focus:outline-none"
              style={{ borderColor: "#EA9CAF" }}
              placeholder="📜 Email Scroll"
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              className="w-full p-3 rounded-xl border-2 focus:outline-none"
              style={{ borderColor: "#EA9CAF" }}
              placeholder="🔐 Secret Spell"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            className="mt-8 w-full py-4 rounded-2xl font-extrabold text-lg
                       shadow-lg transition hover:scale-105"
            style={{
              background:
                "linear-gradient(to right, #E75480, #F07C9B)",
              color: "#FDF4F7",
            }}
          >
            ▶ Start Adventure
          </button>
        </form>
      </section>
    </div>
  );
} 

