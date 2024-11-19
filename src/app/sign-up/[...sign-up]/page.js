'use client';

import { useState } from 'react';
import { useSignUp } from '@clerk/nextjs';
import 'daisyui/dist/full.css';

export default function CustomSignUpPage() {
  const { signUp, setSession } = useSignUp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [error, setError] = useState(null);
  const [isVerificationStep, setIsVerificationStep] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError(null); // Reset error state

    try {
      const result = await signUp.create({
        emailAddress: email,
        password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
      setIsVerificationStep(true); // Switch to verification step
    } catch (err) {
      setError(err.errors?.[0]?.message || 'An error occurred during sign up.');
    }
  };

  const handleVerification = async (e) => {
    e.preventDefault();
    setError(null); // Reset error state

    try {
      const verificationResult = await signUp.attemptEmailAddressVerification({
        code: verificationCode,
      });

      setSession(verificationResult.createdSessionId);

      // Call the API route to create the user in the database
      await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          clerkId: verificationResult.createdUserId,
          email,
          username,
          firstName,
          lastName,
        }),
      });
    } catch (err) {
      setError(err.errors?.[0]?.message || 'Invalid verification code.');
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/scroll.jpeg')" }}
    >
      <div className="w-full max-w-md p-8 space-y-6 bg-white bg-opacity-90 rounded-lg shadow-md border-2 border-yellow-800">
        <h2 className="text-2xl font-bold text-center text-yellow-900">
          {isVerificationStep ? 'Verify Your Email' : 'Sign Up'}
        </h2>

        {error && (
          <div className="p-4 mb-4 text-red-700 bg-red-100 rounded">{error}</div>
        )}

        {!isVerificationStep ? (
          <form onSubmit={handleSignUp} className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text text-yellow-900">First Name</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full bg-yellow-100 text-yellow-900"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-yellow-900">Last Name</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full bg-yellow-100 text-yellow-900"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-yellow-900">Username</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full bg-yellow-100 text-yellow-900"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
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
            <button
              type="submit"
              className="btn w-full bg-yellow-700 text-yellow-100 border-none hover:bg-yellow-600"
            >
              Sign Up
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerification} className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text text-yellow-900">
                  Verification Code
                </span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full bg-yellow-100 text-yellow-900"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="btn w-full bg-yellow-700 text-yellow-100 border-none hover:bg-yellow-600"
            >
              Verify
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
