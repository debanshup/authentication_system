import { getDataFromToken } from "@/helper/dataFetcher";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";
import { URL } from "url";
import Profile from "@/models/profileModel";
import { sendVerificationEmail } from "@/helper/mailer";

connect();

export async function POST(request: NextRequest) {
  try {
    const decodedUser = await getDataFromToken(request);
    if (!decodedUser) {
      return NextResponse.json({
        message: "Error!",
        success: false,
      });
    }
    const reqBody = await request.json();
    const { email } = reqBody;
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailValid) {
      return NextResponse.json({
        message: "Please enter a valid email address!",
        success: false,
      });
    }
    const user = await User.findOne({ email });
    const savedUser = await User.findOne({ email: decodedUser.email });
    if (user) {
      // apply some validtion
    }
    if (!savedUser) {
      // apply some validtion
    }

    const token = user.createEmailVerificationToken();
    await sendVerificationEmail({ email, token });
    await user.save();
    return NextResponse.json({
      message: `A verification email has been sent to ${email}`,
      success: true,
    });
  } catch (error: any) {
    console.log(error);

    return NextResponse.json({
      status: 500,
      message: error.message,
      success: false,
    });
  }
}
