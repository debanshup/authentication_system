"use client"

import React, { useContext, useEffect, useState } from 'react'
import RootLayout from './components/RootLayout'
import User from '@/models/userModel'
import { ListGroup } from 'react-bootstrap'
import Link from 'next/link'
import axios from 'axios'

const Layout = ({ children }: any) => {
const [username, setUsername] = useState("")

async function getUsername() {
  try {
    const usernameRes = await axios.get("/api/users/get-username")
    if (!usernameRes.data.success) {
      throw new Error("Something went wrong!")
    }
    setUsername(usernameRes.data.username)
  } catch (error) {
    
  }
}

useEffect(() => {
  getUsername()

  
}, [])


  return (

    <>
      <div className="container-sm bg-white mt-5 p-4 rounded shadow-sm">
        <div className="row">
          {/* Sidebar */}
          <div className="col-md-4 pe-4 d-flex flex-column">
            <div className="nav flex-column">
              {/* Profile Link */}
              <a
                href={`/profile/${username}`}
                id="edit"
                className="nav-link text-dark fw-semibold py-2 px-3 rounded d-flex align-items-center"
                style={{
                  transition: "all 0.3s ease",
                  borderLeft: "4px solid transparent",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.borderLeft = "4px solid #2575fc")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.borderLeft = "4px solid transparent")
                }
              >
                <i className="bi bi-person me-2 text-primary" style={{ fontSize: "1.2rem" }}></i>
                <span>Profile</span>
              </a>

              {/* Account Link */}
              <Link
                href="./account"
                id="verify"
                className="nav-link text-dark fw-semibold py-2 px-3 rounded d-flex align-items-center mt-2"
                style={{
                  transition: "all 0.3s ease",
                  borderLeft: "4px solid transparent",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.borderLeft = "4px solid #28a745")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.borderLeft = "4px solid transparent")
                }
              >
                <i
                  className="bi bi-shield-check me-2 text-success"
                  style={{ fontSize: "1.2rem" }}
                ></i>
                <span>Account</span>
              </Link>
            </div>
          </div>

          {/* Main Content */}
          <div className="col-md-8">
            <div className="rounded p-3">{children}</div>
          </div>
        </div>
      </div>

    </>

  )
}

export default Layout


// perform email verification within profile