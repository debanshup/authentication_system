import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import User from "@/models/userModel";
import { clearCookie } from "@/helper/cookieManager";
connect();

export async function POST(request: NextRequest) {
  // console.log("Hi");

  try {
    const reqBody = await request.json();
    const { token } = reqBody;

    // get this token from relevent page's window section

    const encryptedToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");
    const user = await User.findOne({
      newEmailVerificationToken: encryptedToken,
      newEmailVerificationTokenExpires: { $gt: Date.now() },
      // isnewEmailVerified: false,
    });

    // console.log(user);
    user.email = user.newEmail;
    user.setEmailVerified();
    user.clearNewEmailVerificationToken();
    user.newEmail = undefined;
    await user.save();
    const response = NextResponse.json({
      success: true,
      status: 200,
      message: "Email successfully changed",
    });

    return clearCookie(response);
  } catch (error) {
    return NextResponse.json({
      success: false,
      status: 500,
    });
  }
}
