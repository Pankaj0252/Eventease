import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { TbTrash } from 'react-icons/tb';
import { getBookings, deleteSingleBooking } from '../services/api.service';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export default function Booking() {
    const [bookings, setBookings] = useState([]);
    const [filteredBookings, setFilteredBookings] = useState([]);
    const [totalBookings, setTotalBookings] = useState(0);
    const [userEventDetails, setUserEventDetails] = useState({});
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchBookings();
    }, []);

    useEffect(() => {
        filterBookings();
    }, [searchTerm, bookings]);

    const fetchBookings = async () => {
        try {
            const result = await getBookings();
            setBookings(result);
            setTotalBookings(result.length);
            calculateUserEventDetails(result);
            setLoading(false);
        } catch (error) {
            console.error('Error', error);
            setLoading(false);
        }
    };

    const filterBookings = () => {
        const filtered = bookings.filter(booking =>
            booking.eventId.eventName.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredBookings(filtered);
    };

    const calculateUserEventDetails = (bookings) => {
        const details = {};
        bookings.forEach(booking => {
            const userId = booking.userId.name;
            if (!details[userId]) {
                details[userId] = { count: 0, events: [] };
            }
            details[userId].count++;
            details[userId].events.push(booking.eventId.eventName);
        });
        setUserEventDetails(details);
    };

    const handleDeleteBooking = (id) => {
        deleteSingleBooking(id)
            .then(({ data: result }) => {
                console.log('Deleted booking:', result);
                fetchBookings();
            })
            .catch((error) => {
                console.log('Error deleting booking:', error);
            });
    };

    const downloadPDF = () => {
        const doc = new jsPDF();
        const columns = ["Event Name", "Booking Date", "Date Created"];
        const rows = filteredBookings.map(booking => [
            booking.eventId.eventName,
            booking.bookingDate,
            booking.createdAt,
        ]);
        doc.autoTable({
            head: [columns],
            body: rows,
        });
        doc.save('bookings.pdf');
    };

    return (
        <div className="container">
            <div className="dashboard-page-header p-3">
                <div className="row">
                    <div className="col-md-12">
                        {loading ? (
                            <p>Loading...</p>
                        ) : (
                            <div>
                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <h3>Total List of Event Bookings: {totalBookings}</h3>
                                    </div>
                                    <div className="col-md-6 text-right">
                                        <button className="btn btn-success" onClick={downloadPDF}>
                                            Download PDF
                                        </button>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-md-12">
                                        <form>
                                            <div className="form-group">
                                                <label htmlFor="search">Search by Event Name</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="search"
                                                    placeholder="Enter event name"
                                                    value={searchTerm}
                                                    onChange={(e) => setSearchTerm(e.target.value)}
                                                />
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <table className="table table-striped table-bordered table-hover" id="bookings-table">
                                    <thead>
                                        <tr>
                                            <th>Event Name</th>
                                            <th>Booking Date</th>
                                            <th>Date Created</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredBookings.map((booking) => (
                                            <tr key={booking._id}>
                                                <td><Link to={`/bookings/${booking._id}`}>{booking.eventId.eventName}</Link></td>
                                                <td>{booking.bookingDate}</td>
                                                <td>{booking.createdAt}</td>
                                                <td>
                                                    <button className="btn btn-danger btn-sm" onClick={() => handleDeleteBooking(booking._id)}>
                                                        <TbTrash />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <div className="mt-3">
                                    <h4>User Event Details:</h4>
                                    <table className="table table-striped table-bordered table-hover" id="user-event-details-table">
                                        <thead>
                                            <tr>
                                                <th>User ID</th>
                                                <th>Total Events</th>
                                                <th>Booked Events</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Object.entries(userEventDetails).map(([userId, details]) => (
                                                <tr key={userId}>
                                                    <td>{userId}</td>
                                                    <td>{details.count}</td>
                                                    <td>
                                                        <ul>
                                                            {details.events.map((eventName, index) => (
                                                                <li key={index}>{eventName}</li>
                                                            ))}
                                                        </ul>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
