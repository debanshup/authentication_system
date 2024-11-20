/* eslint-disable react/no-unescaped-entities */
"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import useInputFocus from "@/app/global/hooks/useInputFocus";
import Spin from "./components/spinner/Spinner";
import User from "@/models/userModel";

const Page = () => {
  const usernameInput = useInputFocus();
  const fullnameInput = useInputFocus();
  const emailInput = useInputFocus();
  const passwordInput = useInputFocus();
  const confirmPasswordInput = useInputFocus();

  const [usernameAvailable, setUsernameAvailable] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

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
    fullname: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  async function createAccountBtnClickHandler() {
    try {
      setIsLoading(true);
      if (
        !user.username ||
        !user.email ||
        !user.password ||
        !user.confirmPassword
      ) {
        toast("Please fill in all fields.",{
          position:"bottom-left",
          className:"bg-danger text-white rounded p-1"
        });
        return;
      }
      if (allValid) {
        const signupRes = await axios.post("/api/users/signup", user);
        if (signupRes.status) {
          if (signupRes.data.email_exist) {
            toast(
              `An account with the email ${user.email} already exists.\n Please log in to continue, or use a different email to sign up.`,
              {
                duration: 6000,
                className: "bg-danger text-white p-3 rounded",
                position:"bottom-left"
              }
            );
          } else if (signupRes.data.username_exist) {
            toast.error(
              `Username not available. Please select another username`,
              {
                position:"bottom-left",
                className:"bg-danger text-white rounded p-1"
              }
            );
          } else if (!signupRes.data.registration_status) {
            toast(`A verification email has been sent to ${user.email}. Please check your inbox.`, {
              duration: 10000,
              className:"text-white bg-success",
              position:"bottom-left",

            });
          }
        }
      } else if (!passwordValid) {
        toast(
          "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&).",
          {
            className: "bg-danger text-white rounded",
            position:"bottom-left",

          }
        );
      } else if (!passwordConfirmed) {
        toast("Passwords do not match.", {
          className: "bg-danger text-white rounded",
          position:"bottom-left",

        });
      } else {
        toast("Something went wrong", {
          className: "bg-danger text-white rounded",
          position:"bottom-left",

        });
      }
    } catch (error: any) {
      toast.error(
        "An unexpected error occurred. Please try again later, or contact support if the issue persists.",
        {
          position:"bottom-left",

        }
      );
    } finally {
      setIsLoading(false);
    }
  }

  async function isUsernameAvailable() {
    try {
      if (usernameValid) {
        const usernameAvailableRes = await axios.get(
          "/api/users/username-available",
          {
            params: { username: user.username },
          }
        );

        setUsernameAvailable(usernameAvailableRes.data.username_available);
      }
    } catch (error) {}
  }

  useEffect(() => {
    isUsernameAvailable();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.username]);

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

  const usernameValid = /^[a-z\d]{3,}$/.test(user.username);
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email);
  const fullnameValid = /^[a-zA-Z\s]{1,}$/.test(user.fullname);

  const passwordValid = Object.values(conditions).every(Boolean);
  const passwordConfirmed =
    user.confirmPassword.length > 0 && user.password === user.confirmPassword;
  const allValid =
    usernameValid &&
    emailValid &&
    passwordValid &&
    passwordConfirmed &&
    fullnameValid;

  return (
    <>
      <Toaster />
      <div
        className="container-fluid d-flex flex-column justify-content-center align-items-center vh-100"
        style={{ background: "white" }}
      >
        <form
          style={{ backdropFilter: "blur(50px)" }}
          className="shadow-lg rounded p-4  col-xxl-3 col-xl-4 col-lg-5 col-md-6 col-sm-8"
        >
           <span className="lead fw-bold">Sign up</span>
           <hr />
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Full name*
            </label>
            <input
              onFocus={fullnameInput.handleFocus}
              onChange={(e) => {
                setUser({ ...user, fullname: e.target.value });
              }}
              type="text"
              className={`form-control form-control ${
                fullnameInput.isFocused
                  ? fullnameValid
                    ? "is-valid"
                    : "is-invalid"
                  : ""
              }`}
              disabled={isLoading}
              value={user.fullname}
              required
            />
            <div id="" className="form-text">
              Full name will be publicly displayed.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Username*
            </label>
            <input
              onFocus={usernameInput.handleFocus}
              onChange={(e) => {
                setUser({ ...user, username: e.target.value.toLowerCase() });
              }}
              value={user.username}
              type="text"
              className={`form-control form-control ${
                usernameInput.isFocused
                  ? usernameValid && usernameAvailable
                    ? "is-valid"
                    : "is-invalid"
                  : ""
              }`}
              disabled={isLoading}
              required
            />
            {!usernameValid && usernameInput.isFocused && (
              <p className="form-text text-danger">
                Username must contain at least 3 characters long and must not contain
                spaces and any special character.
              </p>
            )}
            {usernameValid ? (
              usernameAvailable ? (
                <p className="form-text text-success">Username available</p>
              ) : (
                <p className="form-text text-danger">Username not available!</p>
              )
            ) : (
              ""
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email*
            </label>
            <input
              onFocus={emailInput.handleFocus}
              onChange={(e) => {
                setUser({ ...user, email: e.target.value.toLowerCase() });
              }}
              type="email"
              className={`form-control form-control ${
                emailInput.isFocused
                  ? emailValid
                    ? "is-valid"
                    : "is-invalid"
                  : ""
              }`}
              disabled={isLoading}
              value={user.email}
              required
            />
            <div id="" className="form-text">
              Email will be publicly displayed.
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Password*
            </label>
            <input
              onFocus={passwordInput.handleFocus}
              onChange={(e) => {
                setUser({ ...user, password: e.target.value });
              }}
              type="password"
              className={`form-control form-control ${
                passwordInput.isFocused
                  ? passwordValid
                    ? "is-valid"
                    : "is-invalid"
                  : ""
              }`}
              value={user.password}
              minLength={8}
              disabled={isLoading}
              required
            />

            <div id="" className="form-text">
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
              Confirm password*
            </label>
            <input
              onFocus={confirmPasswordInput.handleFocus}
              onChange={(e) => {
                setUser({ ...user, confirmPassword: e.target.value });
              }}
              type="password"
              className={`form-control form-control ${
                confirmPasswordInput.isFocused
                  ? passwordConfirmed
                    ? "is-valid"
                    : "is-invalid"
                  : ""
              }`}
              minLength={8}
              value={user.confirmPassword}
              disabled={isLoading}
              required
            />
            {isPasswordNotMatched && confirmPasswordInput.isFocused && (
              <p className="form-text text-danger">Passwords do not match.</p>
            )}
            {isPasswordMatched && (
              <p className="form-text text-success">Passwords match.</p>
            )}
          </div>

          <div className="text-center">
            <button
              type="button"
              className="btn btn-primary w-100 mt-2 p-2"
              onClick={createAccountBtnClickHandler}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="d-flex align-items-center gap-2">
                  <Spin />
                </div>
              ) : (
                "Create account"
              )}
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

export default Page;