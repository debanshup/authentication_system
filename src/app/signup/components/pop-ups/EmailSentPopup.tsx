import React from 'react'
import { Modal } from 'react-bootstrap';

const PopUp = ({ show, handleClose }: any) => {


    return (
        <>
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton className="border-0">
                </Modal.Header>
                <Modal.Body className="text-center p-4">
                    
                </Modal.Body>
            </Modal>

        </>
    )
}

export default PopUp
