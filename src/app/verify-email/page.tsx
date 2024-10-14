"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Spin from "./components/spinner/Spinner";

const Page = () => {
  const router = useRouter();
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const token = window.location.search.split("token=")[1] || "";
    if (token) {
      verify(token);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function verify(token: String) {
    try {
      const response = await axios.post("./api/users/verify-email", { token });
      setSuccess(response.data.success);
      if (response.data.success || response.data.already_verified) {
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        setErrorMessage("Invalid or expired token");
      }
    } catch (error: any) {
      setErrorMessage("Error verifying email. Please try again.");
    }
  }

  return (
    <div className="container-fluid d-flex flex-column justify-content-center align-items-center vh-100 bg-light">
      <div className="shadow-lg rounded p-5 text-center bg-white">
        {/* Error message */}
        {errorMessage && (
          <div className="alert alert-danger" role="alert">
            <strong>Error:</strong> {errorMessage}
          </div>
        )}

        {/* Success message */}
        {success && (
          <div className="alert alert-success" role="alert">
            <strong>Success:</strong> Email verified successfully! Redirecting
            to login...
          </div>
        )}

        {/* Loading state */}
        {!errorMessage && !success && (
          <>
            <p className="mb-3 text-muted">
              Verifying your email, please wait...
            </p>
            <div className="d-flex justify-content-center">
              <Spin />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Page;
