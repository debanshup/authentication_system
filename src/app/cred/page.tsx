"use client"
import axios from 'axios'
import Link from 'next/link'
import React, { useState } from 'react'

const Cred = () => {
const[credId, setCredId] = useState('')


   async function nextBtnClickHandler() {

    await axios.post("./api/users/cred", credId)
    alert(credId)
}

    return (
        <div className='container'>
            <div>
                <input onChange={(e) => {setCredId(e.target.value)}} type="email" placeholder='email' />
            </div>
            <div className='row'>
                <div className='col-6'>
                    <Link href={'/login'}>Back</Link>
                </div>
                <div className='col-6'>
                    <Link onClick={nextBtnClickHandler} href={'/resetpassword'}>Next</Link>
                </div>
                <div className='col-6'></div>
            </div>
        </div>
    )
}

export default Cred