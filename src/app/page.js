"use client";

import { useState, useEffect } from "react";
import { 
  FaSmile, 
  FaMeh, 
  FaSkull, 
  FaRegClock, 
  FaCheck, 
  FaSyncAlt,
  FaMoon, 
  FaStar, 
  FaGem, 
  FaBolt, 
  FaAppleAlt, 
  FaHeart, 
  FaFire, 
  FaLemon 
} from "react-icons/fa";
import { FaArrowPointer } from "react-icons/fa6";
import { GiCardJoker } from "react-icons/gi";

const ICONS = [
  { icon: FaMoon, color: '#6366f1' },    
  { icon: FaStar, color: '#ea580c' },     
  { icon: FaGem, color: '#8b5cf6' },      
  { icon: FaBolt, color: '#3b82f6' },     
  { icon: FaAppleAlt, color: '#ef4444' }, 
  { icon: FaHeart, color: '#ec4899' },    
  { icon: FaFire, color: '#f59e0b' },   
  { icon: FaLemon, color: '#eab308' }   
];

const DIFFICULTIES = {
  easy: { label: "Easy", pairs: 4, icon: <FaSmile className="text-lg" /> },
  medium: { label: "Medium", pairs: 6, icon: <FaMeh className="text-lg" /> },
  hard: { label: "Hard", pairs: 8, icon: <FaSkull className="text-lg" /> },
};

