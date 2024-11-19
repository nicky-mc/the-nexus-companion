'use client';

import { useRouter } from 'next/navigation';
import 'daisyui/dist/full.css';

export default function LandingPage() {
  const router = useRouter();

  const handleSignInRedirect = () => {
    router.push('/sign-in/[...sign-in]');
  };

  const handleSignUpRedirect = () => {
    router.push('/sign-up/[...sign-up]');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/scroll.jpeg')" }}>
      <div className="w-full max-w-md p-8 space-y-6 bg-white bg-opacity-90 rounded-lg shadow-md border-2 border-yellow-800 text-center">
        <h1 className="text-4xl font-bold text-yellow-900">Welcome to The Nexus V2</h1>
        <p className="text-yellow-900">Your TTRPG companion.</p>
        <button onClick={handleSignInRedirect} className="btn w-full bg-yellow-700 text-yellow-100 border-none hover:bg-yellow-600">Sign In</button>
        <button onClick={handleSignUpRedirect} className="btn w-full mt-4 bg-yellow-500 text-yellow-100 border-none hover:bg-yellow-400">Sign Up</button>
      </div>
    </div>
  );
}