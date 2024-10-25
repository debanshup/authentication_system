/* eslint-disable @next/next/no-img-element */
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';

function ProfileMenu({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode
}) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="" className='rounded-circle' onClick={handleShow}>
                <img className='rounded-circle' height={50} width={50} src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.NlkBaSGZTSPNcE3HZcMHXAHaEq%26pid%3DApi&f=1&ipt=a011113763149db21a835f26ab9c83ff9237e02056b406be1de75541ad8d2c0d&ipo=images" alt="nature"  />
            </Button>

            <Offcanvas show={show} onHide={handleClose} placement='end'>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Name, username and image</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    {children}
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

export default ProfileMenu;