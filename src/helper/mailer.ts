import nodemailer from "nodemailer";
import User from "@/models/userModel";
import OTP from "@/models/otpModel"
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
      throw new Error("User not found");  // this error will be handled in its caller
    }
    let mailOptions: any, token: string;

    if (mailType === MailType.RESET) {
      token = user.createPasswordResetToken();
      await user.save();

      mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: "Password Reset Request",
        html: `
                <p>You have requested a password reset. Please use the following link to reset your password:</p>
                <a href="${process.env.DOMAIN}/resetpassword?token=${token}">Reset Password</a>
                <p>This link will expire in 10 minutes.</p>
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
    
    const info = await transporter.sendMail(mailOptions)
    console.log('email sent to '+email);
    return info
    
  // } catch (error: any) {
  //   //
  //   // console.error(error.message)
  //   return NextResponse.json({
  //     message: error.message,
  //     status: 500
  //   })
    
  // }
}
