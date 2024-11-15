import PopUp from "@/app/global/alerts/PopUp";
import React, { useRef, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const UsernameChangeAlert = ({
  show,
  close,
}: {
  show: boolean;
  close: () => void;
}) => {
  const [username, setUsername] = useState("");
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
          toast.success("Username changed", { position: "bottom-left" });
        } else {
          toast.error(changeUsernameRes.data.message, {
            position: "bottom-left",
          });
        }
      }
    } catch (error) {}
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
            <p className="form-text">
              Username must be at least 3 characters long and must not contain
              spaces and any special character.
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
