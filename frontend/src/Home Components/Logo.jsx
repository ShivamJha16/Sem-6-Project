import React from 'react'
import logo from '../assets/logo.png'
import { Link } from 'react-router-dom'

const Logo = () => {
  return (
    <div className='flex items-center space-x-2'>
        <img src={logo} alt="logo" className='w-12 h-12' />
        <Link to='/'>
            <h1 className='text-2xl font-bold font-serif text-yellow-500 hover:underline cursor-pointer'>EventO</h1>
        </Link>
    </div>
  )
}

export default Logo