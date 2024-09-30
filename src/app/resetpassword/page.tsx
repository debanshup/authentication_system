"use client"
import React from "react";

const Reset = () => {
    function submitBtnClickHandler(): void {
        throw new Error("Function not implemented.");
    }

  return (
    <div>
      <div>
        <label htmlFor="">Set a password</label>
        <input
          className="form-control"
          type="password"
          placeholder="password"
        />
        <label htmlFor="">Confirm password</label>
        <input
          className="form-control"
          type="password"
          placeholder="confirm password"
        />
      </div>
      <div>
        <button className="btn btn-primary" onClick={submitBtnClickHandler}>Submit</button>
      </div>
    </div>
  );
};

export default Reset;
