/* eslint-disable react/no-unescaped-entities */
"use client";

import React from "react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import axios from "axios";
import { Button } from "react-bootstrap";
import Image from "next/image";

export default function Page() {
  const { username } = useParams();

  const [isEditing, setIsEditing] = useState(false);
  const [isErrorOccured, setIsErrorOccured] = useState(false)

  const [profile, setProfile] = useState({
    image: "",
    profession: "",
    email: "",
    phone: "",
    website: "",
    about: "",
  });

  const [editedProfile, setEditedProfile] = useState({
    newImage: "",
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
      } else {

        setIsErrorOccured(true)

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
        newImage: profile.image,
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
      const profileRes = await axios.post(
        "/api/users/edit-profile",
        editedProfile
      );
      alert(profileRes.data.success);
      setProfile(profileRes.data.new_profile);
      setIsEditing(false);
    } catch (error) { }
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

  return (
    isErrorOccured ? (<>
      <div className="text-center">
        <h1 className="display-1 fw-bold text-danger">404</h1>
        <h3 className="mb-3">An unexpected error occured</h3>
        {/* <p className="lead mb-4">The user you are looking for does not exist or might have been removed.</p> */}
      </div>
    </>) : (
      <>
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
                        id=""
                      />
                    ) : (
                      <span className="badge text-bg-primary">
                        {profile.profession || "profession"}
                      </span>
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
                    ) : (
                      profile.email
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
                        onChange={(e) => {
                          setEditedProfile({
                            ...editedProfile,
                            newPhone: e.target.value,
                          });
                        }}
                        value={editedProfile.newPhone}
                        placeholder="Phone"
                        name=""
                        id=""
                      />
                    ) : (
                      profile.phone
                    )}
                  </p>
                </li>
                <li className="list-group-item border-0 d-flex justify-content-center align-items-center gap-2">
                  <i className="bi bi-globe text-primary"></i>
                  <p className="mb-0">
                    {isEditing ? (
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
                        id=""
                      />
                    ) : (
                      profile.website
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
                    onChange={(e) => {
                      setEditedProfile({
                        ...editedProfile,
                        newAbout: e.target.value,
                      });
                    }}
                    value={editedProfile.newAbout}
                    maxLength={500}
                    name=""
                    id=""
                    placeholder="About(500 chars)"
                    style={{ maxHeight: "500px" }}
                  ></textarea>
                ) : (
                  profile.about
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
      </>
    )
  );
}
