"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'

const VerifyEmail = () => {
    const [otp, setOtp] = useState('')
    const router = useRouter();
    async function verifyBtnClickHandler() {
        await axios.post('./api/users/verifyaccount', { otp })
        router.push("/login",)
    }







    async function resendBtnClickHandler() {
        // throw new Error('Function not implemented.');
    }

    return (
        <div>
            <div>An email has been sent to {/*email*/}....</div>
            <div>
                <input value={otp} onChange={
                    (e) => { setOtp(e.target.value) }
                } type="text" maxLength={6} placeholder='Enter OTP' />
            </div>
            <div>
                <button className='btn btn-warning' onClick={verifyBtnClickHandler}>Verify</button>
                <button className='btn btn-primary' onClick={resendBtnClickHandler}>Resend OTP</button>

            </div>
        </div>
    )
}

export default VerifyEmail