import { connect } from "@/dbConfig/dbConfig";
import OTP from "@/models/OTPModel";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
connect();
export async function GET(request: NextRequest) {
  // console.log("get-mail route");

  try {
    const reqId: any = request.nextUrl.searchParams.get("token");
    // console.log(reqId);

    const encryptedReqId = crypto
      .createHash("sha256")
      .update(reqId)
      .digest("hex");
    const otpRecord = await OTP.findOne({
      otpExpires: { $gt: Date.now() },
      reqId: encryptedReqId,
      reqIdExpires: { $gt: Date.now() },
    });

    const user = await User.findById(otpRecord.userId.toString()).select(
      "-password"
    );
    // console.log(user);

    return NextResponse.json({
      email: user.email,
      success: true,
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      success: false,
    });
  }
}
