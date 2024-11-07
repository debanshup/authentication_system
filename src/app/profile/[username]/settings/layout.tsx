"use client"

import React, { useContext } from 'react'
import RootLayout from './components/RootLayout'
import User from '@/models/userModel'
import { ListGroup } from 'react-bootstrap'
import Link from 'next/link'
const Page = ({ children }: any) => {
  // const username = useUsername()
  // alert(username)
  return (

    <>
      <div className="container-lg mt-5">
        <div className="row">
          {/* Sidebar */}
          <div className="col-md-4 border-end pe-4">
            <ul className="list-group list-group-flush">
              <li className="list-group-item border-0 py-3">
                <a href="" id="edit" className="text-decoration-none">
                  Edit Profile
                </a>
              </li>
              <li className="list-group-item border-0 py-3">
                <Link href="" id="verify" className="text-decoration-none">
                  Verify Email
                </Link>
              </li>
              <li className="list-group-item border-0 py-3">
                <Link href="" id="delete" className="text-decoration-none text-danger">
                  Delete Account
                </Link>
              </li>
              <li className="list-group-item border-0 py-3">A fourth item</li>
              <li className="list-group-item border-0 py-3">And a fifth one</li>
            </ul>
          </div>

          {/* Main content */}
          <div className="col-md-8">
            <div className="p-4 bg-white border-0 rounded ">
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