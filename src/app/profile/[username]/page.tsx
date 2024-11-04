/* eslint-disable react/no-unescaped-entities */
"use client";

import React from "react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { Button } from "react-bootstrap";
import Image from "next/image";
import Spin from "../components/spinner/Spinner";
import { useContext } from "react";
import Overlay from "@/app/components/NotVerifiedOverlay";
import Link from "next/link";

export default function Page() {
  const { username } = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isErrorOccured, setIsErrorOccured] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false)

  const [profile, setProfile] = useState({
    image: "",
    profession: "",
    email: "",
    phone: "",
    website: "",
    about: "",
  });

  const [editedProfile, setEditedProfile] = useState({
    // newImage: "",
    newProfession: "",
    newEmail: "",
    newPhone: "",
    newWebsite: "",
    newAbout: "",
  });

  async function getDetails() {
    try {
      const detailsRes = await axios.get("/api/users/user-details", {
        params: { username },
      });
      if (detailsRes.data.success) {
        setProfile({
          email: detailsRes.data.props.profile.email,
          image: detailsRes.data.props.profile.image,
          profession: detailsRes.data.props.profile.profession,
          phone: detailsRes.data.props.profile.phone,
          website: detailsRes.data.props.profile.website,
          about: detailsRes.data.props.profile.about,
        });
        if (detailsRes.data.props.profile.isEmailVerified) {
          setIsEmailVerified(true)
        }
      } else {
        setIsErrorOccured(true);
      }
    } catch (error: any) {
      alert(error.message);
    }
  }

  // edit btn click handler

  async function editBtnClickHandler() {
    setIsEditing(true);
    try {
      setEditedProfile({
        // newImage: profile.image,
        newProfession: profile.profession,
        newEmail: profile.email,
        newPhone: profile.phone,
        newWebsite: profile.website,
        newAbout: profile.about,
      });
    } catch (error) { }
  }

  async function saveBtnClickHandler() {
    try {
      setIsLoading(true);
      const profileRes = await axios.post(
        "/api/users/edit-profile",
        editedProfile
      );
      // alert(profileRes.data.success);
      toast.success("Profile updated successfully");
      setProfile(profileRes.data.new_profile);
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setIsEditing(false);
      setIsLoading(false);
    }
  }

  async function discardBtnClickHandler() {
    setIsEditing(false);
  }

  useEffect(() => {
    if (!isEditing) {
      getDetails();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return isErrorOccured ? (
    <>
      <div className="text-center">
        <h1 className="display-1 fw-bold text-danger">404</h1>
        <h3 className="mb-3">An unexpected error occured</h3>
        {/* <p className="lead mb-4">The user you are looking for does not exist or might have been removed.</p> */}
      </div>
    </>
  ) : (
    <>
      <Toaster />
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
              variant="outline-primary"
              className={`mb-3`}
              disabled={isEditing || isLoading}
            >
              Edit Profile
            </Button>

            {/* Contact Information */}
            <ul className="list-group list-group-flush text-center mt-3">
              <li className="list-group-item border-0 d-flex justify-content-center align-items-center gap-2">
                <p className="mb-0">
                  {isEditing ? (

                    <form action="" className="form-floating">
                      <input
                        className="form-control"
                        onChange={(e) => {
                          setEditedProfile({
                            ...editedProfile,
                            newProfession: e.target.value,
                          });
                        }}
                        value={editedProfile.newProfession}
                        type="text"
                        placeholder="Profession"
                        name=""
                        id="profession"
                      />
                      <label htmlFor="profession">Profession</label>
                    </form>
                  ) : (
                    <span className="badge text-bg-success d-flex align-items-center gap-2">
                      <i className="bi bi-briefcase-fill"></i>
                      {profile.profession || "Profession"}
                    </span>

                  )}
                </p>
              </li>

              <li className="list-group-item border-0 d-flex justify-content-center align-items-center gap-2">
                <i className="bi bi-envelope-at text-primary"></i>
                <p className="mb-0">
                  {isEditing ? (
                    <form action="" className="form-floating">
                      <input
                        id="email"
                        className="form-control"
                        onChange={(e) => {
                          setEditedProfile({
                            ...editedProfile,
                            newEmail: e.target.value,
                          });
                        }}
                        value={editedProfile.newEmail}
                        type="email"
                        placeholder="Email"
                        disabled
                      />
                      <label htmlFor="email">Email</label>

                    </form>
                  ) : (
                   

                      <span className="">
                        {profile.email + " "}
                        {isEmailVerified ? (
                           
                            <i className="bi bi-check-circle-fill text-success"></i>
                         
                        ) : (
                          <Link className="btn btn-sm p-0" href={`/profile/${username}/settings/edit`}>
                          <Overlay>
                          <i className="bi bi-exclamation-circle fs-6 text-danger"></i> 
                          </Overlay>
                          </Link>
                        )}
                      </span>

                  )}
                </p>
              </li>
              <li className="list-group-item border-0 d-flex justify-content-center align-items-center gap-2">
                <i className="bi bi-phone text-primary"></i>
                <p className="mb-0">
                  {isEditing ? (
                    <form action="" className="form-floating">
                      <input

                        type="tel"
                        className="form-control"
                        onChange={(e) => {
                          setEditedProfile({
                            ...editedProfile,
                            newPhone: e.target.value,
                          });
                        }}
                        value={editedProfile.newPhone}
                        placeholder="Phone"
                        name=""
                        id="phone"
                      />
                      <label htmlFor="phone">Phone</label>

                    </form>
                  ) : (
                    <span>{profile.phone}</span>
                  )}
                </p>
              </li>
              <li className="list-group-item border-0 d-flex justify-content-center align-items-center gap-2">
                <i className="bi bi-globe text-primary"></i>
                <p className="mb-0">
                  {isEditing ? (
                    <form action="" className="form-floating">
                      <input
                        className="form-control"
                        onChange={(e) => {
                          setEditedProfile({
                            ...editedProfile,
                            newWebsite: e.target.value,
                          });
                        }}
                        value={editedProfile.newWebsite}
                        placeholder="Website"
                        type="text"
                        name=""
                        id="website"
                      />
                      <label htmlFor="website">Website</label>

                    </form>
                  ) : (
                    profile.website
                  )}
                </p>
              </li>
            </ul>
          </div>

          {/* Right Section: About */}
          <div className="col-md-8 border-0 text-center">
            <p className="text-muted mt-4">
              {isEditing ? (
                <form className="form-floating">
                  <textarea
                    className="form-control"
                    id="about"
                    placeholder="Write about yourself (max 500 characters)"
                    value={editedProfile.newAbout}
                    onChange={(e) =>
                      setEditedProfile({ ...editedProfile, newAbout: e.target.value })
                    }
                    maxLength={500}
                    style={{ maxHeight: "500px", minHeight: "150px" }} // Ensures better usability
                  ></textarea>
                  <label htmlFor="about">About</label>
                </form>
              ) : (
                profile.about
              )}
            </p>
          </div>
        </div>
        {isEditing && (
          <div className="row mt-4">
            <div className="col d-flex justify-content-center align-items-center gap-3">
              <button
                onClick={discardBtnClickHandler}
                className="btn btn-outline-secondary"
                style={{ height: "50px", minHeight: "50px" }}
                disabled={isLoading}
              >
                Discard
              </button>
              <button
                onClick={saveBtnClickHandler}
                className="btn btn-success d-flex align-items-center justify-content-center"
                style={{
                  height: "50px",
                  width: "100px",
                  minWidth: "100px",
                  minHeight: "50px",
                }}
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="d-flex align-items-center gap-2">
                    <Spin />
                  </div>
                ) : (
                  "Save"
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
