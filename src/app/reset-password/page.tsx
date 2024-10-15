"use client";
import axios from "axios";
import { url } from "inspector";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Spin from "./components/spinner/Spinner";

const Reset = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  async function submitBtnClickHandler() {
    try {
      setLoading(true);
      if (
        password.length === confirmPassword.length &&
        password.length >= 8 &&
        confirmPassword.length >= 8
      ) {
        // alert(true);
        const res = await axios.post("./api/users/reset-password", {
          password: password,
          confirmPassword: confirmPassword,
          token: token,
        });
        alert(res.data.message);
        router.push("./login");
      }
      setLoading(false);
    } catch (error: any) {
      console.log(error.message);
    }
  }
  useEffect(() => {
    const urlToken = window.location.search.split("token=")[1];

    if (urlToken) {
      setToken(urlToken);
    }
  }, []);

  return (
    <div className="container-fluid border d-flex flex-column justify-content-center align-items-center vh-100">
      <form
        action=""
        className="shadow-lg rounded p-4 col-xxl-3 col-xl-4 col-lg-5 col-md-6 col-sm-8"
      >
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Set a password
          </label>
          <input
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className="form-control"
            type="password"
            id="password"
            required
          />
          <div id="emailHelp" className="form-text">
            Password must be at least 8 characters long and include at least one
            uppercase letter, one lowercase letter, one number, and one special
            character.
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="confirm-password" className="form-label">
            Confirm password
          </label>
          <input
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
            className="form-control"
            type="password"
            id="confirm-password"
            required
          />
        </div>

        <div>
          <button
            type="button"
            className="btn btn-primary w-100 flex-grow-1 me-2 d-flex align-items-center justify-content-center"
            onClick={submitBtnClickHandler}
          >
            {loading ? (
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
    </div>
  );
};

export default Reset;
