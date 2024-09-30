"use client"
import axios from 'axios'
import { NextRequest, NextResponse } from 'next/server'
import React, { useEffect, useState } from 'react'

const Info = () => {

    const[mailid, setMailid] = useState('')

    async function getMailId() {
       try {
        const result = await axios.get('')
        setMailid(result.data.user.email)
        alert(mailid)
       } catch (error: any) {
        return NextResponse.json({
            error: error.message
        })
       }
    }

    useEffect(() => {
      getMailId()
    
      
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    

    return (
        <div>
            <p>
                A confirmation mail has been sent to {mailid}.
            </p>
        </div>
    )
}

export default Info