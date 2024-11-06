"use client"

import React from 'react'
// import RootLayout from './components/layouts/RootLayout'
import { useUsername } from '@/app/[username]/page'
const Page = () => {
  const username = useUsername()
  alert(username)
  return (
    <>{username}</>
  )
}

export default Page


// perform email verification within profile
