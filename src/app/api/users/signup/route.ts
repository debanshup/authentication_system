"use server";

import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
// import bcryptjs from "bcryptjs";
import { sendVerificationEmail } from "@/helper/mailer";
// import axios from "axios";
// import { redirect } from "next/navigation";
// import { revalidatePath } from "next/cache";
import OTP from "@/models/otpModel";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password, confirmedPassword } = reqBody;

    // check if both passwords match

    if (password === confirmedPassword) {
      // if user already exists

      const user = await User.findOne({ email });
      // console.log(user.isEmailVerified);

      if (user) {
        return NextResponse.json({
          error: "User already exists",
          status: 400,
          registration_status: user.isEmailVerified,
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
        userId: (await User.findOne({ email }))._id,
      });

      const savedOtpDocument = await otpDocument.save();

      return NextResponse.json({
        message: "User created successfully",
        success: true,
        // id: savedUser.id
        user: savedUser,
        otpDocument: savedOtpDocument,
        // email: savedUser.email
      });
    }
  } catch (error: any) {
    console.log(error.error);

    return NextResponse.json({
      error: error.message,
      status: 500,
    });
  }
}
