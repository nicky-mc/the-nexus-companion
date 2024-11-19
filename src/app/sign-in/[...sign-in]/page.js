'use client';

import { SignIn } from '@clerk/nextjs';

export default function CustomSignInPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/scroll.jpeg')" }}>
      <div className="w-full max-w-md p-8 space-y-6 bg-white bg-opacity-90 rounded-lg shadow-md border-2 border-yellow-800">
        <SignIn
          path="/sign-in/[...sign-in]"
          routing="path"
          signUpUrl="/sign-up/[...sign-up]" // Link to Sign-Up Page
        />
      </div>
    </div>
  );
}