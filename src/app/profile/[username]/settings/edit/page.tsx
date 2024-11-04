"use client";
import React, { useEffect, useState } from "react";
import InputForm from "@/app/components/InputForm";
import TextAreaForm from "@/app/components/TextAreaForm";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
const Page = () => {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false);
    const [profile, setProfile] = useState({
        image: "",
        profession: "",
        email: "",
        phone: "",
        website: "",
        about: "",
        username: "",
        fullname: "",
    });
    // const [editedProfile, setEditedProfile] = useState({
    //     newProfession: "",
    //     newEmail: "",
    //     newPhone: "",
    //     newWebsite: "",
    //     newAbout: "",
    //     newFullname: "",
    //     newUsername: "",
    // });

    async function getDetails() {
        try {
            const detailsRes = await axios.get("/api/users/get-details-from-request");
            if (detailsRes.data.success) {
                setProfile({
                    email: detailsRes.data.field.profile.email,
                    image: detailsRes.data.field.profile.image,
                    profession: detailsRes.data.field.profile.profession,
                    phone: detailsRes.data.field.profile.phone,
                    website: detailsRes.data.field.profile.website,
                    about: detailsRes.data.field.profile.about,
                    username: detailsRes.data.field.profile.username,
                    fullname: detailsRes.data.field.profile.fullname,
                });
            } else {
                // setIsErrorOccured(true);
            }
        } catch (error) {

        }
    }

    async function updateDetails() {
        try {
            const updateRes = await axios.post("/api/users/update-details", profile)
        } catch (error) {

        }
    }

    useEffect(() => {
        getDetails()

        return () => {
            // second
        }
    }, [])

    // 
    useEffect(() => {



    }, [])



    function handleSave(): void {
        // throw new Error("Function not implemented.");
        try {

        } catch (error) {

        }
    }


    async function verifyBtnClickHandler(): Promise<void> {
        try {
            const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.email);

            if (!emailValid) {
                alert(profile.email)
                toast("Please enter a valid email address!", {
                    className: "bg-danger text-white rounded"
                })
                return
            }
            
            const verificationEmailRes = await axios.post("/api/users/send-verification-email", { email: profile.email })
            if (verificationEmailRes.data.success) {
                toast(verificationEmailRes.data.message, {
                    icon: "✅",
                    duration: 6000
                })
            }
            alert(verificationEmailRes.data.message)
        } catch (error) {
            toast("Something went wrong!", {
                className: "bg-danger text-white rounded"
            })
            return
        }
    }

    return (
        <>
        <Toaster/>
        <div className="container form-control border-0 p-5 bg-light">
            <div className="row mb-4">
                <div className="col-md-9">
                    <div className="mb-4">
                        <InputForm
                            changeHandler={(e: React.ChangeEvent<HTMLInputElement>): void => {
                                setProfile({ ...profile, fullname: e.target.value });
                            }}
                            inputValue={profile.fullname}
                            type="text"
                            id="fullname"
                            label="Full Name"
                        />
                    </div>

                    <div className="mb-4">
                        <InputForm
                            changeHandler={(e: React.ChangeEvent<HTMLInputElement>): void => {
                                setProfile({ ...profile, username: e.target.value.toLowerCase() });
                            }}
                            inputValue={profile.username}
                            type="text"
                            id="username"
                            label="Username"
                        />
                    </div>

                    <div className="d-flex align-items-center gap-2 mb-4">
                        <InputForm
                            changeHandler={(e: React.ChangeEvent<HTMLInputElement>): void => {
                                setProfile({ ...profile, email: e.target.value });
                            }}
                            inputValue={profile.email}
                            type="email"
                            id="email"
                            label="Email"
                        />
                        <button onClick={verifyBtnClickHandler} className="btn btn-sm btn-primary">Verify</button>
                    </div>

                    <div className="mb-4">
                        <InputForm
                            changeHandler={(e: React.ChangeEvent<HTMLInputElement>): void => {
                                setProfile({ ...profile, phone: e.target.value });
                            }}
                            inputValue={profile.phone}
                            type="tel"
                            id="phone"
                            label="Phone"
                        />
                    </div>

                    <div className="mb-4">
                        <InputForm
                            changeHandler={(e: React.ChangeEvent<HTMLInputElement>): void => {
                                setProfile({ ...profile, profession: e.target.value });
                            }}
                            inputValue={profile.profession}
                            type="text"
                            id="profession"
                            label="Profession"
                        />
                    </div>

                    <div className="mb-4">
                        <TextAreaForm
                            id="about"
                            inputValue={profile.about}
                            changeHandler={(e: React.ChangeEvent<HTMLTextAreaElement>): void => {
                                setProfile({ ...profile, about: e.target.value });
                            }}
                            label="About"
                        />
                    </div>
                </div>

                <div className="col-md-3 text-center">
                    <img
                        src="google.com"
                        alt="avatar"
                        className="img-fluid rounded-circle mb-3 border"
                        style={{ maxWidth: "150px" }}
                    />
                    <button className="btn btn-sm btn-outline-secondary">Change Avatar</button>
                </div>
            </div>
            <div className="d-flex justify-content-end gap-2">
                {/* <button onClick={handleCancel} className="btn btn-sm btn-secondary">Cancel</button> */}
                <button onClick={handleSave} className="btn btn-sm btn-success">Update profile</button>
            </div>
        </div>

        </>
    );
};

export default Page;
