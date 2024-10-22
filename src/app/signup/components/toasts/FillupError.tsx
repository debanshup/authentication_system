import { ToastContainer } from 'react-bootstrap';
import Toast from 'react-bootstrap/Toast';

function FillupError({show, handleClose}:any) {
    return (
        <ToastContainer position="top-end">
        <Toast show={show} onClose={handleClose} delay={3000} autohide>
          <Toast.Header>
          </Toast.Header>
          <Toast.Body>
            This is a simple toast message to notify you!
          </Toast.Body>
        </Toast>
      </ToastContainer>
    );
}

export default FillupError;