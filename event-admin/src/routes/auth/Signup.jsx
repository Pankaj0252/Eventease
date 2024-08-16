import React, { useState } from 'react';
import { signupUser } from '../../services/api.service';
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

        signupUser(user)
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
        <section className="signup-container">
            <div className="form-wrapper">
                <form onSubmit={handleSubmit} className="auth-form">
                    <h3 className="text-center">Create a new Account</h3>
                    <hr />
                    {message && (
                        <div className={`alert ${message.type}`}>
                            {message.content}
                        </div>
                    )}
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="abc"
                            required
                            value={user.name}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>

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

                    <div className="form-group">
                        <label htmlFor="phone">Phone</label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            placeholder="1234567890"
                            required
                            pattern="[0-9]{10}"
                            value={user.phone}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>

                    <button className="btn-submit" type="submit">
                        Create Account
                    </button>
                    <p className="account-link">
                        Already have an account? <Link to="/auth/login">Login</Link>
                    </p>
                </form>
            </div>
        </section>
    );
}
