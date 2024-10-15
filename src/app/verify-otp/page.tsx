"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import FillPopup from "./components/pop-ups/FillPopup";
import InvalidOtpPopup from "./components/pop-ups/InvalidOtpPopup";
import ErrorPopup from "./components/pop-ups/ErrorPopup";
import Spin from "./components/spinner/Spinner";
const Page = () => {
  const router = useRouter();
  // const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false)

  const [otp, setOtp] = useState("");
  const [reqId, setReqId] = useState("");
  const [email, setEmail] = useState("")



  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const handleCloseShowErrorPopup = () => setShowErrorPopup(false);

  const [showFillPopup, setShowFillPopup] = useState(false);
  const handleCloseFillPopup = () => setShowFillPopup(false);

  const [showInvalidOtpPopup, setShowInvalidOtp] = useState(false);
  const handleCloseInvalidOtpPopup = () => setShowInvalidOtp(false);


  async function getEmail(token: any) {
    const emailRes = await axios.get("/api/users/get-email", { params: { token } })
    if (emailRes.data.email) {
      setEmail(emailRes.data.email)
    }
  }

  async function verifyBtnClickHandler() {
    setLoading(true)
    const tokenRes = await axios.post("./api/users/token", { reqId: reqId });
    const verifyOtpRes = await axios.post("./api/users/verify-otp", {
      otp: otp,
      reqId: reqId,
    });

    if (otp.length === 6) {
      if (tokenRes.data.success && verifyOtpRes.data.success) {
        router.push(`./reset-password?token=${tokenRes.data.value}`);
      } else if (!verifyOtpRes.data.isMatched) {
        setShowInvalidOtp(true);
      } else if (!tokenRes.data.success || !verifyOtpRes.data.success) {
        setShowErrorPopup(true);
      }
    } else {
      setShowFillPopup(true);
    }
    setLoading(false)

  }

  useEffect(() => {
    const token = window.location.search.split("req=")[1];
    if (token) {
      setReqId(token);
      getEmail(token)
    }


    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);




  async function resendBtnClickHandler() { }

  return (
    <div className="container-fluid d-flex flex-column justify-content-center align-items-center vh-100 bg-light">
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
            className="form-control text-center fs-4"
            autoFocus
          />
        </div>

        <div className="d-flex justify-content-between">
          <button
            type="button"
            className="btn btn-warning flex-grow-1 me-2 d-flex align-items-center justify-content-center"
            onClick={verifyBtnClickHandler}
          >
            {loading ? (
              <div className="d-flex align-items-center gap-2">
                <Spin />
                <span>Verifying...</span>
              </div>
            ) : (
              "Verify"
            )}
          </button>

          <button
            type="button"
            className="btn btn-outline-primary flex-grow-1"
            onClick={resendBtnClickHandler}
          >
            Resend OTP
          </button>
        </div>
      </form>
      {showFillPopup && (
        <FillPopup show={showFillPopup} handleClose={handleCloseFillPopup} />
      )}

      {showInvalidOtpPopup && (
        <InvalidOtpPopup
          show={showInvalidOtpPopup}
          handleClose={handleCloseInvalidOtpPopup}
        />
      )}

      {showErrorPopup && (
        <ErrorPopup
          show={showErrorPopup}
          handleClose={handleCloseShowErrorPopup}
        />
      )}
    </div>
  );
};

export default Page;
