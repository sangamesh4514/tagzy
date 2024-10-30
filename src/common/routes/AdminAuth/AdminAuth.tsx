import React, { ChangeEvent, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import Header from "../../components/Header"
import { Eye } from 'lucide-react';
import { EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { adminLogin } from '../../utils/authentication/adminActions';
import { useAppDispatch, useAppSelector } from '../../../app/hook';
import { Spinner } from '../../../components/Spinner';

const AdminAuth = () => {
  const [adminId, setAdminId] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const { userInfo, loading } = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  
  useEffect(() => {
    if(userInfo || localStorage.getItem("userId")) {
      navigate('/admin/dashboard')
    }
  }, [userInfo, navigate])

  // admin id input handler
  const idInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setAdminId(e.target.value)
  }

  // password input handler
  const passInputHanlder = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setPassword(e.target.value)
  }

  // click handler for checking admin id
  const clickHandler = () => {
    dispatch(adminLogin( { userId: adminId, password: password }))
  }


  const togglePassword = () => {
    (!showPassword ? setShowPassword(true) : setShowPassword(false))
  }

  return (
    <div className='mt-2 flex flex-col h-screen bg-white rounded-t-3xl'>
      <Header />
      <div className='my-auto item-center justify-center'>
        <div className='flex flex-col item-center justify-center bg-white h-fit '>
          <div className='h-fit mx-8 md:mx-auto rounded-lg shadow-lg border-2 border-solid'>
            <div className='px-8 md:px-24 py-4 md:py-6 font-semibold md:font-bold text-2xl md:text-4xl rounded-t-lg text-center'>
            <span style={{fontFamily: 'serif'}}>TagZy</span> Admin Portal
            </div>
            <div className='flex-col py-4 px-6'>
              <div>
                <label className='block mb-1 text-md md:text-lg font-semibold'>Admin Id</label>
                <input 
                  className='bg-white border border-gray-300 text-gray-900 text-md rounded-lg block w-full p-2' 
                  type="text" 
                  value={adminId}
                  onChange={idInputHandler}
                  required
                />
              </div>
              <div className='relative'>
                <label className='block mb-1 text-md md:text-lg font-semibold mt-4'>Password</label>
                <input 
                  className='bg-white border border-gray-300 text-gray-900 text-md rounded-lg block w-full p-2' 
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={passInputHanlder}
                  required
                />
                <button
                  type='button'
                  className='absolute inset-y-0 right-0 flex items-center pr-3 pt-7 md:pt-8 text-gray-500 hover:text-gray-700'
                  onClick={togglePassword}
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
              <button 
                type="button" 
                className={`bg-colorA hover:bg-colorB w-full font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 mt-6`}
                onClick={clickHandler}
                style={{color: "white"}}
              >
                {loading ? <Spinner /> : "Login"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminAuth