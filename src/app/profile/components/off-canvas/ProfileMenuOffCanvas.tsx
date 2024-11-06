/* eslint-disable @next/next/no-img-element */
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';

interface ProfileMenuProps {
    children: React.ReactNode;
    username: any; // Example user object
    fullname: any;
    image: any
}




function ProfileMenu({
    children, username, fullname, image
}: ProfileMenuProps) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="light" className="rounded-circle" onClick={handleShow}>
                <img src={image} alt={username} className="rounded-circle" width="40" height="40" />
            </Button>

            <Offcanvas show={show} onHide={handleClose} placement="end" >
                <Offcanvas.Header >
                    <div>
                        <button
                            type="button"
                            className="btn-close position-absolute top-0 end-0 m-2"
                            aria-label="Close"
                            onClick={handleClose}
                        ></button>
                        
                    </div>

                    <div className="d-flex align-items-center">
                        <img src={image} alt={username} className="rounded-circle me-3" width="50" height="50" />
                        <div>
                            <h5 className="mb-0">{fullname}</h5>
                            <small className="text-muted">{username}</small>
                        </div>
                    </div>
                </Offcanvas.Header>
                <Offcanvas.Body>

                    {children}
                </Offcanvas.Body>
            </Offcanvas>
        </>

    );
}

export default ProfileMenu;