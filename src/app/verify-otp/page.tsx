"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import Spin from "./components/spinner/Spinner";
import { IdentifierParams } from "@/types/enums";
import toast, { Toaster } from "react-hot-toast";

const Page = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loadingVerification, setLoadingVerification] = useState(false);
  const [loadingResend, setLoadingResend] = useState(false);

  const [otp, setOtp] = useState("");
  const [reqId, setReqId] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(true); // Track the initial loading state

  async function getEmail(token: any) {
    try {
      const emailRes = await axios.get("/api/users/get-email", {
        params: { token },
      });
      setEmail(emailRes.data.email);
    } catch (error) {
      toast(
        "An unexpected error occurred. Please try again later, or contact support if the issue persists.",
        {
          position: "bottom-left",
          className: "bg-danger text-white rounded",
        }
      );
    } finally {
      setIsLoading(false); // Mark loading as complete
    }
  }

  async function verifyBtnClickHandler() {
    setLoadingVerification(true);
    try {
      if (otp.length === 6) {
        const tokenRes = await axios.post("/api/users/token", { reqId: reqId });
        const verifyOtpRes = await axios.post("/api/users/verify-otp", {
          otp: otp,
          reqId: reqId,
        });

        if (tokenRes.data.success && verifyOtpRes.data.isMatched) {
          router.push(`./reset-password?token=${tokenRes.data.value}`);
        } else if (!verifyOtpRes.data.isMatched) {
          toast(verifyOtpRes.data.message, {
            className: "bg-danger rounded text-white",
            position: "bottom-left",
          });
        }
      } else {
        toast("The OTP should be exactly 6 digits. Please try again.", {
          className: "bg-danger text-white rounded",
          position: "bottom-left",
        });
      }
    } catch (error) {
      toast.error(
        "An unexpected error occurred. Please try again later, or contact support if the issue persists.",
        {
          className: "bg-danger text-white rounded",
          position: "bottom-left",
        }
      );
    } finally {
      setLoadingVerification(false);
    }
  }

  async function resendBtnClickHandler() {
    setLoadingResend(true);
    try {
      const reqIdRes = await axios.post("/api/users/reqid", {
        email: email,
      });
      const credRes = await axios.post("/api/users/cred", { email: email });
      if (credRes.data.otp_sent_status && reqIdRes.data.success) {
        router.push(
          `./verify-otp?${IdentifierParams.R_ID}=${reqIdRes.data.id}`
        );
      }
    } catch (error) {
      toast.error(
        "An unexpected error occurred. Please try again later, or contact support if the issue persists."
      );
    } finally {
      setLoadingResend(false);
    }
  }

  useEffect(() => {
    const token = searchParams.get("req");
    if (token) {
      setReqId(token);
      getEmail(token);
    } else {
      setIsLoading(false); // Handle missing token scenario
    }
  }, [searchParams]);

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spin /> {/* Loading spinner */}
      </div>
    );
  }

  return (
    <>
      <Toaster />

      <div
        className="container-fluid d-flex flex-column justify-content-center align-items-center vh-100 bg-light"
        role="main"
        aria-labelledby="otp-verification-title"
      >
        {email ? (
          <>
            <div className="mb-3 text-center">
              <h4 id="otp-verification-title">
                An email has been sent to <strong>{email}</strong>
              </h4>
              <p>Please enter the 6-digit OTP to verify your account.</p>
            </div>

            <form
              className="shadow-lg rounded p-4 bg-white col-xxl-3 col-xl-4 col-lg-5 col-md-6 col-sm-8"
              aria-describedby="otp-help-text"
              onSubmit={(e) => e.preventDefault()} // Prevent page reload on button clicks
            >
              <div className="mb-3">
                <label htmlFor="otp-input" className="visually-hidden">
                  Enter OTP
                </label>
                <input
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  type="text"
                  maxLength={6}
                  id="otp-input"
                  placeholder="Enter OTP"
                  className="form-control form-control- text-center fs-4"
                  aria-required="true"
                  aria-labelledby="otp-help-text"
                  disabled={loadingResend || loadingVerification}
                  autoFocus
                />
                <div id="otp-help-text" className="form-text text-center">
                  Enter the 6-digit OTP sent to your email.
                </div>
              </div>

              <div className="text-center">
                <button
                  type="button"
                  className="btn btn-sm btn-success mx-3"
                  onClick={verifyBtnClickHandler}
                  disabled={loadingVerification || loadingResend}
                  aria-busy={loadingVerification}
                  aria-live="polite"
                >
                  Verify
                </button>

                <button
                  type="button"
                  className="btn btn-sm btn-warning mx-2"
                  onClick={resendBtnClickHandler}
                  disabled={loadingVerification || loadingResend}
                  aria-busy={loadingResend}
                  aria-live="polite"
                >
                  Resend
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="mb-3 text-center">
            <p className="h4 text-danger" role="alert">
              Something went wrong!
            </p>
          </div>
        )}
      </div>
    </>

  );
};

export default Page;
