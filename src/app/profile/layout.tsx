"use client";

import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import ProfileMenu from "./components/off-canvas/ProfileMenuOffCanvas";
import axios from "axios";

// interface ProfileLayoutProps {
//   children: React.ReactNode;
// }


export default function ProfileLayout({
  children,
}: {children: React.ReactNode}) {

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
    <section>
      {/* Include shared UI here e.g. a header or sidebar */}
      <header className="p-2 text-end bg-light sticky-top shadow-sm">
        <ProfileMenu username={userProps.username} fullname={userProps.fullname} image={userProps.image}>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <a
                className="text-decoration-none"
                href={`/profile/${userProps.username}`}
              >
                <i className="bi bi-person-circle me-2"></i> Your Profile
              </a>
            </li>
            <li className="list-group-item">
              <a
                className="text-decoration-none"
                href={`/profile/${userProps.username}/settings/edit`}
              >
                <i className="bi bi-gear-fill me-2"></i> Settings
              </a>
            </li>
            <li className="list-group-item">
              <Link
                className="text-decoration-none text-danger"
                href="/logout"
              >
                <i className="bi bi-box-arrow-right me-2"></i> Log out
              </Link>
            </li>
          </ul>
        </ProfileMenu>
      </header>
      {children}
    </section>
  );
}

