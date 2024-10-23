import { connect } from "@/dbConfig/dbConfig";
import { isUsernameAvailable } from "@/helper/dataFetcher";
import { NextRequest, NextResponse } from "next/server";



connect()


export async function GET(request:NextRequest) {
    try {
    const username = request.nextUrl.searchParams.get("username");
    const isAvailable =  await  isUsernameAvailable(username)
    return NextResponse.json({
        username_available: !isAvailable
    })
    } catch (error) {
        return NextResponse.json({
           success: false,
           status: 500
        })
    }
} 