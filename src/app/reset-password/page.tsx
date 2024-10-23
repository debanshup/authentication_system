"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Spin from "./components/spinner/Spinner";
import useInputFocus from "./hooks/useInputFocus";
import toast, { Toaster } from "react-hot-toast";

const Page = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const [isPasswordMatched, setIsPasswordMatched] = useState(false);
  const [isPasswordNotMatched, setIsPasswordNotMatched] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const passwordInput = useInputFocus();
  const confirmPasswordInput = useInputFocus();

  const [conditions, setConditions] = useState({
    hasUppercase: false,
    hasLowercase: false,
    hasNumber: false,
    hasSpecialChar: false,
    minLength: false,
  });

  async function submitBtnClickHandler() {
    try {
      setIsLoading(true);
      if (!password || !confirmPassword) {
        toast.error("Please fill in all fields.");
        return;
      }
      if (allValid) {
        // alert(true);
        const res = await axios.post("/api/users/reset-password", {
          password: password,
          confirmPassword: confirmPassword,
          token: token,
        });
        if (res.data.token_expired) {
          setErrorMessage(res.data.message);
          return;
        }
        toast.success("Your password has been changed successfully!", {
          icon: "🔒",
          duration: 5000,
          className: "bg-success text-white p-3 rounded",
          style: { border: "1px solid #28a745", boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)" },
        });

        router.push("./login");
      } else if (!passwordValid) {
        toast(
          "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&).",
          {
            className: "bg-danger text-white rounded",
            duration: 6000,
          }
        );
      } else if (!passwordConfirmed) {
        toast("Passwords do not match.", {
          className: "bg-danger text-white rounded",
        });
      } else {
        setErrorMessage(
          "An unexpected error occurred. Please try again later, or contact support if the issue persists."
        );
      }
    } catch (error: any) {
      setErrorMessage("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    const urlToken = window.location.search.split("token=")[1];

    if (urlToken) {
      setToken(urlToken);
    }
  }, []);

  useEffect(() => {
    setIsPasswordMatched(
      confirmPassword === password && confirmPassword.length > 0
    );
    setIsPasswordNotMatched(!(confirmPassword === password));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [confirmPassword, password]);

  useEffect(() => {
    setConditions({
      hasUppercase: /[A-Z]/.test(password),
      hasLowercase: /[a-z]/.test(password),
      hasNumber: /\d/.test(password),
      hasSpecialChar: /[@$!%*?&]/.test(password),
      minLength: password.length >= 8,
    });
  }, [password]);

  const passwordValid = Object.values(conditions).every(Boolean);
  const passwordConfirmed =
    confirmPassword.length > 0 && password === confirmPassword;

  const allValid = passwordValid && Boolean(token) && passwordConfirmed

  useEffect(() => {
    // alert((confirmPassword === password) && confirmPassword.length>0)
    setIsPasswordMatched(
      confirmPassword === password && confirmPassword.length > 0
    );
    setIsPasswordNotMatched(!(confirmPassword === password));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [confirmPassword]);

  return (
    <>
      <Toaster />
      <div className="container-fluid border d-flex flex-column justify-content-center align-items-center vh-100">
        {!errorMessage ? (
          <form
            action=""
            className="shadow-lg rounded p-4 col-xxl-3 col-xl-4 col-lg-5 col-md-6 col-sm-8"
          >
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Password
              </label>
              <input
                onFocus={passwordInput.handleFocus}
                onChange={(e) => {
                  setPassword(e.target.value);
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
                disabled={isLoading}
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
                  setConfirmPassword(e.target.value);
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

            <div>
              <button
                type="button"
                className="btn btn-primary btn-lg w-100 flex-grow-1 me-2 d-flex align-items-center justify-content-center"
                onClick={submitBtnClickHandler}
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="d-flex align-items-center gap-2">
                    <Spin />
                    <span>Creating new password...</span>
                  </div>
                ) : (
                  "Submit"
                )}
              </button>
            </div>
          </form>
        ) : (
          <>
            <p className="text-danger">{errorMessage}</p>
          </>
        )}
      </div>
    </>
  );
};

export default Page;
