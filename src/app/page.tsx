"use client"
import React from 'react'

import { useRouter } from 'next/navigation'

const Home = () => {
    const router = useRouter()
    function signupBtnClickHandler(): void {
        router.push('/signup')
    }
    function loginBtnClickHandler(): void {
        router.push('/login')
    }

  return (
    <div className='container-sm border text-center'>
        <div className='d-flex gap-3 align-items-center'>
            <button  className='btn btn-primary m-1' onClick={signupBtnClickHandler}>Sign up</button>
            <button  className='btn btn-primary m-1' onClick={loginBtnClickHandler}>Login</button>
        </div>
    </div>
  )
}

export default Home