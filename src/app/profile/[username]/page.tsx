/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
"use client";

import React from "react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
export default function Page() {
  const router = useRouter()
  const { username } = useParams();

  const [isErrorOccured, setIsErrorOccured] = useState(false);

  const [profile, setProfile] = useState({
    fullName: "",
    image: "",
    profession: "",
    email: "",
    phone: "",
    website: "",
    about: "",
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
          fullName: detailsRes.data.props.profile.fullname
        });
      } else {
        setIsErrorOccured(true);
      }
    } catch (error: any) {
      alert(error.message);
    }
  }

  useEffect(() => {
    getDetails();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function editBthClickHandler(): void {
    router.push("/settings/edit")
  }

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
      <div
        className="my-4 d-flex justify-content-center"
        style={{
          padding: "20px",
        }}
      >
        <div
          className="card shadow-lg"
          style={{
            width: "100%",
            maxWidth: "800px",
            border: "none",
            borderRadius: "20px",
            overflow: "hidden",
          }}
        >
          {/* Header with gradient */}
          <div
            className="card-header text-white text-center"
            style={{
              background: "linear-gradient(135deg, #6a11cb, #2575fc)",
              padding: "50px 20px",
            }}
          >
            <img
              src={profile.image}
              alt="User Avatar"
              className="rounded-circle border border-1 border-light"
              style={{
                width: "120px",
                height: "120px",
                marginBottom: "20px",
              }}
            />
            <h3 className="mb-0">{profile.fullName}</h3>
            <p className="text-light">{profile.profession}</p>
          </div>

          {/* Body with detailed info */}
          <div className="card-body bg-light p-4">
            <div className="row">
              {/* Info Section */}
              <div className="col-md-6 mb-3">
                <h5 className="text-muted">Contact Information</h5>
                <p>
                  <i className="bi bi-envelope me-2 text-primary"></i>
                  <strong>Email:</strong> {profile.email}
                </p>
                <p>
                  <i className="bi bi-phone me-2 text-success"></i>
                  <strong>Phone:</strong> {profile.phone}
                </p>
                <p>
                  <i className="bi bi-globe me-2 text-info"></i>
                  <strong>Website:</strong>{" "}
                  <a
                    href={(profile.website && profile.website.startsWith("http")) ? profile.website : `https://${profile.website}`}
                    className="text-decoration-none"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {profile.website}
                  </a>

                </p>
              </div>

              {/* About Section */}
              <div className="col-md-6 mb-3">
                <h5 className="text-muted">About</h5>
                <p>
                  {profile.about}
                </p>
              </div>
            </div>

            {/* Edit Button */}
            <div className="d-flex justify-content-end">
              <button onClick={editBthClickHandler} className="btn btn-outline-dark btn-gradient btn-lg">
                <i className="bi bi-pencil me-2"></i>Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
