'use client';
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import API_URL from '@/lib/api';

export default function EditStudentPage() {
    const router = useRouter();
    const { id } = useParams();

    const [formData, setFormData] = useState({
        name: '', email: '', phone: '',
        department: '', semester: '', dateOfBirth: '', gender: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

  useEffect(() => {
  // ✅ check login first
  const token = localStorage.getItem('token');
  if (!token) {
    router.push('/login');
    return;
  }
  // ✅ then fetch student data
  async function fetchStudent() {
            const res = await fetch(`${API_URL}/api/student/${id}`);
            const data = await res.json();

            setFormData({
                name: data.name,
                email: data.email,
                phone: data.phone,
                department: data.department,
                semester: data.semester,
                dateOfBirth: data.dateOfBirth?.split('T')[0], // format date for input
                gender: data.gender
            });
        }
  fetchStudent();
}, [id]);

    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const res = await fetch(`${API_URL}/api/student/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.message);
            } else {
                router.push('/students');  // go back to list
            }

        } catch (err) {
            setError('Cannot connect to server.');
        }

        setLoading(false);
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-8">
            <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-lg">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit Student</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {['name', 'email', 'phone', 'department'].map((field) => (
                        <div key={field}>
                            <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                                {field}
                            </label>
                            <input
                                type="text"
                                name={field}
                                value={formData[field]}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    ))}

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Semester</label>
                        <select
                            name="semester"
                            value={formData.semester}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            {[1, 2, 3, 4, 5, 6, 7, 8].map(s => (
                                <option key={s} value={s}>Semester {s}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                        <input
                            type="date"
                            name="dateOfBirth"
                            value={formData.dateOfBirth}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                        <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    {error && (
                        <p className="text-red-500 text-sm bg-red-50 border border-red-200 rounded-lg px-4 py-2">
                            ❌ {error}
                        </p>
                    )}

                    <div className="flex gap-3">
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg disabled:opacity-50"
                        >
                            {loading ? 'Updating...' : 'Update Student'}
                        </button>
                        <button
                            type="button"
                            onClick={() => router.push('/students')}
                            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 rounded-lg"
                        >
                            Cancel
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}