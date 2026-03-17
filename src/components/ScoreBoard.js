import React from 'react';
import { FaClock, FaMousePointer, FaCheck, FaSyncAlt, FaRedo } from 'react-icons/fa';

function ScoreBoard({ time, moves, matchedCount, totalPairs, onReset }) {
    const isGameComplete = matchedCount === totalPairs;

    return (
        <div className="text-center mb-6">
            {/* Tampilkan Waktu, Percobaan, dan Pasangan yang ditemukan */}
            <div className="flex justify-center gap-4 mb-4">
                {/* --- KOTAK WAKTU --- */}
                <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg w-28">
                    <p className="text-xs text-indigo-200 flex items-center justify-center gap-1 uppercase tracking-wider mb-1">
                        <FaClock className="text-indigo-300" /> Waktu
                    </p>
                    <p className="text-2xl font-bold text-white">{time}</p>
                </div>

                {/* --- KOTAK PERCOBAAN --- */}
                <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg w-28">
                    <p className="text-xs text-indigo-200 flex items-center justify-center gap-1 uppercase tracking-wider mb-1">
                        <FaMousePointer className="text-indigo-300" /> Percobaan
                    </p>
                    <p className="text-2xl font-bold text-white">{moves}</p>
                </div>

                {/* --- KOTAK DITEMUKAN --- */}
                <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg w-28">
                    <p className="text-xs text-indigo-200 flex items-center justify-center gap-1 uppercase tracking-wider mb-1">
                        <FaCheck className="text-indigo-300" /> Ditemukan
                    </p>
                    <p className="text-2xl font-bold text-white">{matchedCount}/{totalPairs}</p>
                </div>
            </div>

            {/* Pesan selamat jika semua pasangan ditemukan */}
            {isGameComplete && (
                <p className="text-yellow-300 font-bold text-lg mb-4 animate-pulse">
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