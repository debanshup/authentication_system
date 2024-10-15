import { NextRequest, NextResponse } from "next/server";
import OTP from "@/models/otpModel";
import User from "@/models/userModel";
import crypto from "crypto";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function POST(request: NextRequest) {
  console.log("entered verif route ");

  try {
    const reqBody = await request.json();
    const { otp, reqId } = reqBody;


    const encryptedReqId = crypto
      .createHash("sha256")
      .update(reqId)
      .digest("hex");

    const otpRecord = await OTP.findOne({
      otpExpires: { $gt: Date.now() },
      reqId: encryptedReqId,
      reqIdExpires: { $gt: Date.now() },
    });


    const user = await User.findById(otpRecord.userId.toString());


    if (!otpRecord || !user) {

      return NextResponse.json({
        message: "Unexpected error occured!",
        success: false,
      });
    }

    const matched = otpRecord.compareOtp(otp)

    if (!matched) {

      console.log('otp not matched');
      
      return NextResponse.json({
        message: "OTP unmatched",
        isMatched: false,
      });
    }

    otpRecord.clearOtp();
    otpRecord.clearReqId();

    await otpRecord.save();

    return NextResponse.json({
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
