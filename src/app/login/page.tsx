/* eslint-disable react/no-unescaped-entities */
"use client";
import { useRouter } from "next/navigation";
import axios from "axios";
import React, { useState } from "react";
import Link from "next/link";
import EmailSentPopup from "./components/pop-ups/EmailSentPopup";
import UserNotExistPopup from "./components/pop-ups/UserNotExistPopup";
import ErrorPopup from "./components/pop-ups/ErrorPopup";
import FillPopup from "./components/pop-ups/FillPopup";


const Page = () => {
  const router = useRouter();
  const [user, setUser] = useState({ username: "", password: "" });

  const [showEmailSentPopup, setshowEmailSentPopup] = useState(false);
  const handleCloseEmailSentPopup = () => setshowEmailSentPopup(false);

  const [showUserNotExistPopup, setShowUserNotExistPopup] = useState(false);
  const handleCloseUserNotExistPopup = () => setShowUserNotExistPopup(false);

  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const handleCloseShowErrorPopup = () => setShowErrorPopup(false);

  const [showFillPopup, setShowFillPopup] = useState(false);
  const handleCloseShowFillPopup = () => setShowFillPopup(false);

const[showForgotPasswordPopup, setShowForgotPasswordPopup] = useState(false)
// const handleCloseshowForgotPasswordPopup = () => setShowForgotPasswordPopup(false)
  const [email, setEmail] = useState("");

  async function loginBtnClickHandler() {
    try {
      if (user.password && user.username) {
        const response = await axios.post("./api/users/login", user);

        if (response.data.user_exist && response.data.verification_status) {
          router.push(`/profile/${response.data.username}`);
        } else if (
          !response.data.verification_status &&
          response.data.user_exist
        ) {
          setEmail(response.data.email);
          setshowEmailSentPopup(true);
        } else if (!response.data.user_exist) {
          setShowUserNotExistPopup(true);
        }
      } else {
        setShowFillPopup(true);
      }
    } catch (error: any) {
      setShowErrorPopup(false);
    }
  }




  return (
    <div
      className="container-fluid d-flex flex-column justify-content-center align-items-center vh-100"
      style={{ background: "white" }}
    >
      <form
        style={{ backdropFilter: "blur(50px)" }}
        className="shadow-lg rounded p-4  col-xxl-3 col-xl-4 col-lg-5 col-md-6 col-sm-8"
      >
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email or username
          </label>
          <input
            onChange={(e) => {
              setUser({ ...user, username: e.target.value });
            }}
            type="text"
            className="form-control form-control-lg"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
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
          />
        </div>
        <div className="text-center">
          <button
            onClick={loginBtnClickHandler}
            type="button"
            className="btn btn-primary btn-lg"
          >
            Log in
          </button>
        </div>
        <hr />
        <div className="m-3">
          <div className="mb-3 text-center">
            <Link
              className="link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
              href={"/cred"}
              
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

      {showEmailSentPopup && (
        <EmailSentPopup
          show={showEmailSentPopup}
          handleClose={handleCloseEmailSentPopup}
          email={email}
        />
      )}

      {showUserNotExistPopup && (
        <UserNotExistPopup
          show={showUserNotExistPopup}
          handleClose={handleCloseUserNotExistPopup}
        />
      )}
      {showErrorPopup && (
        <ErrorPopup
          show={showErrorPopup}
          handleClose={handleCloseShowErrorPopup}
        />
      )}
      {showFillPopup && (
        <FillPopup
          show={showFillPopup}
          handleClose={handleCloseShowFillPopup}
        />
      )}
    </div>
  );
};

export default Page;
