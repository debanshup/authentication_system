import { connect } from "@/dbConfig/dbConfig";
import { clearCookie } from "@/helper/cookieManager";
import { getDataFromToken } from "@/helper/dataFetcher";
import OTP from "@/models/OTPModel";
import Profile from "@/models/profileModel";
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
    const { username, dialog, password } = reqBody;
    const usernameValid =
      /^[a-z\d]{3,}$/.test(username.trim()) ||
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(username);
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const passwordValid = passwordRegex.test(password);
    const dialogValid = dialog === "delete";

    if (!usernameValid || !passwordValid || !dialogValid) {
      return NextResponse.json({
        success: false,
        status: 400,
        message: "Format error!",
      });
    }
    const user = await User.findOne({
      $or: [{ username: username }, { email: username }],
      email: decodedUser.email,
    });

    if (!user || !(await user.comparePassword(password))) {
      return NextResponse.json({
        success: false,
        status: 400,
        message: "Invalid credentials or user not found!",
      });
    }
    await OTP.findOneAndDelete({ userId: user._id });
    await Profile.findOneAndDelete({ userId: user._id });
    await User.findOneAndDelete({ _id: user._id });
    const response = NextResponse.json({
      success: true,
      message: "Account deleted!",
    });

    return clearCookie(response);
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      status: 500,
      message: "Internal server error!",
    });
  }
}
