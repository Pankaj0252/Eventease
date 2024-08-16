import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getEventsById } from '../services/api.service';
import '../routes/auth/main.css';

const EventProfile = () => {
    const params = useParams();
    const eventId = params.eventId;
    const [event, setEvent] = useState(null);

    useEffect(() => {
        const fetchSingleEvent = async () => {
            try {
                const result = await getEventsById(eventId);
                setEvent(result);
            } catch (error) {
                console.error('Error fetching event:', error);
            }
        };

        fetchSingleEvent();
    }, [eventId]);

    return (
        <div className="event-profile-container">
            <div className="event-profile-content">
                {event ? (
                    <div className="event-details">
                        <img className="event-image" src={event.image} alt={event.category} />
                        <h2 className="event-title">{event.eventName}</h2>
                        <p className="event-description">{event.eventDescription}</p>
                        <p className="event-date">{event.eventDate}</p>
                        <p className="event-location">{event.eventLocation}</p>
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    );
};

export default EventProfile;
