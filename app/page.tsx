'use client';

import { useState, useRef, useEffect } from 'react';
import { ParticleWaterEffect } from '@/lib/particleWater';
import { createRoom, joinRoom } from '@/lib/roomSystem';

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [screen, setScreen] = useState<'menu' | 'create' | 'join'>('menu');
  const [roomCode, setRoomCode] = useState('');
  const [error, setError] = useState('');
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

  const handleCreateRoom = () => {
    try {
      const room = createRoom();
      window.location.href = `/quiz?room=${room.code}`;
    } catch (err) {
      setError('Failed to create room');
    }
  };

  const handleJoinRoom = () => {
    if (!roomCode.trim()) {
      setError('Please enter a room code');
      return;
    }

    const room = joinRoom(roomCode.toUpperCase());
    if (!room) {
      setError('Room not found');
      return;
    }

    window.location.href = `/quiz?room=${roomCode.toUpperCase()}`;
  };

  return (
    <div className="w-full h-screen overflow-hidden gradient-primary relative">
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full"
      />

      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
        <div className="mb-12 pointer-events-auto text-center">
          <h1 className="text-7xl font-black text-neon-glow mb-2">
            BIBLE QUIZ
          </h1>
          <p className="text-2xl text-accent-cyan font-bold tracking-wider">
            MULTIPLAYER ARENA
          </p>
        </div>

        {screen === 'menu' && (
          <div className="flex flex-col gap-6 pointer-events-auto">
            <button
              onClick={() => setScreen('create')}
              className="px-12 py-4 bg-gradient-accent text-black font-black text-xl rounded-lg neon-glow hover:scale-105 smooth-transition border-2 border-foreground shadow-xl"
            >
              CREATE ROOM
            </button>
            <button
              onClick={() => setScreen('join')}
              className="px-12 py-4 bg-foreground text-black font-black text-xl rounded-lg neon-glow-cyan hover:scale-105 smooth-transition border-2 border-accent-cyan"
            >
              JOIN ROOM
            </button>
          </div>
        )}

        {screen === 'create' && (
          <div className="bg-background-secondary/80 backdrop-blur-md p-8 rounded-xl border-2 border-foreground neon-glow pointer-events-auto max-w-md w-full mx-4">
            <h2 className="text-3xl font-bold text-neon-glow mb-6 text-center">
              CREATE ROOM
            </h2>
            <p className="text-text-secondary text-center mb-6">
              Share your room code with a friend to play
            </p>
            <button
              onClick={handleCreateRoom}
              className="w-full px-6 py-3 bg-gradient-accent text-black font-black text-lg rounded-lg neon-glow hover:scale-105 smooth-transition mb-4"
            >
              START NEW GAME
            </button>
            <button
              onClick={() => {
                setScreen('menu');
                setError('');
              }}
              className="w-full px-6 py-3 bg-text-secondary text-black font-bold text-lg rounded-lg hover:bg-white smooth-transition"
            >
              BACK
            </button>
          </div>
        )}

        {screen === 'join' && (
          <div className="bg-background-secondary/80 backdrop-blur-md p-8 rounded-xl border-2 border-accent-cyan neon-glow-cyan pointer-events-auto max-w-md w-full mx-4">
            <h2 className="text-3xl font-bold text-neon-glow-cyan mb-6 text-center">
              JOIN ROOM
            </h2>
            <input
              type="text"
              value={roomCode}
              onChange={(e) => {
                setRoomCode(e.target.value.toUpperCase());
                setError('');
              }}
              placeholder="ENTER CODE"
              className="w-full px-4 py-3 bg-background border-2 border-accent-cyan rounded-lg text-center text-xl font-bold text-foreground placeholder-text-secondary mb-4 focus:outline-none focus:ring-2 focus:ring-accent-cyan"
            />
            {error && (
              <p className="text-red-400 text-center mb-4 font-bold">{error}</p>
            )}
            <button
              onClick={handleJoinRoom}
              className="w-full px-6 py-3 bg-accent-cyan text-black font-black text-lg rounded-lg neon-glow-cyan hover:scale-105 smooth-transition mb-4"
            >
              JOIN GAME
            </button>
            <button
              onClick={() => {
                setScreen('menu');
                setError('');
                setRoomCode('');
              }}
              className="w-full px-6 py-3 bg-text-secondary text-black font-bold text-lg rounded-lg hover:bg-white smooth-transition"
            >
              BACK
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
