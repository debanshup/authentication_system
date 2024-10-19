"use server";

import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
// import bcryptjs from "bcryptjs";
import { sendVerificationEmail } from "@/helper/mailer";
// import axios from "axios";
// import { redirect } from "next/navigation";
// import { revalidatePath } from "next/cache";
import User from "@/models/userModel";
import OTP from "@/models/otpModel";
import Profile from "@/models/profileModel"

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password, confirmedPassword } = reqBody;

    // check if both passwords match

    if (!(password === confirmedPassword) || !password || !confirmedPassword) {
      return NextResponse.json({ success: false, status: 400 });
    }
    // if user already exists

    const user = await User.findOne({ email });


    if (user) {
      return NextResponse.json({
        message: "User already exists",
        status: 400,
        registration_status: user.isEmailVerified,
        user_exist: true
      });
    }

    const newUser = new User({
      username: username,
      email: email,
      password: confirmedPassword,
    });

    const token = newUser.createEmailVerificationToken();

    // send verification email

    await sendVerificationEmail({ email, token });

    // save user
    const savedUser = await newUser.save();

    const otpDocument = new OTP({
      userId: savedUser._id,
    });

    const profile = new Profile ({
      userId: savedUser._id,
    })

    const savedOtpDocument = await otpDocument.save();
    const savedProfile = await profile.save()

    return NextResponse.json({
      message: "User created successfully",
      success: true,
      registration_status: user.isEmailVerified,
      user: savedUser,
      otpDocument: savedOtpDocument,
      profile: savedProfile
      // email: savedUser.email
    });
  } catch (error: any) {
    return NextResponse.json({
      error: error.message,
      status: 500,
    });
  }
}
