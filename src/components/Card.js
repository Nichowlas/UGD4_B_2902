import React from 'react';
import { FaQuestion } from 'react-icons/fa';

// Komponen untuk menampilkan satu kartu memori
// props:
// - card: objek yang berisi informasi kartu (id, icon, color, pairId)
// - isFlipped: boolean apakah kartu sedang terbuka
// - isMatched: boolean apakah kartu sudah berhasil dicocokkan
// - onFlip: fungsi yang dipanggil ketika kartu diklik
function Card({ card, isFlipped, isMatched, onFlip }) {
  // Handler ketika kartu diklik
  // Hanya bisa diklik jika kartu belum terbuka dan belum matched
  const handleClick = () => {
    if (!isFlipped && !isMatched) {
      onFlip(card.id);
    }
  };

  const isOpen = isFlipped || isMatched;
  const IconComponent = card.icon;

  // Menentukan className berdasarkan status kartu
  const cardClass = `w-20 h-20 flex items-center justify-center text-3xl rounded-xl cursor-pointer select-none transition-all duration-300 transform
  ${isOpen ? 'bg-white shadow-md scale-100' : 'bg-gradient-to-br from-purple-500 to-indigo-600 shadow-lg hover:scale-105 hover:shadow-xl'}
  ${isMatched ? 'opacity-70 ring-2 ring-green-400' : ''}`;

  return (
    <div onClick={handleClick} className={cardClass}>
      {/* Tampilkan icon jika kartu terbuka atau sudah cocok, tampilkan ? jika tertutup */}
      {isOpen ? (
        <span className="animate-bounce-once">
          <IconComponent style={{ color: card.color }} />
        </span>
      ) : (
        <FaQuestion className="text-white/60 text-xl" />
      )}
    </div>
  );
}

export default Card;