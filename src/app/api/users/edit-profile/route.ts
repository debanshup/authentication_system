import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helper/dataFetcher";
import { sendVerificationEmail } from "@/helper/mailer";
import Profile from "@/models/profileModel";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
  try {
    // first check if req has cookies
    const decodedUser = await getDataFromToken(request);
    if (!decodedUser) {
      return NextResponse.json({
        message: "Error!",
        success: false,
      });
    }

    // if yes, update the details sent from profile
    const reqBody = await request.json();
    const {
      // email,
      newImage,
      newProfession,
      newEmail,
      newPhone,
      newWebsite,
      newAbout,
    } = reqBody;
    // console.log(newEmail);

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



    // if email modified, change email in user
    // const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail.trim());
    // if (newEmail && newEmail !== user.email) {
    //   console.log("email modified to" + newEmail);
    //   user.email = newEmail;
    //   const token = user.createEmailVerificationToken();
    //   await sendVerificationEmail({ email: newEmail, token });
    //   await user.save();
    // }
    // profileRecord.email = user.email;


    profileRecord.image = newImage || "N/A";
    profileRecord.profession = newProfession || "N/A";
    profileRecord.phone = newPhone || "N/A";
    profileRecord.website = newWebsite || "N/A";
    profileRecord.about = newAbout || "N/A";

    // update profile

    const savedProfileRecord = await profileRecord.save();
    // console.log(savedProfileRecord);

    // proceed....
    return NextResponse.json({
      new_profile: savedProfileRecord,
      success: true,
      profile_updated: true,
      status: 200,
    });
  } catch (error: any) {
    return NextResponse.json({
      message: error.message,
      success: false,
      status: 500,
    });
  }
}
