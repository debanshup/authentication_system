"use client";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { IdentifierParams } from "@/types/enums";
import UserNotExistPopup from "./components/pop-ups/UserNotExistPopup";
import ErrorPopup from "./components/pop-ups/ErrorPopup";
import FillPopup from "./components/pop-ups/FillPopup";
import Spin from "./components/spinner/Spinner";

const Cred = () => {
  const router = useRouter();
  const [credId, setCredId] = useState("");

  const [loadingNext, setLoadingNext] = useState(false);

  const [showUserNotExistPopup, setShowUserNotExistPopup] = useState(false);
  const handleCloseUserNotExistPopup = () => setShowUserNotExistPopup(false);

  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const handleCloseErrorPopup = () => setShowErrorPopup(false);

  const [showFillPopup, setShowFillPopup] = useState(false);
  const handleCloseFillPopup = () => setShowFillPopup(false);

  async function nextBtnClickHandler() {
    try {
      if (credId) {
        setLoadingNext(true)
        const reqIdRes = await axios.post("/api/users/reqid", {
          email: credId,
        });
        const credRes = await axios.post("/api/users/cred", { email: credId });

        // user and otp record exist
        setLoadingNext(false)
        if (credRes.data.otp_sent_status && reqIdRes.data.success) {
          router.push(
            `./verify-otp?${IdentifierParams.R_ID}=${reqIdRes.data.id}`
          );
        }
        // user or otp record does not exist
        else if (
          !credRes.data.user_exist ||
          !credRes.data.otp_record_exist ||
          !reqIdRes.data.success
        ) {
          // alert("No user found");
          setShowUserNotExistPopup(true);
        }
      } else {
        //  show unfilled error
        setShowFillPopup(true);
      }
    } catch (error: any) {
      // unexpected error
      setLoadingNext(false)
      setShowErrorPopup(true);
    }
  }

  return (
    <div className="container-fluid d-flex flex-column justify-content-center align-items-center vh-100">
      <form
        action=""
        className="shadow-lg rounded p-4  col-xxl-3 col-xl-4 col-lg-5 col-md-6 col-sm-8"
      >
        <div className="text-center mb-4">
          <h4>Please Enter Your Email</h4>
          <input
            type="email"
            placeholder="Email"
            className="form-control form-control-lg"
            value={credId}
            onChange={(e) => setCredId(e.target.value)}
            autoComplete="email"

          />
        </div>
        <div className="row w-100">
          <div className="col-6">
            <Link
              className="btn btn-secondary w-100 flex-grow-1 me-2 d-flex align-items-center justify-content-center"
              href="/login">
              Back
            </Link>
          </div>
          <div className="col-6 text-end">
            <button
              type="button"
              className="btn btn-primary w-100 flex-grow-1 me-2 d-flex align-items-center justify-content-center"
              onClick={nextBtnClickHandler}
            >
              {loadingNext ? (
                <div className="d-flex align-items-center gap-2">
                  <Spin />
                  <span>Sending email...</span>
                </div>
              ) : (
                "Next"
              )}
            </button>
          </div>
        </div>
      </form>
      {showUserNotExistPopup && (
        <UserNotExistPopup
          show={showUserNotExistPopup}
          handleClose={handleCloseUserNotExistPopup}
        />
      )}
      {showFillPopup && (
        <FillPopup
          show={showFillPopup}
          handleClose={handleCloseFillPopup}
        />
      )}
      {showErrorPopup && (
        <ErrorPopup
          show={showErrorPopup}
          handleClose={handleCloseErrorPopup}
        />
      )}

    </div>
  );
};

export default Cred;
