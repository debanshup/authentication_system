"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import Example from "./components/off-canvas/ProfileMenuOffCanvas";
import Link from "next/link";

interface ProfileLayoutProps {
  children: React.ReactNode;
  username: String; // Example user object
  isLoggedIn: boolean;
}

export default function ProfileLayout({
  children,
  username,
  isLoggedIn,
}: ProfileLayoutProps) {
  const router = useRouter();
  // async function logoutClickHandler() {
  //   try {
  //     const res = await axios.get('/api/users/logout')
  //     if (res.data.success) {
  //       router.push('/login')
  //     }
  //   } catch (error: any) {
  //     alert(error.message)
  //   }
  // }

  return (
    <section>
      {/* Include shared UI here e.g. a header or sidebar */}
      <header className="p-2 text-end bg-light sticky-top shadow-sm">
        <Example>
          <ul>
            <li>
              <a href={`/profile/${username}`}>Your Profile</a>
            </li>
            <li>
              <Link href={""}>Settings</Link>
            </li>
            <li>
              <Link href={""}>Log out</Link>
            </li>
          </ul>
        </Example>
      </header>
      {children}
    </section>
  );
}
