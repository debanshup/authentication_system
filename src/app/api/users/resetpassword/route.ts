"use server";

import { connect } from "@/dbConfig/dbConfig";
import { NextResponse, NextRequest } from "next/server";
// import axios from "axios";
// import { Jwt } from "jsonwebtoken";
// import { stat } from "fs";
// import { URL } from "url";
import User from "@/models/userModel";
import crypto from "crypto";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { password, confirmPassword, token } = reqBody;
    if (
      token.length > 0 &&
      password === confirmPassword &&
      password.length === confirmPassword.length
    ) {

      // hash token
      const hashedToken = crypto
        .createHash("sha256")
        .update(token)
        .digest("hex");
      const user = await User.findOne({
        passwordResetToken: hashedToken,
        passwordResetTokenExpires: { $gt: Date.now() },
      });
      if (!user) {
        return NextResponse.json({
          message: "No user found",
          status: 400,
        });
      }

      
      // console.log(user);

      user.password = confirmPassword;

      // clear token
      user.clearPasswordResetToken();

      await user.save();

      console.log(user);
    }

    console.log("password changed successfully");

    return NextResponse.json({
      status: 200,
    });
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json({
      status: 500,
    });
  }
}
