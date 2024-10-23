/* eslint-disable react/no-unescaped-entities */
"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import useInputFocus from "./hooks/useInputFocus";
const Signup = () => {

  // const [loadingNext, setLoadingNext] = useState(false)
  const usernameInput = useInputFocus();
  const emailInput = useInputFocus();
  const passwordInput = useInputFocus();
  const confirmPasswordInput = useInputFocus();

  const [conditions, setConditions] = useState({
    hasUppercase: false,
    hasLowercase: false,
    hasNumber: false,
    hasSpecialChar: false,
    minLength: false,
  });

  const [isPasswordMatched, setIsPasswordMatched] = useState(false);
  const [isPasswordNotMatched, setIsPasswordNotMatched] = useState(false);

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  async function nextBtnClickHandler() {
    try {
      if (
        !user.username ||
        !user.email ||
        !user.password ||
        !user.confirmPassword
      ) {
        // setShowInputErrorPopUp(true);
        toast.error("Please fill in all fields.");
        return;
      }
      try {
        if (allValid) {
          const signupRes = await axios.post("/api/users/signup", user);
          if (signupRes.status) {
            if (signupRes.data.email_exist) {
              toast(
                `An account with the email ${user.email} already exists.\n Please log in to continue, or use a different email to sign up.`,
                {
                  duration: 6000,
                  className: "bg-danger text-white p-3 rounded", // Bootstrap classes
                  icon: "⚠️", // Optional: Add an icon to enhance the look
                }
              );
            } else if (signupRes.data.username_exist) {
              toast.error(`Username not available`, {});
            }
          } else if (!signupRes.data.registration_status) {
            toast(`A verification email has been sent to: ${user.email}`, {
              icon: "✅",
            });
          }
        } else {
          toast(
            "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&)."
          );
        }
      } catch (error) {
        toast.error(
          "An unexpected error occurred. Please try again later, or contact support if the issue persists."
        );
        // setShowSignupErrorPopup(true);
      }
    } catch (error: any) {
      toast.error(
        "An unexpected error occurred. Please try again later, or contact support if the issue persists."
      );

      // setShowUnknownErrorPopup(true);
    }
  }

  useEffect(() => {
    // alert((confirmPassword === password) && confirmPassword.length>0)
    setIsPasswordMatched(
      user.confirmPassword === user.password && user.confirmPassword.length > 0
    );
    setIsPasswordNotMatched(!(user.confirmPassword === user.password));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.confirmPassword, user.password]);

  useEffect(() => {
    setConditions({
      hasUppercase: /[A-Z]/.test(user.password),
      hasLowercase: /[a-z]/.test(user.password),
      hasNumber: /\d/.test(user.password),
      hasSpecialChar: /[@$!%*?&]/.test(user.password),
      minLength: user.password.length >= 8,
    });
  }, [user.password]);

  const usernameValid = /^[^\s]{3,}$/.test(user.username.trim());
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email.trim());

  const passwordValid = Object.values(conditions).every(Boolean);
  const passwordConfirmed =
    user.confirmPassword.length > 0 && user.password === user.confirmPassword;
  const allValid =
    usernameValid && emailValid && passwordValid && passwordConfirmed;

  return (
    <>
      <Toaster />
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
              onFocus={usernameInput.handleFocus}
              onChange={(e) => {
                setUser({ ...user, username: e.target.value });
              }}
              type="text"
              className={`form-control form-control-lg ${
                usernameInput.isFocused
                  ? usernameValid
                    ? "is-valid"
                    : "is-invalid"
                  : ""
              }`}
              required
            />
            {!usernameValid && usernameInput.isFocused && (
              <p className="form-text text-danger">
                Username must be at least 3 characters long.
              </p>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email
            </label>
            <input
              onFocus={emailInput.handleFocus}
              onChange={(e) => {
                setUser({ ...user, email: e.target.value });
              }}
              type="email"
              className={`form-control form-control-lg ${
                emailInput.isFocused
                  ? emailValid
                    ? "is-valid"
                    : "is-invalid"
                  : ""
              }`}
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
              onFocus={passwordInput.handleFocus}
              onChange={(e) => {
                setUser({ ...user, password: e.target.value });
              }}
              type="password"
              className={`form-control form-control-lg ${
                passwordInput.isFocused
                  ? passwordValid
                    ? "is-valid"
                    : "is-invalid"
                  : ""
              }`}
              minLength={8}
              required
            />

            <div id="emailHelp" className="form-text">
              <p>
                Password must be at least{" "}
                <span
                  className={
                    passwordInput.isFocused
                      ? conditions.minLength
                        ? "text-success"
                        : "text-danger"
                      : ""
                  }
                >
                  8 characters{" "}
                </span>
                long and include at least one{" "}
                <span
                  className={
                    passwordInput.isFocused
                      ? conditions.hasUppercase
                        ? "text-success"
                        : "text-danger"
                      : ""
                  }
                >
                  uppercase letter
                </span>
                , one{" "}
                <span
                  className={
                    passwordInput.isFocused
                      ? conditions.hasLowercase
                        ? "text-success"
                        : "text-danger"
                      : ""
                  }
                >
                  lowercase letter
                </span>
                , one{" "}
                <span
                  className={
                    passwordInput.isFocused
                      ? conditions.hasNumber
                        ? "text-success"
                        : "text-danger"
                      : ""
                  }
                >
                  number
                </span>
                , and one{" "}
                <span
                  className={
                    passwordInput.isFocused
                      ? conditions.hasSpecialChar
                        ? "text-success"
                        : "text-danger"
                      : ""
                  }
                >
                  special character (@$!%*?&)
                </span>
                .
              </p>
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Confirm password
            </label>
            <input
              onFocus={confirmPasswordInput.handleFocus}
              onChange={(e) => {
                setUser({ ...user, confirmPassword: e.target.value });
              }}
              type="password"
              className={`form-control form-control-lg ${
                confirmPasswordInput.isFocused
                  ? passwordConfirmed
                    ? "is-valid"
                    : "is-invalid"
                  : ""
              }`}
              minLength={8}
              required
            />
            {isPasswordNotMatched && confirmPasswordInput.isFocused && (
              <p className="form-text text-danger">Passwords do not match.</p>
            )}
            {isPasswordMatched && (
              <p className="form-text text-success">Passwords match.</p>
            )}
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
      </div>
    </>
  );
};

export default Signup;
