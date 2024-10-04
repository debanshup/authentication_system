import nodemailer from "nodemailer";
import User from "@/models/userModel";
import OTP from "@/models/otpModel";
import { MailType } from "@/types/enums";
import { NextResponse } from "next/server";

const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

export async function sendMail({ email, mailType }: any) {
  // try {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("User not found"); // this error will be handled in its caller
  }
  let mailOptions: any, token: string;

  if (mailType === MailType.RESET) {
    const otpRecord = await OTP.findOne({ userId: user._id })
    const otp = otpRecord.generateOtp();
    // const reqId = (await OTP.findOne({ userId: user._id })).ceateReqId();

    // token = user.createPasswordResetToken();
    await otpRecord.save();

    mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Password Reset Request",
      html: `
    <div style="font-family: Arial, sans-serif; padding: 20px;">
      <h2 style="color: #333;">Hello ${user.username},</h2>
      
      <p style="font-size: 16px; color: #555;">
        We received a request to verify your email address. Use the OTP below to complete your verification.
      </p>
      
      <div style="background-color: #f4f4f4; padding: 10px; text-align: center; margin: 20px 0;">
        <h1 style="color: #2c3e50;">${otp}</h1>
      </div>
      
      <p style="font-size: 14px; color: #999;">
        The OTP is valid for 10 minutes. If you did not request this, please ignore this email.
      </p>
      
      <p style="font-size: 16px; color: #333;">
        Regards,<br />
        Your Company Team
      </p>
    </div>
            `,
    };
  } else if (mailType === MailType.VERIFICATION) {
    token = user.createEmailVerificationToken();
    await user.save();
    mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Email Verification",
      html: `
                <p>Thank you for registering. Please verify your email by clicking the link below:</p>
                <a href="${process.env.DOMAIN}/confirmation?token=${token}">Verify Email</a>
                <p>This link will expire in 10 minutes.</p>
            `,
    };
  }

  const info = await transporter.sendMail(mailOptions);
  console.log("email sent to " + email);
  return info;

  // } catch (error: any) {
  //   //
  //   // console.error(error.message)
  //   return NextResponse.json({
  //     message: error.message,
  //     status: 500
  //   })

  // }
}
