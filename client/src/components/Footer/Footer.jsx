import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <>
    <div className='flex items-center justify-between w-full h-32 px-10 py-2 bg-gray-100 max-lg:flex-col max-lg:h-fit max-lg:mb-20 max-lg:gap-3 max-lg:text-center'>
        <div className='flex flex-col items-center justify-center h-full'>
            <img src="./gs.svg" alt="" />
            <p className='font-bold text-green-800'>Gujarat Sales</p>
        </div>
        <div className='text-base font-medium text-gray-500'>Designed and Developed by <a href="https://www.weecom.in" target='_blank'><span className='font-sans text-lg font-bold text-black'>Weecom</span></a></div>
        <div className='text-sm font-normal'>
            <ul>
                <Link to="/terms/shipping">
                <li>Shipping Policy</li>
                </Link>
                <Link to="/terms/return">
                <li>Return Policy</li>
                </Link>
                <Link to="/terms/refund">
                <li>Refund Policy</li>
                </Link>
                <Link to="/terms/terms">
                <li>Terms and Conditions</li>
                </Link>
            </ul>
        </div>
    </div>
    </>
  )
}
