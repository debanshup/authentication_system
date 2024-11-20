import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken, isUsernameAvailable } from "@/helper/dataFetcher";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(request: NextRequest) {
  try {
    const username = request.nextUrl.searchParams.get("username");
    try {
      const decodedUser = await getDataFromToken(request);
      if (decodedUser) {
        const existingUser = await User.findOne({ email: decodedUser.email });
        const user = await User.findOne({ username: username });
        if (user && existingUser.username === user.username) {
          return NextResponse.json({
            username_available: true,
          });
        }
      }
    } catch (error: any) {
      // console.log(error.message);.
      
      // this has been intentionally left blank
      
    }
    const isAvailable = await isUsernameAvailable(username);
    // console.log(isAvailable);

    return NextResponse.json({
      username_available: isAvailable,
    });
  } catch (error: any) {
    // console.log(error.message);
    return NextResponse.json({
      success: false,
      status: 500,
    });
  }
}
