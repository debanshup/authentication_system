import { AnyObject } from 'mongoose'
import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import Link from 'next/link'

const UserExistPopup = ({ show, handleClose, message }: AnyObject) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton className="border-0">
        {/* <Modal.Title className='text-danger'>Account Already Exists</Modal.Title> */}
      </Modal.Header>
      <Modal.Body className="p-4">
        <p className='text-danger'>
          {message}
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
