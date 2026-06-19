'use client';

import { useState, useRef, useEffect, MouseEvent, TouchEvent } from 'react';
import Link from 'next/link';
import { getCredits } from '@/lib/creditsProvider';
import { GAME_COST } from '@/lib/quizData';

interface WavePoint {
  x: number;
  y: number;
  velocity: number;
}

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [waves, setWaves] = useState<WavePoint[]>([]);
  const [credits, setCredits] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setCredits(getCredits());
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const animate = () => {
      // Clear canvas with black background
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw water waves with red-green-black theme
      if (waves.length > 0) {
        ctx.strokeStyle = '#22ff22';
        ctx.lineWidth = 2;
        ctx.beginPath();

        const points = Array.from({ length: canvas.width }, (_, i) => {
          let y = canvas.height / 2;
          waves.forEach((wave) => {
            const dist = Math.abs(i - wave.x);
            if (dist < 200) {
              y += Math.sin(dist * 0.05) * wave.velocity * 30;
            }
          });
          return { x: i, y };
        });

        points.forEach((point, i) => {
          if (i === 0) ctx.moveTo(point.x, point.y);
          else ctx.lineTo(point.x, point.y);
        });

        ctx.lineTo(canvas.width, canvas.height);
        ctx.lineTo(0, canvas.height);
        ctx.closePath();

        ctx.fillStyle = 'rgba(34, 255, 34, 0.3)';
        ctx.fill();
        ctx.stroke();

        // Update waves
        setWaves((prevWaves) =>
          prevWaves
            .map((w) => ({
              ...w,
              velocity: w.velocity * 0.95,
            }))
            .filter((w) => w.velocity > 0.01)
        );
      }

      requestAnimationFrame(animate);
    };

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    animate();

    return () => window.removeEventListener('resize', handleResize);
  }, [waves]);

  const handleInteraction = (e: MouseEvent<HTMLCanvasElement> | TouchEvent<HTMLCanvasElement>) => {
    let clientX = 0;
    if ('clientX' in e) {
      clientX = e.clientX;
    } else if (e.touches.length > 0) {
      clientX = e.touches[0].clientX;
    }
    
    setWaves((prev) => [
      ...prev,
      { x: clientX, y: 0, velocity: 1 },
    ]);
  };

  return (
    <div className="w-full h-screen overflow-hidden bg-black relative">
      <canvas
        ref={canvasRef}
        onClick={handleInteraction}
        onTouchStart={handleInteraction}
        className="absolute top-0 left-0 cursor-pointer"
      />

      {/* Credits display */}
      {mounted && (
        <div className="absolute top-6 right-6 z-20 bg-gradient-to-b from-green-600 to-green-700 px-6 py-3 rounded-lg border-2 border-red-600 pointer-events-none">
          <p className="text-black font-bold text-lg">CREDITS</p>
          <p className="text-white text-2xl font-bold">{credits}</p>
        </div>
      )}

      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
        <h1 className="text-6xl font-bold text-green-500 mb-4 pointer-events-auto text-shadow">
          Bible Quiz
        </h1>
        {mounted && (
          <>
            <p className="text-xl text-green-400 mb-2 pointer-events-auto">
              {credits >= GAME_COST ? '✓ Ready to play!' : '✗ Not enough credits'}
            </p>
            <p className="text-green-400 mb-8 pointer-events-auto">
              Touch the water to create waves
            </p>
          </>
        )}

        {mounted && (
          <div className="flex gap-4 pointer-events-auto">
            {credits >= GAME_COST ? (
              <Link href="/quiz">
                <button className="px-10 py-4 bg-green-600 hover:bg-green-700 text-black font-bold rounded-lg border-2 border-red-600 transition text-lg shadow-lg">
                  Start Quiz ({GAME_COST} coins)
                </button>
              </Link>
            ) : (
              <button
                disabled
                className="px-10 py-4 bg-gray-600 text-gray-400 font-bold rounded-lg border-2 border-gray-600 cursor-not-allowed text-lg"
              >
                Not Enough Credits
              </button>
            )}
          </div>
        )}

        {mounted && credits < GAME_COST && (
          <p className="text-red-500 mt-4 text-sm pointer-events-auto">
            Come back tomorrow for 100 daily credits!
          </p>
        )}
      </div>
    </div>
  );
}
