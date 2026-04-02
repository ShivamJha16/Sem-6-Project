import React, { useEffect, useState } from "react";
import { EventState } from "../Config/ContextApi";
import axios from "axios";
import BudgetModal from "./BudgetModal";

const EventsComponent = () => {
  const { user, setEvents, events, setSelectedEvent } = EventState();
  const [showBudget, setShowBudget] = useState(false);

  const fetchEvents = async () => {
    try {
      const { data } = await axios.get(`http://localhost:8000/api/event/allEvent`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setEvents(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleClick = (event) => {
    setShowBudget(true);
    setSelectedEvent(event);
  };

  const handleApprove = async (eventId) => {
    try {
      await axios.put(`http://localhost:8000/api/event/status`, { eventId, status: "approved" }, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      alert("Event Approved Successfully!");
      fetchEvents();
    } catch (error) {
      console.error(error);
      alert("Failed to approve event");
    }
  };

  const handleReject = async (eventId) => {
    try {
      await axios.put(`http://localhost:8000/api/event/status`, { eventId, status: "reject" }, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      fetchEvents();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">All Events</h2>

      {events.length === 0 ? (
        <p className="text-gray-500">No events available.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 h-[90vh] overflow-auto lg:grid-cols-3">
          {events.map((event) => (
            <div key={event._id} className="bg-white p-4 h-fit shadow-md rounded-lg border">
              <h3 className="text-xl font-semibold text-gray-700">{event.eventName}</h3>
              <p className="text-gray-600"><strong>Venue:</strong> {event.venue}</p>
              <p className="text-gray-600"><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
              <p className="text-gray-600 capitalize"><strong>Category:</strong> {event.category}</p>
              <p className="text-gray-600"><strong>Attendees:</strong> {event.noOfAttendees}</p>
              <p className="text-gray-600"><strong>User's Budget:</strong> ₹{event.approxBudget}</p>
              <p className="text-gray-600"><strong>Status:</strong> 
                <span className={`px-2 py-1 text-white rounded-md 
                  ${event.status === "pending" ? "bg-yellow-500" : 
                    event.status === "approved" ? "bg-green-500" : 
                    "bg-red-500"}`}>
                  {event.status}
                </span>
              </p>
              <p className="text-gray-600"><strong>Organizer:</strong> {event.userId.username}</p>
              <p className="text-gray-600"><strong>Description:</strong> {event.description}</p>

              {/* Buttons - Conditional Rendering */}
              <div className="mt-4 flex gap-2">
                {event.status === "pending" && (
                  <>
                    <button className="bg-green-500 text-white px-3 py-2 rounded-md hover:bg-green-600 transition"
                      onClick={() => handleApprove(event._id)}>
                      Approve
                    </button>
                    <button className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600 transition"
                      onClick={() => handleReject(event._id)}>
                      Reject
                    </button>
                  </>
                )}
                {event.status === "approved" && (
                  <button className="bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600 transition"
                    onClick={() => handleClick(event)}>
                    Create Budget
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Budget Modal */}
      {showBudget && <BudgetModal onClose={() => setShowBudget(false)} />}
    </div>
  );
};

export default EventsComponent;
