import React, { useState } from 'react';
import { loginUser } from '../../services/api.service';
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

        loginUser(user)
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
            <div className="form-wrapper">
                <form onSubmit={handleSubmit} className="auth-form">
                    <h3 className="text-center">Login Account</h3>
                    <hr />
                    {message && (
                        <div className={`alert ${message.type}`}>
                            {message.content}
                        </div>
                    )}
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="abc@gmail.com"
                            required
                            value={user.email}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="*******"
                            required
                            minLength={6}
                            value={user.password}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>

                    <button className="btn-submit" type="submit">
                        Login
                    </button>
                    <p className="account-link">
                        Don't have an account? <Link to="/auth/signup">Signup</Link>
                    </p>
                </form>
            </div>
        </section>
    );
}
