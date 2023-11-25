import { Button } from '@radix-ui/themes'
import { CheckCircle } from 'lucide-react'
import React from 'react'
import Invoice from '../Invoice/Invoice'

export default function Success() {
  return (
    <div className='flex flex-col items-center justify-center gap-2 p-10'>
        <div>
            <CheckCircle color='green' className='w-24 h-24'/>
        </div>
        <div className='text-xl font-semibold text-center'>
            <h1>Your order has been placed succesfully.</h1>
            <h1>Download Invoice from below</h1>
        </div>
        <Invoice/>
    </div>
  )
}
