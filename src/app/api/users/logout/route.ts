// import { connect } from "@/dbConfig/dbConfig";

import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helper/dataFetcher";

export async function GET(request: NextRequest) {
  try {
    console.log('entered logout route');
    // const decodedUser = getDataFromToken(request)
    const response = NextResponse.json({ success: true });
    response.cookies.set("sessionId", "", {
      maxAge: -1, // expires immediately
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    return response;
  } catch (error: any) {
    console.error(error.message);
    
    return NextResponse.json({
      success: false,
    });
  }
}
