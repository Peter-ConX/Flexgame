'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ChangePassword() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      const email = localStorage.getItem('email');
      const response = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, newPassword }),
      });

      if (response.ok) {
        alert('Password changed successfully!');
        router.push('/dashboard');
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to change password');
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

      <div className="relative z-10 w-96 bg-black border-2 border-green-500 p-8 rounded-lg shadow-2xl">
        <h1 className="text-3xl font-bold text-green-500 mb-2">Update Password</h1>
        <p className="text-green-400 mb-6">Create a new secure password</p>

        <form onSubmit={handleChangePassword}>
          <div className="mb-4">
            <label className="text-green-400 block mb-2">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="w-full px-4 py-2 bg-zinc-900 border border-green-500 text-white rounded focus:outline-none focus:border-red-600"
              placeholder="••••••••"
            />
          </div>

          <div className="mb-4">
            <label className="text-green-400 block mb-2">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-4 py-2 bg-zinc-900 border border-green-500 text-white rounded focus:outline-none focus:border-red-600"
              placeholder="••••••••"
            />
          </div>

          {error && <p className="text-red-500 mb-4">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded border border-red-600 transition disabled:opacity-50"
          >
            {loading ? 'Updating...' : 'Update Password'}
          </button>
        </form>
      </div>
    </div>
  );
}
