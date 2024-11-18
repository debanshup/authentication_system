"use client";
import PopUp from "@/app/global/alerts/PopUp";
import axios from "axios";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const EmailChangeAlert = ({
  show,
  close,
}: {
  show: boolean;
  close: () => void;
}) => {
  const [email, setEmail] = useState("");
  // check email valid

  async function verifyBtnClickHandler() {
    try {
      // if email valid send data to route
      const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      if (!emailValid) {
        toast("Please enter a valid email id", {
          className: " bg-danger text-white rounded",
          position: "bottom-left",
        });
        return;
      }
      const emailChangeRes = await axios.post("/api/users/change-email", {
        newEmail: email,
      });
      if (emailChangeRes.data.success) {
        toast(emailChangeRes.data.message, {
          className: "bg-success text-white rounded",
          position: "bottom-left",
          duration: 10000,
        });
      } else {
        toast(emailChangeRes.data.message, {
          className: " bg-danger text-white rounded",
          position: "bottom-left",
        });
      }
      // else show error
    } catch (error) {
      toast("Internal server error", {
        className: "bg-danger text-white rounded",
        position: "bottom-left",
      });
    }
  }

  return (
    <>
      <Toaster />
      <PopUp
        show={show}
        handleClose={close}
        title="Change Email Address"
        centered={false}
      >
        <form>
          <div className="mb-3 text-start">
            <label htmlFor="new-email" className="form-label small fw-semibold">
              New Email Address:
            </label>
            <input
              type="email"
              className="form-control form-control-sm"
              id="new-email"
              placeholder="Enter your new email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
            />
          </div>
          <div className="text-end">
            <button
              onClick={verifyBtnClickHandler}
              type="button"
              className="btn btn-primary btn-sm"
            >
              Send Verification Link
            </button>
          </div>
        </form>
      </PopUp>
    </>
  );
};

export default EmailChangeAlert;
