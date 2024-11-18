"use client"

import React, { useContext } from 'react'
import RootLayout from './components/RootLayout'
import User from '@/models/userModel'
import { ListGroup } from 'react-bootstrap'
import Link from 'next/link'
const Page = ({ children }: any) => {
  return (

    <>
<div className="container-sm bg-white mt-5 p-4 rounded">
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