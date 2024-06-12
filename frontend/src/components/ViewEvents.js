import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../style.css";
import "./ViewEvents.css";
const events = [
  {
    id: 1,
    title: "Music Concert",
    date: "2023-06-21",
    location: "Madison Square Garden, NY",
    description: "Enjoy a night of amazing music performances by top artists.",
    image:
      "https://salfordmuseum.com/wp-content/uploads/sites/3/2021/08/Victorian-Gallery-003-N322-2000x846.jpg",
  },
  {
    id: 2,
    title: "Tech Conference",
    date: "2023-07-10",
    location: "San Francisco, CA",
    description: "Join industry leaders and innovators in the tech world.",
    image:
      "https://t3.ftcdn.net/jpg/06/29/91/40/360_F_629914086_Tr3omrvGUHqdaHPOHz2R0o67wjTvBFZP.jpg",
  },
  // Add more events as needed
];

const ViewEvents = () => {
  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Upcoming Events</h1>
      <div className="row">
        {events.map((event) => (
          <div className="col-md-6 mb-4" key={event.id}>
            <div className="cardviewEvents h-100">
              <img
                src={event.image}
                className="cardviewEvents-img-top"
                alt={event.title}
              />
              <div className="cardviewEvents-cardviewEventsbody">
                <h5 className="cardviewEvents-title">{event.title}</h5>
                <p className="cardviewEvents-text">
                  <strong>Date:</strong> {event.date}
                </p>
                <p className="cardviewEvents-text">
                  <strong>Location:</strong> {event.location}
                </p>
                <p className="cardviewEvents-text">{event.description}</p>
                <a href="#" className="btn btn-primary">
                  Learn More
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewEvents;
