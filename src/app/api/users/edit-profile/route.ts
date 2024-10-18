import { connect } from "@/dbConfig/dbConfig";
import Profile from "@/models/profileModel";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
  try {
    // first check if req has cookies
    if (!request.cookies) {
      return NextResponse.json({
        message: "Invalid request",
        success: false,
      });
    }

    // if yes, update the details sent from profile
    const reqBody = await request.json();
    const {
      email,
      image,
      editedProfesson,
      editdEmail,
      editedPhone,
      editedWebsite,
      editedAbout,
    } = reqBody;

const user = await User.findOne({email})
if (!user) {
    return NextResponse.json({
        message: 'No user found',
        success: false
    })
}

const profileRecord = await Profile.findById(user._id)

if (!profileRecord) {
    return NextResponse.json({
        message: 'No profile record found',
        success: false
    })
}


// if email modified, change email in user

// proceed....




  } catch (error) {}
}
