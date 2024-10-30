import React from 'react'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    const navigate = useNavigate()
  return (
    <div className='mt-2 rounded-t-3xl bg-white shadow-md'>
        <div className='flex h-14 md:h-20 items-center justify-between px-4 md:px-6'>
            <div className='flex item-center gap-2'>
                {/* Logo */}
                <img className='h-12 w-10 md:h-20 md:w-16' src="/logo.png" alt="TagZy Logo" />
                <span className='invisible md:visible font-serif font-bold text-lg md:text-4xl py-2 md:py-4 text-lightGreen tracking-widest'>TagZy</span>
            </div>
            <div className='flex item-center gap-2'>
                <button onClick={() => navigate('/privacyPolicy')} className='text-sm md:text-xl text-lightGreen tracking-ligth md:tracking-wide pr-2 font-serif'>About</button>
                <button onClick={() => navigate('/privacyPolicy')} className='text-sm md:text-xl text-lightGreen tracking-ligth md:tracking-wide font-serif'>Contact Us</button>
            </div>
        </div>
    </div>
  )
}

export default Navbar