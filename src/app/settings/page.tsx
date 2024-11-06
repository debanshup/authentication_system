"use client"


import React from 'react'
import { useUser } from '@/context/UserContext'
const Page = () => {
  const { globalUser }: any = useUser()
  // alert(globalUser)
  return (
    <div>{globalUser || "guest"}</div>
  )
}

export default Page