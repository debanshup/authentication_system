"use client"

import React from 'react';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react'


import axios from 'axios';

export default function Page() {


    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const { name } = useParams()
    async function getDetails() {
        try {
            const res = await axios.get('/api/users/user-details', { params: {name} })
            // alert(res.data.success)
            if (res.data.success) {
                setUsername(res.data.props.user.username)
                setEmail(res.data.props.user.email)

            } else {
                alert(res.data.message)
            }
        } catch (error: any) {
            alert(error.message)
        }
    }

    useEffect(() => {
        getDetails()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className='text-center'>
            <div className='text-start'>
                <span><strong>Name: </strong>{username}</span>
                <br />
                <span><strong>Email: </strong>{email}</span>
            </div>
        </div>
    )
}

