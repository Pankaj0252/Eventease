import React, { useState } from 'react';
import { loginApi } from '../../services/api.service';
import { Link, useNavigate } from 'react-router-dom';
import { setAccessToken, saveUserToLocalstorage } from '../../services/localstorage';
import '../auth/main.css';

export default function Login() {
    const [user, setUser] = useState({
        email: '',
        password: '',
    });

    const [message, setMessage] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        loginApi(user)
            .then((response) => {
                const user = response;
                if (user) {
                    setAccessToken(user.token);
                    saveUserToLocalstorage(user);
                    navigate('/');
                }
                setMessage({ type: 'success', content: 'Login successful!' });
            })
            .catch((error) => {
                console.log('error', error);
                setMessage({ type: 'error', content: 'Invalid Username/Password Combination' });
            });
    };

    return (
        <section className="login-container">
            <div className="auth-form">
                <form onSubmit={handleSubmit} className="form-body">
                    <h3 className="form-title">Login Account</h3>
                    <hr className="form-divider" />
                    {message && (
                        <div className={`alert ${message.type}`}>
                            {message.content}
                        </div>
                    )}
                    <div className="form-group">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="abc@gmail.com"
                            required
                            value={user.email}
                            onChange={handleChange}
                            className="form-input"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="*******"
                            required
                            minLength={6}
                            value={user.password}
                            onChange={handleChange}
                            className="form-input"
                        />
                    </div>

                    <button className="btn-submit" type="submit">
                        Login
                    </button>
                    <p className="account-link">
                        Don't have an account? <Link to="/auth/signup" className="link">Signup</Link>
                    </p>
                </form>
            </div>
        </section>
    );
}
