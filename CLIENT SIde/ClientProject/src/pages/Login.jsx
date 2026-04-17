// import { useState, useContext } from 'react';
// import axios from 'axios';
// import { AuthContext } from '../context/AuthContext';
// import { useNavigate } from 'react-router-dom';

// export default function Login() {
//     const [form, setForm] = useState({ email: '', password: '' });
//     const { login } = useContext(AuthContext);
//     const navigate = useNavigate();

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const res = await axios.post('http://localhost:3000/api/login', form);
//             login(res.data.token); // Assuming backend returns { token: "..." }
//             navigate('/home');
//         } catch (err) { alert("Invalid credentials"); }
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <h2>Login</h2>
//             <input type="email" placeholder="Email" onChange={e => setForm({...form, email: e.target.value})} />
//             <input type="password" placeholder="Password" onChange={e => setForm({...form, password: e.target.value})} />
//             <button type="submit">Login</button>
//         </form>
//     );
// }

import { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
    const [form, setForm] = useState({ email: '', password: '' });
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:3000/api/login', form);
            login(res.data.token);
            navigate('/home');
        } catch (err) { alert("Invalid credentials"); }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Welcome Back</h2>
                <p className="text-gray-500 text-center mb-8">Please enter your details</p>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <input 
                            type="email" 
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                            placeholder="email@xyz.com" 
                            onChange={e => setForm({...form, email: e.target.value})} 
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input 
                            type="password" 
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                            placeholder="••••••••" 
                            onChange={e => setForm({...form, password: e.target.value})} 
                        />
                    </div>
                    <button 
                        type="submit" 
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
                    >
                        Sign In
                    </button>
                </form>

                <p className="mt-8 text-center text-sm text-gray-600">
                    Don't have an account? <Link to="/register" className="text-blue-600 font-semibold hover:underline">Sign up</Link>
                </p>
            </div>
        </div>
    );
}
