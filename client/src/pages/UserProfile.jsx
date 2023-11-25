import { Avatar, Button, Separator, Text, TextArea } from '@radix-ui/themes'
import React, { useEffect, useState } from 'react'
import InputFields from '../components/UserProfile/InputFields'
import { LockIcon, Phone, Pin, User2 } from 'lucide-react'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'

export default function UserProfile() {
    const [cookie, setCookie,removeCookie] = useCookies(["token"]);

    const navigate=useNavigate()

    const [userData,setUserData]=useState("")
    const [data,setDate]=useState({
        name:"",
        password:"",
        phoneNo:"",
        pincode:"",
        address:""
    })


    const getData=(e)=>{
       const {value, name} = e.target;

       setDate((prev)=>{
        return{
            ...prev,
            [name]:value
        }
       })

    }

    const setData=async()=>{
        const url=`http://localhost:8080/api/user/edit-user`
        try {
            const res=await axios.put(url,data,{
                headers:{
                    Authorization:`Bearer ${cookie.token}`
                }
            })

            if (res.data) {
                navigate("/")
            }
        } catch (error) {
            console.log(error)
        }
    }

    const logout=()=>{
        removeCookie("token")
        navigate("/")
    }

    const getUserData=async()=>{
            const token=cookie.token
            const url=`${import.meta.env.VITE_SERVER_API}/api/user/token/${token}`
            const res = await axios.get(url);
            const user = await res.data;
            setUserData(user)   
    }
    useEffect(()=>{
        try {
            getUserData()
        } catch (error) {
            console.log(error)
        }
    },[])


  return (
    <>
        <div className='flex flex-col items-center justify-start w-full h-screen p-1'>
            <div className='mt-4 heading'>
                <h1 className='text-4xl font-semibold'>Profile Settings</h1>
            </div>
            <div className='flex flex-col items-center justify-center gap-2 mt-10'>
                <Avatar fallback={userData ? userData[0].name[0]:""} size="5" />
                    <p className='text-xl font-semibold'>{userData ? userData[0].name:""}</p>
            </div>
            <div className='flex flex-col items-center justify-center w-2/4 px-4 mt-4 max-md:w-full max-md:mt-8'>
                <h2 className='text-2xl font-normal'>User Details</h2>
                <Separator size="4" my="4"/>
                <div className='flex items-center justify-between w-4/5 my-2 max-md:w-full'>
                    <Text className='font-bold'>Full Name</Text>
                    <InputFields placeholder={"Enter new  name"} defaultValue={userData?userData[0]?.name:""} userIcon={<User2 height={16} width={16}  />} name='name'  getData={getData}/>
                </div>
                <div className='flex items-center justify-between w-4/5 my-2 max-md:w-full'>
                    <Text className='font-bold'>Password</Text>
                    <InputFields placeholder={"Enter new Password"} defaultValue={"123456789"} userIcon={<LockIcon height={16} width={16} /> }type={"password"} name="password" value={data.password} getData={getData}/>
                </div>
                <div className='flex items-center justify-between w-4/5 my-2 max-md:w-full'>
                    <Text className='font-bold'>Phone Number</Text>
                    <InputFields placeholder={"Enter your phone number"} defaultValue={userData?userData[0]?.phoneNo:""} userIcon={<Phone height={16} width={16}/>} name="phoneNo" value={data.phoneNo} getData={getData}/>
                </div>
                <div className='flex items-center justify-between w-4/5 my-2 max-md:w-full'>
                    <Text className='font-bold'>Pincode</Text>
                    <InputFields placeholder={"Enter your pincode"} defaultValue={userData?userData[0]?.pincode:""} userIcon={<Pin height={16} width={16}/>} name="pincode" value={data.pincode} getData={getData}/>
                </div>
                <div className='flex items-start justify-between w-4/5 my-2 max-md:w-full'>
                    <Text className='font-bold max-md:pr-1'>Delivery Address</Text>
                    <TextArea variant='soft' size="2" className='w-80 max-md:w-60' placeholder='Enter your delivery address' rows={4} name='address' onChange={(e)=>getData(e)} defaultValue={userData?userData[0]?.address:""} />
                </div>
            </div>
            <div className='flex items-center gap-4 my-4'>
                <Button size="3" variant='ghost' onClick={()=>navigate("/")}>Cancel</Button>
                <Button size="3" color='red' variant="soft" onClick={()=>logout()}>Logout</Button>
                <Button size="3" onClick={()=>setData()}>Save</Button>

            </div>
        </div>
    </>
  )
}
