import OTP from "@/models/otpModel";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";

connect();

// use post instead of get
export async function POST(request: NextRequest) {
  // console.log("entered reqid route");

  try {
    const reqbody = await request.json();
    const { email } = reqbody;

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({
        success: false,
        status: 400,
      });
    }

    const otpRecord = await OTP.findOne({ userId: user._id });
    // console.log(otpRecord.userId);

    const reqId = otpRecord.createReqId();

    await otpRecord.save();

    return NextResponse.json({ id: reqId, success: true, status: 200 });
  } catch (error: any) {
    console.log(error.message);

    return NextResponse.json({
      success: false,
      status: 500,
    });
  }
}
