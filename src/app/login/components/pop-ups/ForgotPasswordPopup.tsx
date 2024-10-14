"use client"
import axios from 'axios'

import { useRouter } from 'next/navigation'
import { IdentifierParams } from '@/types/enums'
import React, { useState } from 'react'
import { Modal, Form, Row, Col, Button } from 'react-bootstrap'

const ForgotPasswordPopup = ({show, handleClose}: any) => {
    const router = useRouter()
    const [credId, setCredId] = useState('')


    async function nextBtnClickHandler() {

        const res = await axios.post("/api/users/cred", { email: credId })
        const reqId = await axios.post('/api/users/reqid', { email: credId })

        if (res.data.success && reqId.data.success) {
            router.push(`./verify-otp?${IdentifierParams.R_ID}=${reqId.data.id}`)
        } else {
            alert("No user found")
        }
    }

    return (
        <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Email Input</Modal.Title>
        </Modal.Header>
  
        <Modal.Body>
          <Form className="text-center">
            <Form.Group controlId="formEmail">
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={credId}
                onChange={(e) => setCredId(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
  
        <Modal.Footer>
          <Row className="w-100">
            <Col xs={6}>
              <Button variant="outline-primary" href="/login" className="w-100">
                Back
              </Button>
            </Col>
            <Col xs={6} className="text-end">
              <Button
                variant="outline-primary"
                onClick={nextBtnClickHandler}
                className="w-100"
              >
                Next
              </Button>
            </Col>
          </Row>
        </Modal.Footer>
      </Modal>
    )
}

export default ForgotPasswordPopup
