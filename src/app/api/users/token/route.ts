import { connect } from "@/dbConfig/dbConfig";
import OTP from "@/models/otpModel";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { reqId } = reqBody;
    const encryptedReqId = crypto
      .createHash("sha256")
      .update(reqId)
      .digest("hex");
    const otpRecord = await OTP.findOne({ reqId: encryptedReqId });
    if (!otpRecord) {
      return NextResponse.json({ message: "invalid req id", success: false });
    }
    const user = await User.findById(otpRecord.userId.toString());
    console.log(user);

    if (!user) {
      return NextResponse.json({ message: "Invalid creds", success: false });
    }

    const token = user.createPasswordResetToken();
    await user.save();

    return NextResponse.json({
      value: token,
      success: true,
      message: "token generated successfully",
      status: 200,
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      status: 500,
    });
  }
}
