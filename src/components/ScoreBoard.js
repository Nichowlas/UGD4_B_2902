import React from 'react';
import { FaClock, FaMousePointer, FaCheck, FaSyncAlt, FaRedo } from 'react-icons/fa';

// Komponen untuk menampilkan skor permainan dan tombol reset
// props:
// - moves: jumlah percobaan yang sudah dilakukan
// - matchedCount: jumlah pasangan yang sudah berhasil dicocokkan
// - totalPairs: total pasangan kartu yang harus dicocokkan
// - onReset: fungsi untuk mereset permainan
function ScoreBoard({ moves, matchedCount, totalPairs, onReset }) {
    // Cek apakah semua pasangan sudah ditemukan
    const isGameComplete = matchedCount === totalPairs;

    return (
        <div className="text-center mb-6">
            {/* Tampilkan jumlah percobaan dan pasangan yang ditemukan */}
            <div className="flex justify-center gap-8 mb-4">
                <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                    <p className="text-sm text-indigo-200 flex items-center justify-center gap-1">
                        <FaMousePointer className="text-indigo-300" /> Percobaan
                    </p>
                    <p className="text-2xl font-bold text-white">{moves}</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                    <p className="text-sm text-indigo-200 flex items-center justify-center gap-1">
                        <FaCheck className="text-indigo-300" /> Ditemukan
                    </p>
                    <p className="text-2xl font-bold text-white">{matchedCount}/{totalPairs}</p>
                </div>
            </div>

            {/* Pesan selamat jika semua pasangan ditemukan */}
            {isGameComplete && (
                <p className="text-yellow-300 font-bold text-lg mb-2 animate-pulse">
                    🎉 Selamat! Kamu menang dalam {moves} percobaan!
                </p>
            )}

            {/* Tombol untuk mereset permainan */}
            <button
                onClick={onReset}
                className="px-6 py-2 bg-yellow-400 text-indigo-900 font-bold rounded-full hover:bg-yellow-300 transition-colors duration-200 shadow-lg flex items-center gap-2 mx-auto"
            >
                {isGameComplete ? <FaRedo /> : <FaSyncAlt />}
                {isGameComplete ? 'Main Lagi' : 'Acak Ulang'}
            </button>
        </div>
    );
}

export default ScoreBoard;
