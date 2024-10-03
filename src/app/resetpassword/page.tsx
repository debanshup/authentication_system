"use client"
import axios from "axios";
import { url } from "inspector";
import React, { useEffect, useState } from "react";

const Reset = () => {
  const [token, setToken] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  async function submitBtnClickHandler() {
    try {
      if (password === confirmPassword) {
        await axios.post('./api/users/resetpassword', { password: password, confirmPassword: confirmPassword, token: token })
      }
    } catch (error) {

    }
  }
  useEffect(() => {
    const urlToken = window.location.search.split('=')[1] || ''
    
    setToken(urlToken)
    // alert(token);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return (
    <div>
      <div>
        <label htmlFor="">Set a password</label>
        <input
          onChange={
            (e) => { setPassword(e.target.value) }
          }
          className="form-control"
          type="password"
          placeholder="password"
        />
        <label htmlFor="">Confirm password</label>
        <input
          onChange={
            (e) => { setConfirmPassword(e.target.value) }
          }
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
