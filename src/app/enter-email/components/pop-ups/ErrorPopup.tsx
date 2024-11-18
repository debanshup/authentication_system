import React from 'react'
import { Modal, Button } from 'react-bootstrap'

const ErrorPopup = ({ show, handleClose }: any) => {
    return (
<Modal show={show} onHide={handleClose} centered>
  {/* Header Section */}
  <Modal.Header closeButton className="border-0"></Modal.Header>

  {/* Body Section */}
  <Modal.Body className="text-center p-4">
    <h5 className="mb-3 text-danger fw-bold">Error</h5>
    <p className="mb-4 text-muted">An unexpected error occurred. Please try again later.</p>

    {/* Close Button */}
    <Button variant="danger" onClick={handleClose}>
      Close
    </Button>
  </Modal.Body>
</Modal>

    )
}

export default ErrorPopup