export default function MemoryCardGame() {
  const [difficulty, setDifficulty] = useState("easy");
  const [cards, setCards] = useState([]);
  const [flippedIndices, setFlippedIndices] = useState([]);
  const [matches, setMatches] = useState(0);
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isChecking, setIsChecking] = useState(false);

  const initializeGame = (level = difficulty) => {
    const pairCount = DIFFICULTIES[level].pairs;
    const selectedSymbols = ICONS.slice(0, pairCount);
    const deck = [...selectedSymbols, ...selectedSymbols]
      .sort(() => Math.random() - 0.5) 
      .map((symbol, index) => ({
        id: index,
        symbol,
        isFlipped: false,
        isMatched: false,
      }));

    setCards(deck);
    setFlippedIndices([]);
    setMatches(0);
    setMoves(0);
    setTime(0);
    setIsPlaying(false);
    setIsChecking(false);
  };

  useEffect(() => {
    initializeGame(difficulty);
  }, [difficulty]);

  useEffect(() => {
    let interval = null;
    if (isPlaying) {
      interval = setInterval(() => setTime((t) => t + 1), 1000);
    }
    if (matches === DIFFICULTIES[difficulty].pairs && matches > 0) {
      setIsPlaying(false);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isPlaying, matches, difficulty]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const handleCardClick = (index) => {
    if (isChecking || cards[index].isFlipped || cards[index].isMatched) return;

    if (!isPlaying && matches !== DIFFICULTIES[difficulty].pairs) {
      setIsPlaying(true);
    }

    const newCards = [...cards];
    newCards[index].isFlipped = true;
    setCards(newCards);

    const newFlippedIndices = [...flippedIndices, index];
    setFlippedIndices(newFlippedIndices);

    if (newFlippedIndices.length === 2) {
      setMoves((m) => m + 1);
      setIsChecking(true);

      const [firstIndex, secondIndex] = newFlippedIndices;

      if (newCards[firstIndex].symbol.color === newCards[secondIndex].symbol.color) {
        setTimeout(() => {
          const matchedCards = [...newCards];
          matchedCards[firstIndex].isMatched = true;
          matchedCards[secondIndex].isMatched = true;
          setCards(matchedCards);
          setMatches((m) => m + 1);
          setFlippedIndices([]);
          setIsChecking(false);
        }, 500);
      } else {
        setTimeout(() => {
          const resetCards = [...newCards];
          resetCards[firstIndex].isFlipped = false;
          resetCards[secondIndex].isFlipped = false;
          setCards(resetCards);
          setFlippedIndices([]);
          setIsChecking(false);
        }, 1000);
      }
    }
  };

  const isGameComplete = matches === DIFFICULTIES[difficulty].pairs && matches > 0;

  return (
    <div className="min-h-screen bg-linear-to-br from-[#1a0f35] to-[#0f0822] flex flex-col items-center py-12 font-sans text-white">
      
      {/* CSS Animasi Float Tetap Dipertahankan */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>

      {/* --- Header Title --- */}
      <div className="flex items-center gap-4 mb-8 animate-float">
        <div className="bg-yellow-400 p-2 rounded-lg text-black shadow-[0_0_15px_rgba(250,204,21,0.5)]">
          <GiCardJoker className="text-4xl" />
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-pink-300 to-purple-300">
          Memory Card
        </h1>
      </div>

      {/* --- Difficulty Selectors --- */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {Object.entries(DIFFICULTIES).map(([level, data]) => (
          <button
            key={level}
            onClick={() => setDifficulty(level)}
            className={`flex items-center gap-2 px-5 py-2 rounded-full font-bold transition hover:scale-105 ${
              difficulty === level
                ? "bg-yellow-400 text-black shadow-[0_0_15px_rgba(250,204,21,0.4)]"
                : "bg-white/5 border border-white/10 hover:bg-white/10 text-gray-300"
            }`}
          >
            {data.icon} {data.label} ({data.pairs})
          </button>
        ))}
      </div>

      {/* --- Stats Panel --- */}
      <div className="flex gap-4 mb-8">
        <div className="bg-[#2a1c4b]/80 border border-white/5 rounded-2xl w-28 py-3 flex flex-col items-center shadow-lg">
          <div className="text-[10px] tracking-wider text-gray-400 flex items-center gap-1 mb-1 font-semibold uppercase">
            <FaRegClock /> Waktu
          </div>
          <div className="text-2xl font-bold">{formatTime(time)}</div>
        </div>
        
        <div className="bg-[#2a1c4b]/80 border border-white/5 rounded-2xl w-28 py-3 flex flex-col items-center shadow-lg">
          <div className="text-[10px] tracking-wider text-gray-400 flex items-center gap-1 mb-1 font-semibold uppercase">
            <FaArrowPointer /> Percobaan
          </div>
          <div className="text-2xl font-bold">{moves}</div>
        </div>
        
        <div className="bg-[#2a1c4b]/80 border border-white/5 rounded-2xl w-28 py-3 flex flex-col items-center shadow-lg">
          <div className="text-[10px] tracking-wider text-gray-400 flex items-center gap-1 mb-1 font-semibold uppercase">
            <FaCheck /> Ditemukan
          </div>
          <div className="text-2xl font-bold">
            {matches}/{DIFFICULTIES[difficulty].pairs}
          </div>
        </div>
      </div>

      {/* --- Victory Message --- */}
      {isGameComplete && (
        <div className="bg-[#3a283e]/80 border border-yellow-500/30 text-yellow-300 px-6 py-4 rounded-xl mb-6 shadow-lg flex items-center gap-2 max-w-md text-center">
          <span className="text-lg">🎉</span>
          <p className="font-semibold text-sm md:text-base">
            Selamat! Selesai dalam waktu {formatTime(time)} dengan {moves} percobaan!
          </p>
        </div>
      )}

      {/* --- Action Button --- */}
      <button 
        onClick={() => initializeGame()}
        className="flex items-center gap-2 bg-yellow-400 text-black px-8 py-2.5 rounded-full font-bold shadow-[0_0_15px_rgba(250,204,21,0.4)] mb-10 hover:scale-105 active:scale-95 transition"
      >
        <FaSyncAlt /> {isGameComplete ? "Main Lagi" : "Acak Ulang"}
      </button>

      {/* --- Card Grid Container --- */}
      <div className="bg-[#211440]/60 border border-white/10 rounded-4xl p-6 md:p-8 backdrop-blur-sm shadow-2xl">
        <div className="grid grid-cols-4 gap-4 md:gap-5">
          {cards.map((card, index) => {
            // Ambil referensi komponen Icon dari objek card
            const IconComponent = card.symbol?.icon;

            return (
              <div
                key={card.id}
                onClick={() => handleCardClick(index)}
                className={`w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-2xl flex items-center justify-center cursor-pointer transition-all duration-300 transform ${
                  card.isFlipped || card.isMatched 
                    ? "bg-[#f4f4f5] rotate-0 shadow-inner" 
                    : "bg-linear-to-br from-[#c058f3] to-[#5b40e9] hover:scale-105 shadow-[0_0_15px_rgba(168,85,247,0.5)]"
                } ${card.isMatched ? "opacity-70 scale-95" : ""}`}
              >
                <span className={`text-3xl md:text-4xl font-bold drop-shadow-md transition-opacity duration-300 flex items-center justify-center`}>
                  {/* Render Icon Komponen dengan warna yang sesuai jika terbalik/cocok */}
                  {card.isFlipped || card.isMatched ? (
                    <IconComponent color={card.symbol.color} />
                  ) : (
                    <span className="text-white">?</span>
                  )}
                </span>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}