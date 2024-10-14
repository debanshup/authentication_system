"use client"

// `app/dashboard/page.tsx` is the UI for the `/dashboard` URL



export default function DashboardLayout({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode
}) {
    return (
        <div>
            {children}
        </div>
    )
}