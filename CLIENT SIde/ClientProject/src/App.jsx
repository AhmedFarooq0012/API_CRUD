import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext, AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import AuthGuard from './components/AuthGuard'
function AppRoutes() {
    const { token } = useContext(AuthContext);
    // return (
    //     <Routes>
    //         <Route path="/login" element={!token ? <Login /> : <Navigate to="/home" />} />
    //         <Route path="/register" element={<Signup />} />
    //         {/* protected route  */}
    //         <Route path="/home" element={
    //             token ? <Home /> : <Navigate to="/login" />} />
    //         <Route path="*" element={<Navigate to="/login" />} />
    //     </Routes>
    // );

    return (
        <Routes>
            {/* Public Routes - but redirect to home if already logged in */}
            <Route path="/login" element={!token ? <Login /> : <Navigate to="/home" />} />
            <Route path="/register" element={<Signup />} />

            {/* Protected Route using the Guard */}
            <Route 
                path="/home" 
                element={
                    <AuthGuard>
                        <Home />
                    </AuthGuard>
                } 
            />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
    );
}

export default function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <AppRoutes />
            </BrowserRouter>
        </AuthProvider>
    );
}
