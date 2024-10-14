import React from 'react'
import { Modal, Button } from 'react-bootstrap'

const InvalidOtpPopup = ({show, handleClose}:any) => {
  return (
<Modal show={show} onHide={handleClose} centered>
  {/* Header Section */}
  <Modal.Header closeButton className="border-0"></Modal.Header>

  {/* Body Section */}
  <Modal.Body className="text-center p-4">
    <h5 className="mb-3 text-danger fw-bold">Invalid OTP</h5>
    <p className="mb-4 text-muted">
      The OTP you entered is incorrect or has expired. Please try again.
    </p>
    
    <Button variant="secondary" onClick={handleClose}>
      Cancel
    </Button>
  </Modal.Body>
</Modal>

  )
}

export default InvalidOtpPopup