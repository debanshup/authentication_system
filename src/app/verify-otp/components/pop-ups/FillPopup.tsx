import Link from 'next/link'
import React from 'react'
import { Modal, Button } from 'react-bootstrap'

const FillPopup = ({ show, handleClose }: any) => {
    return (
        <Modal show={show} onHide={handleClose} centered>
            {/* Header Section */}
            <Modal.Header closeButton className="border-0">
            </Modal.Header>

            {/* Body Section */}
            <Modal.Body className="p-4">
                <h5 className="text-danger fw-bold">Incomplete Details</h5>
                <p className="mb-4 text-muted">
                    Please ensure all fields are correctly filled before proceeding.
                </p>

                {/* Close Button aligned to the right */}
                <div className="text-end">
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </div>
            </Modal.Body>
        </Modal>


    )
}

export default FillPopup