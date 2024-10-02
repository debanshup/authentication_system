"use server";

import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { sendMail } from "@/helper/mailer";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email } = reqBody;

    // send mail
    await sendMail({
      email: email,
      mailType: "reset",
    });

    // return res
    return NextResponse.json({
      status: 200,
      success: true,
    });

  } catch (error: any) {

    console.log(error.message);
    return NextResponse.json({
      seccess: false,
      error: error.message,
      status: 500,
    });
  }
}
