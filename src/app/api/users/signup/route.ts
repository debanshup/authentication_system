"use server";

import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import { sendVerificationEmail } from "@/helper/mailer";
import User from "@/models/userModel";
import OTP from "@/models/OTPModel";
import Profile from "@/models/profileModel";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, fullname, email, password, confirmPassword } = reqBody;

    // check if both passwords match

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const usernameValid = /^[a-z\d]{3,}$/.test(username.trim());
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    const fullnameValid = /^[a-zA-Z\s]{1,}$/.test(fullname);

    const passwordValid =
      passwordRegex.test(password) && password === confirmPassword;

    if (!usernameValid || !passwordValid || !emailValid || !fullnameValid) {
      return NextResponse.json({ success: false, status: 400 });
    }

    // if user already exists
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return NextResponse.json({
        message: `An account with the email ${emailExists.email} already exists. Please log in to continue, or use a different email to sign up.`,
        status: 400,
        registration_status: emailExists.isEmailVerified,
        email_exist: true,
      });
    }

    // Check if username already exists
    const usernameExists = await User.findOne({ username });
    if (usernameExists) {
      return NextResponse.json({
        message: "Username already exists",
        status: 400,
        registration_status: usernameExists.isEmailVerified,
        username_exist: true,
      });
    }

    const user = await User.create({
      username: username,
      email: email,
      password: confirmPassword,
    });
    // console.log(savedUser);
    const profile = await Profile.create({
      userId: user._id,
      fullname: fullname,
      email: user.email,
      image: `https://ui-avatars.com/api/?name=${encodeURIComponent(
        fullname || username
      )}&background=random&color=random&size=128`,
    });
    const otpDocument = await OTP.create({
      userId: user._id,
    });
    // send verification email
    // const token = user.createEmailVerificationToken();

    // await sendVerificationEmail({ email, token, emailType: "new" });
    await user.save();

    // console.log(user);
    
    return NextResponse.json({
      message: "User created successfully",
      success: true,
      registration_status: user.isEmailVerified,
      // user: user,
      // otpDocument: otpDocument,
      // profile: profile,
      // email: user.email,
    });
  } catch (error: any) {
    console.log(error.message);

    return NextResponse.json({
      error: error.message,
      status: 500,
    });
  }
}