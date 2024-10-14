import { AnyObject } from 'mongoose'
import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import Link from 'next/link'

const UserExistPopup = ({ show, handleClose, email }: AnyObject) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton className="border-0">
        <Modal.Title className='text-danger'>Account Already Exists</Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-4">
        <p>
          An account with the email <strong>{email}</strong> already exists.
          Please <Link href={'./login'}>log in</Link> to continue, or use a different email to sign up.
        </p>
       <div className='text-end'>
       <Button variant="secondary" className="mt-3" onClick={handleClose}>
          Close
        </Button>
       </div>
      </Modal.Body>
    </Modal>

  )
}

export default UserExistPopup