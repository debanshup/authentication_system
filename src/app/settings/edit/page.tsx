/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import InputForm from "@/app/global/components/InputForm";
import TextAreaForm from "@/app/global/components/TextAreaForm";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import Spin from "@/app/global/components/Spinner";
import useInputFocus from "@/app/global/hooks/useInputFocus";
import AlertDismissible from "@/app/global/alerts/Alert";
import Link from "next/link";
import PopUp from "@/app/global/alerts/PopUp";
// import useInputFocus from "@/app/global/hooks/useInputFocus";

const Page = () => {
    const router = useRouter();
    const [isProfileUpdated, setIsProfileUpdated] = useState(false);
    const [username, setUsername] = useState("");
    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [image, setImage] = useState("")
    const [showUpdateAlert, setShowUpdateAlert] = useState(false);
    const handleCloseUpdateAlert = () => setShowUpdateAlert(false);


    const [profile, setProfile] = useState({
        profession: "",
        email: "",
        phone: "",
        website: "",
        about: "",
        username: "",
        fullname: "",
    });

    const fullnameValid = /^[a-zA-Z\s]{1,}$/.test(profile.fullname);

    async function getDetails() {
        try {
            const detailsRes = await axios.get("/api/users/get-details-from-request");
            if (detailsRes.data.success) {
                setProfile({
                    ...profile,
                    profession: detailsRes.data.field.profile.profession,
                    phone: detailsRes.data.field.profile.phone,
                    website: detailsRes.data.field.profile.website,
                    about: detailsRes.data.field.profile.about,
                    fullname: detailsRes.data.field.profile.fullname,
                });
                setFullname(detailsRes.data.field.profile.fullname)
                setEmail(detailsRes.data.field.profile.email)
                setUsername(detailsRes.data.field.profile.username)
                setImage(detailsRes.data.field.profile.image)
                // setIsEmailVerified(detailsRes.data.field.profile.verified);
            } else {
                // setIsErrorOccured(true);
                toast.error("Error fetching data");
            }
        } catch (error: any) {
            toast.error(error.message);
        }
    }

    async function updateDetails() {
        try {
            if (fullnameValid) {
                const updateRes = await axios.post(
                    "/api/users/update-details",
                    profile
                );
                if (updateRes.data.success) {
                    setIsProfileUpdated(true);
                    setShowUpdateAlert(true);
                    setUsername(profile.username);
                    window.scrollTo(0, 0);
                } else {
                    toast("Error saving details", {
                        position: "bottom-left",
                        className: "bg-danger text-white p-1 rounded"
                    });
                }
            } else {
                toast("Please fill up all the required fields properly", {
                    position: "bottom-left",
                    className: "bg-danger text-white p-1 rounded"
                });
            }
        } catch (error) {
            toast("Something went wrong", {
                position: "bottom-left",
                className: "bg-danger text-white p-1 rounded"
            });
        }
    }

    useEffect(() => {
        getDetails();
    }, []);

    function changeBtnClickHandler(): void {
        router.push(`/settings/account`);
    }

    return (
        <>
            <Toaster />
            {isProfileUpdated && (
                <AlertDismissible
                    type="success"
                    show={showUpdateAlert}
                    onClose={handleCloseUpdateAlert}
                    heading={"Profile updated successfully"}
                >
                    <p>
                        view your <a href={`/profile/${username}`}>profile</a>
                    </p>
                </AlertDismissible>
            )}
        <p className="lead fw-bold">Edit Your Profile</p>

            <div
                className="my-4"
                style={{
                    borderRadius: "20px",
                }}
            >
                
                <div
                    className=""
                    style={{
                        maxWidth: "800px",
                        margin: "0 auto",
                        border: "none",
                        borderRadius: "20px",
                        overflow: "hidden",
                    }}
                >
                    {/* Header with Gradient */}
                    <div
                        className="card-header text-white text-start d-flex align-items-center justify-content-between"
                        style={{
                            background: "linear-gradient(135deg, #6a11cb, #2575fc)",
                            padding: "30px 20px",
                        }}
                    >
                        <div>
                            <h3 className="mb-0">Hi, {fullname}</h3>
                            <p className="text-light">Update your personal details</p>
                        </div>
                        <div>
                            <img
                                className="border"
                                src={image}
                                alt="Profile"
                                style={{
                                    width: "80px",
                                    height: "80px",
                                    borderRadius: "50%",
                                    objectFit: "cover",
                                }}
                            />
                        </div>
                    </div>


                    {/* Form Section */}
                    <div className="card-body bg-light p-4">
                        {/* Full Name */}
                        <div className="mb-3">
                            <InputForm
                                changeHandler={function (
                                    e: React.ChangeEvent<HTMLInputElement>
                                ): void {
                                    setProfile({ ...profile, fullname: e.target.value });
                                }}
                                inputValue={profile.fullname}
                                type={"text"}
                                id={"full-name"}
                                label={"Full Name*"}
                            />
                        </div>

                        {/* Email */}
                        <div className="mb-3 d-flex align-items-center">
                            <InputForm
                                changeHandler={function (e: React.ChangeEvent<HTMLInputElement>): void {
                                }}
                                inputValue={email}
                                type={"email"}
                                id={"email"}
                                label={"Email"}
                                disabled={true}
                            />
                            <button
                                type="button"
                                className="btn btn-warning ms-2"
                                onClick={changeBtnClickHandler}
                            >
                                Change
                            </button>
                        </div>
                        {/* Username */}
                        <div className="mb-3 d-flex align-items-center">
                            <InputForm
                                changeHandler={function (
                                    e: React.ChangeEvent<HTMLInputElement>
                                ): void {
                                }}
                                inputValue={username}
                                type={"text"}
                                id={"username"}
                                label={"Username"}
                                disabled={true}
                            />
                            <button
                                type="button"
                                className="btn btn-warning ms-2"
                                onClick={changeBtnClickHandler}
                            >
                                Change
                            </button>
                        </div>

                        {/* Profession */}
                        <div className="mb-3">
                            <InputForm
                                changeHandler={function (
                                    e: React.ChangeEvent<HTMLInputElement>
                                ): void {
                                    setProfile({ ...profile, profession: e.target.value });
                                }}
                                inputValue={profile.profession}
                                type={"text"}
                                id={"profession"}
                                label={"Profession"}
                            />
                        </div>

                        {/* About */}
                        <div className="mb-3">
                            <TextAreaForm
                                id={"about"}
                                inputValue={profile.about}
                                changeHandler={function (
                                    e: React.ChangeEvent<HTMLTextAreaElement>
                                ): void {
                                    setProfile({ ...profile, about: e.target.value });
                                }}
                                label={"About"}
                            />
                        </div>

                        {/* Website */}
                        <div className="mb-3">
                            <InputForm
                                changeHandler={function (
                                    e: React.ChangeEvent<HTMLInputElement>
                                ): void {
                                    setProfile({ ...profile, website: e.target.value });
                                }}
                                inputValue={profile.website}
                                type={"url"}
                                id={"website"}
                                label={"Website"}
                            />
                        </div>

                        {/* Phone */}
                        <div className="mb-3">
                            <InputForm
                                changeHandler={function (
                                    e: React.ChangeEvent<HTMLInputElement>
                                ): void {
                                    setProfile({ ...profile, phone: e.target.value });
                                }}
                                inputValue={profile.phone}
                                type={"tel"}
                                id={"phone"}
                                label={"Phone"}
                            />
                        </div>

                        {/* Save Button */}
                        <div className="d-flex justify-content-end">
                            <button
                                onClick={updateDetails}
                                type="button"
                                className="btn btn-success d-flex align-items-center"
                            >
                                <span>Update details</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Page;
