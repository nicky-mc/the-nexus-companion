'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from '@clerk/nextjs';

export default function HomePage() {
  const router = useRouter();
  const { isSignedIn } = useAuth();

  useEffect(() => {
    if (!isSignedIn) {
      router.push('/sign-in');
    }
  }, [isSignedIn, router]);

  if (!isSignedIn) {
    return null; // Optionally, you can show a loading spinner here
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/scroll.jpeg')" }}>
      <div className="w-full max-w-md p-8 space-y-6 bg-white bg-opacity-90 rounded-lg shadow-md border-2 border-yellow-800 text-center">
        <h1 className="text-4xl font-bold text-yellow-900">Welcome to The Nexus V2</h1>
        <p className="text-yellow-900">Your TTRPG companion.</p>
      </div>
    </div>
  );
}