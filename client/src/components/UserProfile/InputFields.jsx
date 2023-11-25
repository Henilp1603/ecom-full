import { TextField } from '@radix-ui/themes'
import { User2 } from 'lucide-react'
import React from 'react'

export default function InputFields({placeholder, defaultValue, userIcon, type,name,getData}) {
  return (
    <>
    <TextField.Root variant="soft" className="w-80 max-md:w-60">
      <TextField.Input placeholder={placeholder}  type={type} defaultValue={defaultValue}  name={name} onChange={(e)=>getData(e)}/>
      <TextField.Slot>
        {userIcon}  
      </TextField.Slot>
    </TextField.Root>
    </>
  )
}
