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
      {children}
    </section>
  );
}

