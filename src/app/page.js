'use client';
// Import React dan hook useState untuk mengelola state komponen
import React, { useState, useEffect } from 'react';
// Import komponen GameBoard dan ScoreBoard
import GameBoard from '../components/GameBoard';
import ScoreBoard from '../components/ScoreBoard';
// Import react-icons
import { GiCardJoker } from 'react-icons/gi';
import { FaAppleAlt, FaLemon, FaHeart, FaStar } from 'react-icons/fa';

// Daftar icon yang digunakan sebagai isi kartu (4 pasang = 8 kartu)
const ICONS = [
  { icon: FaAppleAlt, color: '#ef4444' },
  { icon: FaLemon, color: '#eab308' },
  { icon: FaHeart, color: '#ec4899' },
  { icon: FaStar, color: '#f97316' },
];

// Fungsi untuk mengacak urutan array menggunakan algoritma Fisher-Yates
// Menerima parameter 'array' dan mengembalikan array yang sudah diacak
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Fungsi untuk membuat set kartu baru
// Menggandakan setiap icon (untuk membuat pasangan), lalu mengacak urutannya
const createCards = () => {
  const paired = ICONS.flatMap((item, index) => [
    { id: index * 2, icon: item.icon, color: item.color, pairId: index },
    { id: index * 2 + 1, icon: item.icon, color: item.color, pairId: index },
  ]);
  return shuffleArray(paired);
};

export default function Home() {
  // State 'cards' menyimpan array kartu yang sudah diacak
  const [cards, setCards] = useState([]);

  // State 'flippedCards' menyimpan id kartu yang sedang terbuka (maks 2)
  const [flippedCards, setFlippedCards] = useState([]);

  // State 'matchedCards' menyimpan id kartu yang sudah berhasil dicocokkan
  const [matchedCards, setMatchedCards] = useState([]);

  // State 'moves' menyimpan jumlah percobaan yang dilakukan pemain
  const [moves, setMoves] = useState(0);

  // useEffect untuk inisialisasi kartu saat komponen pertama kali dirender
  useEffect(() => {
    setCards(createCards());
  }, []);

  // useEffect untuk mengecek kecocokan setiap kali 2 kartu terbuka
  useEffect(() => {
    // Hanya cek jika sudah ada 2 kartu terbuka
    if (flippedCards.length === 2) {
      const [firstId, secondId] = flippedCards;
      const firstCard = cards.find(c => c.id === firstId);
      const secondCard = cards.find(c => c.id === secondId);

      // Tambah jumlah percobaan setiap kali 2 kartu dibuka
      setMoves(prev => prev + 1);

      // Jika kedua kartu memiliki pairId yang sama, berarti cocok
      if (firstCard.pairId === secondCard.pairId) {
        // Tambahkan kedua kartu ke matchedCards
        setMatchedCards(prev => [...prev, firstId, secondId]);
        setFlippedCards([]);
      } else {
        // Jika tidak cocok, tutup kembali setelah 800ms
        const timer = setTimeout(() => {
          setFlippedCards([]);
        }, 800);
        return () => clearTimeout(timer);
      }
    }
  }, [flippedCards, cards]);

  // Fungsi untuk membalik kartu ketika diklik
  // Menerima parameter 'id' untuk mengidentifikasi kartu yang diklik
  const handleCardFlip = (id) => {
    // Hanya izinkan membalik jika kurang dari 2 kartu terbuka
    // dan kartu yang diklik bukan kartu yang sudah terbuka
    if (flippedCards.length < 2 && !flippedCards.includes(id)) {
      setFlippedCards(prev => [...prev, id]);
    }
  };

  // Fungsi untuk mereset permainan ke kondisi awal
  const resetGame = () => {
    setCards(createCards());
    setFlippedCards([]);
    setMatchedCards([]);
    setMoves(0);
  };

  return (
    // Container utama dengan background gradient dan tinggi minimal sesuai viewport
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 p-4">
      {/* Judul aplikasi */}
      <h1 className="text-4xl font-bold mb-6 text-white drop-shadow-lg flex items-center gap-3">
        <GiCardJoker className="text-yellow-300 text-4xl" />
        Memory Card
      </h1>

      {/* Komponen ScoreBoard untuk menampilkan skor */}
      <ScoreBoard
        moves={moves}
        matchedCount={matchedCards.length / 2}
        totalPairs={ICONS.length}
        onReset={resetGame}
      />

      {/* Komponen GameBoard untuk menampilkan grid kartu */}
      <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl shadow-2xl">
        <GameBoard
          cards={cards}
          flippedCards={flippedCards}
          matchedCards={matchedCards}
          onFlip={handleCardFlip}
        />
      </div>
    </div>
  );
}