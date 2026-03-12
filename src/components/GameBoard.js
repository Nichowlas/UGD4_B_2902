import React from 'react';
import Card from './Card';

// Komponen untuk menampilkan grid kartu memori
// props:
// - cards: array berisi objek-objek kartu
// - flippedCards: array berisi id kartu yang sedang terbuka
// - matchedCards: array berisi id kartu yang sudah berhasil dicocokkan
// - onFlip: fungsi untuk membalik kartu
function GameBoard({ cards, flippedCards, matchedCards, onFlip }) {
    return (
        // Grid container 4 kolom untuk menampilkan kartu
        <div className="grid grid-cols-4 gap-4 justify-items-center">
            {cards.map(card => (
                // Render komponen Card untuk setiap kartu
                // isFlipped: cek apakah id kartu ada di array flippedCards
                // isMatched: cek apakah id kartu ada di array matchedCards
                <Card 
                    key={card.id}
                    card={card}
                    isFlipped={flippedCards.includes(card.id)}
                    isMatched={matchedCards.includes(card.id)}
                    onFlip={onFlip}
                />
            ))}
        </div>
    );
}

export default GameBoard;
