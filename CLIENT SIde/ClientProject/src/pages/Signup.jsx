// import { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// export default function Signup() {
//     const [form, setForm] = useState({ username: '', email: '', password: '' });
//     const navigate = useNavigate();

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             await axios.post('http://localhost:3000/api/register', form);
//             alert("Registered successfully!");
//             navigate('/login');
//         } catch (err) { alert("Registration failed"); }
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <h2>Signup</h2>
//             <input type="text" placeholder="Username" onChange={e => setForm({...form, username: e.target.value})} />
//             <input type="email" placeholder="Email" onChange={e => setForm({...form, email: e.target.value})} />
//             <input type="password" placeholder="Password" onChange={e => setForm({...form, password: e.target.value})} />
//             <button type="submit">Register</button>
//         </form>
//     );
// }
import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

export default function Signup() {
    const [form, setForm] = useState({ username: '', email: '', password: '' });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3000/api/register', form);
            alert("Registered successfully!");
            navigate('/login');
        } catch (err) { alert("Registration failed"); }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Create Account</h2>
                <p className="text-gray-500 text-center mb-8">Join our community today</p>
                
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                        <input 
                            type="text" 
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                            placeholder="Enter Your Name" 
                            onChange={e => setForm({...form, username: e.target.value})} 
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <input 
                            type="email" 
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                            placeholder="Enter Your Email" 
                            onChange={e => setForm({...form, email: e.target.value})} 
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input 
                            type="password" 
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                            placeholder="••••••••" 
                            onChange={e => setForm({...form, password: e.target.value})} 
                        />
                    </div>
                    <button 
                        type="submit" 
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
                    >
                        Create Account
                    </button>
                </form>

                <p className="mt-8 text-center text-sm text-gray-600">
                    Already have an account? <Link to="/login" className="text-green-600 font-semibold hover:underline">Login here</Link>
                </p>
            </div>
        </div>
    );
}
