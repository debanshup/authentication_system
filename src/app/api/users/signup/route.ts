"use server";

import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import { sendVerificationEmail } from "@/helper/mailer";
import User from "@/models/userModel";
import OTP from "@/models/otpModel";
import Profile from "@/models/profileModel";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password, confirmPassword } = reqBody;

    // check if both passwords match

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const usernameValid = /^[^\s]{3,}$/.test(username.trim());
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    const passwordValid =
      passwordRegex.test(password) && password === confirmPassword;

    if (!(usernameValid || passwordValid || emailValid)) {
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

    const newUser = new User({
      username: username,
      email: email,
      password: confirmPassword,
    });

    const token = newUser.createEmailVerificationToken();

    // send verification email

    await sendVerificationEmail({ email, token });

    // save user
    const savedUser = await newUser.save();

    const otpDocument = new OTP({
      userId: savedUser._id,
    });

    const profile = new Profile({
      userId: savedUser._id,
      email: savedUser.email,
    });

    const savedOtpDocument = await otpDocument.save();
    const savedProfile = await profile.save();
    console.log(savedProfile.email);

    return NextResponse.json({
      message: "User created successfully",
      success: true,
      registration_status: savedUser.isEmailVerified,
      user: savedUser,
      otpDocument: savedOtpDocument,
      profile: savedProfile,
      // email: savedUser.email
    });
  } catch (error: any) {
    return NextResponse.json({
      error: error.message,
      status: 500,
    });
  }
}
