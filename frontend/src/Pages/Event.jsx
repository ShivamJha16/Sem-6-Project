import React, { useState } from "react";
import Logo from "../Home Components/Logo";
import axios from "axios";
import { EventState } from "../Config/ContextApi";

const Event = () => {
  const { user } = EventState();
  const [formData, setFormData] = useState({
    eventName: "",
    venue: "",
    date: "",
    category: "silver", // Default category
    approxBudget: "",
    noOfAttendees: "",
    description: "",
  });

  // Function to determine category based on budget
  const getCategory = (budget) => {
    if (budget >= 50000) return "platinum";
    if (budget >= 5000) return "gold";
    return "silver";
  };

  const handleChange = (e) => {
    let { name, value } = e.target;

    // Ensure approxBudget is converted to a number before determining category
    if (name === "approxBudget") {
      const budget = Number(value);
      setFormData((prev) => ({
        ...prev,
        approxBudget: budget,
        category: getCategory(budget),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const { data } = await axios.post("http://localhost:8000/api/event", formData, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      console.log(data);
      alert("Event Created Successfully!");
    } catch (error) {
      console.log(error);
      alert("Failed to Create Event!");
    }
  };

  return (
    <div className="sm:px-[10%] px-[5%] py-6 min-h-screen flex flex-col items-center">
      <Logo />
      <div className="w-full max-w-2xl bg-white shadow-lg p-6 rounded-lg mt-6">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
          Create Your Event
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Event Name */}
          <input
            type="text"
            name="eventName"
            placeholder="Event Name"
            value={formData.eventName}
            onChange={handleChange}
            className="input-style"
            required
          />

          {/* Venue */}
          <input
            type="text"
            name="venue"
            placeholder="Venue"
            value={formData.venue}
            onChange={handleChange}
            className="input-style"
            required
          />

          {/* Date */}
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="input-style"
            required
          />

          {/* Approximate Budget */}
          <input
            type="number"
            name="approxBudget"
            placeholder="Approx Budget"
            value={formData.approxBudget}
            onChange={handleChange}
            className="input-style"
            required
          />

          {/* Automatically Set Category (Disabled) */}
          <input
            type="text"
            name="category"
            value={formData.category}
            className="input-style bg-gray-100 cursor-not-allowed"
            readOnly
          />

          {/* Number of Attendees */}
          <input
            type="number"
            name="noOfAttendees"
            placeholder="No. of Attendees"
            value={formData.noOfAttendees}
            onChange={handleChange}
            className="input-style"
            required
          />

          {/* Description */}
          <textarea
            name="description"
            placeholder="Event Description"
            value={formData.description}
            onChange={handleChange}
            className="input-style h-24 resize-none"
            required
          />

          {/* Submit Button */}
          <button type="submit" className="btn-primary w-full">
            Create Event
          </button>
        </form>
      </div>
    </div>
  );
};

export default Event;
