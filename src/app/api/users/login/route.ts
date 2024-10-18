import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";
import { connected } from "process";
import crypto from "crypto";
import { sendVerificationEmail } from "@/helper/mailer";
import jwt from "jsonwebtoken";
import OTP from "@/models/otpModel";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, password } = reqBody;

    // find user
    const user = await User.findOne({
      $or: [{ username: username }, { email: username }],
    });

    if (!user) {
      return NextResponse.json({
        status: 400,
        message: "Invalid username or password",
        success: false,
        user_exist: false,
      });
    }

    // check if email verified or not
    if (!user.isEmailVerified) {
      const token = user.createEmailVerificationToken();
      await user.save();
      await sendVerificationEmail({ email: user.email, token: token });
      return NextResponse.json({
        message: "Email is not verified, check inbox for verificaion email",
        verification_status: user.isEmailVerified,
        email: user.email

      });
    }

    const matched = await user.comparePassword(password);
    if (!matched) {
      return NextResponse.json({
        message: "Invalid password",
        success: false,
      });
    }

    // generate cookie
    const payload = {
      id: user._id,
      email: user.email,
      role: user.role,
      verified: user.isEmailVerified,
    };

    // sign jwt
    const token = jwt.sign(payload, process.env.TOKEN_SECRET as string, {
      //   algorithm: "none",   will be changed later
      expiresIn: "1d",
    });
    const response = NextResponse.json({
      success: true,
      username: user.username,
      email: user.email,
      verification_status: user.isEmailVerified,
      user_exist: true,

    });

    response.cookies.set("sessionId", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60,
      path: "/", // accessible throughout the site
    });
    // console.log(response.cookies);
    

    return response;
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json({
      message: "something went wrong",
      status: 500,
    });
  }
}
