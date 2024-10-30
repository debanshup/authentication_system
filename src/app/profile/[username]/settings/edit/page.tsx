"use client";
import React, { useState } from "react";
import InputForm from "@/app/components/InputForm";
import TextAreaForm from "@/app/components/TextAreaForm";
const Page = () => {
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
    const [editedProfile, setEditedProfile] = useState({
        // newImage: "",
        newProfession: "",
        newEmail: "",
        newPhone: "",
        newWebsite: "",
        newAbout: "",
        newFullname: "",
        newUsername: "",
    });

    return (
        <div className="container form-control border-0 p-5 bg-light">
            <div className="row mb-4">
                <div className="col-md-9">
                    <div className="mb-4">
                        <InputForm
                            changeHandler={(e: React.ChangeEvent<HTMLInputElement>): void => {
                                setEditedProfile({ ...editedProfile, newFullname: e.target.value });
                            }}
                            inputValue={editedProfile.newFullname}
                            type="text"
                            id="fullname"
                            label="Full Name"
                        />
                    </div>

                    <div className="mb-4">
                        <InputForm
                            changeHandler={(e: React.ChangeEvent<HTMLInputElement>): void => {
                                setEditedProfile({ ...editedProfile, newUsername: e.target.value });
                            }}
                            inputValue={editedProfile.newUsername}
                            type="text"
                            id="username"
                            label="Username"
                        />
                    </div>

                    <div className="d-flex align-items-center gap-2 mb-4">
                        <InputForm
                            changeHandler={(e: React.ChangeEvent<HTMLInputElement>): void => {
                                setEditedProfile({ ...editedProfile, newEmail: e.target.value });
                            }}
                            inputValue={editedProfile.newEmail}
                            type="email"
                            id="email"
                            label="Email"
                        />
                        <button className="btn btn-sm btn-outline-primary">Verify</button>
                    </div>

                    <div className="mb-4">
                        <InputForm
                            changeHandler={(e: React.ChangeEvent<HTMLInputElement>): void => {
                                setEditedProfile({ ...editedProfile, newPhone: e.target.value });
                            }}
                            inputValue={editedProfile.newPhone}
                            type="tel"
                            id="phone"
                            label="Phone"
                        />
                    </div>

                    <div className="mb-4">
                        <InputForm
                            changeHandler={(e: React.ChangeEvent<HTMLInputElement>): void => {
                                setEditedProfile({ ...editedProfile, newProfession: e.target.value });
                            }}
                            inputValue={editedProfile.newProfession}
                            type="text"
                            id="profession"
                            label="Profession"
                        />
                    </div>

                    <div className="mb-4">
                        <TextAreaForm
                            id="about"
                            inputValue={editedProfile.newAbout}
                            changeHandler={(e: React.ChangeEvent<HTMLTextAreaElement>): void => {
                                setEditedProfile({ ...editedProfile, newAbout: e.target.value });
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
                <button className="btn btn-sm btn-secondary">Cancel</button>
                <button className="btn btn-sm btn-success">Save</button>
            </div>
        </div>

    );
};

export default Page;
