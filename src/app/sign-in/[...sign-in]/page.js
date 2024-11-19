'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSignIn } from '@clerk/nextjs';
import 'daisyui/dist/full.css';

export default function CustomSignInPage() {
  const { signIn, setSession } = useSignIn();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const result = await signIn.create({
        identifier: email,
        password,
      });
      setSession(result.createdSessionId);
    } catch (err) {
      setError(err.errors[0].message);
    }
  };

  const handleSignUpRedirect = () => {
    router.push('/sign-up');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/scroll.jpeg')" }}>
      <div className="w-full max-w-md p-8 space-y-6 bg-white bg-opacity-90 rounded-lg shadow-md border-2 border-yellow-800">
        <h2 className="text-2xl font-bold text-center text-yellow-900">Sign In</h2>
        {error && <div className="p-4 mb-4 text-red-700 bg-red-100 rounded">{error}</div>}
        <form onSubmit={handleSignIn} className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text text-yellow-900">Email</span>
            </label>
            <input
              type="email"
              className="input input-bordered w-full bg-yellow-100 text-yellow-900"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text text-yellow-900">Password</span>
            </label>
            <input
              type="password"
              className="input input-bordered w-full bg-yellow-100 text-yellow-900"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn w-full bg-yellow-700 text-yellow-100 border-none hover:bg-yellow-600">Sign In</button>
        </form>
        <button onClick={handleSignUpRedirect} className="btn w-full mt-4 bg-yellow-500 text-yellow-100 border-none hover:bg-yellow-400">Sign Up</button>
      </div>
    </div>
  );
}