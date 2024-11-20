"use client";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { IdentifierParams } from "@/types/enums";
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

          router.push(
            `./verify-otp?${IdentifierParams.R_ID}=${reqIdRes.data.id}`
          );
        }
        // user or otp record does not exist
        else if (
          !credRes.data.email_valid ||
          !credRes.data.user_exist ||
          !credRes.data.otp_record_exist ||
          !reqIdRes.data.success
        ) {
          toast("Email not found. Please check and try again.",
            {
              className: "bg-danger text-white rounded",
              position: "bottom-left"
            }
          )
          
        }
      } else {
        toast("Please nter your email.", {
          className: "bg-danger text-white rounded",
          position: "bottom-left"
        });


      }
    } catch (error: any) {
      // unexpected error
      toast.error(
        "An unexpected error occurred. Please try again later, or contact support if the issue persists.", {
        className: "bg-danger text-white rounded",
        position: "bottom-left"
      }
      );
    } finally {
      setLoadingNext(false);
    }
  }

  return (
    <>
      <Toaster />
      <div className="container-fluid d-flex flex-column justify-content-center align-items-center vh-100 bg-light">
  <form
    action=""
    className="shadow-lg rounded p-5 col-xxl-3 col-xl-4 col-lg-5 col-md-6 col-sm-8 bg-white"
  >
    <div className="text-center mb-4">
      <h4 className="fw-bold text-primary">Enter Your Email</h4>
      <input
        type="email"
        placeholder="Email"
        className="form-control form-control-lg mb-4"
        value={credId}
        onChange={(e) => setCredId(e.target.value)}
        autoComplete="email"
        disabled={loadingNext}
      />
    </div>
    <div className="row">
      <div className="col-6 mb-3 mb-md-0">
        <Link
          className="btn btn-sm btn-outline-secondary w-100 d-flex align-items-center justify-content-center"
          href="/login"
        >
          Back
        </Link>
      </div>
      <div className="col-6">
        <button
          type="button"
          className="btn btn-sm btn-primary w-100 d-flex align-items-center justify-content-center"
          onClick={nextBtnClickHandler}
        >
          Next
        </button>
      </div>
    </div>
  </form>
</div>

    </>
  );
};

export default Cred;
