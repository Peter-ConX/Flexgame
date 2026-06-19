'use client';

import { useState, useRef, useEffect, MouseEvent, TouchEvent } from 'react';
import Link from 'next/link';

interface WavePoint {
  x: number;
  y: number;
  velocity: number;
}

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [waves, setWaves] = useState<WavePoint[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const animate = () => {
      // Clear canvas with black background
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw water waves
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

      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
        <h1 className="text-5xl font-bold text-green-500 mb-2 pointer-events-auto">
          FlexGame
        </h1>
        <p className="text-green-400 mb-8 pointer-events-auto">
          Touch the water to create waves
        </p>

        <div className="flex gap-4 pointer-events-auto">
          <Link href="/dashboard">
            <button className="px-8 py-3 bg-green-600 hover:bg-green-700 text-black font-bold rounded border-2 border-red-600 transition text-lg">
              Play Games
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
