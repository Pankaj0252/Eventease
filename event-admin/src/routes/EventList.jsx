import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search } from 'react-bootstrap-icons';
import { createEvent, deleteEvent, updateEvent, getEvents } from '../services/api.service';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import '../routes/auth/main.css'; // Import the CSS file

export default function EventList() {
    const [events, setEvents] = useState([]);
    const [totalEvents, setTotalEvents] = useState(0);
    const [loading, setLoading] = useState(true);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isUpdateMode, setIsUpdateMode] = useState(false);
    const [currentEventId, setCurrentEventId] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [formValues, setFormValues] = useState({
        eventName: '',
        eventDescription: '',
        eventDate: '',
        eventLocation: '',
        category: '',
        image: ''
    });

    useEffect(() => {
        fetchEvents();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const handleCategoryChange = (eventKey) => {
        setFormValues({
            ...formValues,
            category: eventKey,
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormValues({ ...formValues, image: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const fetchEvents = async () => {
        try {
            const result = await getEvents();
            console.log('result', result);
            setEvents(result);
            setTotalEvents(result.length);
            setLoading(false);
        } catch (error) {
            console.error('Error:', error);
            setLoading(false);
        }
    };

    const showModal = (event) => {
        if (event) {
            setIsUpdateMode(true);
            setCurrentEventId(event._id);
            setFormValues(event);
        } else {
            setIsUpdateMode(false);
            setFormValues({
                eventName: '',
                eventDescription: '',
                eventDate: '',
                eventLocation: '',
                category: '',
                image: ''
            });
        }
        setIsModalVisible(true);
    };

    const hideModal = () => {
        setIsModalVisible(false);
        setCurrentEventId(null);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const getFilteredEvents = () => {
        if (!searchQuery) {
            return events;
        }
        return events.filter((event) =>
            event.category && event.category.toLowerCase().includes(searchQuery.toLowerCase())
        );
    };

    const handleDeleteEvent = async (id) => {
        try {
            await deleteEvent(id);
            fetchEvents();
        } catch (error) {
            console.error('Error deleting event:', error);
        }
    };

    const handleCreateOrUpdateEvent = async (e) => {
        e.preventDefault();
        try {
            if (isUpdateMode) {
                await updateEvent(currentEventId, formValues);
            } else {
                await createEvent(formValues);
            }
            hideModal();
            fetchEvents();
        } catch (error) {
            console.error(error);
        }
    };

    const downloadPDF = () => {
        const doc = new jsPDF();
        const columns = ["Event Name", "Event Description", "Event Date", "Event Location", "Category", "Date Created"];
        const rows = events.map(event => [
            event.eventName,
            event.eventDescription,
            event.eventDate,
            event.eventLocation,
            event.category,
            event.createdAt
        ]);
        doc.autoTable({
            head: [columns],
            body: rows,
        });

        doc.save('events.pdf');
    };

    return (
        <div className="container">
            <div className="dashboard-page-header">
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <div>
                        <div className="header-top">
                            <h3>Total List of Events: {totalEvents}</h3>
                            <div className="header-buttons">
                                <button className="btn btn-primary" onClick={() => showModal(null)}>
                                    <Plus size={18} /> New Event
                                </button>
                                <button className="btn btn-success" onClick={downloadPDF}>
                                    Download PDF
                                </button>
                            </div>
                        </div>
                        <div className="search-bar">
                            <span className="search-icon"><Search size={25} /></span>
                            <input 
                                type="text" 
                                className="search-input" 
                                placeholder="Search Category....." 
                                onChange={handleSearchChange} 
                            />
                        </div>

                        <table className="event-table">
                            <thead>
                                <tr>
                                    <th>Event Name</th>
                                    <th>Event Description</th>
                                    <th>Event Date</th>
                                    <th>Event Location</th>
                                    <th>Category</th>
                                    <th>Date Created</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {getFilteredEvents().map(event => (
                                    <tr key={event._id}>
                                        <td><Link to={`/events/${event._id}`}>{event.eventName}</Link></td>
                                        <td>{event.eventDescription}</td>
                                        <td>{event.eventDate}</td>
                                        <td>{event.eventLocation}</td>
                                        <td>{event.category}</td>
                                        <td>{event.createdAt}</td>
                                        <td>
                                            <button className="btn btn-danger" onClick={() => handleDeleteEvent(event._id)}>
                                                Delete
                                            </button>
                                            <button className="btn btn-secondary" onClick={() => showModal(event)}>
                                                Edit
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {isModalVisible && (
                            <div className="modal-overlay">
                                <div className="modal-content">
                                    <button className="close-btn" onClick={hideModal}>×</button>
                                    <h2>{isUpdateMode ? "Update Event" : "Create Event"}</h2>
                                    <form onSubmit={handleCreateOrUpdateEvent}>
                                        <div className="form-group">
                                            <label>Event Name</label>
                                            <input
                                                type="text"
                                                placeholder="Enter event name"
                                                name="eventName"
                                                value={formValues.eventName}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Event Description</label>
                                            <textarea
                                                placeholder="Enter event description"
                                                name="eventDescription"
                                                value={formValues.eventDescription}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Event Date</label>
                                            <input
                                                type="date"
                                                name="eventDate"
                                                value={formValues.eventDate}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Event Location</label>
                                            <input
                                                type="text"
                                                placeholder="Enter event location"
                                                name="eventLocation"
                                                value={formValues.eventLocation}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Profile Image</label>
                                            <input
                                                type="file"
                                                onChange={handleFileChange}
                                                required={!isUpdateMode}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Category</label>
                                            <select
                                                name="category"
                                                value={formValues.category}
                                                onChange={(e) => handleCategoryChange(e.target.value)}
                                                required
                                            >
                                                <option value="">Select Category</option>
                                                <option value="Conference">Conference</option>
                                                <option value="Seminar">Seminar</option>
                                                <option value="Workshop">Workshop</option>
                                            </select>
                                        </div>
                                        <div className="form-actions">
                                            <button className="btn btn-secondary" onClick={hideModal}>
                                                Close
                                            </button>
                                            <button className="btn btn-primary" type="submit">
                                                {isUpdateMode ? "Update Event" : "Create Event"}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
