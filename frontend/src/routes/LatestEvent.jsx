import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getEvents } from '../services/api.service';
import '../routes/auth/main.css';

const LatestEvent = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const result = await getEvents();
            console.log('result', result);
            setEvents(result);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const getLatestEvents = () => {
        return events
            .sort((a, b) => new Date(b.eventDate) - new Date(a.eventDate)) // Sort by eventDate
            .slice(0, 3);
    };

    const latestEvents = getLatestEvents();

    return (
        <div className="latest-events-container">
            <h2 className="latest-events-title">Latest Awesome Events</h2>
            <div className="events-grid">
                {latestEvents.map((event) => (
                    <div className="event-card" key={event._id}>
                        <Link to={`/events/${event._id}`} className="event-link">
                            <img
                                src={event.image}
                                className="event-image"
                                alt={event.category}
                            />
                            <div className="event-details">
                                <h5 className="event-title">{event.eventName}</h5>
                                <p className="event-description">{event.eventDescription}</p>
                                <p className="event-category"><strong>Category:</strong> {event.category}</p>
                                <p className="event-date"><strong>Date:</strong> {new Date(event.eventDate).toLocaleDateString()}</p>

                                <button className="event-button">
                                    More Details
                                </button>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LatestEvent;
