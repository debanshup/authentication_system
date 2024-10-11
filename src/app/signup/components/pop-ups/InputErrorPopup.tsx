import React from 'react';
import { Button, Modal } from 'react-bootstrap';

const InputErrorPopup = ({ show, handleClose }: any) => {
    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton className="border-0">
            </Modal.Header>
            <Modal.Body className="text-center p-4">
                <h5 className="mb-3 text-danger">Incomplete Form</h5>
                <p className="mb-0">Please fill in all required fields before submitting.</p>
                <Button variant="danger" className="mt-3" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Body>
        </Modal>
    );
};

export default InputErrorPopup;
