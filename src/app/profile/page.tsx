"use client"

import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import DynamicSpinner from '../global/components/DynamicSpinner';

const Page = () => {
  const router = useRouter();

  const [username, setUsername] = useState("")


  async function getUsername() {
    try {
      const usernameRes = await axios.get("/api/users/get-username")
      router.push(`/profile/${usernameRes.data.username}`);

    } catch (error) {

    }
  }

  useEffect(() => {

    getUsername();

  }, [])



  return (
    <div>
      <DynamicSpinner />
    </div>

  )
}

export default Page