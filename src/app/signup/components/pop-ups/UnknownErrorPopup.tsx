import React from 'react';
import { Button, Modal } from 'react-bootstrap';

const UnknownErrorPopup = ({ show, handleClose }: any) => {
    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton className="border-0">
            </Modal.Header>
            <Modal.Body className="text-center p-4">
                <h5 className="mb-3 text-danger">Unknown Error</h5>
                <p className="mb-0">
                    An unknown error occurred. Please try again later, or contact support if the issue continues.
                </p>
                <Button variant="secondary" className="mt-3" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Body>
        </Modal>
    );
};

export default UnknownErrorPopup;
