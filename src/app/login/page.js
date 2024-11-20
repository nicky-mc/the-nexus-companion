'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login, signup } from './actions'; // Import server-side actions

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
  const validatePassword = (password) => password.length >= 8;

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError('Invalid email format.');
      return;
    }

    setLoading(true);
    try {
      const response = await login(new FormData(e.target)); // Use FormData from the form
      setLoading(false);

      if (response.success) {
        setMessage('Login successful!');
        setError('');
        router.push('/private'); // Redirect to the private page
      } else {
        setError(response.message || 'Login failed. Please check your credentials.');
      }
    } catch (err) {
      setLoading(false);
      setError('An unexpected error occurred during login.');
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError('Invalid email format.');
      return;
    }
    if (!validatePassword(password)) {
      setError('Password must be at least 8 characters.');
      return;
    }

    setLoading(true);
    try {
      const response = await signup(new FormData(e.target)); // Use FormData from the form
      setLoading(false);

      if (response.success) {
        setMessage('Signup successful! You can now log in.');
        setError('');
        router.push('/private'); // Redirect to the private page
      } else {
        setError(response.message || 'Signup failed. Please try again.');
      }
    } catch (err) {
      setLoading(false);
      setError('An unexpected error occurred during signup.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Login Page</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {message && <p className="text-green-500 mb-4">{message}</p>}
      <form className="w-full max-w-sm" onSubmit={handleSignup}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
            Email:
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
            Password:
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
            Username:
          </label>
          <input
            id="username"
            name="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={handleLogin}
            disabled={loading}
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none ${
              loading && 'opacity-50 cursor-not-allowed'
            }`}
          >
            {loading ? 'Logging in...' : 'Log in'}
          </button>
          <button
            type="submit"
            disabled={loading}
            className={`bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none ${
              loading && 'opacity-50 cursor-not-allowed'
            }`}
          >
            {loading ? 'Signing up...' : 'Sign up'}
          </button>
        </div>
      </form>
    </div>
  );
}
