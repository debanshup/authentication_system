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
    // console.log(decodedUser);
    const user = await User.findById(decodedUser.id).select("-password");
    
    if (!user) {
      return NextResponse.json({
        message: "no user found",
        success: false,
        status: 400,
      });
    }
    // console.log(user);
    // console.log(decodedUser);

    return NextResponse.json({
      success: true,
      username: user.username,
      fullname: user.fullname,
      image: user.image,
    });
  } catch (error: any) {
    console.log(error.message);

    return NextResponse.json({
      success: false,
      message: "Something went wrong",
    });
  }
}
