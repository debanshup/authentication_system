/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { MouseEventHandler } from "react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import axios from "axios";
import { Button, Card, ListGroup } from "react-bootstrap";
import Image from "next/image";

export default function Page() {
  const [isEditing, setIsEditing] = useState(false);
  const { name } = useParams();

  const [username, setUsername] = useState("");
  const [professon, setProfession] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [about, setAbout] = useState("");

  const [editedProfesson, setEditedProfession] = useState("");
  const [editdEmail, setEditedEmail] = useState("");
  const [editedPhone, setEditedPhone] = useState("");
  const [editedWebsite, setEditedWebsite] = useState("");
  const [editedAbout, setEditedAbout] = useState("");

  // const [] = useState("")
  // const [] = useState("")

  async function getDetails() {
    try {
      const res = await axios.get("/api/users/user-details", {
        params: { name },
      });
      // alert(res.data.success)
      if (res.data.success) {
        setUsername(res.data.props.user.username);
        setEmail(res.data.props.user.email);
      } else {
        // alert(res.data.message);
      }
    } catch (error: any) {
      alert(error.message);
    }
  }

  // edit btn click handler

  async function editBtnClickHandler() {
    try {
      setIsEditing(true);
      setEditedProfession(professon)
      setEditedEmail(email)
      setEditedPhone(phone)
      setEditedWebsite(about)
      setEditedWebsite(website)
    } catch (error) {}
  }

  async function saveBtnClickHandler() {
    try {
    } catch (error) {}
  }

  async function discardBtnClickHandler() {
    setIsEditing(false);
  }


// useEffect(() => {
//   setEditedProfession(professon)
//   setEditedEmail(email)
//   setEditedPhone(phone)
//   setEditedWebsite(about)
//   setEditedWebsite(website)
// }, [about, email, phone, professon, website])


  useEffect(() => {
    getDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container-lg p-4 bg-white" style={{ maxWidth: "1280px" }}>
      <div className="row">
        {/* Left Section: Profile Info */}
        <div className="col-md-4 text-center border-end">
          {/* Profile Image */}
          <div className="mb-3">
            <Image
              src="" // Or use an external image with proper config
              alt="profile"
              width={100}
              height={100}
              className="img-fluid rounded border"
            />
          </div>

          {/* Name & Username */}
          <div className="mb-3">
            <h5 className="display-6 mb-0">{"Debanshu Panigrahi"}</h5>
            <p className="text-muted mb-0">{username}</p>
          </div>

          {/* Edit Button */}
          <Button
            onClick={editBtnClickHandler}
            variant="outline-secondary"
            className={`mb-3 ${isEditing && "disabled"}`}
          >
            Edit Profile
          </Button>

          {/* Contact Information */}
          <ul className="list-group list-group-flush text-center mt-3">
            <li className="list-group-item border-0 d-flex justify-content-center align-items-center gap-2">
              <i className="bi bi-envelope-at text-primary"></i>
              <p className="mb-0">
                {isEditing ? (
                  <input
                    className="form-control"
                    value={professon}
                    type="text"
                    placeholder="Profession"
                    name=""
                    id=""
                  />
                ) : (
                  <span className="badge text-bg-primary">{"Profession"}</span>
                )}
              </p>
            </li>

            <li className="list-group-item border-0 d-flex justify-content-center align-items-center gap-2">
              <i className="bi bi-envelope-at text-primary"></i>
              <p className="mb-0">
                {isEditing ? (
                  <input
                    className="form-control"
                    onChange={(e) => {
                      setEditedEmail(e.target.value);
                    }}
                    value={editdEmail}
                    type="email"
                    placeholder="Email"
                  />
                ) : (
                  email
                )}
              </p>
            </li>
            <li className="list-group-item border-0 d-flex justify-content-center align-items-center gap-2">
              <i className="bi bi-phone text-primary"></i>
              <p className="mb-0">
                {isEditing ? (
                  <input
                    type="number"
                    className="form-control"
                    value={editedPhone}
                    placeholder="Phone"
                    name=""
                    id=""
                  />
                ) : (
                  "Phone"
                )}
              </p>
            </li>
            <li className="list-group-item border-0 d-flex justify-content-center align-items-center gap-2">
              <i className="bi bi-globe text-primary"></i>
              <p className="mb-0">
                {isEditing ? (
                  <input
                    className="form-control"
                    value={editedWebsite}
                    placeholder="Website"
                    type="text"
                    name=""
                    id=""
                  />
                ) : (
                  "Website"
                )}
              </p>
            </li>
          </ul>
        </div>

        {/* Right Section: About */}
        <div className="col-md-8 border-0">
          <p className="text-muted mt-4">
            {isEditing ? (
              <textarea
                className="form-control"
                value={editedAbout}
                maxLength={500}
                name=""
                id=""
                placeholder="About(500 chars)"
                style={{ maxHeight: "500px" }}
              ></textarea>
            ) : (
              "about"
            )}

            {/* Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            It has been the industry's standard dummy text ever since the 1500s, when an
            unknown printer took a galley of type and scrambled it to make a type specimen book. */}
          </p>
        </div>
      </div>
      {isEditing && (
        <div className="row mt-4">
          <div className="col d-flex justify-content-center align-items-center gap-3">
            <button
              onClick={discardBtnClickHandler}
              className="btn btn-outline-secondary"
            >
              Discard
            </button>
            <button onClick={saveBtnClickHandler} className="btn btn-primary">
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
