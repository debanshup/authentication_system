import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import User from "@/models/userModel";

connect();

export async function POST(request: NextRequest) {
  // console.log("entering ve route");

  try {
    const reqBody = await request.json();
    const { token } = reqBody;

    // get this token from relevent page's window section

    const encryptedToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    console.log(encryptedToken);

    const user = await User.findOne({
      emailVerificationToken: encryptedToken,
      emailVerificationTokenExpires: { $gt: Date.now() },
      isEmailVerified: false,
    });

    // console.log(user);

    if (!user) {
      throw new Error("invalid or expired token");
    }

    // after confirmation clear verification token
    user.clearEmailVerificationToken();

    // set Verified = true
    user.setEmailVerified();

    user.setAccountStatus('active') // create a enum account_status

    await user.save();

    return NextResponse.json({
      success: true,
      status: 200,
      message: "Email successfully verified",
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      status: 500,
    });
  }
}
