import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaBars, FaTimes } from 'react-icons/fa'

const Navbar = () => {
    const [show, setshow] = useState(false)
  return (
    <>
        <div className='md:flex items-center space-x-6 hidden '>
            {
                ['About', 'Plans', 'Feedbacks', 'Contact', 'Create Event'].map((item, index) => (
                    <div className='cursor-pointer hover:underline' key={index}>
                        {
                            item === 'Create Event' ? (
                                <Link to='/event' className='bg-yellow-500 text-white px-4 py-2 rounded-md'>{item}</Link>
                            ) : (
                                <a href={`#${item.toLowerCase()}`} className='text-gray-600 hover:text-yellow-500'>{item}</a>
                            )
                        }
                    </div>
                ))
            }
        </div>
        <div className='md:hidden flex justify-end'>
            <button onClick={() => setshow(!show)}>
                {
                    show ? <FaTimes className='text-xl text-yellow-400' /> : <FaBars className='text-xl text-yellow-400' />
                }
            </button>
        </div>
        {
            show && (
                <div className={`absolute ${show ? 'right-0 left-0' : 'right-[200%]'} z-[1000] bg-white top-[100%] shadow-sm p-4`}>
                    {
                        ['About', 'Plans', 'Feedbacks', 'Contact', 'Create Event'].map((item, index) => (
                            <div className='cursor-pointer hover:underline flex flex-col gap-3 text-center' key={index}>
                                {
                                    item === 'Create Event' ? (
                                        <Link to='/event' className='bg-yellow-500 w-fit mx-auto text-white px-4 py-2 rounded-md'>{item}</Link>
                                    ) : (
                                        <a href={`#${item.toLowerCase()}`} className='text-gray-600 p-2 border-b mb-2 hover:text-yellow-500'>{item}</a>
                                    )
                                }
                            </div>
                        ))
                    }
                </div>
            )
        }
    </>
  )
}

export default Navbar