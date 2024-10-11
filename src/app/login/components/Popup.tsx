import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const PopupExample = ({show, handleClose}: any) => {


  return (
    <>

      {/* Popup / Modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Popup Dialog</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Message or input goes here */}
          <p>This is a popup message!</p>
          <input type="text" placeholder="Enter something..." className="form-control" />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PopupExample;
