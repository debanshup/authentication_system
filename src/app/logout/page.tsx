/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useState } from "react";
// import useUserDataStore from '@/app/store/userDataStore'
import axios from "axios";
import router from "next/router";
import { useRouter } from "next/navigation";
import Header from "../global/components/Header";

const Page = () => {
  const router = useRouter();
  const [props, setProps] = useState({
    username: "",
    image: "",
    fullname: "",
  });
  async function getUsername() {
    try {
      const userPropsRes = await axios.get("/api/users/get-userprops");
      setProps({
        ...props,
        fullname: userPropsRes.data.fullname,
        image: userPropsRes.data.image,
        username: userPropsRes.data.username,
      });
    } catch (error) { }
  }
  async function logoutClickHandler() {
    try {
      const res = await axios.get("/api/users/logout");
      if (res.data.success) {
        router.push("/login");
      }
    } catch (error: any) {
      alert(error.message);
    }
  }

  useEffect(() => {
    getUsername();
  }, []);

  return (
    <>
      <Header />
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div
          className="card shadow-lg bg-light border-0 p-4"
          style={{ width: "350px", borderRadius: "10px" }}
        >
          <div className="card-body text-center">
            <img
              src={props.image}
              alt="User Avatar"
              className="rounded-circle mb-3"
              width="80"
              height="80"
              style={{ border: "2px solid #ddd", padding: "2px" }}
            />
            <p className="mb-1 fw-bold">
              Signed in as <span className="text-primary">{props.username}</span>
            </p>
            <p className="mb-3 text-muted">{props.fullname}</p>
            <button
              onClick={logoutClickHandler}
              className="btn btn-sm btn-dark rounded-pill w-100"
              style={{ borderRadius: "5px" }}
            >
              Log Out
            </button>
          </div>
        </div>
      </div>

    </>
  );
};

export default Page;
