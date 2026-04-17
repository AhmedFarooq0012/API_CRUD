import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

export default function Home() {
    const { token, logout } = useContext(AuthContext);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:3000/api/all', {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(res => {
            setData(res.data);
            setLoading(false);
        })
        .catch(err => {
            console.error(err);
            setLoading(false);
        });
    }, [token]);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navigation Bar */}
            <nav className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        <div className="flex items-center">
                            <span className="text-2xl font-bold text-blue-600">AuthSystem</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-gray-600 hidden sm:block">Welcome back!</span>
                            <button 
                                onClick={logout}
                                className="bg-red-50 hover:bg-red-100 text-red-600 px-4 py-2 rounded-lg font-medium transition-colors border border-red-200"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-extrabold text-gray-900">Protected Dashboard</h1>
                    <p className="mt-2 text-gray-600">This data is only visible because you are logged in.</p>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="bg-gray-800 px-6 py-4">
                        <h3 className="text-white font-mono text-sm uppercase tracking-wider">API Response Data</h3>
                    </div>
                    
                    <div className="p-6">
                        {loading ? (
                            <div className="flex justify-center py-10">
                                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
                            </div>
                        ) : (
                            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                                <pre className="text-sm text-gray-800 font-mono overflow-auto whitespace-pre-wrap">
                                    {data ? JSON.stringify(data, null, 2) : "No data available"}
                                </pre>
                            </div>
                        )}
                    </div>
                </div>

                {/* Example Quick Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                    <div className="bg-blue-600 p-6 rounded-2xl text-white shadow-lg shadow-blue-200">
                        <p className="text-blue-100 text-sm font-medium uppercase">Session Status</p>
                        <p className="text-2xl font-bold mt-1">Active</p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                        <p className="text-gray-500 text-sm font-medium uppercase">Security</p>
                        <p className="text-2xl font-bold mt-1 text-gray-800">JWT Verified</p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                        <p className="text-gray-500 text-sm font-medium uppercase">Role</p>
                        <p className="text-2xl font-bold mt-1 text-gray-800">User</p>
                    </div>
                </div>
            </main>
        </div>
    );
}
