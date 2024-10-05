"use client"

import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const Signup = () => {
    const router = useRouter()

    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
        confirmedPassword: "",
    })
    async function nextBtnClickHandler() {
        try {
            if (user.password === user.confirmedPassword) {
                const response = await axios.post('/api/users/signup', user)
                // alert(response.data.registration_status)
                if (response.data.registration_status) {
                    alert('redirecting to login')
                    router.push('./login')
                }
                
            } else {
                // toast password should be matched
            }

        } catch (error: any) {
            console.log(error.message);

        }
    }

    return (
        <div>
            <div>Signup</div>
            <div className=''>
                <label htmlFor="">Username</label>
                <input onChange={(e) => { setUser({ ...user, username: e.target.value }) }} className='form-control' type="text" placeholder='Enter username' />

                <label htmlFor="">Email</label>
                <input onChange={(e) => { setUser({ ...user, email: e.target.value }) }} className='form-control' type="email" placeholder='Enter email' />

                <label htmlFor="">Password</label>
                <input onChange={(e) => { setUser({ ...user, password: e.target.value }) }} className='form-control' type="password" placeholder='Enter Password' />

                <label htmlFor="">Confirm password</label>
                <input onChange={(e) => { setUser({ ...user, confirmedPassword: e.target.value }) }} className='form-control' type="password" placeholder='Confirm Password' />
            </div>
            <div>
                <span>Already have an account
                    <Link href={"/login"}> log in</Link>
                </span>
            </div>
            <div className=''>
                <button className='btn btn-primary' onClick={nextBtnClickHandler}>Next</button>
            </div>
        </div>
    )
}

export default Signup