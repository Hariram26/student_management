'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');

    // not logged in → redirect to login
    if (!storedUser || !storedToken) {
      router.push('/login');
      return;
    }

    setUser(JSON.parse(storedUser));
  }, []);

  function handleLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/login');
  }

  if (!user) return <p className="text-center mt-20">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md text-center">

        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Welcome, {user.name}! 👋
        </h2>
        <p className="text-gray-500 mb-6">{user.email}</p>

        <button
          onClick={() => router.push('/students')}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg mr-3"
        >
          View Students
        </button>

        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2 rounded-lg transition duration-200"
        >
          Logout
        </button>

      </div>
    </div>
  );
}