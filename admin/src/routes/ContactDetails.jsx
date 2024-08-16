import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getSingleContact } from '../services/api.service';
import '../routes/auth/main.css'; 

export default function ContactDetails() {
    const { contactId } = useParams();
    const [contact, setContact] = useState(null);

    useEffect(() => {
        const fetchSingleContact = async () => {
            try {
                const result = await getSingleContact(contactId);
                console.log('Fetched Single contact:', result);
                setContact(result);
            } catch (error) {
                console.error('Error fetching contact:', error);
            }
        };

        fetchSingleContact();
    }, [contactId]);

    if (!contact) return <p>Loading...</p>;

    return (
        <div className="contact-details-container">
            <div className="contact-card">
                <h2>Contact Info</h2>
                <table className="contact-table">
                    <tbody>
                        <tr>
                            <td className="label">Name</td>
                            <td>{contact.name}</td>
                        </tr>
                        <tr>
                            <td className="label">Email</td>
                            <td>{contact.email}</td>
                        </tr>
                        <tr>
                            <td className="label">Message</td>
                            <td>{contact.message}</td>
                        </tr>
                        <tr>
                            <td className="label">Phone</td>
                            <td>{contact.phone}</td>
                        </tr>
                        <tr>
                            <td className="label">Created At</td>
                            <td>{contact.createdAt}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
