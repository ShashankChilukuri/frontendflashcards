import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminLogin.css';

const AdminLogin = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
        const validUsername = 'admin';
        const validPassword = '123';

        if (username === validUsername && password === validPassword) {
            onLogin(); // Notify App that login was successful
            navigate('/dashboard'); // Redirect to the Dashboard
        } else {
            setError('Invalid username or password');
        }
    };

    return (
        <div className="login-container">
            <h1>Admin Login</h1>
            <div className="login-form">
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button onClick={handleLogin}>Login</button>
                {error && <p className="error">{error}</p>}
            </div>
        </div>
    );
};

export default AdminLogin;
