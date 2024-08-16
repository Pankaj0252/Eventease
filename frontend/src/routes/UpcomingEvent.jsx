import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getUpcomingEvents } from '../services/api.service';
import '../routes/auth/main.css';

const UpcomingEvent = () => {
  const [upcomingEvents, setUpcomingEvents] = useState([]);

  useEffect(() => {
    const fetchUpcomingEvents = async () => {
      try {
        const result = await getUpcomingEvents();
        console.log(result);
        setUpcomingEvents(result);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchUpcomingEvents();
  }, []);

  return (
    <div className="upcoming-events-container">
      <h2 className="upcoming-events-title">Upcoming Events</h2>
      <div className="upcoming-events-grid">
        {upcomingEvents.map((event) => (
          <div className="event-card" key={event._id}>
            <Link to={`/events/${event._id}`} className="event-link">
              <img
                src={event.image}
                className="event-image"
                alt={event.category}
              />
              <div className="event-body">
                <h5 className="event-title">{event.eventName}</h5>
                <p className="event-description">{event.eventDescription}</p>
                <p className="event-category"><strong>Category:</strong> {event.category}</p>
                <p className="event-date"><strong>Date:</strong> {new Date(event.eventDate).toLocaleDateString()}</p>
                <button className="event-button">More Details</button>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingEvent;
