import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getContacts, deleteSingleContact } from '../services/api.service';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import '../routes/auth/main.css'; 

export default function Contact() {
    const [contacts, setContacts] = useState([]);
    const [totalContacts, setTotalContacts] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchContacts();
    }, []);

    const fetchContacts = async () => {
        try {
            const result = await getContacts();
            setContacts(result);
            setTotalContacts(result.length);
            setLoading(false);
        } catch (error) {
            console.error('Error', error);
            setLoading(false);
        }
    };

    const handleDeleteContact = (id) => {
        deleteSingleContact(id)
            .then(({ data: result }) => {
                console.log('Deleted contact:', result);
                fetchContacts();
            })
            .catch((error) => {
                console.log('Error deleting contact:', error);
            });
    };

    const downloadPDF = () => {
        const doc = new jsPDF();
        const columns = ["Name", "Email", "Phone", "Message", "Date Created"];
        const rows = contacts.map(contact => [
            contact.name,
            contact.email,
            contact.phone,
            contact.message,
            contact.createdAt
        ]);
        doc.autoTable({
            head: [columns],
            body: rows,
        });
        doc.save('contacts.pdf');
    };

    return (
        <div className="contact-container">
            <div className="dashboard-page-header">
                <div className="contact-header">
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        <div>
                            <div className="header-row">
                                <div className="total-contacts">
                                    <h3>Total List of Contacts: {totalContacts}</h3>
                                </div>
                                <div className="download-pdf">
                                    <button className="btn-download" onClick={downloadPDF}>
                                        Download PDF
                                    </button>
                                </div>
                            </div>

                            <table className="contacts-table">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>Message</th>
                                        <th>Date Created</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {contacts.map((contact) => (
                                        <tr key={contact._id}>
                                            <td><Link to={`/contacts/${contact._id}`}>{contact.name}</Link></td>
                                            <td>{contact.email}</td>
                                            <td>{contact.phone}</td>
                                            <td>{contact.message}</td>
                                            <td>{contact.createdAt}</td>
                                            <td>
                                                <button className="btn-delete custom-btn danger-btn" onClick={() => handleDeleteContact(contact._id)}>
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
