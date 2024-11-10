import React from 'react';
import { Modal } from 'react-bootstrap';

interface PopUpProps {
    show: boolean;
    handleClose: () => void;
    children: React.ReactNode;
    title: string;
    centered: boolean
}

const PopUp: React.FC<PopUpProps> = ({ show, handleClose, children, title, centered }) => {
    return (
        <Modal show={show} onHide={handleClose} centered={centered}>
            <Modal.Header closeButton className="border-bottom">{title}
            </Modal.Header>
            <Modal.Body className="text-center p-4">
                {children}
            </Modal.Body>
        </Modal>
    );
};

export default PopUp;
