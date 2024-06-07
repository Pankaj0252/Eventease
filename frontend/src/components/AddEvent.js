import React, { useState } from "react";
import axios from "axios";
import '../AddEvent.css'
const AddEvent = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    date: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post(`${process.env.REACT_APP_API_KEY}events/create`, formData)
      .then((response) => {
        console.log("Event created:", response.data);
        // Clear the form or show a success message
        setFormData({
          name: "",
          description: "",
          date: "",
        });
      })
      .catch((error) => {
        console.error("Error creating event:", error);
      });
  };

  return (
    <div className="container mt-5">
      <h2>Add New Event</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Event Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Event Description</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="date">Event Date</label>
          <input
            type="date"
            className="form-control"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          Add Event
        </button>
      </form>
    </div>
  );
};

export default AddEvent;
