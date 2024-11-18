"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import ProfileMenu from "./ProfileMenu";
import axios from "axios";
import { useRouter } from "next/navigation";
import { profile } from "console";

const Header = () => {
    const router = useRouter()
    const [loggedIn, setLoggedIn] = useState(false)
    const [userProps, setUserProps] = useState({
        username: "",
        fullname: "",
        image: "",
    });



    


    async function getUserProps() {
        try {
            const propRes = await axios.get("/api/users/get-userprops");
            if (propRes.data.success) {
                setUserProps({
                    username: propRes.data.username,
                    fullname: propRes.data.fullname,
                    image: propRes.data.image,
                });
                setLoggedIn(true)
            } else {
                setLoggedIn(false)

            }
        } catch (error) {
            setLoggedIn(false)

        }

    }
    useEffect(() => {
        getUserProps()
    }, []);

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
                <i className="bi bi-emoji-smile me-2 fs-4 text-primary"></i>
                <span className="fw-bold text-primary">
                    Welcome, {loggedIn ? userProps.fullname : "guest"}!
                </span>
            </div>

            {/* Profile Menu */}
            <div>
                {loggedIn ? (<>
                    <ProfileMenu
                        username={userProps.username}
                        fullname={userProps.fullname}
                        image={userProps.image}
                    >
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
                            <li className="list-group-item d-flex align-items-center">
                                <i className="bi bi-box-arrow-right me-2 text-danger fs-5"></i>
                                <a
                                    className="text-decoration-none text-danger fw-semibold"
                                    href="/logout"
                                >
                                    Log out
                                </a>
                            </li>
                        </ul>
                    </ProfileMenu>
                </>) : (<>
                    <button>Hi</button>
                </>)}
            </div>
        </header>
    );
};

export default Header;
