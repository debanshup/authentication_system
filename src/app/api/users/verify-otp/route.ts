import { NextRequest, NextResponse } from "next/server";
import OTP from "@/models/OTPModel";
import User from "@/models/userModel";
import crypto from "crypto";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function POST(request: NextRequest) {
  console.log("entered verif route ");

  try {
    const reqBody = await request.json();
    const { otp, reqId } = reqBody;
    console.log(otp);

    const encryptedReqId = crypto
      .createHash("sha256")
      .update(reqId)
      .digest("hex");

    const otpRecord = await OTP.findOne({
      otpExpires: { $gt: Date.now() },
      reqId: encryptedReqId,
      reqIdExpires: { $gt: Date.now() },
    });
    if (!otpRecord) {
      return NextResponse.json({
        message: "Unexpected error occured!",
        success: false,
      });
    }

    const user = await User.findById(otpRecord.userId.toString());

    if (!user) {
      return NextResponse.json({
        message: "Unexpected error occured!",
        success: false,
      });
    }

    const matched = otpRecord.compareOtp(otp);
    // console.log(matched);

    if (!matched) {
      console.log("otp not matched");

      return NextResponse.json({
        message: "The OTP does not match. Please try again.",
        isMatched: false,
      });
    }

    otpRecord.clearOtp();
    otpRecord.clearReqId();

    await otpRecord.save();

    return NextResponse.json({
      isMatched: true,
      success: true,
      message: "OTP verified successfully",
    });
  } catch (error: any) {
    console.log(error.message);

    return NextResponse.json({
      // something went wrong
      success: false,
      message: "Somrthing went wrong",
      status: 500,
    });
  }
}
