// import nodemailer from "nodemailer";
// const transporter = nodemailer.createTransport({
//   host: "sandbox.smtp.mailtrap.io",
//   port: 2525,
//   auth: {
//     user: process.env.EMAIL,
//     pass: process.env.PASSWORD,
//   },
// });

// export async function sendVerificationEmail({ email, token }: any) {
//   const mailOptions = {
//     from: process.env.EMAIL,
//     to: email,
//     subject: "Email Verification",
//     html: `
//               <p>Thank you for registering. Please verify your email by clicking the link below:</p>
//               <a href="${process.env.DOMAIN}/verifyemail?token=${token}">Verify Email</a>
//               <p>This link will expire in 10 minutes.</p>
//           `,
//   };

//   const info = await transporter.sendMail(mailOptions);
//   console.log("email sent to " + email);
//   return info;
// }

// export async function sendPasswordResetEmail({ email, otp, username }: any) {
//   const mailOptions = {
//     from: process.env.EMAIL,
//     to: email,
//     subject: "Password Reset Request",
//     html: `
//   <div style="font-family: Arial, sans-serif; padding: 20px;">
//     <h2 style="color: #333;">Hello ${username},</h2>
    
//     <p style="font-size: 16px; color: #555;">
//       We received a request to verify your email address. Use the OTP below to complete your verification.
//     </p>
    
//     <div style="background-color: #f4f4f4; padding: 10px; text-align: center; margin: 20px 0;">
//       <h1 style="color: #2c3e50;">${otp}</h1>
//     </div>
    
//     <p style="font-size: 14px; color: #999;">
//       The OTP is valid for 10 minutes. If you did not request this, please ignore this email.
//     </p>
    
//     <p style="font-size: 16px; color: #333;">
//       Regards,<br />
//       Your Company Team
//     </p>
//   </div>
//           `,
//   };

//   const info = await transporter.sendMail(mailOptions);
//   console.log("email sent to " + email);
//   return info;
// }














// use local mail server (mailtrap free tier exhausted)

import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    host: 'localhost',
    port: 1025,
    secure: false,// Disable SSL for local server
    tls: {
        rejectUnauthorized: false // Allow self-signed certificates
    },
    ignoreTLS: true
});


export async function sendVerificationEmail({ email, token }: any) {
    try {
        const mailOptions = {
            from: 'test@mail.com',
            to: email,
            subject: 'Email verification',
            encoding: 'utf-8',
            text: `Thank you for registering. Please verify your email by clicking the link ${process.env.DOMAIN}/verifyemail?token=${encodeURIComponent(token)}. Link valid for 10 minutes.`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('Error sending email:', error);
            } else {
                console.log('Mock Email sent:', info.response);
            }
        });

    } catch (error: any) {
        console.log(error.message);

    }
}

export async function sendPasswordResetEmail({ email, otp, username }: any) {
    try {
        const mailOptions = {
            from: 'test@mail.com',
            to: email,
            subject: 'Password reset',
            text: `Hi ${username}. OTP: ${otp}. Valid for 10 minutes`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('Error sending email:', error);
            } else {
                console.log('Mock Email sent:', info.response);
            }
        });
    } catch (error: any) {
        console.log(error.message);
    }
}

