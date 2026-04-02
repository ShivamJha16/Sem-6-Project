import React, { useState } from 'react'
import Logo from '../Home Components/Logo'
import Login from '../Authentication Components/Login'
import Register from '../Authentication Components/Register'

const Authentication = () => {
  const [isLogin, setIsLogin] = useState(true)
  return (
    <div className='flex flex-col items-center justify-center gap-3 h-screen p-2'>
      <div className='sm:w-[500px] w-full bg-white p-4 shadow-md rounded-md  flex items-center justify-center'>
        <Logo />
      </div>
      <div className='sm:w-[500px] w-full bg-white p-4 shadow-md rounded-md'>
        {
          isLogin ? (
            <Login onSwitch={() => setIsLogin(false)} />
          ) : ( 
            <Register onSwitch={() => setIsLogin(true)} />
          )    
        }
      </div>
    </div>
  )
}

export default Authentication