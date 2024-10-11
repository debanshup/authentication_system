import React from 'react';
import { Button, Modal } from 'react-bootstrap';

const SuccessPopup = ({ show, handleClose }: any) => {
    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton className="border-0">
            </Modal.Header>
            <Modal.Body className="text-center p-4">
                <h5 className="mb-3 text-success">Email Verified</h5>
                <p className="mb-0">
                    Email has been successfully verified. You can now proceed to log in.
                </p>
                <Button variant="success" className="mt-3" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Body>
        </Modal>
    );
};

export default SuccessPopup;
