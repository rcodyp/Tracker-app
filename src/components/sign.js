import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function submit() {
        if (!name || !email || !password) {
            alert("All fields are required");
            return;
        }

        const res = await fetch("http://localhost:5000/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password }),
        });

        if (res.ok) {
            alert("Account created successfully");
            navigate("/login");
        } else {
            const err = await res.json();
            alert(err.message || "Signup failed");
        }
    }

    return (
        <div style={pageWrapper}>
            <form onSubmit={(e) => e.preventDefault()}>
                <div style={card}>
                    <h2 style={title}>Create Account</h2>
                    <p style={subtitle}>Start tracking smarter today</p>

                    <input
                        type="text"
                        placeholder="Full name"
                        style={input}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <input
                        type="email"
                        placeholder="Email address"
                        style={input}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        style={input}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button style={primaryButton} onClick={submit}>
                        Sign Up
                    </button>

                    <p style={footerText}>
                        Already have an account?{' '}
                        <span style={link} onClick={() => navigate('/login')}>
                            Login
                        </span>
                    </p>
                </div>
            </form>
        </div>
    );
}




/* ---------- Styles ---------- */

const pageWrapper = {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'radial-gradient(1200px 500px at 50% -10%, #1f2933, #0b0f14)',
    padding: '16px',
};

const card = {
    width: '100%',
    maxWidth: '420px',
    backgroundColor: '#0f172a',
    padding: '32px',
    borderRadius: '14px',
    boxShadow: '0 20px 50px rgba(0,0,0,0.4)',
    textAlign: 'center',
};

const title = {
    color: '#f9fafb',
    fontSize: '28px',
    fontWeight: 700,
    marginBottom: '8px',
};

const subtitle = {
    color: '#9ca3af',
    fontSize: '14px',
    marginBottom: '28px',
};

const input = {
    width: '100%',
    padding: '12px 14px',
    marginBottom: '16px',
    borderRadius: '8px',
    border: '1px solid #374151',
    backgroundColor: '#020617',
    color: '#e5e7eb',
    fontSize: '14px',
    outline: 'none',
};

const primaryButton = {
    width: '100%',
    padding: '12px',
    backgroundColor: '#2563eb',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: 600,
    cursor: 'pointer',
    marginTop: '8px',
};

const footerText = {
    marginTop: '20px',
    fontSize: '14px',
    color: '#9ca3af',
};

const link = {
    color: '#60a5fa',
    cursor: 'pointer',
    fontWeight: 500,
};
