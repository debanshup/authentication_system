/* eslint-disable react/no-unescaped-entities */
"use client";
// import useUserDataStore from "../store/userDataStore";
import { useRouter } from "next/navigation";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import Spin from "../global/components/Spinner";
import { userAgent } from "next/server";
import EmailVerificationAlert from "./components/alerts/EmailVerificationAlert";

const Page = () => {
  const router = useRouter();
  // const userData = useUserDataStore((state)=> state.userData)
  // const setUserData = useUserDataStore((state: any) => state.setUserData)
  const [showEmailVerificationAlert, setShowEmailVerificationAlert] =
    useState(false);
  const handleCloseEmailVerificationAlert = () =>
    setShowEmailVerificationAlert(false);

  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({ username: "", password: "" });

  const [email, setEmail] = useState("");

  async function loginBtnClickHandler() {
    setIsLoading(true);
    try {
      if (user.password && user.username) {
        const loginRes = await axios.post("./api/users/login", user);
        // alert(loginRes.data.email)
        if (loginRes.data.user_exist) {
          if (!loginRes.data.verification_status) {
            setEmail(loginRes.data.email);

            setShowEmailVerificationAlert(true);
            return;
          }
          router.push(`profile/${loginRes.data.username}`);
        } else if (!loginRes.data.user_exist) {
          toast(
            "User not found. Please check your credentials and try again.",
            {
              className: "bg-danger text-white rounded shadow",
              position: "bottom-left",
            }
          );
        }
      } else {
        // setShowFillPopup(true);
        toast("Please fill in all fields.", {
          className: "bg-danger text-white rounded shadow",
          position: "bottom-left",
        });
      }
    } catch (error: any) {
      // setShowErrorPopup(false);
      toast("An unexpected error occurred. Please try again later.", {
        className: "bg-danger text-white rounded shadow",
        position: "bottom-left",
      });
    } finally {
      setIsLoading(false);
    }
  }

 
  

  return (
    <>
      <Toaster />
      <EmailVerificationAlert
        show={showEmailVerificationAlert}
        close={handleCloseEmailVerificationAlert}
        email={email}
      />
      <>
        <div
          className="container-fluid d-flex flex-column justify-content-center align-items-center vh-100"
          
        >
          <form
           
            className="shadow-lg rounded p-4  col-xxl-3 col-xl-4 col-lg-5 col-md-6 col-sm-8"
          >
            <span className="lead fw-bold">Log in</span>
            <hr />
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email or username
              </label>
              <input
                onChange={(e) => {
                  setUser({ ...user, username: e.target.value.toLowerCase() });
                }}
                value={user.username}
                type="text"
                className="form-control form-control-lg"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                disabled={isLoading}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                onChange={(e) => {
                  setUser({ ...user, password: e.target.value });
                }}
                type="password"
                className="form-control form-control-lg"
                id="exampleInputPassword1"
                disabled={isLoading}
              />
            </div>
            <div className="text-center">
              <button
                onClick={loginBtnClickHandler}
                type="button"
                className="btn btn-lg btn-primary w-100 flex-grow-1 me-2 d-flex align-items-center justify-content-center"
                style={{ height: "50px", minHeight: "50px" }}
              >
                {isLoading ? (
                  <div className="d-flex align-items-center gap-2">
                    <Spin />
                  </div>
                ) : (
                  "Log in"
                )}
              </button>
            </div>
            <hr />
            <div className="m-3">
              <div className="mb-3 text-center">
                <Link
                  className="link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
                  href={"/enter-email"}
                >
                  {" "}
                  Forgot password?
                </Link>
              </div>
              <div className="mb-3 text-center">
                <Link className="btn btn-success btn-lg" href={"/signup"}>
                  {" "}
                  Create new account
                </Link>
              </div>
            </div>
          </form>
        </div>
      </>
    </>
  );
};

export default Page;
