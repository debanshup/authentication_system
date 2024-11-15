import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import User from "@/models/userModel";
import { getDataFromToken } from "@/helper/dataFetcher";
import { clearCookie } from "@/helper/cookieManager";
connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { token } = reqBody;

    // get this token from relevent page's window section

    const encryptedToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");
    const userPendingEmailChangeReq = await User.findOne({
      newEmailVerificationToken: encryptedToken,
      newEmailVerificationTokenExpires: { $gt: Date.now() },
      // isnewEmailVerified: false,
    });

    console.log(userPendingEmailChangeReq);
    userPendingEmailChangeReq.email = userPendingEmailChangeReq.newEmail;
    userPendingEmailChangeReq.setEmailVerified();
    await userPendingEmailChangeReq.save();
    const response = NextResponse.json({
      success: true,
      status: 200,
      message: "Email successfully changed",
    });

    return clearCookie(response);




  } catch (error) {}
}
