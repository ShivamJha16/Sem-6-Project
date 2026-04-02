import React, { useState } from 'react';
import Logo from '../Home Components/Logo';
import Navbar from '../Home Components/Navbar';
import { Link } from 'react-router-dom';
import Banner from '../Home Components/Banner';
import About from '../Home Components/About';
import Plan from '../Home Components/Plan';
import Testtimonial from '../Home Components/Testtimonial';
import Contact from '../Home Components/Contact';
import Footer from '../Home Components/Footer';
import { EventState } from '../Config/ContextApi';
import { IoIosArrowDown } from "react-icons/io";
import EventModal from '../Home Components/EventModal';
import FeedbacksModal from '../Home Components/FeedbacksModal';
import PaymentModal from '../Home Components/PaymentModal';

const Home = () => {
    const { user } = EventState();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [eventsModal, setEventsModal] = useState(false);
    const [showFeedbackModal, setShowFeedbackModal] = useState(false);
    const [showPaymentsModal, setShowPaymentsModal] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('user');
        window.location.reload();
    }

    return (
        <>
            <header className='w-full shadow-md sticky z-20'>
                <div className='bg-white py-2 sm:px-[10%] px-[5%] relative z-[100] flex justify-between items-center'>
                    <Logo />
                    <Navbar />
                    {
                        user ? (
                            <div className='relative'>
                                <button 
                                    className='capitalize text-white px-4 py-2 rounded-md bg-red-500 flex items-center gap-1 hover:underline'
                                    onClick={() => setDropdownOpen(!dropdownOpen)}
                                >
                                    {user.username} {" "}
                                    <IoIosArrowDown />
                                </button>
                                {dropdownOpen && (
                                    <div 
                                        className='absolute right-0 mt-2 w-48 bg-white border border-gray-200 shadow-lg rounded-md' 
                                        onMouseEnter={() => setDropdownOpen(true)}
                                        onMouseLeave={() => setDropdownOpen(false)}
                                    >
                                        <button className='block px-4 py-2 text-gray-700 w-full hover:bg-gray-100' onClick={() => setEventsModal(true)}>Show Events</button>
                                        <button className='block px-4 py-2 text-gray-700 w-full hover:bg-gray-100' onClick={() => setShowPaymentsModal(true)}>Show Payments</button>
                                        <button className='block w-full text-center px-4 py-2 text-gray-700 hover:bg-gray-100' onClick={() => setShowFeedbackModal(true)}>Create Feedback</button>
                                        <button className='block w-full text-center px-4 py-2 text-gray-700 hover:bg-gray-100' onClick={handleLogout}>Logout</button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <button className='bg-yellow-500 text-white px-4 py-2 rounded-md hover:underline'>
                                <Link to='/authentication'>Login</Link>
                            </button>
                        )
                    }
                </div>
            </header>
            <Banner />
            <div className='px-[10%] py-10'>
                <About />
                <Plan />
                <Testtimonial />
                <Contact />    
            </div>
            <Footer />
            {eventsModal && <EventModal onClose={() => setEventsModal(false)} />}
            {showPaymentsModal && <PaymentModal onClose={() => setShowPaymentsModal(false)} />}
            {showFeedbackModal && <FeedbacksModal onClose={() => setShowFeedbackModal(false)} />}
        </>
    );
};

export default Home;
