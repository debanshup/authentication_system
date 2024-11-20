import { connect } from "@/dbConfig/dbConfig";
import { clearCookie } from "@/helper/cookieManager";
import { getDataFromToken } from "@/helper/dataFetcher";
import { sendVerificationEmail } from "@/helper/mailer";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
  try {
    const decodedUser = await getDataFromToken(request);
    if (!decodedUser) {
      return NextResponse.json({
        success: false,
        status: 400,
        message: "A fatal error occured!",
      });
    }
    const reqBody = await request.json();
    const { newEmail } = reqBody;

    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail);
    if (!emailValid) {
      return NextResponse.json({
        success: false,
        status: 400,
        message: "Please enter a valid email id",
      });
    }

    if (decodedUser.email === newEmail) {
      return NextResponse.json({
        success: false,
        status: 400,
        message: "Please enter a new email id.",
      });
    }

    const user = await User.findOne({
      email: newEmail,
    });

    if (user) {
      return NextResponse.json({
        success: false,
        status: 400,
        message:
          "This email id is already used by another user. Please enter a different email id.",
      });
    }

    const existedUser = await User.findOne({
      email: decodedUser.email,
    });

    existedUser.newEmail = newEmail;
    const token = existedUser.createNewEmailVerificationToken();
    
    await sendVerificationEmail({ email: newEmail, token, emailType: "updated" });
    await existedUser.save();
    const response = NextResponse.json({
      success: true,
      message: `A verification email has been sent to ${newEmail}. Please check your inbox.`,
    });

    // return clearCookie(response);
    return response;

    // change cookie
  } catch (error: any) {
    // console.log(error.message);

    return NextResponse.json({
      success: false,
      status: 500,
      message: "Internal server error!",
    });
  }
}
