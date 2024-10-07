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

    const encryptedOtp = crypto.createHash("sha256").update(otp).digest("hex");

    const encryptedReqId = crypto
      .createHash("sha256")
      .update(reqId)
      .digest("hex");

    const otpRecord = await OTP.findOne({
      otp: encryptedOtp,
      otpExpires: { $gt: Date.now() },
      reqId: encryptedReqId,
      reqIdExpires: { $gt: Date.now() },
    });

    // console.log("record found");

    console.log(otpRecord);

    if (!otpRecord) {
      // console.log("record not found");

      return NextResponse.json({
        success: false,
        message: "Invalid or expired OTP.",
      });
    }

    otpRecord.clearOtp();

    await otpRecord.save();

    return NextResponse.json({
      success: true,
      message: "OTP verified successfully",
    });
  } catch (error: any) {
    console.log(error.message);

    return NextResponse.json({
      message: "Somrthing went wrong",
      status: 500,
    });
  }
}
