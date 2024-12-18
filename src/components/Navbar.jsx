'use client';

import { useCompendium } from "@/app/context/CompendiumContext"; 
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/client'; // Import the createClient function
import FullSidebarAccordion from '@/components/CompendiumSidebar'; 

const supabase = createClient(); // Create Supabase client instance

export default function Navbar() {
  const { showCompendium, setShowCompendium } = useCompendium(); 
  const [theme, setTheme] = useState('light');
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    };

    fetchSession();

    // Subscribe to auth changes
    const { data: subscription } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const handleLogin = () => {
    router.push('/login'); // Navigate to the login page
  };

  const handleLogout = async () => {
    await supabase.auth.signOut(); // Log the user out
    setUser(null); // Reset user state
    router.push('/'); // Redirect to the homepage or another appropriate page
  };

  return (
    <div className="relative">
      <nav className="navbar bg-base-100 shadow-md z-50">
        <div className="flex-1">
          <a className="btn btn-ghost normal-case text-xl">Nexus v2</a>
        </div>
        <div className="flex-none flex items-center space-x-4">
          <button className="btn btn-ghost btn-circle" onClick={toggleTheme}>
            {theme === 'light' ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 2a1 1 0 011 1v2a1 1 0 11-2 0V3a1 1 0 011-1zM10 15a1 1 0 011 1v2a1 1 0 11-2 0v-2a1 1 0 011-1zM4.22 4.22a1 1 0 011.42 0l1.42 1.42a1 1 0 11-1.42 1.42L4.22 5.64a1 1 0 010-1.42zM14.14 14.14a1 1 0 011.42 0l1.42 1.42a1 1 0 11-1.42 1.42l-1.42-1.42a1 1 0 010-1.42zM2 10a1 1 0 011-1h2a1 1 0 110 2H3a1 1 0 01-1-1zM15 10a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1zM4.22 15.78a1 1 0 010-1.42l1.42-1.42a1 1 0 111.42 1.42l-1.42 1.42a1 1 0 01-1.42 0zM14.14 5.64a1 1 0 010-1.42l1.42-1.42a1 1 0 111.42 1.42l-1.42 1.42a1 1 0 01-1.42 0z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zM8 10a2 2 0 114 0 2 2 0 01-4 0z" clipRule="evenodd" />
              </svg>
            )}
          </button>

          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </label>
            <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 z-50">
              <li><a href="/">Home</a></li>
              <li><a href="/about">About</a></li>
              <li><a href="/contact">Contact</a></li>
              {!user ? (
                <li><a onClick={handleLogin}>Login</a></li>
              ) : (
                <li><a onClick={handleLogout}>Logout</a></li>
              )}
            </ul>
          </div>

          {/* Compendium Toggle Button */}
          <button
            className="btn btn-primary"
            onClick={() => setShowCompendium(!showCompendium)}
          >
            {showCompendium ? 'Close Companion' : 'Open Companion'}
          </button>
        </div>
      </nav>

      {/* Compendium Sidebar */}
      {showCompendium && (
        <FullSidebarAccordion />
      )}
    </div>
  );
}
