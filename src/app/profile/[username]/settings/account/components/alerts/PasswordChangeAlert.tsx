import React from "react";
import PopUp from "@/app/global/alerts/PopUp";
const PasswordChangeAlert = ({ show, close }: { show: boolean, close: () => void }) => {
  return (
    <PopUp
      show={show}
      handleClose={close}
      title={"Change password"}
      centered={false}
    >
        <form action="">
        <div className="mb-3 text-start">
          <label htmlFor="password" className="form-label small">
            Enter Your Old Password:
          </label>
          <input
            type="password"
            className="form-control form-control-sm"
            id="password"
            required
          />
        </div>
        <div className="mb-3 text-start">
          <label htmlFor="password" className="form-label small">
            Set New Password:
          </label>
          <input
            type="password"
            className="form-control form-control-sm"
            id="password"
            required
          />
        </div>
        <div>
            <button className="btn btn-warning">Change password</button>
        </div>
        </form>
    </PopUp>
  );
};

export default PasswordChangeAlert;
