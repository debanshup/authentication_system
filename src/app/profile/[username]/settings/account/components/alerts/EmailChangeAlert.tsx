"use client"
import PopUp from '@/app/global/alerts/PopUp'
import React from 'react'

const EmailChangeAlert = ({ show, close }: { show: boolean, close: () => void }) => {
  async function verifyBtnClickHandler() {
    throw new Error('Function not implemented.')
  }

  return (
<PopUp
  show={show}
  handleClose={close}
  title="Change Email Address"
  centered={false}
>
  <form>
    <div className="mb-3 text-start">
      <label htmlFor="new-email" className="form-label small fw-semibold">
        New Email Address:
      </label>
      <input
        type="email"
        className="form-control form-control-sm"
        id="new-email"
        placeholder="Enter your new email"
        required
      />
    </div>
    <div className="text-end">
      <button onClick={verifyBtnClickHandler} type="submit" className="btn btn-warning btn-sm">
        Send Verification Link
      </button>
    </div>
  </form>
</PopUp>

  )
}

export default EmailChangeAlert