import React from 'react'
import { Modal, Button } from 'react-bootstrap'

const UserNotExistPopup = ({ show, handleClose }: any) => {
    return (
        <Modal show={show} onHide={handleClose} centered>
            {/* Header Section */}
            <Modal.Header closeButton className="border-0"></Modal.Header>

            {/* Body Section */}
            <Modal.Body className="text-center p-4">
                <h5 className="mb-3 text-danger">User Not Found</h5>
                <p className="mb-4">The user you are trying to access does not exist. Please check the details and try again.</p>

                {/* Close Button */}
                <Button variant="primary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Body>
        </Modal>

    )
}

export default UserNotExistPopup