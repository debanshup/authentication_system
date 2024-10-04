import { NextRequest, NextResponse } from "next/server";
import OTP from "@/models/otpModel";


export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { otp } = reqBody;
    
    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Somrthing went wrong",
      status: 500,
    });
  }
}
