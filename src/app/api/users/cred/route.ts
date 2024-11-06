"use server";

import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { sendPasswordResetEmail } from "@/helper/mailer";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import OTP from "@/models/OTPModel";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email } = reqBody;
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    if (!emailValid) {
      return NextResponse.json({
        success: false,
       email_valid: false,
      });
    }
    // find if user exists
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({
        success: false,
        user_exist: false,
      });
    }

    // find otprecord based on user Id
    const otpRecord = await OTP.findOne({ userId: user._id });

    // if otprecord does not exist throw relevent error
    if (!otpRecord) {
      return NextResponse.json({
        success: false,
        otp_record_exist: false,
      });
    }

    // create new otp
    const otp = otpRecord.generateOtp();
    const username = user.username;
    await otpRecord.save();

    // send mail
    await sendPasswordResetEmail({ email, otp, username });

    // return res
    return NextResponse.json({
      status: 200,
      otp_sent_status: true,
    });
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json({
      success: false,
      error: error.message,
      status: 500,
    });
  }
}

// create another route api named confirmation to compare between dbOTP and entered otp
