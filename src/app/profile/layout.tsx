/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useRouter } from "next/navigation";
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

  // const router = useRouter();

  // const [username, setUsername] = useState("")


  // async function getUsername() {
  //   try {
  //     const usernameRes = await axios.get("/api/users/get-username")
  //     alert(usernameRes.data.username)
  //     setUsername(usernameRes.data.username)
  //   } catch (error) {

  //   }
  // }

  // useEffect(() => {

  //   getUsername();

  // }, [router])

  
  // useEffect(() => {
  //   router.push(`/profile/${username}`);
    

  // }, [router])

  

  return (
    <section>
      {children}
    </section>
  );
}

