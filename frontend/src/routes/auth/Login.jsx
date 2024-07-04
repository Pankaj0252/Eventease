import React, { useState } from 'react'
import { loginApi } from '../../services/api.service';
import { Form, Button, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { setAccessToken, saveUserToLocalstorage } from '../../services/localstorage';

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
                setMessage({ type: 'success', content: 'Signup successful!' });
            })
            .catch((error) => {
                console.log('error', error);
                setMessage({ type: 'error', content: 'Invalid Username/Password Combination' });
            });
    };
    return (
        <div>
            <section className="bg-gray-50">
                <div className="container py-5 mt-5">
                    <div className="row justify-content-center">
                        <div className="col-lg-5">
                            <div className="form-wrapper auth-form bg-light mt-2 p-3">
                                <Form onSubmit={handleSubmit} className="p-4">
                                    <h3 className="text-center">Login Account</h3>
                                    <hr />
                                    {message && (
                                        <Alert variant={message.type} className="mb-3">
                                            {message.content}
                                        </Alert>
                                    )}
                                    <Form.Group controlId="email" className="mt-3">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            type="email"
                                            name="email"
                                            placeholder="abc@gmail.com"
                                            required
                                            value={user.email}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="password" className="mt-3">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            name="password"
                                            placeholder="*******"
                                            required
                                            minLength={6}
                                            value={user.password}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>

                                    <Button className="btn-primary w-100 p-2 mt-3" type="submit">
                                        Login
                                    </Button>
                                    <p className="mt-4 account-link">
                                        Don't have an account? <Link className="text-decoration-none" to="/auth/signup">Signup</Link>
                                    </p>
                                </Form>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
