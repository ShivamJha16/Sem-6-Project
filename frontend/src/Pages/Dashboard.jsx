import React, { useState } from "react";
import Logo from "../Home Components/Logo";
import { EventState } from "../Config/ContextApi";
import EventsComponent from "../Dashboard Components/EventsComponent";
import Budget from "../Dashboard Components/Budget";
import FeedbackSection from "../Dashboard Components/FeedbackSection";
import { IoIosArrowDown } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import PaymentsSection from "../Dashboard Components/PaymentsSection";

const Dashboard = () => {
  const { user } = EventState();
  const [activeTab, setActiveTab] = useState("events");
  const navigate = useNavigate();

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/authentication");
  };

  return (
    user && (
      <div className="h-screen flex flex-col">
        
        {/* Header */}
        <div className="bg-gray-800 flex justify-between items-center text-white px-[10%] py-4">
          <Logo />

          <div className="relative">
            <button
              className="bg-yellow-500 flex items-center px-4 py-2 rounded-md hover:underline"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              {user.username} <IoIosArrowDown className="ml-1" />
            </button>

            {dropdownOpen && (
              <button
                onClick={handleLogout}
                className="absolute right-0 top-full bg-white text-gray-800 w-full p-2 rounded-md shadow-md"
              >
                Logout
              </button>
            )}
          </div>
        </div>

        {/* Body */}
        <div className="flex flex-1 overflow-hidden">
          
          {/* Sidebar */}
          <div className="w-[20%] bg-gray-700 pt-4">
            {["events", "budgets", "payments", "feedbacks"].map((tab) => (
              <button
                key={tab}
                className="w-full p-4 hover:bg-gray-600 text-white text-center"
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Main Content (Scrollable) */}
          <div className="w-[80%] bg-gray-100 p-4 overflow-y-auto">
            {activeTab === "events" && <EventsComponent />}
            {activeTab === "budgets" && <Budget />}
            {activeTab === "payments" && <PaymentsSection />}
            {activeTab === "feedbacks" && <FeedbackSection />}
          </div>

        </div>
      </div>
    )
  );
};

export default Dashboard;