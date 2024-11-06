import { connect } from "@/dbConfig/dbConfig";
import OTP from "@/models/OTPModel";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";


connect();

export async function POST(request: NextRequest) {
  console.log("in token");
  try {

    
    const reqBody = await request.json();
    const { reqId } = reqBody;
    const encryptedReqId = crypto
      .createHash("sha256")
      .update(reqId)
      .digest("hex");

      console.log(encryptedReqId);
      
    const otpRecord = await OTP.findOne({ reqId: encryptedReqId });
    if (!otpRecord) {
      return NextResponse.json({ message: "invalid req id", success: false });
    }
    const user = await User.findById(otpRecord.userId.toString());

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
    // console.log(error.message);
    
    return NextResponse.json({
      success: false,
      status: 500,
      message: error.message
    });
  }
}
