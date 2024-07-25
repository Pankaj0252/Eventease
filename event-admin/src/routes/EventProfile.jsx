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
                console.log(result);
                setEvent(result);
            } catch (error) {
                console.error(error);
            }
        };

        fetchSingleEvent();
    }, [eventId]);

    return (
        <div className="event-profile-container p-5">
            <div className="event-profile-card">
                <div className="event-profile-header">Event Info</div>
                <div className="event-profile-body">
                    <table className="event-profile-table">
                        <tbody>
                            <tr>
                                <td><strong>Event Name</strong></td>
                                <td>{event?.eventName}</td>
                            </tr>
                            <tr>
                                <td><strong>Event Description</strong></td>
                                <td>{event?.eventDescription}</td>
                            </tr>
                            <tr>
                                <td><strong>Event Date</strong></td>
                                <td>{event?.eventDate}</td>
                            </tr>
                            <tr>
                                <td><strong>Event Location</strong></td>
                                <td>{event?.eventLocation}</td>
                            </tr>
                            <tr>
                                <td><strong>Category</strong></td>
                                <td>{event?.category}</td>
                            </tr>
                            <tr>
                                <td><strong>Created At</strong></td>
                                <td>{event?.createdAt}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default EventProfile;
