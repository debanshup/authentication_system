"use client"
import React from 'react'
import { useRouter } from 'next/navigation'

const VerifyEmail = () => {
    const router = useRouter();
    async function verifyBtnClickHandler() {
        router.push("/login")
    }

    async function resendBtnClickHandler() {
        // throw new Error('Function not implemented.');
    }

    return (
        <div>
            <div>An email has been sent to {/*email*/}....</div>
            <div>
                <input type="text" maxLength={6} placeholder='Enter OTP' />
            </div>
            <div>
                <button className='btn btn-warning' onClick={verifyBtnClickHandler}>Verify</button>
                <button className='btn btn-primary' onClick={resendBtnClickHandler}>Resend OTP</button>

            </div>
        </div>
    )
}

export default VerifyEmail