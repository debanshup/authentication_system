"use client"
import axios from "axios";
import React, { useState } from "react";




interface DashboardLayoutProps {
    children: React.ReactNode;
    adminName: String;
}
const Layout = ({
    children, adminName
}: DashboardLayoutProps) => {

    const [user, setUser] = useState("")


    async function clickHandler() {
        try {
            const response = await axios.get("/api/admin/get-users")
            setUser(response.data.users[12].username.toString())
        } catch (error) {

        }
    }

    return (<div>
        <h4>Welcome {adminName}</h4>
        <button onClick={clickHandler} className='btn btn-primary'>See all</button>
        <div>
            {children}
        </div>
        <div>
            {user}
        </div>
    </div>)
};

export default Layout;
