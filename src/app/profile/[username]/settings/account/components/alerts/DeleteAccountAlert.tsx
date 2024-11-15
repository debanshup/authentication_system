import PopUp from "@/app/global/alerts/PopUp";
import axios from "axios";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const DeleteAccountAlert = ({
  show,
  close,
}: {
  show: boolean;
  close: () => void;
}) => {
  const [record, setRecord] = useState({
    username: "",
    dialog: "",
    password: "",
  });
  async function deleteBtnClickHandler() {
    const deleteRes = await axios.post("/api/users/delete-account", record);
    toast(deleteRes.data.message);
    try {
      // setShowDeleteAlert(true);
    } catch (error) {}
  }

  return (
    <>
      <Toaster />

      <PopUp
        show={show}
        handleClose={close}
        title={"Are you sure you want to do this?"}
        centered={false}
      >
        <div className="alert alert-danger small" role="alert">
          Your account and all data related to it will be immediately deleted.
          This action is irreversible.
        </div>
        <hr />
        <form>
          <div className="mb-3 text-start">
            <label
              htmlFor="usernameOrEmail"
              className="text-start form-label small"
            >
              Your Username or Email:
            </label>
            <input
              onChange={(e) => {
                setRecord({ ...record, username: e.target.value });
              }}
              value={record.username}
              type="text"
              className="form-control form-control-sm"
              id="usernameOrEmail"
              required
            />
          </div>

          <div className="text-start mb-3">
            <label htmlFor="confirmation" className="form-label small">
              To verify, type <span className="fw-bold">delete</span> below:
            </label>
            <input
              onChange={(e) => {
                setRecord({ ...record, dialog: e.target.value });
              }}
              value={record.dialog}
              type="text"
              className="form-control form-control-sm"
              id="confirmation"
              required
            />
          </div>

          <div className="mb-3 text-start">
            <label htmlFor="password" className="form-label small">
              Confirm Your Password:
            </label>
            <input
              onChange={(e) => {
                setRecord({ ...record, password: e.target.value });
              }}
              value={record.password}
              type="password"
              className="form-control form-control-sm"
              id="password"
              required
            />
          </div>

          <div className="text-end mt-4">
            <button
              onClick={deleteBtnClickHandler}
              type="submit"
              className="btn btn-sm btn-danger"
            >
              Delete this account
            </button>
          </div>
        </form>
      </PopUp>
    </>
  );
};

export default DeleteAccountAlert;
