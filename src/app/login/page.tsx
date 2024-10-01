/* eslint-disable react/no-unescaped-entities */
"use client"

import React from 'react'
import Link from 'next/link'

const Login = () => {
    function loginBtnClickHandler(): void {

    }

    return (
        <div>
            <div>
                <label htmlFor="">Username</label>
                <input className='form-control' type={"text"} placeholder='enter username or email' />
                <label htmlFor="">Password</label>
                <input className='form-control' type={"password"} placeholder='enter Password' />
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