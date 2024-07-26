import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createFeedback } from '../services/api.service';
import '../routes/auth/main.css';

export default function Feedback() {
    const navigate = useNavigate();
    const [message, setMessage] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        feedbackType: 'positive',
        message: '',
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleRoleChange = (event) => {
        setFormData({ ...formData, feedbackType: event.target.value });
    };

    const handleCreateFeedbackForm = async (event) => {
        event.preventDefault();
        const { name, email, feedbackType, message } = formData;
        try {
            await createFeedback({ name, email, feedbackType, message });
            navigate('/thank-you');
            setMessage({ type: 'success', content: 'Submit successful!' });
        } catch (error) {
            console.error('Error creating feedback:', error);
            setMessage({ type: 'error', content: 'Error occurred' });
        }
    };

    return (
        <div className="feedback-section">
            <div className="container py-5">
                <div className="row justify-content-center text-center">
                    <div className="col-md-6">
                        <div className="form-wrapper">
                            <form onSubmit={handleCreateFeedbackForm}>
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
                                        placeholder="Enter Name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        placeholder="Enter email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="message">Message</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        placeholder="Enter message"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        required
                                    ></textarea>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="feedbackType">Feedback Type</label>
                                    <select
                                        id="feedbackType"
                                        name="feedbackType"
                                        value={formData.feedbackType}
                                        onChange={handleRoleChange}
                                    >
                                        <option value="positive">Positive</option>
                                        <option value="negative">Negative</option>
                                        <option value="neutral">Neutral</option>
                                    </select>
                                </div>
                                <button type="submit" className="submit-button">
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
