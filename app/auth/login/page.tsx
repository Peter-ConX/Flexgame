'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        localStorage.setItem('email', email);
        
        // Check if password needs to be changed
        if (data.needsPasswordChange) {
          router.push('/auth/change-password');
        } else {
          router.push('/dashboard');
        }
      } else {
        const data = await response.json();
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen bg-black flex items-center justify-center overflow-hidden relative">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-40 h-40 bg-red-600 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-60 h-60 bg-green-600 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 w-96 bg-black border-2 border-red-600 p-8 rounded-lg shadow-2xl">
        <h1 className="text-3xl font-bold text-red-600 mb-2">Welcome Back</h1>
        <p className="text-green-400 mb-6">Login to play games</p>

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="text-green-400 block mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 bg-zinc-900 border border-green-500 text-white rounded focus:outline-none focus:border-red-600"
              placeholder="your@email.com"
            />
          </div>

          <div className="mb-4">
            <label className="text-green-400 block mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 bg-zinc-900 border border-green-500 text-white rounded focus:outline-none focus:border-red-600"
              placeholder="••••••••"
            />
          </div>

          {error && <p className="text-red-500 mb-4">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 rounded border border-green-500 transition disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="text-center text-green-400 mt-4">
          Don&apos;t have an account?{' '}
          <Link href="/auth/signup" className="text-green-500 hover:text-green-400">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
