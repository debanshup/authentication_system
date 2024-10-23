"use client";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { IdentifierParams } from "@/types/enums";
import Spin from "./components/spinner/Spinner";
import toast, { Toaster } from "react-hot-toast";

const Cred = () => {
  const router = useRouter();
  const [credId, setCredId] = useState("");

  const [loadingNext, setLoadingNext] = useState(false);

  async function nextBtnClickHandler() {
    try {
      setLoadingNext(true);
      if (credId) {
        const reqIdRes = await axios.post("/api/users/reqid", {
          email: credId,
        });
        const credRes = await axios.post("/api/users/cred", { email: credId });
        // user and otp record exist
        if (credRes.data.otp_sent_status && reqIdRes.data.success) {
          // toast(`A 6 digit OTP has been sent to: ${credId}`, {
          //   icon: "✅",
          // });
          router.push(
            `./verify-otp?${IdentifierParams.R_ID}=${reqIdRes.data.id}`
          );
        }
        // user or otp record does not exist
        else if (
          !credRes.data.email_valid||
          !credRes.data.user_exist ||
          !credRes.data.otp_record_exist ||
          !reqIdRes.data.success
        ) {
          // alert("No user found");
          // setShowUserNotExistPopup(true);
          toast("Email not found. Please try again.", 
            {
              className:"bg-danger text-white rounded"
            }
          )
        }
      } else {
        toast.error("Please enter your email.");


      }
    } catch (error: any) {
      // unexpected error
      toast.error(
        "An unexpected error occurred. Please try again later, or contact support if the issue persists."
      );
    } finally {
      setLoadingNext(false);
    }
  }

  return (
    <>
      <Toaster />
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
              disabled={loadingNext}
            />
          </div>
          <div className="row w-100">
            <div className="col-6">
              <Link
                className="btn btn-lg btn-secondary w-100 flex-grow-1 me-2 d-flex align-items-center justify-content-center"
                href="/login"
              >
                Back
              </Link>
            </div>
            <div className="col-6 text-end">
            <button
                type="button"
                className="btn btn-lg btn-primary w-100 flex-grow-1 me-2 d-flex align-items-center justify-content-center"
                style={{ minHeight: '48px' }} // Ensures fixed height
                onClick={nextBtnClickHandler}
              >
                {loadingNext ? (
                  <div className="d-flex align-items-center gap-2">
                    <Spin />
                  </div>
                ) : (
                  "Next"
                )}
              </button>

            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Cred;
