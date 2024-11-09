import PopUp from '@/app/global/alerts/PopUp'
import React, { useState } from 'react'

const DeleteAccountAlert = ({ show, close }: { show: boolean, close: () => void }) => {


  function deleteBtnClickHandler(): void {
    // throw new Error('Function not implemented.')
    try {
      // setShowDeleteAlert(true);
    } catch (error) { }
  }

  return (
    <PopUp
      show={show}
      handleClose={close}
      title={"Are you sure you want to do this?"}
      centered={false}
    >
      <div className="alert alert-danger small" role="alert">
        Your account and all data related to it will be immediately deleted. This action is irreversible.
      </div>
      <hr />
      <form>
        <div className="mb-3 text-start">
          <label htmlFor="usernameOrEmail" className="text-start form-label small">
            Your Username or Email:
          </label>
          <input
            type="text"
            className="form-control form-control-sm"
            id="usernameOrEmail"
            required

          />
        </div>

        <div className="text-start mb-3">
          <label htmlFor="confirmation" className="form-label small">
            To verify, type <span className="fw-bold">delete</span> below:
          </label>
          <input
            type="text"
            className="form-control form-control-sm"
            id="confirmation"
            required

          />
        </div>

        <div className="mb-3 text-start">
          <label htmlFor="password" className="form-label small">
            Confirm Your Password:
          </label>
          <input
            type="password"
            className="form-control form-control-sm"
            id="password"
            required
          />
        </div>

        <div className="text-end mt-4">
          <button type="submit" className="btn btn-sm btn-danger">
            Delete this account
          </button>
        </div>
      </form>
    </PopUp>

  )
}

export default DeleteAccountAlert