import jwt from "jsonwebtoken";
import { NextResponse } from "next/server"; // Ensure NextResponse is imported correctly

export async function generateCookie({
  payload,
  response,
}: {
  payload: any;
  response: NextResponse;
}) {
  try {
    const token = jwt.sign(payload, process.env.TOKEN_SECRET as string, {
      expiresIn: "1d",
    });

    // ***Setting the token as a cookie***
    response.cookies.set("sessionId", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60, // 1 day
      path: "/", // Cookie accessible site-wide
    });

    return response;
  } catch (error) {
    console.error("Error generating cookie:", error);
    return NextResponse.json({
      message: "Failed to generate cookie",
      success: false,
    });
  }
}

export async function updateCookie({
  payload,
  response,
}: {
  payload: any;
  response: NextResponse;
}) {
  try {
    const existingToken = response.cookies.get("sessionId")?.value || "";
    if (!existingToken) {
      return NextResponse.json({
        message: "No existing token found",
        success: false,
      });
    }
    const decodedPayload: any = jwt.verify(
      existingToken,
      process.env.TOKEN_SECRET!
    );

    decodedPayload.email = payload.email;
    decodedPayload.verified = payload.verified;
    const updatedToken = jwt.sign(
      decodedPayload,
      process.env.TOKEN_SECRET as string,
      {
        expiresIn: "1d",
      }
    );

    // Set the updated token in the cookie
    response.cookies.set("sessionId", updatedToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60, // 1 day
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Error updating cookie:", error);
    return NextResponse.json({
      message: "Failed to update cookie",
      success: false,
    });
  }
}

export function generatePayload({}) {
  
}