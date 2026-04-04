import React, { useState } from "react";
import { EventState } from "../Config/ContextApi";
import axios from "axios";

const BudgetModal = ({ onClose }) => {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const { user, setBudgets, budgets,selectedEvent, setSelectedEvent } = EventState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const newBudget = { amount, description, userId: user._id, status: "pending", eventId: selectedEvent._id };
        const {data} = await axios.post("https://evento-prs2.onrender.com/api/budget/", newBudget,{
            headers: { Authorization: `Bearer ${user.token}` },
        })
        console.log(data);
        setBudgets([...budgets, data]);
        setSelectedEvent(null);
        onClose();
        alert("Budget created successfully");
    } catch (error) {
        console.log(error);
        alert("Failed to create budget");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center" onClick={onClose}>
      <div className="w-[90%] md:w-[50%] bg-white p-6 rounded-lg shadow-lg relative" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-xl" onClick={onClose}>
          &times;
        </button>

        <h2 className="text-2xl font-bold text-gray-700 mb-4">Create Budget</h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-600 font-medium">Budget Amount ()</label>
            <input
              type="number"
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-gray-600 font-medium">Description</label>
            <textarea
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="Enter budget details"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4">
            <button type="button" className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
              Submit Budget
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BudgetModal;
