import { getDataFromToken } from "@/helper/dataFetcher";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";
import { URL } from "url";
import Profile from "@/models/profileModel";

connect();

export async function GET(request: NextRequest) {
  try {
    const decodedUser = await getDataFromToken(request);

    const user = await User.findById(decodedUser.id).select("-password");
    
    const profile = await Profile.findOne({ userId: user._id });

    if (!user) {
      return NextResponse.json({
        message: "no user found",
        success: false,
        status: 400,
      });
    }
    if (!profile) {
      return NextResponse.json({
        message: "Something went wrong!",
        success: false,
        status: 400,
      });
    }

    return NextResponse.json({
      success: true,
      username: user.username,
      fullname: profile.fullname,
      image: profile.image,
    });
  } catch (error: any) {
    console.log(error.message);

    return NextResponse.json({
      success: false,
      message: "Something went wrong",
    });
  }
}
