"use client"
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'

const VerifyEmail = () => {
    const [otp, setOtp] = useState('')
    const [reqId, setReqId] = useState('')
    const router = useRouter();
    async function verifyBtnClickHandler() {
        const res = await axios.post('./api/users/verify-otp', { otp: otp, reqId: reqId })
        const token = await axios.post('./api/users/token', {reqId: reqId})


        alert(token.data.message)

        if (res.data.success && token.data.success) {
            router.push(`./reset-password?token=${token.data.value}`)
        }
    }


    useEffect(() => {


        const token = window.location.search.split('req=')[1]
        if (token) {
            setReqId(token)
            
        }

        return () => {
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])






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