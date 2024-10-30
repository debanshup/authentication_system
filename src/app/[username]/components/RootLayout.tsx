//  this is the root layout of the page
// change file structure

// /assets/components/...

"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useState, useContext, createContext } from "react";
import ProfileMenu from "./off-canvas/ProfileMenuOffCanvas";

interface ProfileLayoutProps {
  children: React.ReactNode;
  username: any; // Example user object
  fullname: any;
  imagesrc: any;
}

const UserContext = createContext("")

export default function ProfileLayout({
  children,
  username,
  fullname,
  imagesrc,
}: ProfileLayoutProps) {
  const router = useRouter();
  async function logoutClickHandler() {
    try {
      const res = await axios.get('/api/users/logout')
      if (res.data.success) {
        router.push('/login')
      }
    } catch (error: any) {
      alert(error.message)
    }
  }

  useEffect(() => {
    return () => { };
  }, []);

  return (
    <UserContext.Provider value={"username"}>
      <section>
        <header className="p-2 text-end bg-light sticky-top shadow-sm">
          <ProfileMenu
            username={username}
            fullname={fullname}
            imagesrc={imagesrc}
          >
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <a className="text-decoration-none" href={`/${username}`}>
                  <i className="bi bi-person-circle me-2"></i> Your Profile
                </a>
              </li>
              <li className="list-group-item">
                <Link className="text-decoration-none" href="/settings">
                  <i className="bi bi-gear-fill me-2"></i> Settings
                </Link>
              </li>
              <li className="list-group-item">
                <Link onClick={logoutClickHandler} className="text-decoration-none text-danger" href="/login">
                  <i className="bi bi-box-arrow-right me-2"></i> Log out
                </Link>
              </li>
            </ul>

          </ProfileMenu>

        </header>
        {children}
      </section>
    </UserContext.Provider>
  );
}

export const useUsername = () => useContext(UserContext)