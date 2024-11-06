import { getDataFromToken } from "@/helper/dataFetcher";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";
import { URL } from "url";
import Profile from "@/models/profileModel";
import { sendVerificationEmail } from "@/helper/mailer";
import { generateCookie } from "@/helper/cookieManager";

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
    console.log(email);
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailValid) {
      return NextResponse.json({
        message: "Please enter a valid email address!",
        success: false,
      });
    }
    const user = await User.findOne({ email: email });
    const savedUser = await User.findOne({ email: decodedUser.email });

    if (user) {
      if (user.username === savedUser.username && savedUser.isEmailVerified) {
        return NextResponse.json({
          message: `Email already verified`,
        });
      } else if (user.username !== savedUser.username) {
        return NextResponse.json({
          message: "Email already exists",
          success: false,
        });
      }
    }

    const token = savedUser.createEmailVerificationToken();
    await sendVerificationEmail({ email, token });
    savedUser.email = email;
    savedUser.isEmailVerified = false;
    const modifiedUser = await savedUser.save();
    // console.log("saving user:");

    // console.log(x);

    const payload = {
      id: modifiedUser._id,
      email: modifiedUser.email,
      role: modifiedUser.role,
      verified: modifiedUser.isEmailVerified,
    };
    const response = NextResponse.json({
      message: `A verification email has been sent to ${email}`,
      success: true,
    });
    return await generateCookie({ payload, response });
  } catch (error: any) {
    console.log(error.message);

    return NextResponse.json({
      status: 500,
      message: error.message,
      success: false,
    });
  }
}
