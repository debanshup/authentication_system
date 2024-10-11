import React from 'react';
import { Button, Modal } from 'react-bootstrap';

const ErrorPopup = ({ show, handleClose, errorMessage }: any) => {
    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton className="border-0">
            </Modal.Header>
            <Modal.Body className="text-center p-4">
                <h5 className="mb-3 text-danger">An Error Occurred</h5>
                <p className="mb-0">
                    {errorMessage || "Something went wrong. Please try again later."}
                </p>
                <Button variant="danger" className="mt-3" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Body>
        </Modal>
    );
};

export default ErrorPopup;
