import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { sendVerificationEmail } from "@/helper/mailer";
import jwt from "jsonwebtoken";
import { generateCookie } from "@/helper/cookieManager";
connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, password } = reqBody;

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    const passwordValid = passwordRegex.test(password);

    if (!passwordValid) {
      return NextResponse.json({
        status: 400,
        message: "Invalid username or password",
        success: false,
        user_exist: false,
      });
    }

    // find user
    const user = await User.findOne({
      $or: [{ username: username }, { email: username }],
    });

    if (!user || !await user.comparePassword(password)) {
      return NextResponse.json({
        status: 400,
        message: "Invalid username or password",
        success: false,
        user_exist: false,
      });
    }

    // check if email verified or not
    if (!user.isEmailVerified) {
      console.log("Not verified");
      
      // const token = user.createEmailVerificationToken();
      // await user.save();
      // await sendVerificationEmail({ email: user.email, token: token });
      return NextResponse.json({
        message: `Your email is not verified. A verification email has been sent to ${user.email}. Please check your inbox.`,
        user_exist: true,
        verification_status: user.isEmailVerified,
        email: user.email,
      });
    }



    const response = NextResponse.json({
      success: true,
      username: user.username,
      email: user.email,
      verification_status: user.isEmailVerified,
      user_exist: true,
    });

    // generate cookie

    const payload = {
      id: user._id,
      email: user.email,
      role: user.role,
      verified: user.isEmailVerified,
    };

    return await generateCookie({ payload, response });
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json({
      message: "something went wrong",
      status: 500,
    });
  }
}
