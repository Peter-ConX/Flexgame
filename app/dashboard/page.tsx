'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const games = [
  { id: 1, name: 'Bible Trivia', icon: '📖', color: 'bg-red-600' },
  { id: 2, name: 'Word Scramble', icon: '🔤', color: 'bg-green-600' },
  { id: 3, name: 'Memory Match', icon: '🧠', color: 'bg-red-600' },
  { id: 4, name: 'Quiz Master', icon: '❓', color: 'bg-green-600' },
  { id: 5, name: 'Typing Race', icon: '⌨️', color: 'bg-red-600' },
  { id: 6, name: 'Number Puzzle', icon: '🔢', color: 'bg-green-600' },
  { id: 7, name: 'Flappy Bird Clone', icon: '🐦', color: 'bg-red-600' },
  { id: 8, name: 'Snake Game', icon: '🐍', color: 'bg-green-600' },
  { id: 9, name: 'Puzzle Master', icon: '🧩', color: 'bg-red-600' },
  { id: 10, name: 'Reaction Time', icon: '⚡', color: 'bg-green-600' },
];

export default function Dashboard() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    window.location.href = '/';
  };

  if (loading) return <div className="w-full h-screen bg-black flex items-center justify-center text-green-500">Loading...</div>;

  return (
    <div className="w-full min-h-screen bg-black text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-bold text-green-500">FlexGame</h1>
            <p className="text-green-400">🌊 River of Games 🌊</p>
          </div>
          <Link href="/">
            <button className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded border border-green-500 transition">
              Home
            </button>
          </Link>
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {games.map((game) => (
            <Link key={game.id} href={`/games/${game.id}`}>
              <div className={`${game.color} p-6 rounded-lg cursor-pointer hover:shadow-lg transition transform hover:scale-105 border-2 border-black`}>
                <div className="text-5xl mb-3">{game.icon}</div>
                <h3 className="text-lg font-bold text-black">{game.name}</h3>
                <p className="text-black text-sm mt-2">Click to Play</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-green-400">
          <p>🌊 Touch any game to dive into the river of fun! 🌊</p>
        </div>
      </div>
    </div>
  );
}
