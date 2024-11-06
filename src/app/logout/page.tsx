/* eslint-disable @next/next/no-img-element */
"use client"

import React, { useEffect, useState } from 'react'
// import useUserDataStore from '@/app/store/userDataStore'
import axios from 'axios'
import router from 'next/router'
import { useRouter } from 'next/navigation'

const Page = () => {
  const router = useRouter()
  const [username, setUsername] = useState("")
  async function getUsername() {
    try {
      const usernameRes = await axios.get("/api/users/get-username")
      setUsername(usernameRes.data.username)
    } catch (error) {

    }
  }
  async function logoutClickHandler() {
    try {
      const res = await axios.get('/api/users/logout')
      if (res.data.success) {
        router.push('/login')
      }
    } catch (error: any) {
      alert(error.message)
    }
  }

  useEffect(() => {
    getUsername()


  }, [])


  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-lg bg-light border-0 p-3" style={{ width: "300px" }}>
        <div className="card-body text-center">
          <img
            src="https://via.placeholder.com/50"
            alt="User Avatar"
            className="rounded-circle mb-3"
            width="50"
            height="50"
          />
          <p className="mb-2 fw-bold">
            Signed in as <span className="text-primary">{username}</span>
          </p>
          <button
            onClick={logoutClickHandler}
            className="btn btn-sm btn-secondary"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>

  )
}

export default Page