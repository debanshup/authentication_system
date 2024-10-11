"use client"

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import ErrorPopup from './components/popups/ErrorPopup'
import SuccessPopup from './components/popups/SuccessPopup'


const Page = () => {
    const router = useRouter()
    const [success, setSuccess] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const [showTokenValidityErrorPopup, setShowTokenValdityErrorPopup] = useState(false)
    const handleCloseTokenValidityErrorPopup = () => setShowTokenValdityErrorPopup(false)

    const [showSuccessPopup, setShowSuccessPopup] = useState(false)
    const handleCloseSuccessPopup = setShowSuccessPopup(false)

    const[showUnknownErrorPopup, setShowUnknownErrorPopup] = useState(false)
    const handleCloseUnknownErrorPopup = () => setShowUnknownErrorPopup(false)
    useEffect(() => {
        const token = window.location.search.split('token=')[1] || ''
        if (token) {
            verify(token)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])



    async function verify(token: String) {
        try {
            const response = await axios.post('./api/users/verify-email', { token })
            // setSuccess(response.data.success)
            if (response.data.success || response.data.already_verified) {
                // setTimeout(() => {
                //     router.push('/login')
                // }, 2000);
                // setShowSuccessPopup(true)
            } else {
                setErrorMessage('Invalid or expired token')
                setShowTokenValdityErrorPopup(true)
            }
        } catch (error: any) {
            setErrorMessage('Error verifying email. Please try again.');
            setShowUnknownErrorPopup(true)
        }
    }

    return (
        <>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {success && <p className="success-message">Email verified successfully! Redirecting to login...</p>}
            {!errorMessage && !success && <p>Verifying your email, please wait...</p>}
            {/* {showSuccessPopup&&
            <SuccessPopup show={showSuccessPopup} handleClose={handleCloseSuccessPopup}  />
            } */}
            {showTokenValidityErrorPopup && 
            <ErrorPopup show={showTokenValidityErrorPopup} handleClose={handleCloseTokenValidityErrorPopup} errorMessage={errorMessage} />

            }
            {/* {showUnknownErrorPopup&&
            <ErrorPopup show={showUnknownErrorPopup} handleClose={handleCloseUnknownErrorPopup} errorMessage={errorMessage} />
            
            } */}
        </>
    )
}

export default Page