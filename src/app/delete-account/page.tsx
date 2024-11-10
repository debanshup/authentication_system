"use client";

import React from "react";
import InputForm from "../global/components/InputForm";
const Page = () => {
  return (
    <div className="vh-100 d-flex justify-content-center align-items-center">
      <div
        className="card shadow-sm p-4"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <div className="card-body">
          <h5 className="card-title text-center mb-4">Enter Password</h5>
          <InputForm
            changeHandler={() => {}}
            inputValue=""
            type="password"
            id="password"
            label="Password"
            style={{}}
          />
          <button className="btn btn-danger">Verify</button>
        </div>
        <div className="text-end me-2 border">
          {/* <button className="btn btn-danger">Discard</button> */}
        </div>
      </div>
    </div>
  );
};

export default Page;
