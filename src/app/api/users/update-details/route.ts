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
    const {
      profession,
      phone,
      website,
      about,
      fullname,
    } = reqBody;

    const fullnameValid = /^[a-zA-Z\s]{1,}$/.test(fullname);
if (!fullnameValid) {
  return NextResponse.json({
    message: "Format error!",
    success: false,
  });
}

    const user = await User.findOne({ email: decodedUser.email });

    if (!user) {
      return NextResponse.json({
        message: "No user found",
        success: false,
      });
    }
    const profileRecord = await Profile.findOne({ userId: user._id });

    if (!profileRecord) {
      return NextResponse.json({
        message: "No profile record found",
        success: false,
      });
    }

    profileRecord.image =
      `https://ui-avatars.com/api/?name=${encodeURIComponent(
        fullname
      )}&background=random&color=random&size=128`
    profileRecord.profession = profession;
    profileRecord.phone = phone;
    profileRecord.website = website;
    profileRecord.about = about;
    profileRecord.fullname = fullname;
    await profileRecord.save();
    const response = NextResponse.json({
      message: "Profile updated successfully",
      success: true,
    });

    return response;
  } catch (error) {}
}
