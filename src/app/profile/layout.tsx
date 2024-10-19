"use client"

import axios from "axios"
import { useRouter } from "next/navigation"


export default function ProfileLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {

  const router = useRouter()
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

  return (
    <section>
      {/* Include shared UI here e.g. a header or sidebar */}
      <header className="p-2 text-end bg-light sticky-top shadow-sm">
        <button onClick={logoutClickHandler} className="btn btn-sm btn-warning">Logout</button>
      </header>
      {children}
    </section>
  )
}

