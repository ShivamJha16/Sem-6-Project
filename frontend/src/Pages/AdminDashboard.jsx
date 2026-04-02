import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [events, setEvents] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    fetchEvents();
    fetchFeedbacks();
  }, []);

  const fetchEvents = async () => {
    const res = await axios.get("http://localhost:8000/api/event");
    setEvents(res.data);
  };

  const fetchFeedbacks = async () => {
    const res = await axios.get("http://localhost:8000/api/feedback");
    setFeedbacks(res.data);
  };

  const approveEvent = async (id) => {
    await axios.put(`http://localhost:8000/api/event/approve/${id}`);
    fetchEvents();
  };

  const rejectEvent = async (id) => {
    await axios.put(`http://localhost:8000/api/event/reject/${id}`);
    fetchEvents();
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>

      <h2>Event Requests</h2>
      {events.map((event) => (
        <div key={event._id}>
          <p>{event.name} - {event.eventType}</p>

          <button onClick={() => approveEvent(event._id)}>
            Approve
          </button>

          <button onClick={() => rejectEvent(event._id)}>
            Reject
          </button>
        </div>
      ))}

      <h2>Contact Messages</h2>
      {feedbacks.map((f) => (
        <div key={f._id}>
          <p>{f.name} : {f.message}</p>
        </div>
      ))}
    </div>
  );
};

export default AdminDashboard;