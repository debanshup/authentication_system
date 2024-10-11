import React from 'react'
import { Button, Modal } from 'react-bootstrap'

const SignupErrorPopup = ({ show, handleClose }: any) => {
    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton className="border-0">
            </Modal.Header>
            <Modal.Body className="text-center p-4">
                <h5 className="mb-3 text-danger">Signup Error</h5>
                <p className="mb-0">
                    An unexpected error occurred. Please try again later, or contact support if the issue persists.
                </p>
                <Button variant="secondary" className="mt-3" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Body>
        </Modal>

    )
}

export default SignupErrorPopup