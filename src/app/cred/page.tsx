"use client"
import axios from 'axios'
import Link from 'next/link'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { IdentifierParams } from '@/types/enums'
const Cred = () => {
    const router = useRouter()
    const [credId, setCredId] = useState('')


    async function nextBtnClickHandler() {

        const res = await axios.post("./api/users/cred", { email: credId })

        const reqId = await axios.get('./api/users/reqid', { params: { credId } })

        // will be implemented later











        // alert(res.data.success)
        // alert(credId)
        if (res.data.success && reqId.data.success) {
            router.push(`./verifyaccount?${IdentifierParams.R_ID}=${reqId.data.id}`)
        } else {
            alert("No user found")
        }
    }

    return (
        <div className='container '>
            <div className='text-center'>
                <input onChange={(e) => { setCredId(e.target.value) }} type="email" placeholder='email' />
            </div>
            <div className='row'>
                <div className='col-6 '>
                    <Link className='btn btn-outline-primary' href={'/login'}>Back</Link>
                </div>
                <div className='col-6 text-end '>
                    <button className='btn btn-outline-primary' onClick={nextBtnClickHandler}>Next</button>
                </div>

            </div>
        </div>
    )
}

export default Cred