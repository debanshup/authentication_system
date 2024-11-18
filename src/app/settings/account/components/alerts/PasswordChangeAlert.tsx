import React, { useEffect, useState } from "react";
import PopUp from "@/app/global/alerts/PopUp";
import toast, { Toaster } from "react-hot-toast";
import useInputFocus from "@/app/global/hooks/useInputFocus";
import axios from "axios";
import { useRouter } from "next/navigation";
const PasswordChangeAlert = ({ show, close }: { show: boolean, close: () => void }) => {
  const router = useRouter();
  const passwordInput = useInputFocus();
  // const [newPassword, setNewPassword] = useState("");
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    updatedPassword: "",
  });

  const [conditions, setConditions] = useState({
    hasUppercase: false,
    hasLowercase: false,
    hasNumber: false,
    hasSpecialChar: false,
    minLength: false,
  });

  useEffect(() => {
    setConditions({
      hasUppercase: /[A-Z]/.test(passwordData.updatedPassword),
      hasLowercase: /[a-z]/.test(passwordData.updatedPassword),
      hasNumber: /\d/.test(passwordData.updatedPassword),
      hasSpecialChar: /[@$!%*?&]/.test(passwordData.updatedPassword),
      minLength: passwordData.updatedPassword.length >= 8,
    });
  }, [passwordData.updatedPassword]);

  const passwordValid = Object.values(conditions).every(Boolean) && passwordData.currentPassword === passwordData.updatedPassword


  async function changeClickHandler() {
    try {
      if (!passwordValid) {
        toast("Please fill every field correctly", {
          className: "bg-danger text-white rounded",
          position: "bottom-left"
        })
        return
      }

      const passwordChangeRes = await axios.post("/api/users/change-password", passwordData)
      if (passwordChangeRes.data.success) {
        router.push("/login")
        toast(passwordChangeRes.data.message, {
          className: "bg-success text-white rounded",
          position: "bottom-left"
        })
      } else {
        toast(passwordChangeRes.data.message, {
          className: "bg-danger text-white rounded",
          position: "bottom-left"
        })
      }


    } catch (error) {
      toast("Something went wrong!", {
        className: "bg-success text-white rounded",
        position: "bottom-left"
      })
    }
  }





  return (
    <>
      <Toaster />
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
              id="password-old"
              onChange={(e) => {
                setPasswordData({ ...passwordData, currentPassword: e.target.value })
              }}
              value={passwordData.currentPassword}
              minLength={8}
              required
            />
          </div>
          <div className="mb-3 text-start">
            <label htmlFor="password" className="form-label small">
              Set New Password:
            </label>
            <input
              onFocus={passwordInput.handleFocus}
              onChange={(e) => {
                setPasswordData({ ...passwordData, updatedPassword: e.target.value })
              }}
              value={passwordData.updatedPassword}
              type="password"
              minLength={8}
              className={`form-control form-control-sm ${passwordInput.isFocused
                  ? passwordValid
                    ? "is-valid"
                    : "is-invalid"
                  : ""
                }`}
              id="password-new"
              required
            />
            <div id="emailHelp" className="form-text">
              <p>
                Password must be at least{" "}
                <span
                  className={
                    passwordInput.isFocused
                      ? conditions.minLength
                        ? "text-success"
                        : "text-danger"
                      : ""
                  }
                >
                  8 characters{" "}
                </span>
                long and include at least one{" "}
                <span
                  className={
                    passwordInput.isFocused
                      ? conditions.hasUppercase
                        ? "text-success"
                        : "text-danger"
                      : ""
                  }
                >
                  uppercase letter
                </span>
                , one{" "}
                <span
                  className={
                    passwordInput.isFocused
                      ? conditions.hasLowercase
                        ? "text-success"
                        : "text-danger"
                      : ""
                  }
                >
                  lowercase letter
                </span>
                , one{" "}
                <span
                  className={
                    passwordInput.isFocused
                      ? conditions.hasNumber
                        ? "text-success"
                        : "text-danger"
                      : ""
                  }
                >
                  number
                </span>
                , and one{" "}
                <span
                  className={
                    passwordInput.isFocused
                      ? conditions.hasSpecialChar
                        ? "text-success"
                        : "text-danger"
                      : ""
                  }
                >
                  special character (@$!%*?&)
                </span>
                .
              </p>
            </div>
          </div>
          <div>
            <button type="button" onClick={changeClickHandler} className="btn btn-warning">Change password</button>
          </div>
        </form>
      </PopUp>
    </>
  );
};

export default PasswordChangeAlert;
