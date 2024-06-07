import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import AddEvent from "./AddEvent"; 

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEvents = () => {
    axios
      .get(`${process.env.REACT_APP_API_KEY}events`)
      .then((response) => {
        setEvents(response.data.events);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  };

  const handleEventAdded = (newEvent) => {
    setEvents((prevEvents) => [...prevEvents, newEvent]);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <h2>Events</h2>
        <AddEvent onEventAdded={handleEventAdded} /> {/* Include AddEvent component */}
        <div className="row mt-4">
          {events.map((event) => (
            <div className="col-md-4" key={event._id}>
              <div className="card mb-4">
                <div className="card-body">
                  <h5 className="card-title">{event.name}</h5>
                  <p className="card-text">{event.description}</p>
                  <p className="card-text">
                    <small className="text-muted">
                      Date: {new Date(event.date).toLocaleDateString()}
                    </small>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Events;
