import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAccessToken, getUserFromLocalstorage } from '../services/localstorage';
import { updateAccount } from '../services/api.service';
import './SettingsPage.css';

const SettingsPage = () => {
    const [user, setUser] = useState(null);
    const [message, setMessage] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        profileUrl: 'https://via.placeholder.com/150',
    });

    useEffect(() => {
        const token = getAccessToken();
        const userData = getUserFromLocalstorage();

        if (token && userData) {
            setUser(userData);
            setFormData({
                name: userData.name,
                email: userData.email,
                profileUrl: userData.profileUrl || 'https://via.placeholder.com/150',
            });
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({ ...formData, profileUrl: reader.result });
            };
            reader.readAsDataURL(file); // This converts the file to a base64 string
        }
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (formData.name && formData.email) {
            updateAccount(formData)
                .then((response) => {
                    console.log('Response data:', response.data);
                    setUser(response.data);
                    localStorage.setItem('user', JSON.stringify(response.data));
                    setMessage({ type: 'success', content: 'Updated successfully!' });
                })
                .catch((error) => {
                    console.log('error', error);
                    setMessage({ type: 'error', content: 'Invalid Data' });
                });
        } else {
            setMessage({ type: 'error', content: 'Name and email are required!' });
        }
    };

    return (
        <div className="settings-container">
            <h1 className="settings-title">Manage Your Account</h1>
            <div className="settings-card">
                <div className="card-header">Profile Settings</div>
                <form onSubmit={handleFormSubmit} className="settings-form">
                    {message && (
                        <div className={`alert ${message.type}`}>
                            {message.content}
                        </div>
                    )}
                    <div className="profile-section">
                        <div className="profile-image-wrapper">
                            <img
                                src={formData.profileUrl}
                                alt="Profile"
                                className="profile-image"
                            />
                        </div>
                        <button
                            type="button"
                            className="change-profile-button"
                            onClick={() => document.getElementById('fileInput').click()}
                        >
                            Change Profile
                        </button>
                        <input
                            id="fileInput"
                            type="file"
                            onChange={handleFileChange}
                            className="file-input"
                        />
                    </div>
                    <label className="form-label">Name</label>
                    <input
                        type="text"
                        placeholder="Enter Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="form-input"
                        required
                    />
                    <label className="form-label">Email</label>
                    <input
                        type="email"
                        placeholder="Enter email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="form-input"
                        required
                        disabled
                    />
                    <button type="submit" className="update-button">
                        Update Account
                    </button>
                </form>
            </div>
            <div className="back-to-home">
                <Link to="/" className="home-link">Back to Home</Link>
            </div>
        </div>
    );
};

export default SettingsPage;
