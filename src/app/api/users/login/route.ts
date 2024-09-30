import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel"
import bcryptjs from "bcryptjs"
import { error } from "console";
import { Jwt } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import { connected } from "process";

// connect()

// export async function POST(request: NextRequest) {
//     try {
//         const reqBody = await request.json()
//         const {email, password} = reqBody;
//         console.log(reqBody);

//         // check if user exists
//         const user = await User.findOne({email})
//         if(!user){
//             return NextResponse.json({error: "User does not exist"}, {status: 400})
//         }
//         const validPassword = await bcryptjs.compare(password, user.password)
//         if (!validPassword) {
//             return NextResponse.json(
//                 {
//                     error: "Invalid password",
//                     status: 400
//                 }
//             )
//         }
//         console.log(user);

//         //  create token data

//         const tokenData = {
//             id: user.id,

//         }
        
        
//     } catch (error) {
        
//     }
// }