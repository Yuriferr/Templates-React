import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

import './Login.css';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        localStorage.setItem('login', JSON.stringify({ email, password }));
        alert('Login salvo no cache!');
        navigate('/');
    }

    return (
        <main className='login-container'>
            <h1>Login</h1>
            <form onSubmit={handleSubmit} className='container'>
                <input
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Entrar</button>
            </form>
        </main>
    );
}