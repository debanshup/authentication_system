/* eslint-disable react/no-unescaped-entities */
"use client"
import PopupExample from './components/Popup'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'

const Page = () => {
    const router = useRouter()
    const [user, setUser] = useState({ username: '', password: '' })
    const [errorMessage, setErrorMessage] = useState('')



    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    async function loginBtnClickHandler() {
        try {
            if (user.password && user.username) {
                const response = await axios.post('./api/users/login', user)

                if (response.data.success) {
                    router.push(`/profile/dashboard/${response.data.username}`)
                }
                else {
                    // setShow(true)
                }

            } else {
                setShow(true)
                // alert('enter valid credentials')
            }

        } catch (error: any) {
            setErrorMessage(error.message)
            alert(error.message)
        }
    }

    // useEffect(() => {

    //     if (show) {
    //     }

    // }, [])


    return (
        <div className='container-fluid border d-flex flex-column justify-content-center align-items-center vh-100' style={{ background: 'white' }}>
            <form style={{ backdropFilter: 'blur(50px)' }} className='shadow-lg rounded p-4  col-xxl-3 col-xl-4 col-lg-5 col-md-6 col-sm-8'>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email or username</label>
                    <input onChange={(e) => { setUser({ ...user, username: e.target.value }) }} type="text" className="form-control form-control-lg" id="exampleInputEmail1" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input onChange={(e) => { setUser({ ...user, password: e.target.value }) }} type="password" className="form-control form-control-lg" id="exampleInputPassword1" />
                    {/* <div id="emailHelp" className="form-text">Must be 8 characters long.</div> */}

                </div>
                <div className='text-center'>
                    <button onClick={loginBtnClickHandler} type="button" className="btn btn-primary btn-lg">Log in</button>
                </div>
                <hr />
                <div className='m-3'>
                    <div className='mb-3 text-center'>
                        <Link className='link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover' href={"/cred"}> Forgot password?</Link>

                    </div>
                    <div className='mb-3 text-center'>
                        <Link className='btn btn-success btn-lg' href={"/signup"}> Create new account</Link>

                    </div>
                </div>
            </form>
            {/* <PopupExample show={show} handleShow={handleShow} handleClose={handleClose} /> */}
        
        {show && 
            <PopupExample show={show} handleClose={handleClose} />
        
        }
        </div>


    )
}

export default Page