import { getDataFromToken } from "@/helper/dataFetcher";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";
import { URL } from "url";
import Profile from "@/models/profileModel";
import OTP from "@/models/OTPModel";

connect();

export async function GET(request: NextRequest) {
    try {
      const decodedUser = await getDataFromToken(request);
      // console.log(decodedUser);
      const user = await User.findOne({
        email: decodedUser.email,
        _id: decodedUser.id,
      }).select("-password");
      const profileRecord = await Profile.findOne({ userId: user._id });
  // console.log(profileRecord);
  
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
      // console.log(profileRecord.email);

      // await User.deleteMany({})
      // await Profile.deleteMany({})
      // await OTP.deleteMany({})
  
      return NextResponse.json({
        success: true,
        field: {
          profile: {
            isEmailVerified: user.isEmailVerified,
            fullname: user.fullname,
            username: user.username,
            email: user.email,
            phone: profileRecord.phone,
            image: profileRecord.image,
            profession: profileRecord.profession,
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