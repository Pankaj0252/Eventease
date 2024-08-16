import React, { useState } from 'react';
import { createContact } from '../services/api.service';
import { useNavigate } from 'react-router-dom';
import { FaEnvelope, FaPhone, FaMapMarker } from 'react-icons/fa';
<<<<<<< HEAD
import './ContactUs.css';
=======
import '../routes/auth/main.css';
>>>>>>> 2eba715c1219008a132a9e611b2c6f731a625e96

export default function ContactUs() {
    const navigate = useNavigate();
    const [message, setMessage] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleCreateContactForm = async (event) => {
        event.preventDefault();
        const { name, email, phone, message } = formData;
        try {
            await createContact({ name, email, phone, message });
            navigate('/thank-you');
            setMessage({ type: 'success', content: 'Submit successful!' });
        } catch (error) {
            console.error(error);
            setMessage({ type: 'error', content: 'Error Occurred' });
        }
    }

    return (
        <div className="contact-container">
            <div className="contact-header">
                <h1>Contact Us</h1>
                <p>If you have any questions, please feel free to reach out to us. We are here to help you!</p>
            </div>
<<<<<<< HEAD
            {/* <div className="contact-info">
=======
            <div className="contact-info">
>>>>>>> 2eba715c1219008a132a9e611b2c6f731a625e96
                <div className="contact-details">
                    <div className="contact-item">
                        <h3><FaEnvelope /> Email</h3>
                        <p>abc@example.com</p>
                    </div>
                    <div className="contact-item">
                        <h3><FaPhone /> Phone</h3>
                        <p>+9876543210</p>
                    </div>
                    <div className="contact-item">
                        <h3><FaMapMarker /> Address</h3>
<<<<<<< HEAD
                        <p>Street, City, Country</p>
=======
                        <p> Street, City, Country</p>
>>>>>>> 2eba715c1219008a132a9e611b2c6f731a625e96
                    </div>
                </div>
            </div> */}
            <div className="contact-form">
                <form onSubmit={handleCreateContactForm}>
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
                            placeholder="Enter Name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="form-input"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="form-input"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone" className="form-label">Phone</label>
                        <input
                            type="text"
                            id="phone"
                            placeholder="Enter phone number"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="form-input"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="message" className="form-label">Message</label>
                        <textarea
                            id="message"
                            placeholder="Enter message"
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            className="form-input"
                            required
                        />
                    </div>
                    <button type="submit" className="btn-submit">Send Message</button>
                </form>
            </div>
            <div className="contact-form">
                <form onSubmit={handleCreateContactForm}>
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
                            placeholder="Enter Name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="form-input"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="form-input"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone" className="form-label">Phone</label>
                        <input
                            type="text"
                            id="phone"
                            placeholder="Enter phone number"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="form-input"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="message" className="form-label">Message</label>
                        <textarea
                            id="message"
                            placeholder="Enter message"
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            className="form-input"
                            required
                        />
                    </div>
                    <button type="submit" className="btn-submit">Send Message</button>
                </form>
            </div>
        </div>
    );
}
