"use client"

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'


const VerifyEmail = () => {
    const router = useRouter()
    const [success, setSuccess] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    useEffect(() => {
        const token = window.location.search.split('token=')[1] || ''
        verify(token)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    async function verify(token: String) {
        try {
            const response = await axios.get('./api/users/verifyemail', { params: {token} })
            setSuccess(response.data.success)
            if (response.data.success || response.data.already_verified) {
                setTimeout(() => {
                    router.push('/login')
                }, 2000);
            } else {
                setErrorMessage('Invalid or expired token')
            }
        } catch (error: any) {
            setErrorMessage('Error verifying email. Please try again.');
        }
    }

    return (
        <>

            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {success && <p className="success-message">Email verified successfully! Redirecting to login...</p>}
            {!errorMessage && !success && <p>Verifying your email, please wait...</p>}
        </>
    )
}

export default VerifyEmail