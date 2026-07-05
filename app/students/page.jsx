'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import API_URL from '@/lib/api';

export default function StudentsPage() {
  const router = useRouter();
  const [students, setStudents] = useState([]);
  const [loading,  setLoading]  = useState(true);

  // fetch all students on page load
  useEffect(() => {
  // ✅ check login first
  const token = localStorage.getItem('token');
  if (!token) {
    router.push('/login');
    return;
  }
  fetchStudents();
}, []);

  async function fetchStudents() {
    try {
      const res  = await fetch(`${API_URL}/api/student`);
      const data = await res.json();
      setStudents(data);
    } catch (err) {
      console.error('Error fetching students:', err);
    }
    setLoading(false);
  }

  async function handleDelete(id) {
    if (!confirm('Are you sure you want to delete this student?')) return;

    try {
      await fetch(`${API_URL}/api/student/${id}`, {
        method: 'DELETE',
      });
      // refresh list after delete
      fetchStudents();
    } catch (err) {
      console.error('Error deleting student:', err);
    }
  }

  if (loading) return <p className="text-center mt-20">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">All Students</h2>
          <button
            onClick={() => router.push('/students/add')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg"
          >
            + Add Student
          </button>
        </div>

        {/* No students */}
        {students.length === 0 && (
          <p className="text-center text-gray-500 mt-10">
            No students found. Add one!
          </p>
        )}

        {/* Students table */}
        {students.length > 0 && (
          <div className="bg-white rounded-xl shadow overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
                <tr>
                  <th className="px-6 py-3">Name</th>
                  <th className="px-6 py-3">Email</th>
                  <th className="px-6 py-3">Phone</th>
                  <th className="px-6 py-3">Department</th>
                  <th className="px-6 py-3">Semester</th>
                  <th className="px-6 py-3">Gender</th>
                  <th className="px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {students.map((student) => (
                  <tr key={student._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium">{student.name}</td>
                    <td className="px-6 py-4">{student.email}</td>
                    <td className="px-6 py-4">{student.phone}</td>
                    <td className="px-6 py-4">{student.department}</td>
                    <td className="px-6 py-4">{student.semester}</td>
                    <td className="px-6 py-4">{student.gender}</td>
                    <td className="px-6 py-4 flex gap-2">
                      <button
                        onClick={() => router.push(`/students/edit/${student._id}`)}
                        className="bg-yellow-400 hover:bg-yellow-500 text-white text-xs px-3 py-1 rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(student._id)}
                        className="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>
    </div>
  );
}