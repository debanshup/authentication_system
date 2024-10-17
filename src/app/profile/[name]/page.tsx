/* eslint-disable react/no-unescaped-entities */
"use client";

import React from "react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import axios from "axios";
import { Button, Card, ListGroup } from "react-bootstrap";
import Image from "next/image";

export default function Page() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const { name } = useParams();
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

  useEffect(() => {
    getDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container-fluid p-4 bg-white" style={{ maxWidth: '1280px' }}>
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
            <p >
              <span className="border rounded bg-dark text-white mb-0">
                {"Profession"}
              </span>
            </p>
          </div>

          {/* Edit Button */}
          <Button variant="outline-secondary" className="mb-3">
            Edit Profile
          </Button>


          {/* Contact Information */}
          <ul className="list-group list-group-flush text-center mt-3">
            <li className="list-group-item border-0 d-flex justify-content-center align-items-center gap-2">
              <i className="bi bi-envelope-at text-primary"></i>
              <p

                className="mb-0"
              >
                {email}
              </p>
            </li>
            <li className="list-group-item border-0 d-flex justify-content-center align-items-center gap-2">
              <i className="bi bi-phone text-primary"></i>
              <p
                className="mb-0"
              >
                {"+123 456 7890"}
              </p>
            </li>
            <li className="list-group-item border-0 d-flex justify-content-center align-items-center gap-2">
              <i className="bi bi-globe text-primary"></i>
              <p
                className="mb-0"
              >
                debanshu.dev
              </p>
            </li>
          </ul>

        </div>

        {/* Right Section: About */}
        <div className="col-md-8 mt-4">
          <p className="text-muted">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            It has been the industry's standard dummy text ever since the 1500s, when an
            unknown printer took a galley of type and scrambled it to make a type specimen book.
          </p>
        </div>
      </div>
    </div>

  );
}
