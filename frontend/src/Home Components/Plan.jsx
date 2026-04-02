import React from "react";
import { Link } from "react-router-dom";

const plans = [
  {
    name: "Silver",
    price: "₹5000",
    features: ["Basic Event Planning", "Email Support", "Limited Customization"],
    bg: "bg-gray-200",
  },
  {
    name: "Gold",
    price: "₹50000",
    features: ["Premium Event Planning", "24/7 Support", "Full Customization", "Dedicated Manager"],
    bg: "bg-gradient-to-r from-yellow-400 to-yellow-600 text-white", // Gradient for popular plan
    popular: true,
  },
  {
    name: "Platinum",
    price: "Above ₹50000",
    features: ["VIP Event Planning", "Priority Support", "Exclusive Add-ons", "On-Site Assistance"],
    bg: "bg-gray-300",
  },
];

const Plan = () => {
  return (
    <div className="w-full px-6 md:px-12 py-10">
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-8 text-yellow-500 underline" id="plans">
        Our Plans
      </h2>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`rounded-xl shadow-md p-6 flex flex-col items-center ${plan.bg} transition-transform duration-300 hover:scale-105`}
          >
            {plan.popular && <span className="bg-black text-white text-xs uppercase px-3 py-1 rounded-full absolute top-4">Popular</span>}

            <h3 className="text-2xl font-bold">{plan.name}</h3>
            <p className="text-lg font-semibold mt-2">{plan.price}</p>

            <ul className="mt-4 space-y-2">
              {plan.features.map((feature, i) => (
                <li key={i} className="text-sm">
                  ✅ {feature}
                </li>
              ))}
            </ul>

            <Link to='/event'>
                <button className="mt-6 px-5 py-2 bg-yellow-500 border-2 text-white rounded-full hover:bg-yellow-600 transition">
                Choose Plan
                </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Plan;
