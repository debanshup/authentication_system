"use server";

import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { sendMail } from "@/helper/mailer";

connect();

export async function POST(request: NextRequest) {
    try {
    //   console.log('entered');
    const reqBody = await request.json();
    const { email } = reqBody;
    // console.log(reqBody);
    
    const user = User.findOne({
      email: email,
    });
    console.log(user);
    
    if (!user) {
      return NextResponse.json({
        message: "No user found",
        status: 400,
      });
    }

    // send mail
    await sendMail({
      email: email,
      mailType: "reset",
    });


    return NextResponse.json({
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({
        error: error.message,
        status: 500
    })
  }
}
