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
    
    if (!token || !(password === confirmPassword)) {
      return NextResponse.json({message: 'Bad request', success: false, status: 400})
    }
      // hash token
      const hashedToken = crypto
        .createHash("sha256")
        .update(token)
        .digest("hex");

      console.log(hashedToken);

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

      console.log(user);
      

      user.password = confirmPassword;

      user.clearPasswordResetToken();

      await user.save();

    console.log(user);
    
    
    

    return NextResponse.json({
      status: 200,
      message: "password changed successfully"
    });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({
      status: 500,
    });
  }
}
