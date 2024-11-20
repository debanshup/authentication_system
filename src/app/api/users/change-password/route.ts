import { connect } from "@/dbConfig/dbConfig";
import { clearCookie } from "@/helper/cookieManager";
import { getDataFromToken } from "@/helper/dataFetcher";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

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
    const { currentPassword, updatedPassword } = reqBody;

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    const passwordValid =
      passwordRegex.test(currentPassword) &&
      passwordRegex.test(updatedPassword);

    if (!passwordValid) {
      return NextResponse.json({
        success: false,
        status: 400,
        message: "Format error!",
      });
    }

    const user = await User.findOne({
      email: decodedUser.email,
    });

    if (!user || !(await user.comparePassword(currentPassword))) {
      return NextResponse.json({
        success: false,
        status: 400,
        message: "Invalid credentials or user not found!",
      });
    }

    // const profile = await Profile.findOne({ userId: user._id });
    // if (!profile) {
    //   return NextResponse.json({
    //     success: false,
    //     status: 400,
    //     message: "Something went wrong!",
    //   });
    // }

    user.password = updatedPassword;

    await user.save();
    const response = NextResponse.json({
      success: true,
      message: "Password changed successfully. Log in to continue.",
    });

    return clearCookie(response);
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      status: 500,
      message: error.message || "Internal server error!",
    });
  }
}
