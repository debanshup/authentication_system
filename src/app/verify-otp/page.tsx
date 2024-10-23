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

  async function getEmail(token: any) {
    try {
      const emailRes = await axios.get("/api/users/get-email", {
        params: { token },
      });
      setEmail(emailRes.data.email);
    } catch (error) {
      toast.error(
        "An unexpected error occurred. Please try again later, or contact support if the issue persists."
      );
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

        // alert(tokenRes.data.message);
        if (tokenRes.data.success && verifyOtpRes.data.isMatched) {
          router.push(`./reset-password?token=${tokenRes.data.value}`);
        } else if (!verifyOtpRes.data.isMatched) {
          toast(verifyOtpRes.data.message, {
            className: "bg-danger rounded text-white",
          });
        }
      } else {
        toast("The OTP should be exactly 6 digits. Please try again.", {
          className: "bg-danger text-white rounded"
        });
      }
    } catch (error) {
      toast.error(
        "An unexpected error occurred. Please try again later, or contact support if the issue persists."
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
      // setShowErrorPopup(true);
      // setLoadingResend(false);
    } finally {
      setLoadingResend(false);
    }
  }

  useEffect(() => {
    const token = searchParams.get("req");
    if (token) {
      setReqId(token);
      getEmail(token);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  return (
    <>
      <Toaster />

      <div className="container-fluid d-flex flex-column justify-content-center align-items-center vh-100 bg-light">
        {email ? (
          <>
            <div className="mb-3 text-center">
              <h4>
                An email has been sent to <strong>{email}</strong>
              </h4>
              <p>Please enter the 6-digit OTP to verify your account.</p>
            </div>

            <form
              className="shadow-lg rounded p-4 bg-white col-xxl-3 col-xl-4 col-lg-5 col-md-6 col-sm-8"
              onSubmit={(e) => e.preventDefault()} // Prevent page reload on button clicks
            >
              <div className="mb-3">
                <input
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  type="text"
                  maxLength={6}
                  placeholder="Enter OTP"
                  className="form-control form-control-lg text-center fs-4"
                  disabled={loadingResend || loadingVerification}
                  autoFocus
                />
              </div>

              <div className="d-flex justify-content-between">
                <button
                  type="button"
                  className="btn btn-lg btn-success flex-grow-1 me-2 d-flex align-items-center justify-content-center"
                  onClick={verifyBtnClickHandler}
                  disabled={loadingVerification || loadingResend}
                  style={{ height: '48px', minWidth: '140px' }} // Ensures fixed button size
                >
                  {loadingVerification ? (
                    <div className="d-flex align-items-center gap-2">
                      <Spin />
                    </div>
                  ) : (
                    "Verify"
                  )}
                </button>

                <button
                  type="button"
                  className="btn btn-lg btn-warning flex-grow-1 me-2 d-flex align-items-center justify-content-center"
                  onClick={resendBtnClickHandler}
                  disabled={loadingVerification || loadingResend}
                  style={{ height: '48px', minWidth: '140px'}} 
                >
                  {loadingResend ? (
                    <div className="d-flex align-items-center gap-2">
                      <Spin />
                    </div>
                  ) : (
                    "Resend"
                  )}
                </button>
              </div>

            </form>
          </>
        ) : (
          <div className="mb-3 text-center">
            <p className="h4 text-danger">Something went wrong!</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Page;
