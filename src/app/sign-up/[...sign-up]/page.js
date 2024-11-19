'use client';

import { SignUp } from '@clerk/nextjs';

export default function CustomSignUpPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/scroll.jpeg')" }}>
      <div className="w-full max-w-md p-8 space-y-6 bg-white bg-opacity-90 rounded-lg shadow-md border-2 border-yellow-800">
        <SignUp
          path="/sign-up/[...sign-up]"
          routing="path"
          signInUrl="/sign-in/[...sign-in]"
          afterSignUpUrl="/api/addUser" {/* Redirects to this endpoint after sign-up */}
        />
      </div>
    </div>
  );
}