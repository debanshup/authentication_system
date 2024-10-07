/* eslint-disable react/no-unescaped-entities */
"use client"

import { useRouter } from 'next/navigation'
import axios from 'axios'
import React, { useState } from 'react'
import Link from 'next/link'

const Login = () => {
    const router = useRouter()
    const [user, setUser] = useState({ username: '', password: '' })
    const [errorMessage, setErrorMessage] = useState('')
    async function loginBtnClickHandler() {
        try {
            if (user.password && user.username) {
                const response = await axios.post('./api/users/login', user)
                if (response.data.success) {
                    router.push("./profile")
                }

            } else {
                alert('enter valid credentials')
            }
        } catch (error: any) {
            setErrorMessage(error.message)
            alert('error.message')
        }
    }

    return (
        <div>
            <div>
                <label htmlFor="">Username</label>
                <input onChange={(e) => { setUser({ ...user, username: e.target.value }) }} className='form-control' type={"text"} placeholder='enter username or email' />
                <label htmlFor="">Password</label>
                <input onChange={(e) => { setUser({ ...user, password: e.target.value }) }} className='form-control' type={"password"} placeholder='enter Password' />
            </div>
            <div className='row'>
                <div className='col-6 text-start px-4'>
                    <span>Don't have an account
                        <Link href={"/signup"}> create one</Link>
                    </span>
                </div>
                <div className='col-6 text-end px-4'>
                    <Link href={"/cred"}> forgot password</Link>
                </div>

            </div>
            <div>
                <button onClick={loginBtnClickHandler} className='btn btn-primary'>log in</button>
            </div>
        </div>
    )
}

export default Login