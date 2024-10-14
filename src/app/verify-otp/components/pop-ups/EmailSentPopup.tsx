import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const EmailSentPopup = ({ show, handleClose, email }: any) => {


  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton className="border-0">
        <Modal.Title className='text-danger'>Email Not Verified</Modal.Title>

        </Modal.Header>
        <Modal.Body className="text-center p-4">
          <p className="mb-0">A verification email has been sent to:</p>
          <p className="fw-bold">{email}</p>
          <Button variant="primary" className="mt-3" onClick={handleClose}>
            Close
          </Button>
        </Modal.Body>
      </Modal>

    </>
  );
};

export default EmailSentPopup;
