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
    } catch (error) { }
  }

  function passwordChangeBtnClickHandler(): void {
    setShowPasswordAlert(true)
    try {
    } catch (error) { }
  }

  function emailChangeBtnClickHandler(): void {
    try {
      setShowEmailAlert(true)
    } catch (error) {

    }
  }
  function usernameChangeBtnClickHandler(): void {
    try {
      setShowUsernameAlert(true)
    } catch (error) {

    }
  }

  return (
    <>
      <UsernameChangeAlert show={showUsernameAlert} close={handleCloseUsernameAlert} />
      <EmailChangeAlert show={showEmailAlert} close={handleCloseEmailAlert} />
      <PasswordChangeAlert show={showPasswordAlert} close={handleClosePasswordAlert} />
      <DeleteAccountAlert show={showDeleteAlert} close={handleCloseDeleteAlert} />

      <div className="mt-3">
        <p className="h4">Change username</p>
        <hr />
        <button className="btn btn-sm btn-secondary" onClick={usernameChangeBtnClickHandler}>Change username</button>
      </div>
      <div className="mt-5">
        <p className="h4">Change email</p>
        <hr />
        <button className="btn btn-sm btn-secondary" onClick={emailChangeBtnClickHandler}>Change email</button>
      </div>
      <div className="mt-5">
        <p className="h4">Change password</p>
        <hr />
        <button className="btn btn-sm btn-secondary" onClick={passwordChangeBtnClickHandler}>Change password</button>
      </div>
      <div className="mt-5">
        <p className="h4">Delete account</p>
        <hr />
        <p className="text-danger small">
          This action is irreversible. Please proceed with caution.
        </p>
        <button
          onClick={deleteBtnClickHandler}
          id="delete"
          className="btn btn-sm btn-danger"
        >
          Delete Account
        </button>
      </div>
    </>
  );
};

export default Page;
