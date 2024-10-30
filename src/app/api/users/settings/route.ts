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
    console.log(decodedUser);
    const user = await User.findOne({
      _id: decodedUser.id,
    }).select("-password");

    if (!user) {
      return NextResponse.json({
        message: "no user found",
        success: false,
        status: 400,
      });
    }

    return NextResponse.json({
      success: true,
      user: user.username,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Something went wrong",
    });
  }
}
