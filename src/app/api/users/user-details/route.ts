import { getDataFromToken } from "@/helper/dataFetcher";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";
import { URL } from "url";
import Profile from "@/models/profileModel";

connect();

export async function GET(request: NextRequest) {
  try {
    const username = request.nextUrl.searchParams.get("username");

    const decodedUser = await getDataFromToken(request);
    // console.log(decodedUser.id);
    const user = await User.findOne({
      username: username,
      _id: decodedUser.id,
    }).select("-password");
    // console.log(user);
    const profileRecord = await Profile.findOne({ userId: user._id });

    if (!user) {
      return NextResponse.json({
        message: "no user found",
        success: false,
        status: 400,
      });
    }
    if (!profileRecord) {
      return NextResponse.json({
        success: false,
        message: "Something went wrong",
      });
    }
    console.log(profileRecord.email);
    
    return NextResponse.json({
      success: true,
      props: {
        profile: {
          email: user.email,
          image: profileRecord.image,
          username: user.username,
          profession: profileRecord.profession,
          phone: profileRecord.phone,
          website: profileRecord.website,
          about: profileRecord.about,
        },
      },
    });
  } catch (error: any) {
    return NextResponse.json({
      message: error.mssage,
      success: false,
      status: 500,
    });
  }
}
