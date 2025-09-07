import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Confetti from "react-confetti";

/* ---------------- CONFIG ---------------- */
const CONFIG = {
  NAME: "Richitha",
  ENABLE_COUNTDOWN: false,
  UNLOCK_AT_ISO: "2025-09-08T00:00:00",
  STORY_PAGES: [
    {
      title: "From Hello to Us",
      text: "We met on Instagram — a small hello that turned into long late-night talks. I remember your teal highlights and the first shy smile in pictures."
    },
    {
      title: "Breaking & Becoming",
      text: "We fought, we were stubborn, you were fierce — sometimes angry, sometimes distant. But even in storms you came back, and we grew stronger for it."
    },
    {
      title: "Little Things, Big Love",
      text: "KitKat breaks, blue orchids you loved, and your MBBS grind — you showed me what resilience means. I love every layer of you, even the gritty ones."
    }
  ],
  BALLOON_LINES: [
    "Sweetest doctor-to-be 👩‍⚕️",
    "Cutest smile in the universe 😍",
    "My forever sunshine ☀️",
    "KitKat vows: always break together 🍫"
  ],
  MBBS_QA: [
    { q: "Best medicine in the world?", a: "Your hugs 🤗" },
    { q: "Cure for my sleepless nights?", a: "Your smile 😍" },
    { q: "Doctor I trust with my heart?", a: "YOU 💖" }
  ],
  FINAL_TEXT: "You’re my biggest gift, today and forever. — Always yours ❤️",
};

/* ---------------- SMALL COMPONENTS ---------------- */
function TopBar({ name }) {
  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-3 flex items-center justify-between text-sm text-gray-600">
      <div>A surprise for <span className="font-semibold">{name}</span></div>
      <div className="text-xs text-gray-400">Made with ♥</div>
    </div>
  );
}

/* ---------------- SCREENS ---------------- */
function CountdownLock({ unlockAt, onOpen }) {
  const target = new Date(unlockAt);
  const [time, setTime] = useState(calc());

  function calc() {
    const now = new Date();
    const diff = Math.max(0, target - now);
    const h = String(Math.floor(diff / (1000 * 60 * 60))).padStart(2, "0");
    const m = String(Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, "0");
    const s = String(Math.floor((diff % (1000 * 60)) / 1000)).padStart(2, "0");
    return `${h}:${m}:${s}`;
  }
  useEffect(() => { const t = setInterval(() => setTime(calc()), 500); return () => clearInterval(t); }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="text-center p-6">
        <div className="mx-auto w-36 h-36 rounded-lg bg-gradient-to-br from-black to-gray-800 flex items-center justify-center text-white shadow-lg">🎁</div>
        <h2 className="mt-4 text-2xl font-bold text-yellow-600">Something magical is waiting…</h2>
        <div className="mt-3 text-3xl font-semibold">{time}</div>
        <button disabled className="mt-4 px-6 py-2 rounded-xl bg-gray-300 text-gray-600">Locked 🔒</button>
      </div>
    </motion.div>
  );
}

function WelcomeBloom({ name, onOpen }) {
  return (
    <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-center p-6">
      <h1 className="text-3xl font-bold text-pink-500">My Love {name} ❤️, Today’s All About YOU ✨</h1>
      <p className="mt-3 text-gray-700">I made something just for your special day…</p>
      <button onClick={onOpen} className="mt-6 px-6 py-3 rounded-2xl bg-gradient-to-r from-yellow-500 to-pink-400 text-white font-semibold shadow-lg">Open Surprise 🎁</button>
    </motion.div>
  );
}

function GiftBox({ onUnwrap }) {
  return (
    <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="p-6 text-center">
      <motion.div whileTap={{ scale: 0.9 }} onClick={onUnwrap} className="cursor-pointer mx-auto w-44 h-44 rounded-xl bg-gradient-to-tr from-yellow-100 to-pink-50 flex items-center justify-center shadow-lg">
        <div className="text-6xl">🎁</div>
      </motion.div>
      <p className="mt-3 text-gray-700">Tap to unwrap your first gift…</p>
    </motion.div>
  );
}

