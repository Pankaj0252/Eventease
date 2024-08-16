import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { TbTrash } from 'react-icons/tb';
import '../routes/auth/main.css';
import { getFeedback, deleteSingleFeedback } from '../services/api.service';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export default function Feedback() {
    const [feedback, setFeedback] = useState([]);
    const [totalFeedback, setTotalFeedback] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchFeedback();
    }, []);

    const fetchFeedback = async () => {
        try {
            const result = await getFeedback();
            console.log('result', result);
            setFeedback(result);
            setTotalFeedback(result.length);
            setLoading(false);
        } catch (error) {
            console.error('Error', error);
            setLoading(false);
        }
    };

    const handleDeleteFeedback = (id) => {
        deleteSingleFeedback(id)
            .then(({ data: result }) => {
                console.log('Deleted Feedback:', result);
                fetchFeedback();
            })
            .catch((error) => {
                console.log('Error deleting Feedback:', error);
            });
    };

    const downloadPDF = () => {
        const doc = new jsPDF();
        const columns = ["Name", "Email", "Message", "Feedback Type", "Date Created"];
        const rows = feedback.map(item => [
            item.name,
            item.email,
            item.message,
            item.feedbackType,
            item.createdAt
        ]);
        doc.autoTable({
            head: [columns],
            body: rows,
        });

        doc.save('feedback.pdf');
    };

    return (
        <div className="feedback-container">
            <div className="feedback-header">
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <div>
                        <div className="feedback-summary">
                            <h3>Total List of Feedbacks: {totalFeedback}</h3>
                            <button className="btn btn-success" onClick={downloadPDF}>
                                Download PDF
                            </button>
                        </div>

                        <table className="feedback-table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Message</th>
                                    <th>Feedback Type</th>
                                    <th>Date Created</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {feedback.map((item) => (
                                    <tr key={item._id}>
                                        <td><Link to={`/feedback/${item._id}`}>{item.name}</Link></td>
                                        <td>{item.email}</td>
                                        <td>{item.message}</td>
                                        <td>{item.feedbackType}</td>
                                        <td>{item.createdAt}</td>
                                        <td>
                                            <button className="btn btn-danger btn-sm" onClick={() => handleDeleteFeedback(item._id)}>
                                                <TbTrash />
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
    );
}
