import React from "react";

const Contact = () => {
  return (
    <div className="w-full px-6 md:px-12 py-10" id="contact">
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-8 text-yellow-500 underline">
        Contact Us
      </h2>

      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6 md:p-10">
        <form className="space-y-6">
          {/* Name Field */}
          <div>
            <label className="block text-gray-700 font-semibold">Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-gray-700 font-semibold">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          {/* Message Field */}
          <div>
            <label className="block text-gray-700 font-semibold">Message</label>
            <textarea
              placeholder="Write your message..."
              rows="5"
              className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-yellow-500 text-white font-semibold py-3 rounded-md hover:bg-yellow-600 transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
