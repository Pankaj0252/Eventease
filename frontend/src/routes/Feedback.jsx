import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createFeedback } from '../services/api.service';
import '../routes/auth/main.css';
import './feedback.css';

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

    const handleFeedbackTypeChange = (event) => {
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
        <div className="feedback-page">
            <div className="feedback-container">
                <h1 className="feedback-title">Feedback Form</h1>
                <div className="feedback-form-wrapper">
                    <form onSubmit={handleCreateFeedbackForm}>
                        {message && (
                            <div className={`feedback-alert ${message.type}`}>
                                {message.content}
                            </div>
                        )}
                        <div className="feedback-form-group">
                            <label htmlFor="name" className="feedback-form-label">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Enter your name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="feedback-form-input"
                                required
                            />
                        </div>
                        <div className="feedback-form-group">
                            <label htmlFor="email" className="feedback-form-label">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="feedback-form-input"
                                required
                            />
                        </div>
                        <div className="feedback-form-group">
                            <label htmlFor="message" className="feedback-form-label">Message</label>
                            <textarea
                                id="message"
                                name="message"
                                placeholder="Enter your feedback"
                                value={formData.message}
                                onChange={handleInputChange}
                                className="feedback-form-textarea"
                                required
                            ></textarea>
                        </div>
                        <div className="feedback-form-group">
                            <label htmlFor="feedbackType" className="feedback-form-label">Feedback Type</label>
                            <select
                                id="feedbackType"
                                name="feedbackType"
                                value={formData.feedbackType}
                                onChange={handleFeedbackTypeChange}
                                className="feedback-form-select"
                            >
                                <option value="positive">Positive</option>
                                <option value="negative">Negative</option>
                                <option value="neutral">Neutral</option>
                            </select>
                        </div>
                        <button type="submit" className="feedback-submit-button">
                            Send Feedback
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
