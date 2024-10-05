import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import User from "@/models/userModel";

connect();

export async function GET(request: NextRequest) {
  console.log("entering ve route");

  try {
    const token = request.nextUrl.searchParams.get("token") || "";

    // get this token from relevent page's window section

    const encryptedToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    const user = await User.findOne({
      emailVerificationToken: encryptedToken,
      emailVerificationTokenExpires: { $gt: Date.now() },
    });

    console.log(encryptedToken);

    if (!user) {
      throw new Error("invalid or expired token");
    }

    // after confirmation clear verification token
    // user.clearEmailVerificationToken();

    // set Verified = true
    user.setEmailVerified();

    await user.save();

    return NextResponse.json({
      success: true,
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      status: 500,
    });
  }
}
