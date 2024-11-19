'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import 'daisyui/dist/full.css';

export default function ProfilePage({ params }) {
  const { id } = params;
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
  });
  const router = useRouter();
  const { user } = useUser();

  useEffect(() => {
    if (!user) {
      router.push('/sign-in');
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await fetch(`/api/users/${id}`);
        const data = await response.json();
        setUserData(data);
        setFormData({
          firstName: data.name.split(' ')[0],
          lastName: data.name.split(' ')[1],
          username: data.username,
          email: data.user_email,
        });
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, [id, user, router]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      setUserData(data);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update user data:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await fetch(`/api/users/${id}`, {
        method: 'DELETE',
      });
      router.push('/users');
    } catch (error) {
      console.error('Failed to delete user:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!userData) {
    return <div>User not found</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/scroll.jpeg')" }}>
      <div className="w-full max-w-md p-8 space-y-6 bg-white bg-opacity-90 rounded-lg shadow-md border-2 border-yellow-800">
        <h2 className="text-2xl font-bold text-center text-yellow-900">Profile</h2>
        {isEditing ? (
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text text-yellow-900">First Name</span>
              </label>
              <input
                type="text"
                name="firstName"
                className="input input-bordered w-full bg-yellow-100 text-yellow-900"
                value={formData.firstName}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-yellow-900">Last Name</span>
              </label>
              <input
                type="text"
                name="lastName"
                className="input input-bordered w-full bg-yellow-100 text-yellow-900"
                value={formData.lastName}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-yellow-900">Username</span>
              </label>
              <input
                type="text"
                name="username"
                className="input input-bordered w-full bg-yellow-100 text-yellow-900"
                value={formData.username}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-yellow-900">Email</span>
              </label>
              <input
                type="email"
                name="email"
                className="input input-bordered w-full bg-yellow-100 text-yellow-900"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <button type="submit" className="btn w-full bg-yellow-700 text-yellow-100 border-none hover:bg-yellow-600">Save</button>
          </form>
        ) : (
          <div className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text text-yellow-900">First Name</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full bg-yellow-100 text-yellow-900"
                value={userData.name.split(' ')[0]}
                readOnly
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-yellow-900">Last Name</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full bg-yellow-100 text-yellow-900"
                value={userData.name.split(' ')[1]}
                readOnly
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-yellow-900">Username</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full bg-yellow-100 text-yellow-900"
                value={userData.username}
                readOnly
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-yellow-900">Email</span>
              </label>
              <input
                type="email"
                className="input input-bordered w-full bg-yellow-100 text-yellow-900"
                value={userData.user_email}
                readOnly
              />
            </div>
          </div>
        )}
        <div className="flex justify-between mt-4">
          <button onClick={handleEditToggle} className="btn bg-yellow-700 text-yellow-100 border-none hover:bg-yellow-600">
            {isEditing ? 'Cancel' : 'Edit'}
          </button>
          <button onClick={handleDelete} className="btn bg-red-700 text-yellow-100 border-none hover:bg-red-600">Delete</button>
        </div>
      </div>
    </div>
  );
}