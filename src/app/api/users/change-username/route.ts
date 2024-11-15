import { connect } from "@/dbConfig/dbConfig";
import { generateCookie } from "@/helper/cookieManager";
import { getDataFromToken } from "@/helper/dataFetcher";
import { sendVerificationEmail } from "@/helper/mailer";
import Profile from "@/models/profileModel";
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
    const { username } = reqBody;
    
    // validate username format using regex
    const usernameValid = /^[a-z\d]{3,}$/.test(username.trim());
    if (!usernameValid) {
      return NextResponse.json({
        message: "Format error!",
        success: false,
      });
    }
    
    
    const savedUser = await User.findOne({ email: decodedUser.email });
    // console.log(savedUser);
    
    if (!savedUser) {
        return NextResponse.json({
            message: "A fatal error occured!",
            success: false,
        });
    }
    if (username === savedUser.username) {
        return NextResponse.json({
            message: "Username must be different",
            success: false,
        });
    }

    const user = await User.findOne({ username: username });

    if (user) {
        return NextResponse.json({
            message: "This username is already used. Please use a different username",
            success: false,
        });
    }
    
    savedUser.username = username;
    await savedUser.save();
    return NextResponse.json({
      message: "Username changed successfully",
      success: true,
    });
  } catch (error) {
    return NextResponse.json({
        message: "Something went wrong!",
        success: false,
        status: 500,
      });
  }
}
