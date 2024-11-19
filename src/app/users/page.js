'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import 'daisyui/dist/full.css';

export default function UserListPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/users');
        const data = await response.json();
        setUsers(data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch users:', error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/scroll.jpeg')" }}>
      <div className="w-full max-w-4xl p-8 space-y-6 bg-white bg-opacity-90 rounded-lg shadow-md border-2 border-yellow-800">
        <h2 className="text-2xl font-bold text-center text-yellow-900">User List</h2>
        <ul className="space-y-4">
          {users.map((user) => (
            <li key={user.id} className="flex justify-between items-center">
              <span className="text-yellow-900">{user.username}</span>
              <button onClick={() => router.push(`/profile/${user.id}`)} className="btn bg-yellow-700 text-yellow-100 border-none hover:bg-yellow-600">View Profile</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}