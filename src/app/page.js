'use client';

import React, {usestate, useEffect, useState } from 'react';

import GameBoard from '@/components/GameBoard';
import ScoreBoard from '@/components/ScoreBoard';

import {GiCardJoker} from 'react-icons/gi';
import { FaAppleAlt, FaLemon, FaHeart, FaStar} from 'react-icons/fa';

const ICONS = [
  {icon: FaAppleAlt, color: '#ef4444'},
  {icon: FaLemon, color: '#eab308' },
  {icon: FaHeart, color: '#ec4899' },
  {icon: FaStar, color: '#f97316'},

];

const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i+1));
    [shuffle[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
};

const createCards = () => {
  const paired = ICONS.flatMap((item, index) => [
    {id: index * 2, icon: item.icon, color: item.color, pairId: index },
  ]);
  return shuffleArray(paired);
};

export default function Home() {
  const[cards, setCard] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const[matchedCard, setMatchedCards] = useState([]);
  const[moves, setMoves] = useState(0);

  useEffect(() => {
    setFlippedCards(createCards());
  }, []);

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [firstId, secondId] = flippedCards;
      const firstCard = cards.find(c => c.id == firstId);
      const secondCard = cards.find(c => c.id === secondId);

      setMoves(prev => prev +1);

    if (firstCard.pairId === secondCard.pairId) {
      setMatchedCards(prev => [...prev, firstId, secondId]);
      setFlippedCards([]);
    } else {
      const timer = setTimeout(() => {
        setFlippedCards ([]);
      }, 800);
      return () => clearTimeout(timer);
    }
  }
}, [flippedCards, cards]);

const handleCardFlip = (id) => {
  if (flippedCards.length < 2 && !flippedCards.includes(id)) {
    setFlippedCards(prev => [...prev, id]);
  }
};

const resetGame = () => {
  setCards(createCards());
  setFlippedCards([]);
  setMatchedCards([]);
  setMoves(0);
};

return (
  <div className='min-h-screen flex-col items-center justify-center bg-linear-to-br from-indigo-900 via-purple-900 to-pink-800 p-4'>
    {}
    <h1 className='text-4xl font-bold mb-6 text-white drop shadow-lg flex items-center gap-3'>
      <GiCardJoker className='text-yellow-300 text-4xl' />
      Memory Card
    </h1>

    {}
    <ScoreBoard
    moves={moves}
    matchedCount={matchedCard.length / 2}
    totalPairs={ICONS.length}
    onReset={resetGame}
    />
    {}
    <div className='bg-white/10 backdrop-blur-sm p-6 rounded-2xl shadow-2xl'>
    <GameBoard
    cards={cards}
    flippedCards={flippedCards}
    matchedCards={matchedCard}
    onFlip={handleCardFlip}
    />
  </div>
  </div>

);

}