function MemoryLane({ pages, onNext, onPrev }) {
  const [i, setI] = useState(0);
  const next = () => { if (i < pages.length - 1) setI(i + 1); else onNext(); };
  const prev = () => { if (i > 0) setI(i - 1); else onPrev(); };

  return (
    <motion.div className="p-6 text-center" initial={{ x: 200, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
      <div className="bg-white p-6 rounded-xl shadow max-w-xl mx-auto">
        <h3 className="text-xl font-bold text-indigo-800">{pages[i].title}</h3>
        <p className="mt-3 text-gray-700">{pages[i].text}</p>
      </div>
      <div className="flex justify-between mt-4">
        <button onClick={prev} className="px-4 py-2 rounded-lg border">◀ Back</button>
        <button onClick={next} className="px-4 py-2 rounded-lg bg-pink-400 text-white">Next ▶</button>
      </div>
    </motion.div>
  );
}

function BalloonHunt({ lines, onFinish }) {
  const [popped, setPopped] = useState([]);
  const [showLine, setShowLine] = useState(null);

  function pop(i) {
    if (popped.includes(i)) return;
    const newP = [...popped, i];
    setPopped(newP);
    setShowLine(lines[i]);
    setTimeout(() => setShowLine(null), 2000);
    if (newP.length >= Math.min(4, lines.length)) setTimeout(onFinish, 1000);
  }

  return (
    <motion.div className="p-6 text-center">
      <h3 className="text-2xl font-bold text-indigo-800 mb-3">🎈 Pop the balloons</h3>
      <div className="grid grid-cols-4 gap-4 justify-center">
        {Array.from({ length: 6 }).map((_, idx) => (
          <motion.div key={idx} className={`w-20 h-28 flex items-center justify-center text-2xl cursor-pointer rounded-full ${popped.includes(idx) ? "bg-gray-300" : "bg-pink-300"}`} onClick={() => pop(idx)} whileTap={{ scale: 0.9 }}>
            {popped.includes(idx) ? "💬" : "🎈"}
          </motion.div>
        ))}
      </div>
      {showLine && <div className="mt-6 bg-white p-3 rounded-lg shadow inline-block">{showLine}</div>}
    </motion.div>
  );
}

function CakeScreen({ onBlow, name }) {
  const [lit, setLit] = useState(false);
  function tapCake() { if (!lit) setLit(true); else onBlow(); }
  return (
    <motion.div className="p-6 text-center">
      <h3 className="text-2xl font-bold text-indigo-800 mb-3">🎂 It’s your day, {name}</h3>
      <div onClick={tapCake} className="mx-auto w-44 h-44 rounded-xl bg-pink-100 flex items-center justify-center shadow-lg cursor-pointer text-6xl">🍰</div>
      <p className="mt-4 text-gray-700">{!lit ? "Tap to light the candles ✨" : "Candles lit! Tap again to blow 🎈"}</p>
    </motion.div>
  );
}

function MusicalHeart({ onNext }) {
  return (
    <motion.div className="p-6 text-center">
      <h3 className="text-2xl font-bold text-indigo-800 mb-3">🎶 Every beat today sings for you</h3>
      <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 1.6 }} className="text-6xl mb-4">💖</motion.div>
      <button onClick={onNext} className="px-5 py-2 rounded-lg bg-yellow-400 text-black">Play Final Surprise</button>
    </motion.div>
  );
}

function MBBSQuiz({ qa, onDone }) {
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  function reveal() {
    setFlipped(true);
    setTimeout(() => { setFlipped(false); if (idx < qa.length - 1) setIdx(idx + 1); else onDone(); }, 1200);
  }
  return (
    <motion.div className="p-6 text-center">
      <h3 className="text-2xl font-bold text-indigo-800 mb-3">🩺 MBBS Birthday Twist</h3>
      <div className="bg-white p-6 rounded-xl shadow text-lg max-w-lg mx-auto">
        {!flipped ? qa[idx].q : <div className="text-pink-500 font-semibold">{qa[idx].a}</div>}
      </div>
      <button onClick={reveal} className="mt-4 px-5 py-2 rounded-lg bg-pink-400 text-white">Reveal</button>
    </motion.div>
  );
}

function FinalWish({ text, onReplay }) {
  return (
    <motion.div className="p-6 text-center bg-black text-white rounded-xl">
      <div className="mb-4 text-5xl">🎆</div>
      <h2 className="text-3xl font-bold mb-4">Happy Birthday, My Love ❤️</h2>
      <p className="max-w-xl mx-auto text-lg">{text}</p>
      <button onClick={onReplay} className="mt-6 px-5 py-2 rounded-lg border border-white">Replay</button>
    </motion.div>
  );
}

/* ---------------- MAIN APP ---------------- */
export default function App() {
  const [page, setPage] = useState(CONFIG.ENABLE_COUNTDOWN ? 0 : 1);
  const [showConfetti, setShowConfetti] = useState(false);
  const go = (n) => setPage(n);
  const next = () => setPage((p) => Math.min(p + 1, 8));
  const prev = () => setPage((p) => Math.max(p - 1, 0));

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-pink-50 to-yellow-50 px-4">
      <div className="w-full max-w-3xl">
        <TopBar name={CONFIG.NAME} />
        <div className="bg-white/90 p-6 mt-4 rounded-2xl shadow-xl">
          <AnimatePresence mode="wait">
            {page === 0 && CONFIG.ENABLE_COUNTDOWN && <CountdownLock key="count" onOpen={() => go(1)} unlockAt={CONFIG.UNLOCK_AT_ISO} />}
            {page === 1 && <WelcomeBloom key="welcome" name={CONFIG.NAME} onOpen={() => next()} />}
            {page === 2 && <GiftBox key="gift" onUnwrap={() => next()} />}
            {page === 3 && <MemoryLane key="memory" pages={CONFIG.STORY_PAGES} onNext={() => next()} onPrev={() => prev()} />}
            {page === 4 && <BalloonHunt key="balloon" lines={CONFIG.BALLOON_LINES} onFinish={() => next()} />}
            {page === 5 && <CakeScreen key="cake" onBlow={() => next()} name={CONFIG.NAME} />}
            {page === 6 && <MusicalHeart key="music" onNext={() => next()} />}
            {page === 7 && <MBBSQuiz key="mbbs" qa={CONFIG.MBBS_QA} onDone={() => { setShowConfetti(true); next(); }} />}
            {page === 8 && <FinalWish key="final" text={CONFIG.FINAL_TEXT} onReplay={() => { setShowConfetti(false); go(1); }} />}
          </AnimatePresence>
        </div>
      </div>
      {showConfetti && <Confetti recycle={false} numberOfPieces={500} />}
    </div>
  );
}
