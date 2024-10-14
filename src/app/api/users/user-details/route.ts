import { getDataFromToken } from "@/helper/dataFetcher";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";
import { URL } from "url";

connect();

export async function GET(request: NextRequest) {
  try {
    const username = request.nextUrl.searchParams.get("name");



    const decodedUser = await getDataFromToken(request);
    // console.log(decodedUser.id);
    const user = await User.findOne({username: username, _id: decodedUser.id}).select("-password");
    // console.log(user);

    if (!user) {
      return NextResponse.json({
        message: "no user found",
        success: false,
        status: 400,
      });
    }
    return NextResponse.json({
      success: true,
      props: { user: JSON.parse(JSON.stringify(user)) },
    });
  } catch (error: any) {
    return NextResponse.json({
      message: error.mssage,
      success: false,
      status: 500,
    });
  }
}
