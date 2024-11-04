import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import OTP from "@/models/OTPModel";
import User from "@/models/userModel";

export async function getDataFromToken(request: NextRequest) {
  try {
    const token = request.cookies.get("sessionId")?.value || "";
    const decodedToken: any = jwt.verify(token, process.env.TOKEN_SECRET!);
    return decodedToken;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function getUserFromReqId(reqId: any) {
  try {
    const encryptedReqId = crypto
      .createHash("sha256")
      .update(reqId)
      .digest("hex");

    const otpRecord = await OTP.findOne({
      reqId: encryptedReqId,
      reqIdExpires: { $gt: Date.now() },
    });

    const user = await User.findById(otpRecord.userId.toString()).select(
      "-password"
    );
    return user.email;
  } catch (error: any) {
    throw new Error(error.message);
  }
}


// get avatar from profile
export async function getProfileAvatar(request: NextRequest) {
  try {
    
  } catch (error: any) {
    throw new Error(error.message);
  }
}






export async function isUsernameAvailable(username: any) {
  try {
    const user = await User.findOne({username})
    return user? true : false
  } catch (error) {
    
  }
}
