
// import { getUserFromReqId } from "@/helper/dataFetcher";
// import { NextRequest, NextResponse } from "next/server";

// export async function GET(request:NextRequest) {
//     try {
//         const reqId = request.nextUrl.searchParams.get("reqId");
//         const data = await getUserFromReqId(reqId)
//         return NextResponse.json({
//             email: data,
//             success: true,
//         })
//     } catch (error) {
//         return NextResponse.json({
//            status: 500,
//            success: false,
//         })
//     }
// }