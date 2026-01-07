import { useState, useEffect } from "react";
import { register } from "../services/auth";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Full-page background + no horizontal scroll
  useEffect(() => {
    document.body.style.margin = "0";
    document.body.style.overflowX = "hidden";
    document.body.style.background = `
      linear-gradient(
        to bottom,
        #E75480 0%,
         #ffddf0ff 4%,
        #ff98b2ff 35%,
        #fb8eadff 65%,
        #FDF4F7 100%
      )
    `;
    return () => {
      document.body.style.background = "";
      document.body.style.overflowX = "";
    };
  }, []);

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
    <main className="w-full min-h-screen overflow-x-hidden">
     <section className="relative w-full min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
  
{/* yellow band */}
  <div
    className="absolute top-0 left-0 w-full h-1/3 -z-10"
    style={{
      background: "linear-gradient(to bottom, #FFDE21 0%, rgba(255,222,33,0.6) 50%, rgba(255,222,33,0) 100%)",
    }}
  />

  <h1 className="font-game text-5xl md:text-6xl text-white drop-shadow">
    Start Your
  </h1>

  <h2
    className="font-game text-6xl md:text-7xl mt-2 drop-shadow"
    style={{ color: "#f56d12ff" }}
  >
    Mini-mum Adventure
  </h2>

 <p className="mt-6 text-white/90 max-w-xl text-lg">
  A gentle, heart-soft journey into maternal health ✨
</p>


  <button
    onClick={scrollToForm}
    className="mt-10 px-8 py-4 rounded-xl font-extrabold text-lg shadow-lg transition hover:scale-105"
    style={{ backgroundColor: "#F43F5F", color: "#FDF4F7" }}
  >
    Get Started
  </button>
</section>

<section
  id="register-form"
  className="relative min-h-screen flex items-center justify-center overflow-hidden"
  style={{
    position: "relative",
    left: "50%",
    right: "50%",
    marginLeft: "-50vw",
    marginRight: "-50vw",
    width: "100vw",
  }}
>
  {/* FULL-PAGE BACKGROUND */}
  <div
    className="fixed inset-0 -z-10"
    style={{
      backgroundImage: 'url("/clouds.png")',
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    }}
  />

  {/* TRANSLUCENT OVERLAY */}
  <div
    className="fixed inset-0 -z-10"
    style={{
      backgroundColor: "rgba(255, 200, 215, 0.55)",
    }}
  />

  {/* FORM */}
  <form
    onSubmit={submit}
    className="relative z-10 bg-white/90 backdrop-blur-xl w-full max-w-md rounded-[2rem] shadow-2xl p-8"
    style={{ border: "4px solid #EA9CAF" }}
  >
    <div className="text-center mb-6">
      <span
        className="inline-block px-4 py-1 rounded-full text-sm font-bold shadow"
        style={{ backgroundColor: "#E75480", color: "#FDF4F7" }}
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
      className="mt-8 w-full py-4 rounded-2xl font-extrabold text-lg shadow-lg transition hover:scale-105"
      style={{
        background: "linear-gradient(to right, #E75480, #F07C9B)",
        color: "#FDF4F7",
      }}
    >
      ▶ Start Adventure
    </button>
  </form>
</section>


    </main>
  );
}
