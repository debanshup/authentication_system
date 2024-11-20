"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import ProfileMenu from "./ProfileMenu";

const Header = () => {
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState(false);
  const [userProps, setUserProps] = useState({
    username: "",
    fullname: "",
    image: "",
  });
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  async function getUserProps() {
    try {
      const propRes = await axios.get("/api/users/get-userprops");
      if (propRes.data.success) {
        setUserProps({
          username: propRes.data.username,
          fullname: propRes.data.fullname,
          image: propRes.data.image,
        });
        setLoggedIn(true);
      }
    } catch (error) {
      setLoggedIn(false);
    } finally {
      setIsLoading(false); // Mark loading as complete
    }
  }

  useEffect(() => {
    getUserProps();
  }, []);

  if (isLoading) {
    return (
      <header
        className="p-3 bg-light sticky-top shadow-sm d-flex justify-content-between align-items-center"
        style={{
          borderBottom: "2px solid #ddd",
          zIndex: 1030,
        }}
      >
        <div className="d-flex align-items-center">
          <i className="bi bi-emoji-smile me-2 fs-4 text-primary"></i>
          <span className="fw-bold text-primary">Loading...</span>
        </div>
      </header>
    );
  }

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
                    <div className="">
                        <a href="/login" className="fw-bold link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover">
                            Log In
                        </a>
                        <span className="text-muted"> / </span>
                        <a href="/signup" className="fw-bold link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover">
                            Sign Up
                        </a>
                    </div>

                </>)}
            </div>
        </header>
    );
};

export default Header;
