import OTP from "@/models/otpModel";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import { stat } from "fs";

connect();

export async function GET(request: NextRequest) {
  console.log("entered reqid route");

  try {
    const email = request.nextUrl.searchParams.get("credId");
    console.log(email);

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({
        success: false,
        status: 400,
      });
    }
    console.log("user found");

    // console.log(user._id);

    const otpRecord = await OTP.findOne({ userId: user._id });
    console.log(otpRecord.userId);

    const reqId = otpRecord.createReqId();

    // create reqId

    // console.log("getting req id");

    // console.log(reqId);

    return NextResponse.json({ id: reqId, success: true, status: 200 });
  } catch (error: any) {
    console.log(error.message);

    return NextResponse.json({
      success: false,
      status: 500,
    });
  }
}
