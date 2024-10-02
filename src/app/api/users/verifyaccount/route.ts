import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const reqBody = request.json();
    console.log("entering verify route");

    console.log(reqBody);

    return NextResponse.json({
      success: true
    });
  } catch (error) {
    return NextResponse.json({
      message: 'Somrthing went wrong',
      status: 500
    })
  }
}
