import React, { useState } from 'react';
import { signupApi } from '../../services/api.service';
import { Link, useNavigate } from 'react-router-dom';
import { setAccessToken, saveUserToLocalstorage } from '../../services/localstorage';
import '../auth/main.css';

export default function Signup() {
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        phone: ''
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

        signupApi(user)
            .then((response) => {
                const user = response;
                if (user) {
                    setAccessToken(user.token);
                    saveUserToLocalstorage(user);
                    navigate('/');
                }
                setMessage({ type: 'success', content: 'Signup successful!' });
            })
            .catch((error) => {
                console.log('error', error);
                setMessage({ type: 'error', content: 'Email address is already registered with us.' });
            });
    };

    return (
        <section className="auth-container">
            <div className="auth-wrapper">
                <form onSubmit={handleSubmit} className="auth-form">
                    <h3 className="auth-form-title form-title">Create a new Account</h3>
                    <hr />
                    {message && (
                        <div className={`alert ${message.type}`}>
                            {message.content}
                        </div>
                    )}
                    <div className="form-group">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="John Doe"
                            required
                            value={user.name}
                            onChange={handleChange}
                            className="form-input"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="john.doe@example.com"
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
                            placeholder="********"
                            required
                            minLength={6}
                            value={user.password}
                            onChange={handleChange}
                            className="form-input"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="phone" className="form-label">Phone</label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            placeholder="1234567890"
                            required
                            pattern="[0-9]{10}"
                            value={user.phone}
                            onChange={handleChange}
                            className="form-input"
                        />
                    </div>

                    <button className="btn-custom" type="submit">
                        Create Account
                    </button>
                    <p className="auth-link">
                        Already have an account? <Link to="/auth/login" className="link">Login</Link>
                    </p>
                </form>
            </div>
        </section>
    );
}
