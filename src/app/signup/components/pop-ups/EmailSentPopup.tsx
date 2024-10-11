import React from 'react'
import { Modal, Button } from 'react-bootstrap';

const EmailSentPopup = ({ show, handleClose, email }: any) => {


    return (
        <>
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton className="border-0">
                </Modal.Header>
                <Modal.Body className="text-center p-4">
                    <h5 className="mb-3">Check Your Inbox</h5>
                    <p className="mb-0">A verification email has been sent to:</p>
                    <p className="fw-bold">{email}</p>
                    <Button variant="primary" className="mt-3" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Body>
            </Modal>

        </>
    )
}

export default EmailSentPopup
