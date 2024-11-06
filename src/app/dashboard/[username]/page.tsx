"use client"



import React from 'react'
import { useSearchParams } from 'next/navigation'
const Page = () => {
  const searchParam = useSearchParams()

  return (
    <div>
      <div>
        {/* <button className='btn btn-primary'>See all</button> */}
      </div>
      <div></div>
    </div>
  )
}

export default Page