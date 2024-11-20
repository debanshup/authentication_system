import { getDataFromToken } from "@/helper/dataFetcher";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function GET(request: NextRequest) {
  try {
    const decodedUser = await getDataFromToken(request);
    // console.log(decodedUser);
    const user = await User.findOne({
      _id: decodedUser.id,
    }).select("-password");
    // const profile = await Profile.findOne({ userId: user._id });
    // if (!user) {
    //   return NextResponse.json({
    //     message: "no user found",
    //     success: false,
    //     status: 400,
    //   });
    // }
    // if (!profile) {
    //   return NextResponse.json({
    //     message: "Something went wrong!",
    //     success: false,
    //     status: 400,
    //   });
    // }
    return NextResponse.json({
      success: true,
      username: user.username,
      // image: profile.image,
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message,
    });
  }
}
