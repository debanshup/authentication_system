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
    const router = useRouter()
    const usernameInput = useInputFocus();
    const emailInput = useInputFocus();
    const [isLoadingVerify, setIsLoadingVerify] = useState(false);
    const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
    // const [usernameAvailable, setUsernameAvailable] = useState(false);
    const [isProfileUpdated, setIsProfileUpdated] = useState(false)
    const [isEmailSent, setIsEmailSent] = useState(false);
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")

    const [isEmailVerified, setIsEmailVerified] = useState(false);
    // const[isEmailAlreadyUsed, setIsEmailAlreadyUsed]= useState(false)

    const [showUpdateAlert, setShowUpdateAlert] = useState(false);
    const handleCloseUpdateAlert = () => setShowUpdateAlert(false);
    // const handleShowAlert = () => setShowAlert(true);

    const [showEmailSentAlert, setShowEmailSentAlert] = useState(false)
    const handleCloseEmailSentAlert = () => setShowEmailSentAlert(false);

    const [showEmailNotVerifiedAlert, setShowEmailNotVerifiedAlert] = useState(false)
    const handleCloseEmailNotVerifiedAlert = () => setShowEmailNotVerifiedAlert(false);



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


    const usernameValid = /^[a-z\d]{3,}$/.test(profile.username);
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.email);
    const allValid = usernameValid && emailValid;
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
                setIsEmailVerified(detailsRes.data.field.profile.verified);
            } else {
                // setIsErrorOccured(true);
                toast.error("Error updating profile");
            }
        } catch (error: any) {
            toast.error(error.message);
        }
    }

    async function updateDetails() {
        setIsLoadingUpdate(true);
        try {
            if (allValid) {
                const updateRes = await axios.post(
                    "/api/users/update-details",
                    profile
                );
                if (updateRes.data.success) {
                    setIsProfileUpdated(true)
                    setShowUpdateAlert(true)
                    setUsername(profile.username)
                    toast.success("Profile updated successfully");
                } else {
                    toast("Error saving details");
                }
            } else {
                toast("Please fill up all the required fields");
            }
        } catch (error) {
            toast("Something went wrong");
            setIsLoadingUpdate(true);
        } finally {
            setIsLoadingUpdate(false);
        }
    }

    useEffect(() => {
        getDetails();
    }, []);

    useEffect(() => {
        if (!isEmailVerified) {
            setShowEmailNotVerifiedAlert(true)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function verifyBtnClickHandler(): Promise<void> {
        setIsLoadingVerify(true);
        try {
            if (!emailValid) {
                toast("Please enter a valid email address!", {
                    className: "bg-danger text-white rounded",
                });
                return;
            } else if (emailValid) {
                const verificationEmailRes = await axios.post(
                    "/api/users/send-verification-email",
                    { email: profile.email }
                );
                if (verificationEmailRes.data.success) {
                    setEmail(profile.email)
                    setIsEmailSent(true);
                    setShowEmailSentAlert(true)
                    setShowEmailNotVerifiedAlert(false)
                    toast(verificationEmailRes.data.message, {
                        icon: "✅",
                        duration: 6000,
                    });
                } else if (verificationEmailRes.data.already_verified) {
                    setIsEmailVerified(true);
                    toast(verificationEmailRes.data.message, {
                        icon: "⚠️",
                    });
                } else if (verificationEmailRes.data.already_used) {
                    toast(verificationEmailRes.data.message, {
                        icon: "⚠️",
                    });
                } else {
                    toast(verificationEmailRes.data.message);
                }
            } else {
                toast("Please provide a valid email address");
            }
        } catch (error) {
            toast("Something went wrong!", {
                className: "bg-danger text-white rounded",
            });
            return;
        } finally {
            // setIsEmailSent(false);
            setIsLoadingVerify(false);
            // window.location.reload()
        }
    }

    function changeBtnClickHandler(): void {
        router.push(`/profile/${profile.username}/settings/account`)
    }

    return (
        <>
            <Toaster />
            {isProfileUpdated && (<AlertDismissible type="success" show={showUpdateAlert}
                onClose={handleCloseUpdateAlert} heading={"Profile updated successfully"} >
                <p>
                    view your <a href={`/profile/${username}`}>profile</a>
                </p>
            </AlertDismissible>)}

            {isEmailSent && (<AlertDismissible type="success" show={showEmailSentAlert}
                onClose={handleCloseEmailSentAlert} heading={"Email sent successfully"} >
                <p>
                    A verification email has been sent to {email}
                </p>
            </AlertDismissible>)}
            {!isEmailVerified && (<AlertDismissible type="danger" show={showEmailNotVerifiedAlert}
                onClose={handleCloseEmailNotVerifiedAlert} heading={"Email not verified!"} >
                <p>
                    Email is not verified. Please <Link href={""} onClick={verifyBtnClickHandler}>verify</Link>
                </p>
            </AlertDismissible>)}
            {/* <PopUp show={true} handleClose={function (): void {
                ;
            } } >
                <p>Alert</p>
            </PopUp> */}

            <div className="container form-control border-0 p-5 bg-light">
                <div className="row mb-4">
                    <div className="col-md-9">
                        <div className="mb-4">
                            <InputForm
                                changeHandler={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                ): void => {
                                    setProfile({ ...profile, fullname: e.target.value });
                                }}
                                inputValue={profile.fullname}
                                type="text"
                                id="fullname"
                                label="Full Name"
                                disabled={isLoadingUpdate || isLoadingVerify}
                            />
                        </div>

                        <div className="d-flex align-items-center gap-2 mb-4">
                            <InputForm
                                onFocus={usernameInput.handleFocus}
                                changeHandler={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                ): void => {
                                    setProfile({
                                        ...profile,
                                        username: e.target.value.toLowerCase(),
                                    });
                                }}
                                inputValue={profile.username}
                                type="text"
                                id="username"
                                label="Username"
                                disabled
                            />

                            <button className="btn btn-sm btn-warning" onClick={changeBtnClickHandler}>
                                Change
                            </button>
                        </div>

                        <div className="d-flex align-items-center gap-2 mb-4">
                            <InputForm
                                onFocus={emailInput.handleFocus}
                                changeHandler={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                ): void => {
                                    setIsEmailVerified(false);
                                    setProfile({ ...profile, email: e.target.value });
                                }}
                                inputValue={profile.email}
                                type="email"
                                id="email"
                                label="Email"
                                disabled={true}
                            />
                            <button className="btn btn-sm btn-warning" onClick={changeBtnClickHandler}>
                                Change
                            </button>
                        </div>

                        <div className="mb-4">
                            <InputForm
                                changeHandler={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                ): void => {
                                    setProfile({ ...profile, phone: e.target.value });
                                }}
                                inputValue={profile.phone}
                                type="tel"
                                id="phone"
                                label="Phone"
                                disabled={isLoadingUpdate || isLoadingVerify}
                            />
                        </div>

                        <div className="mb-4">
                            <InputForm
                                changeHandler={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                ): void => {
                                    setProfile({ ...profile, profession: e.target.value });
                                }}
                                inputValue={profile.profession}
                                type="text"
                                id="profession"
                                label="Profession"
                                disabled={isLoadingUpdate || isLoadingVerify}
                            />
                        </div>
                        <div className="mb-4">
                            <InputForm
                                changeHandler={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                ): void => {
                                    setProfile({ ...profile, website: e.target.value });
                                }}
                                inputValue={profile.website}
                                type="url"
                                id="website"
                                label="website"
                                disabled={isLoadingUpdate || isLoadingVerify}
                            />
                        </div>

                        <div className="mb-4">
                            <TextAreaForm
                                id="about"
                                inputValue={profile.about}
                                changeHandler={(
                                    e: React.ChangeEvent<HTMLTextAreaElement>
                                ): void => {
                                    setProfile({ ...profile, about: e.target.value });
                                }}
                                label="About"
                                disabled={isLoadingUpdate || isLoadingVerify}
                            />
                        </div>
                    </div>

                    <div className="col-md-3 text-center">
                        <img
                            src={profile.image}
                            alt="avatar"
                            className="img-fluid rounded-circle border"
                        // style={{ maxWidth: "150px" }}
                        />
                    </div>
                </div>
                <div className="d-flex justify-content-start gap-2">
                    {/* <button onClick={handleCancel} className="btn btn-sm btn-secondary">Cancel</button> */}
                    <button
                        onClick={updateDetails}
                        className="btn btn-sm btn-success"
                        disabled={isLoadingUpdate || isLoadingVerify}
                    >
                        {isLoadingUpdate ? <Spin /> : "Update details"}
                    </button>
                </div>
            </div>
        </>
    );
};

export default Page;
