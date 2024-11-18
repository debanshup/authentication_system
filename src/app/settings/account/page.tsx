/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useState } from "react";
import DeleteAccountAlert from "./components/alerts/DeleteAccountAlert";
import InputForm from "@/app/global/components/InputForm";
import PasswordChangeAlert from "./components/alerts/PasswordChangeAlert";
import EmailChangeAlert from "./components/alerts/EmailChangeAlert";
import UsernameChangeAlert from "./components/alerts/UsernameChangeAlert";
const Page = () => {
  const [showUsernameAlert, setShowUsernameAlert] = useState(false);
  const handleCloseUsernameAlert = () => setShowUsernameAlert(false);

  const [showEmailAlert, setShowEmailAlert] = useState(false);
  const handleCloseEmailAlert = () => setShowEmailAlert(false);

  const [showPasswordAlert, setShowPasswordAlert] = useState(false);
  const handleClosePasswordAlert = () => setShowPasswordAlert(false);

  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const handleCloseDeleteAlert = () => setShowDeleteAlert(false);

  function deleteBtnClickHandler(): void {
    // throw new Error('Function not implemented.')
    try {
      setShowDeleteAlert(true);
    } catch (error) {}
  }

  function passwordChangeBtnClickHandler(): void {
    setShowPasswordAlert(true);
    try {
    } catch (error) {}
  }

  function emailChangeBtnClickHandler(): void {
    try {
      setShowEmailAlert(true);
    } catch (error) {}
  }
  function usernameChangeBtnClickHandler(): void {
    try {
      setShowUsernameAlert(true);
    } catch (error) {}
  }

  return (
    <>
      <UsernameChangeAlert
        show={showUsernameAlert}
        close={handleCloseUsernameAlert}
      />
      <EmailChangeAlert show={showEmailAlert} close={handleCloseEmailAlert} />
      <PasswordChangeAlert
        show={showPasswordAlert}
        close={handleClosePasswordAlert}
      />
      <DeleteAccountAlert
        show={showDeleteAlert}
        close={handleCloseDeleteAlert}
      />

      <div className="mt-0">
        <p className="lead fw-bold">Account</p>
        <div
          className="p-4 rounded  bg-light border"
        >
          {/* Change Username */}
          <div className="mb-5">
            <h5 className="fw-bold text-dark">Change Username</h5>
            <p className="text-muted small">
              You can update your username to personalize your profile.
            </p>
            <button
              className="btn btn-sm btn-dark"
              onClick={usernameChangeBtnClickHandler}
            >
              Change Username
            </button>
          </div>

          {/* Change Email */}
          <div className="mb-5">
            <h5 className="fw-bold text-dark">Change Email</h5>
            <p className="text-muted small">
              Modify your email address used for login and communications.
            </p>
            <button
              className="btn btn-sm btn-dark"
              onClick={emailChangeBtnClickHandler}
            >
              Change Email
            </button>
          </div>

          {/* Change Password */}
          <div className="mb-5">
            <h5 className="fw-bold text-dark">Change Password</h5>
            <p className="text-muted small">
              Set a new password to strengthen your account's security.
            </p>
            <button
              className="btn btn-sm btn-dark"
              onClick={passwordChangeBtnClickHandler}
            >
              Change Password
            </button>
          </div>

          {/* Delete Account */}
          <div
            className="p-4 mt-5 rounded"
            style={{ backgroundColor: "#fff3f3", border: "1px solid #dc3545" }}
          >
            <h5 className="fw-bold text-danger">Delete Account</h5>
            <p className="text-danger small">
              <strong>Warning:</strong> This action is **permanent**. Once your
              account is deleted, it cannot be recovered.
            </p>
            <p className="text-muted small">
              If you are sure, proceed with the deletion.
            </p>
            <button
              className="btn btn-sm text-white"
              style={{ backgroundColor: "#dc3545", border: "none" }}
              onClick={deleteBtnClickHandler}
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
