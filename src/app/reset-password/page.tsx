"use client"
import axios from "axios";
import { url } from "inspector";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Reset = () => {
  const router = useRouter()
  const [token, setToken] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  async function submitBtnClickHandler() {
    try {
      if (password === confirmPassword) {
        const res = await axios.post('./api/users/reset-password', { password: password, confirmPassword: confirmPassword, token: token })
        alert(res.data.message)
        router.push('./login')
      }
    } catch (error: any) {
      console.log(error.message);

    }
  }
  useEffect(() => {
    const urlToken = window.location.search.split('token=')[1]

    if (urlToken) {
      setToken(urlToken)

    }
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
