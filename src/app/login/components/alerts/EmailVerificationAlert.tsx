/* eslint-disable react/no-unescaped-entities */
"use client"
import PopUp from '@/app/global/alerts/PopUp'
import axios from 'axios'
import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'

const EmailVerificationAlert = ({ show, close, email }: { show: boolean, close: () => void, email: string }) => {
  const[enteredEmail, setEnteredEmail] = useState("")
  async function verifyBtnClickHandler() {
    try {
      if (!(email === enteredEmail)) {
        toast("Invalid credential", {
          position:"bottom-left",
          className:"bg-danger text-white rounded"
        })
        return 
      }
      const sendEmailRes = await axios.post("/api/users/send-verification-email", { email: enteredEmail })
      if (sendEmailRes.data.success) {
        toast(`A verification email has been sent to ${email}. Please check your inbox`, {
          className: "alert alert-success rounded p-1",
          position: "bottom-left",
          duration: 10000,
        })
      }
    } catch (error: any) {

    }
  }


  // mask email
  const maskedEmail = (email: string) => {
    const [localPart, domain] = email.split("@");
    const exposedPart = localPart.slice(0, 2);
    const maskedPart = "*".repeat(Math.max(0, localPart.length - 2)); // Ensures non-negative repeat count
    return `${exposedPart}${maskedPart}@${domain}`;
  };



  return (
    <>
    <Toaster/>
    <PopUp
      show={show}
      handleClose={close}
      title="Send Verification Email"
      centered={false}
    >
      <form>
        <div className="mb-3 text-start">
          <p className="alert alert-warning form-text">
            Your email ({maskedEmail(email)}) is not verified. Please confirm your email and click "Verify" to send a verification link.
          </p>

          <label htmlFor="new-email" className="form-label small fw-semibold">
            Confirm email:
          </label>
          <input
            type="email"
            value={enteredEmail}
            onChange={(e)=>{
              setEnteredEmail(e.target.value)
            }}
            className="form-control form-control-sm"
            id="new-email"
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="text-end">
          <button onClick={verifyBtnClickHandler} type="button" className="btn btn-success btn-sm">
            Verify
          </button>
        </div>
      </form>
    </PopUp>
    </>

  )
}

export default EmailVerificationAlert