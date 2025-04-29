import { useState } from 'react';
import './LoginForm.css'
import { useNavigate } from 'react-router-dom';

export default function LoginForm({onLogin}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState()
    
    const navigate = useNavigate(); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            
            const response = await fetch(`${process.env.REACT_APP_API_URL}/users/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) throw new Error('Invalid credentials');

            const data = await response.json();

            // Save token or session info to localStorage
            sessionStorage.setItem('isLoggedIn', 'true');
            sessionStorage.setItem('role', data.role);
            sessionStorage.setItem('username', data.username);

            onLogin();
            navigate('/');

        } catch (err) {
            setError(err.message)
        }
    };


    return <div>
        <h2>Login</h2>
        <form  onSubmit={handleSubmit} >
            <div className="login-form">
                <input
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Show error message */}
            <button type="submit">Login</button></form>
    </div>
}