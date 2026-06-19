'use client';

import { useState, useRef, useEffect } from 'react';
import { ParticleWaterEffect } from '@/lib/particleWater';
import { createRoom, joinRoom } from '@/lib/roomSystem';

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [screen, setScreen] = useState<'menu' | 'username' | 'create' | 'join' | 'room-code'>('menu');
  const [roomCode, setRoomCode] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const particleSystemRef = useRef<ParticleWaterEffect | null>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particleSystem = new ParticleWaterEffect(canvas);
    particleSystemRef.current = particleSystem;

    const animate = () => {
      particleSystem.render();
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const handleClick = (e: MouseEvent) => {
      particleSystem.createExplosion(e.clientX, e.clientY, 60);
    };

    const handleTouchStart = (e: TouchEvent) => {
      Array.from(e.touches).forEach((touch) => {
        particleSystem.createExplosion(touch.clientX, touch.clientY, 40);
      });
    };

    window.addEventListener('resize', handleResize);
    canvas.addEventListener('click', handleClick);
    canvas.addEventListener('touchstart', handleTouchStart);

    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('click', handleClick);
      canvas.removeEventListener('touchstart', handleTouchStart);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const handleUsernameCreate = () => {
    if (!username.trim()) {
      setError('Please enter a username');
      return;
    }
    try {
      const room = createRoom(username);
      localStorage.setItem('currentPlayerId', room.players[0].id);
      localStorage.setItem('currentUsername', username);
      setGeneratedCode(room.code);
      setScreen('room-code');
      setError('');
    } catch (err) {
      setError('Failed to create room');
    }
  };

  const handleStartJoin = () => {
    setScreen('join');
    setError('');
  };

  const handleJoinRoom = () => {
    if (!username.trim()) {
      setError('Please enter your name');
      return;
    }
    if (!roomCode.trim()) {
      setError('Please enter a room code (6 characters)');
      return;
    }

    const room = joinRoom(roomCode.toUpperCase(), username);
    if (!room) {
      setError('Room code not found. Check and try again.');
      return;
    }

    const newPlayer = room.players.find((p) => p.name === username);
    if (newPlayer) {
      localStorage.setItem('currentPlayerId', newPlayer.id);
      localStorage.setItem('currentUsername', username);
    }

    window.location.href = `/quiz?room=${roomCode.toUpperCase()}`;
  };

  const handleStartQuizFromCode = () => {
    window.location.href = `/quiz?room=${generatedCode}`;
  };

  return (
    <div className="w-full h-screen overflow-hidden gradient-primary relative">
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full"
      />

      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
        <div className="mb-16 pointer-events-auto text-center px-4">
          <h1 className="text-8xl font-black text-white mb-4 drop-shadow-2xl">
            BIBLE QUIZ
          </h1>
          <p className="text-4xl font-bold text-accent-gold drop-shadow-lg mb-2">
            MULTIPLAYER ARENA
          </p>
          <p className="text-lg text-white font-semibold drop-shadow-md">
            Test Your Knowledge • Challenge Your Friends
          </p>
        </div>

        {screen === 'menu' && (
          <div className="flex flex-col gap-8 pointer-events-auto">
            <button
              onClick={() => setScreen('create')}
              className="px-16 py-5 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-black text-2xl rounded-xl neon-glow hover:scale-110 smooth-transition border-3 border-accent-gold shadow-2xl drop-shadow-lg"
            >
              CREATE ROOM
            </button>
            <button
              onClick={handleStartJoin}
              className="px-16 py-5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-black text-2xl rounded-xl neon-glow-cyan hover:scale-110 smooth-transition border-3 border-white shadow-2xl drop-shadow-lg"
            >
              JOIN ROOM
            </button>
          </div>
        )}

        {screen === 'username' && (
          <div className="bg-gradient-to-b from-purple-900/95 to-purple-800/95 backdrop-blur-md p-10 rounded-2xl border-3 border-accent-gold neon-glow pointer-events-auto max-w-md w-full mx-4 shadow-2xl">
            <h2 className="text-4xl font-black text-white mb-2 text-center drop-shadow-lg">
              ENTER YOUR NAME
            </h2>
            <div className="w-full h-1 bg-gradient-to-r from-accent-gold to-transparent mb-8"></div>
            <input
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setError('');
              }}
              placeholder="Your Name"
              maxLength={20}
              className="w-full px-4 py-4 bg-white border-3 border-accent-gold rounded-lg text-center text-2xl font-bold text-black placeholder-gray-400 mb-6 focus:outline-none focus:ring-2 focus:ring-accent-gold"
            />
            {error && (
              <p className="text-yellow-300 text-center mb-4 font-bold text-lg drop-shadow-md">
                ⚠ {error}
              </p>
            )}
            <button
              onClick={handleUsernameCreate}
              className="w-full px-6 py-4 bg-gradient-to-r from-accent-gold to-yellow-500 text-black font-black text-xl rounded-lg neon-glow hover:scale-105 smooth-transition mb-4 shadow-lg drop-shadow-lg"
            >
              CREATE ROOM
            </button>
            <button
              onClick={() => {
                setScreen('menu');
                setUsername('');
                setError('');
              }}
              className="w-full px-6 py-3 bg-white text-black font-bold text-lg rounded-lg hover:bg-gray-200 smooth-transition"
            >
              BACK TO MENU
            </button>
          </div>
        )}

        {screen === 'room-code' && (
          <div className="bg-gradient-to-b from-purple-900/95 to-purple-800/95 backdrop-blur-md p-10 rounded-2xl border-3 border-accent-gold neon-glow pointer-events-auto max-w-md w-full mx-4 shadow-2xl">
            <h2 className="text-4xl font-black text-white mb-2 text-center drop-shadow-lg">
              ROOM CODE
            </h2>
            <div className="w-full h-1 bg-gradient-to-r from-accent-gold to-transparent mb-8"></div>
            <p className="text-white text-center mb-4 font-semibold text-lg">
              Share this code with your friend
            </p>
            <div className="bg-white border-4 border-accent-gold rounded-lg p-6 mb-8 text-center">
              <p className="text-5xl font-black text-black drop-shadow-lg">
                {generatedCode}
              </p>
            </div>
            <p className="text-white text-center mb-8 font-semibold text-sm">
              Waiting for opponent to join...
            </p>
            <button
              onClick={handleStartQuizFromCode}
              className="w-full px-6 py-4 bg-gradient-to-r from-accent-gold to-yellow-500 text-black font-black text-xl rounded-lg neon-glow hover:scale-105 smooth-transition mb-4 shadow-lg drop-shadow-lg"
            >
              START QUIZ
            </button>
            <button
              onClick={() => {
                setScreen('menu');
                setUsername('');
                setGeneratedCode('');
                setError('');
              }}
              className="w-full px-6 py-3 bg-white text-black font-bold text-lg rounded-lg hover:bg-gray-200 smooth-transition"
            >
              BACK TO MENU
            </button>
          </div>
        )}

        {screen === 'create' && (
          <div className="bg-gradient-to-b from-purple-900/95 to-purple-800/95 backdrop-blur-md p-10 rounded-2xl border-3 border-accent-gold neon-glow pointer-events-auto max-w-md w-full mx-4 shadow-2xl">
            <h2 className="text-4xl font-black text-white mb-2 text-center drop-shadow-lg">
              CREATE ROOM
            </h2>
            <div className="w-full h-1 bg-gradient-to-r from-accent-gold to-transparent mb-6"></div>
            <p className="text-white text-center mb-8 font-semibold text-lg">
              Generate a unique code to share with your friend
            </p>
            <button
              onClick={() => {
                setScreen('username');
                setError('');
              }}
              className="w-full px-6 py-4 bg-gradient-to-r from-accent-gold to-yellow-500 text-black font-black text-xl rounded-lg neon-glow hover:scale-105 smooth-transition mb-4 shadow-lg drop-shadow-lg"
            >
              START NEW GAME
            </button>
            <button
              onClick={() => {
                setScreen('menu');
                setError('');
              }}
              className="w-full px-6 py-3 bg-white text-black font-bold text-lg rounded-lg hover:bg-gray-200 smooth-transition"
            >
              BACK TO MENU
            </button>
          </div>
        )}

        {screen === 'join' && (
          <div className="bg-gradient-to-b from-blue-900/95 to-cyan-900/95 backdrop-blur-md p-10 rounded-2xl border-3 border-white neon-glow-cyan pointer-events-auto max-w-md w-full mx-4 shadow-2xl max-h-screen overflow-y-auto">
            <h2 className="text-4xl font-black text-white mb-2 text-center drop-shadow-lg">
              JOIN ROOM
            </h2>
            <div className="w-full h-1 bg-gradient-to-r from-white to-transparent mb-8"></div>

            <p className="text-white text-center mb-4 font-semibold text-lg">Step 1: Your Name</p>
            <input
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setError('');
              }}
              placeholder="Enter Your Name"
              maxLength={20}
              className="w-full px-4 py-4 bg-white border-3 border-white rounded-lg text-center text-2xl font-bold text-black placeholder-gray-400 mb-6 focus:outline-none focus:ring-2 focus:ring-white"
            />

            <p className="text-white text-center mb-4 font-semibold text-lg">Step 2: Room Code</p>
            <p className="text-white text-center mb-4 font-normal text-sm">
              (6-character code shared by your friend)
            </p>
            <input
              type="text"
              value={roomCode}
              onChange={(e) => {
                setRoomCode(e.target.value.toUpperCase());
                setError('');
              }}
              placeholder="ABC123"
              maxLength={6}
              className="w-full px-4 py-4 bg-white border-3 border-white rounded-lg text-center text-3xl font-black text-black placeholder-gray-400 mb-6 focus:outline-none focus:ring-2 focus:ring-white tracking-widest"
            />

            {error && (
              <p className="text-yellow-300 text-center mb-6 font-bold text-lg drop-shadow-md bg-red-900/30 p-3 rounded-lg border-2 border-yellow-300">
                ⚠ {error}
              </p>
            )}

            <button
              onClick={handleJoinRoom}
              className="w-full px-6 py-4 bg-gradient-to-r from-blue-400 to-cyan-400 text-black font-black text-xl rounded-lg neon-glow-cyan hover:scale-105 smooth-transition mb-4 shadow-lg drop-shadow-lg"
            >
              JOIN GAME
            </button>
            <button
              onClick={() => {
                setScreen('menu');
                setError('');
                setUsername('');
                setRoomCode('');
              }}
              className="w-full px-6 py-3 bg-white text-black font-bold text-lg rounded-lg hover:bg-gray-200 smooth-transition"
            >
              BACK TO MENU
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
