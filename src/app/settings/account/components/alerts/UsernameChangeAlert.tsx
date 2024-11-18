import PopUp from "@/app/global/alerts/PopUp";
import React, { useRef, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import useInputFocus from "@/app/global/hooks/useInputFocus";
const UsernameChangeAlert = ({
  show,
  close,
}: {
  show: boolean;
  close: () => void;
}) => {
  const [username, setUsername] = useState("");
  const [suggestion, setSuggestion] = useState("");
  // const [usernameChanged, setUsernameChanged] = useState(false)
  const [isErrorOccured, setIsErrorOccured] = useState(false);
  const usernameValid = /^[a-z\d]{3,}$/.test(username.trim());
  const formRef = useRef<HTMLFormElement>(null);
  async function changeBtnClickHandler(
    event: React.MouseEvent<HTMLButtonElement>
  ) {
    // event.preventDefault();

    try {
      if (usernameValid) {
        const changeUsernameRes = await axios.post(
          "/api/users/change-username",
          { username }
        );
        if (changeUsernameRes.data.success) {
          formRef.current?.reset();
          setIsErrorOccured(false);
          setSuggestion(changeUsernameRes.data.message)
          toast("Username changed", {
            position: "bottom-left",
            className: "bg-success text-white"


          });
        } else {
          setIsErrorOccured(true)
          setSuggestion(changeUsernameRes.data.message)
          toast(changeUsernameRes.data.message, {
            position: "bottom-left",
            className: "bg-danger text-white"

          });
        }
      } else {
        setIsErrorOccured(true);
        setSuggestion(
          "Username must be at least 3 characters long and must not contain spaces and any special character."
        );
        toast("Please fill up the required field properly", {
          className: "bg-danger text-white rounded",
          position: "bottom-left"
        });
      }
    } catch (error: any) {
      toast(error.message, {
        className: "bg-danger text-white rounded",
        position: "bottom-left"
      });
    }
  }

  return (
    <>
      <Toaster />
      <PopUp
        show={show}
        handleClose={close}
        title={"Change Username"}
        centered={false}
      >
        <form action="" ref={formRef}>
          <div className="mb-3 text-start">
            <label htmlFor="email" className="text-start form-label small">
              Enter a new username:
            </label>
            <input
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              type="text"
              className="form-control form-control-sm"
              id="username"
              autoComplete="username"
              required
            />
            <p
              className={`text-${isErrorOccured ? "danger" : "success"
                } form-text`}
            >
              {suggestion}
            </p>
          </div>
          <div>
            <button
              type="button"
              onClick={changeBtnClickHandler}
              className="btn btn-sm btn-success"
            >
              Change my username
            </button>
          </div>
        </form>
      </PopUp>
    </>
  );
};

export default UsernameChangeAlert;
