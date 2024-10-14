/* eslint-disable react/no-unescaped-entities */
"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import EmailSentPopup from "./components/pop-ups/EmailSentPopup";
import InputErrorPopup from "./components/pop-ups/InputErrorPopup";
import PasswordMismatchPopUp from "./components/pop-ups/PasswordMismatchPopUp";
import UserExistPopup from "./components/pop-ups/UserExistPopup";
import SignupErrorPopup from "./components/pop-ups/SignupErrorPopup";
import UnknownErrorPopup from "./components/pop-ups/UnknownErrorPopup";

const Signup = () => {
  const router = useRouter();

  const [showEmailSentPopUp, setShowEmailSentPopUp] = useState(false);
  const handleCloseEmailSentPopUp = () => setShowEmailSentPopUp(false);

  const [showInputErrorPopUp, setShowInputErrorPopUp] = useState(false);
  const handleCloseInputErrorPopUp = () => setShowInputErrorPopUp(false);

  const [showPasswordMismatchPopUp, setShowPasswordMismatchPopUp] =
    useState(false);
  const handleClosePasswordMismatchPopUp = () =>
    setShowPasswordMismatchPopUp(false);

  const [showUserExistPopup, setShowUserExistPopup] = useState(false);
  const handleCloseUserExistPopup = () => setShowUserExistPopup(false);

  const [showSignupErrorPopup, setShowSignupErrorPopup] = useState(false);
  const handleCloseSignupErrorPopup = () => setShowSignupErrorPopup(false);

  const [showUnknownErrorPopup, setShowUnknownErrorPopup] = useState(false);
  const handleCloseUnknownErrorPopup = () => setShowUnknownErrorPopup(false);
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    confirmedPassword: "",
  });
  async function nextBtnClickHandler() {
    try {
      if (
        !user.username ||
        !user.email ||
        !user.password ||
        !user.confirmedPassword
      ) {
        setShowInputErrorPopUp(true); // Show error if any field is empty
        return;
      }

      if (user.password !== user.confirmedPassword) {
        setShowPasswordMismatchPopUp(true); // Show error if passwords don't match
        return;
      }

      try {
        const response = await axios.post("/api/users/signup", user);

        if (response.data.registration_status && response.data.user_exist) {
          setShowUserExistPopup(true);
        } else if (!response.data.registration_status) {
          setShowEmailSentPopUp(true); // Show email sent popup if necessary
        }
      } catch (error) {
        setShowSignupErrorPopup(true);
      }
    } catch (error: any) {
      setShowUnknownErrorPopup(true);
    }
  }

  return (
    <div
      className="container-fluid border d-flex flex-column justify-content-center align-items-center vh-100"
      style={{ background: "white" }}
    >
      <form
        style={{ backdropFilter: "blur(50px)" }}
        className="shadow-lg rounded p-4  col-xxl-3 col-xl-4 col-lg-5 col-md-6 col-sm-8"
      >
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Username
          </label>
          <input
            onChange={(e) => {
              setUser({ ...user, username: e.target.value });
            }}
            type="text"
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email
          </label>
          <input
            onChange={(e) => {
              setUser({ ...user, email: e.target.value });
            }}
            type="email"
            className="form-control"
            required
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Password
          </label>
          <input
            onChange={(e) => {
              setUser({ ...user, password: e.target.value });
            }}
            type="password"
            className="form-control"
            minLength={8}
            required
          />

          <div id="emailHelp" className="form-text">
            Password must be at least 8 characters long and include at least one
            uppercase letter, one lowercase letter, one number, and one special
            character.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Confirm password
          </label>
          <input
            onChange={(e) => {
              setUser({ ...user, confirmedPassword: e.target.value });
            }}
            type="password"
            className="form-control"
            minLength={8}
            required
          />
        </div>

        <div className="text-end">
          <button
            onClick={nextBtnClickHandler}
            type="button"
            className="btn btn-primary btn-lg"
          >
            Next
          </button>
        </div>
        <hr />
        <div className="m-3">
          <div className="mb-3 text-center">
            <span>
              Already have an account?{" "}
              <Link
                className="link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
                href={"/login"}
              >
                Log in
              </Link>
            </span>
          </div>
        </div>
      </form>
      {showEmailSentPopUp && (
        <EmailSentPopup
          show={showEmailSentPopUp}
          handleClose={handleCloseEmailSentPopUp}
          email={user.email}
        />
      )}
      {showInputErrorPopUp && (
        <InputErrorPopup
          show={showInputErrorPopUp}
          handleClose={handleCloseInputErrorPopUp}
        />
      )}
      {showPasswordMismatchPopUp && (
        <PasswordMismatchPopUp
          show={showPasswordMismatchPopUp}
          handleClose={handleClosePasswordMismatchPopUp}
        />
      )}
      {showUserExistPopup && (
        <UserExistPopup
          show={showUserExistPopup}
          handleClose={handleCloseUserExistPopup}
          email={user.email}
        />
      )}
      {showSignupErrorPopup && (
        <SignupErrorPopup
          show={showSignupErrorPopup}
          handleClose={handleCloseSignupErrorPopup}
          email={user.email}
        />
      )}
      {showUnknownErrorPopup && (
        <UnknownErrorPopup
          show={showUnknownErrorPopup}
          handleClose={handleCloseUnknownErrorPopup}
          email={user.email}
        />
      )}
    </div>
  );
};

export default Signup;

// apply password format matcher
