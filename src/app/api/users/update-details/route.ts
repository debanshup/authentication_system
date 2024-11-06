import { connect } from "@/dbConfig/dbConfig";
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
      image,
      profession,
      email,
      phone,
      website,
      about,
      username,
      fullname,
      isEmailVerified,
    } = reqBody;

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

    profileRecord.image = image || "N/A";
    profileRecord.profession = profession || "N/A";
    profileRecord.phone = phone || "N/A";
    profileRecord.website = website || "N/A";
    profileRecord.about = about || "N/A";
    user.fullname = fullname || "N/A";
    user.username = username || "N/A";
    user.email = email || "N/A";

    await user.save()
    await profileRecord.save()

    return NextResponse.json({
      message: "Profile updated successfully",
      success: true,
    });
  } catch (error) {}
}
