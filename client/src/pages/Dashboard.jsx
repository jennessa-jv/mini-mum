import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
export default function Dashboard() {
  const navigate = useNavigate();
  const introRef = useRef(null);
  const questsRef = useRef(null);

  const scrollToIntro = () => {
    introRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
  };

  const scrollToQuests = () => {
    questsRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  };

  return (
    <div className="min-h-screen w-full font-mono overflow-x-hidden">
      <div className="sparkle-layer" />
      <div className="floating-pixels" />


      <div className="max-w-6xl mx-auto px-4">
        <section className="min-h-screen flex items-center justify-center">
          <div className="pixel-card bg-pink-50 w-full max-h-[85vh] p-10 flex flex-col justify-center">
            <p className="text-xs uppercase tracking-widest text-rose-600 mb-4">
              Maternal Quest · Level 1
            </p>

            <h1 className="text-5xl text-rose-800 mb-6 leading-tight">
              A calm, supportive space<br />for your health
            </h1>

            <p className="text-rose-700 mb-10 max-w-2xl">
              ☆.𓋼𓍊 𓆏 𓍊𓋼𓍊.☆<br/>
              Level up your understanding of health, safety, and care, 
              one gentle quest at a time.
              ⋆｡˚ ☁︎ ˚｡⋆｡˚☽˚｡⋆
            </p>
            <p
  onClick={() => alert("✨ You found a hidden sparkle. You're doing amazing.")}
  className="text-[10px] text-rose-400 cursor-pointer select-none"
>
  tap for magic
</p>


            <button
              onClick={scrollToIntro}
              className="pixel-button self-start"
            >
              ▶ Start Quest
            </button>
          </div>
        </section>

      <section className="text-center text-rose-600 text-xs tracking-wide pb-16"><br/><br/>
  💗 Progress saved · You’re allowed to go slow · You showed up today
</section>

        <section
          ref={introRef}
          className="min-h-screen flex items-center justify-center py-24"
        >
          <div
            onClick={scrollToQuests}
            className="pixel-card bg-white p-16 max-w-3xl text-center cursor-pointer hover:scale-[1.01] transition-transform"
          >
           <p className="text-xs uppercase tracking-widest text-rose-600 mb-6">
  About This Space
</p>

<h2 className="text-4xl text-rose-800 mb-8">
  What is Maternal Quest?
</h2>

<p className="text-rose-700 text-sm leading-relaxed max-w-3xl mx-auto mb-6">
  ⊹₊˚‧︵‿₊୨ᰔ୧₊‿︵‧˚₊⊹ <br/><br/>
  Maternal Quest is a women inclusive (or anyone with a uterus as well) digital space created to help women
  understand their bodies, feel safer, and make informed health decisions
  without pressure or judgment.
</p>

<p className="text-rose-700 text-sm leading-relaxed max-w-3xl mx-auto mb-6">
  Instead of overwhelming information, the platform is organized into
  gentle “quests”, with each focused on a specific part of health, from
  cycle awareness and long-term patterns to safety tools and finding care
  nearby.
</p>

<p className="text-rose-700 text-sm leading-relaxed max-w-3xl mx-auto mb-10">
  You can explore at your own pace, return anytime, and choose what matters
  most to you. There’s no rush, no assumptions, and a gamified view with just clear guidance, useful resources, and support when you need it.
  <br/>
  <br/>✩₊˚.⋆☾⋆⁺₊✧
</p>

<p className="text-xs text-rose-500 tracking-wide">
  Click anywhere to continue ↓
</p>

          </div>
        </section>

      <section className="py-24 flex justify-center">
  <div className="pixel-card bg-pink-50 p-12 max-w-2xl text-center space-y-6">
    <p className="text-xs uppercase tracking-widest text-rose-600">
      Today’s Gentle Quest
    </p>

    <h3 className="text-2xl text-rose-800">
      Check in with yourself
    </h3>

    <p className="text-rose-700 text-sm leading-relaxed">
      ༘˚⋆𐙚｡⋆𖦹.✧˚ <br/><br/>
      Take a moment to notice how your body feels today.
      No tracking required. Awareness counts as progress.
    </p>

    <button className="pixel-button mx-auto">
      I did this 💗
    </button>
  </div>
</section>

        <section ref={questsRef} className="py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 place-items-center">

           <QuestCard
  title="Safety Quest"
  intro="Explore safety insights."
  points={[
    "Visual crime heatmaps using NCRB data (2017–2025)",
    "Highlighting high-risk and safer zones",
    
  ]}
  action="Open Map"
  onClick={() => navigate("/safety-map")}
/>

  <QuestCard
  title="Cycle Quest"
  intro="Learn about periods, menopause, and how to's."
  points={[
    "To do's about pads, tampons and menstrual cups.",
    "De-stigmatizing periods.",
    
  ]}
  action="Let's go"
  onClick={() => navigate("/period-corner")}
/>
<QuestCard
  title="Care Quest"
  intro="Track long-term health patterns."
  points={[
    "Track vitals and update them."
    
  ]}
  action="Yayy. Take me!"
  onClick={() => navigate("/maternal-health")}
/>
        <QuestCard
  title="Chart Quest"
  intro="Journalling with Vitals!!."
  points={[
    "All vital data mapped graphically."
    
  ]}
  action="Let's track 'em"
  onClick={() => navigate("/health-trends")}
/>
        

           <QuestCard
  title="Hospital Quest"
  intro="Find doctors and hospitals when you need support."
  points={[
    "Welp, let's go."
    
  ]}
  action="Show me"
  onClick={() => navigate("/doctors")}
/>
          </div>
        </section>
<section className="py-24 flex justify-center">
  <div className="pixel-card bg-white p-12 max-w-xl w-full text-center space-y-6">
    <p className="text-xs uppercase tracking-widest text-rose-600">
      Contact me!
    </p>

    <h2 className="text-3xl text-rose-800">
      Let’s stay connected
    </h2>

    <p className="text-rose-700 text-sm leading-relaxed">
      My name's Jennessa Valder. I'm a 21yo software developer. If you have questions, feedback, or just want to share thoughts about
      Maternal Quest, feel free to reach out. This space is always growing
      with care and community.
    </p>

    <div className="space-y-2 text-sm text-rose-700">
      <p>
         Email:{" "}
        <a
          href="mailto:jennessavalder@gmail.com"
          className="underline hover:text-rose-800"
        >
          jennessavalder@gmail.com
        </a>
      </p>

      <p>
         Phone:{" "}
        <a
          href="tel:+910000000000"
          className="underline hover:text-rose-800"
        >
          +91 0000000000
        </a>
      </p>
    </div>
  </div>
</section>


        <section className="text-center text-rose-600 text-xs tracking-wide pb-16">
          💗 Save progress · No rush · You’re doing great
        </section>

      </div>

      <PixelStyles />
    </div>
  );
}
function PixelMascot() {
  const { scrollYProgress } = useScroll();
  const bounce = useTransform(scrollYProgress, [0, 1], [0, -12]);

  return (
    <motion.div
      style={{ y: bounce }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed bottom-6 left-6 z-20"
    >
      <motion.div
        whileHover={{ scale: 1.1, rotate: -4 }}
        whileTap={{ scale: 0.95, rotate: 4 }}
        className="pixel-card bg-white p-4 text-center cursor-pointer"
        onClick={() => alert("💗 Hi! You're doing great. One step at a time.")}
      >
        <p className="text-2xl">🧸</p>
        <p className="text-[10px] text-rose-600 mt-1">
          your guide
        </p>
      </motion.div>
    </motion.div>
  );
}
function QuestCard({ title, intro, points, action, onClick }) {
  return (
    <div className="quest-card w-full max-w-md">
      <div className="quest-card-inner">
        <h3 className="quest-title">{title}</h3>

        <p className="quest-intro">{intro}</p>

        <div className="quest-divider" />

        <ul className="quest-points">
          {points.map((point, i) => (
            <li key={i}>{point}</li>
          ))}
        </ul>

        <button
          onClick={onClick}
          className="quest-button"
        >
          {action}
        </button>
      </div>
    </div>
  );
}

function PixelStyles() {
  return (
    <style>{`
      html, body, #root {
        height: 100%;
        margin: 0;
        overflow-x: hidden;
        background: linear-gradient(to bottom right, #fce7f3, #ffe4e6, #f5d0fe);
      }

      .sparkle-layer {
       animation:
    sparkleFloat 12s linear infinite,
    sparkleTwinkle 4s ease-in-out infinite alternate;
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  background-image:
    radial-gradient(circle, rgba(255,255,255,0.6) 1.2px, transparent 1.2px),
    radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px),
    radial-gradient(circle, rgba(255,255,255,0.25) 0.8px, transparent 0.8px);
  background-size: 120px 120px, 180px 180px, 260px 260px;
  animation: sparkleFloat 12s linear infinite;
}


     @keyframes sparkleFloat {
  from {
    background-position: 0 0, 0 0, 0 0;
  }
  to {
    background-position: 400px 600px, -300px 500px, 200px -400px;
  }
}
@keyframes sparkleTwinkle {
  from { opacity: 0.4; }
  to { opacity: 0.75; }
}

      .pixel-card {
        position: relative;
        z-index: 1;
        box-shadow:
          0 0 0 3px #f472b6,
          6px 6px 0 #fb7185;
        transition: transform 0.15s ease;
      }

      .pixel-card:hover {
        transform: translate(-2px, -2px);
        box-shadow:
          0 0 0 3px #f472b6,
          10px 10px 0 #fb7185;
      }

      .pixel-button {
        background: #fff;
        border: none;
        padding: 14px 32px;
        font-size: 14px;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        color: #9f1239;
        box-shadow:
          0 0 0 3px #f472b6,
          4px 4px 0 #fb7185;
        cursor: pointer;
      }

      .pixel-button.small {
        padding: 10px 22px;
        font-size: 12px;
      }
.floating-pixels {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  background-image:
    radial-gradient(circle, rgba(251,113,133,0.25) 2px, transparent 2px),
    radial-gradient(circle, rgba(244,114,182,0.2) 1.5px, transparent 1.5px);
  background-size: 220px 220px, 140px 140px;
  animation: pixelDrift 18s linear infinite;
}

@keyframes pixelDrift {
  from { background-position: 0 0, 0 0; }
  to { background-position: -600px 800px, 500px -700px; }
}


    `}</style>
  );
}

