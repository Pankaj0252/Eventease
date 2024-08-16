import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { TbSearch } from 'react-icons/tb';
import { getEvents } from '../services/api.service';
import './EventList.css';

export default function EventList() {
    const [events, setEvents] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const result = await getEvents();
            setEvents(result);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const getFilteredEvents = () => {
        if (!searchQuery) {
            return events;
        }
        return events.filter(event =>
            event.category && event.category.toLowerCase().includes(searchQuery.toLowerCase())
        );
    };

    const filteredEvents = getFilteredEvents();

    return (
        <div className="event-list-container">
            <div className="search-bar">
                <TbSearch size={25} className="search-icon" />
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search Category....."
                    onChange={handleSearchChange}
                />
            </div>
            <div className="event-grid">
                {filteredEvents.map((event) => (
                    <div className="event-card" key={event._id}>
                        <Link to={`/events/${event._id}`} className="card-link">
                            <img
                                src={event.image}
                                className="card-img"
                                alt={event.category}
                            />
                            <div className="card-content">
                                <h5 className="card-title">{event.eventName}</h5>
                                <p className="card-description">{event.eventDescription}</p>
                                <p className="card-category">{event.category}</p>
                                <button className="details-button">
                                    More Details
                                </button>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
