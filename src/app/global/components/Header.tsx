"use client"

import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import ProfileMenu from './ProfileMenu'
import axios from 'axios'

const Header = () => {
    const [userProps, setUserProps] = useState({ username: "", fullname: "", image: "" })


    async function getUserProps() {
        try {
            const propRes = await axios.get("/api/users/get-userprops")
            setUserProps({
                username: propRes.data.username,
                fullname: propRes.data.fullname,
                image: propRes.data.image,
            })
        } catch (error) {

        }
    }
    useEffect(() => {
        getUserProps()
    }, [])

    return (
        <header
            className="p-3 bg-light sticky-top shadow-sm d-flex justify-content-between align-items-center"
            style={{
                borderBottom: "2px solid #ddd",
                zIndex: 1030,
            }}
        >
            {/* Logo or Site Name */}
            <div className="d-flex align-items-center">
                <a
                    href="/"
                    className="text-decoration-none text-dark fw-bold fs-4 me-3"
                    style={{ fontFamily: "Arial, sans-serif" }}
                >
                    MyWebsite
                </a>
            </div>

            {/* Profile Menu */}
            <div>
                <ProfileMenu username={userProps.username} fullname={userProps.fullname} image={userProps.image}>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item d-flex align-items-center">
                            <i className="bi bi-person-circle me-2 text-primary fs-5"></i>
                            <a
                                className="text-decoration-none text-dark fw-semibold"
                                href={`/profile/${userProps.username}`}
                            >
                                Your Profile
                            </a>
                        </li>
                        <li className="list-group-item d-flex align-items-center">
                            <i className="bi bi-gear-fill me-2 text-secondary fs-5"></i>
                            <a
                                className="text-decoration-none text-dark fw-semibold"
                                href={`/settings/edit`}
                            >
                                Settings
                            </a>
                        </li>
                        {/* <li className="list-group-item d-flex align-items-center">
                            <i className="bi bi-bell me-2 text-warning fs-5"></i>
                            <a
                                className="text-decoration-none text-dark fw-semibold"
                                href="/notifications"
                            >
                                Notifications
                            </a>
                        </li> */}
                        <li className="list-group-item d-flex align-items-center">
                            <i className="bi bi-box-arrow-right me-2 text-danger fs-5"></i>
                            <Link
                                className="text-decoration-none text-danger fw-semibold"
                                href="/logout"
                            >
                                Log out
                            </Link>
                        </li>
                    </ul>
                </ProfileMenu>
            </div>
        </header>

    )
}

export default Header