"use client"

import React, { useContext } from 'react'
import RootLayout from './components/RootLayout'
import User from '@/models/userModel'
import { ListGroup } from 'react-bootstrap'
import Link from 'next/link'
const Page = ({ children }: any) => {
 async function deleteBtnClickHandler() {
    try {
      throw new Error('Function not implemented.')
    } catch (error) {
      
    }
  }

  // const username = useUsername()
  // alert(username)
  return (

    <>
<div className="container-sm bg-white mt-5 p-4 rounded shadow-sm">
  <div className="row">
    {/* Sidebar */}
    <div className="col-md-4 bg-light pe-4 d-flex flex-column">
      <div>
        {/* <h5 className="mb-4 text-primary">Account Settings</h5> */}

        <div className="py-2">
          <a href="#" id="edit" className="text-decoration-none text-dark fw-semibold">
            Profile
          </a>
        </div>
        
        <div className="py-2">
          <Link href="./account" id="verify" className="text-decoration-none text-dark fw-semibold">
            Account
          </Link>
        </div>
      </div>

      {/* Delete Account Section */}
      <div className="mt-auto pt-4">
        <div className="border-top pt-3">
          <h6 className="text-danger mb-2">Danger Zone</h6>
          <p className="text-muted small">
            This action is irreversible. Please proceed with caution.
          </p>
          <button onClick={deleteBtnClickHandler} id="delete" className="btn btn-outline-danger w-100">
            Delete Account
          </button>
        </div>
      </div>
    </div>

    {/* Main content */}
    <div className="col-md-8">
      <div className="p-4 bg-light rounded shadow-sm">
        {children}
      </div>
    </div>
  </div>
</div>

    </>

  )
}

export default Page


// perform email verification within profile