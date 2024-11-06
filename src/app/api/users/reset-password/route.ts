"use server";

import { connect } from "@/dbConfig/dbConfig";
import { NextResponse, NextRequest } from "next/server";
import User from "@/models/userModel";
import crypto from "crypto";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { password, confirmPassword, token } = reqBody;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const passwordValid =
      passwordRegex.test(password) && password === confirmPassword;

    if (!(token || passwordValid)) {
      return NextResponse.json({
        message: "Bad request",
        success: false,
        status: 400,
      });
    }
    // hash token
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetTokenExpires: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json({
        token_expired: true,
        message:
          "Your session has timed out. Please restart the password reset process.",
        status: 400,
      });
    }

    user.password = confirmPassword;

    user.clearPasswordResetToken();

    await user.save();

    return NextResponse.json({
      status: 200,
      message: "password changed successfully",
    });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({
      status: 500,
    });
  }
}
