import mongoose from "mongoose";
import crypto from 'crypto'

const otpSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    otp: {
        type: String,
        // required: true,
    },
    otpExpires: {
        type: Date,
        // required: true,
    },




    // will be used later
    otpAttempts: {
        type: Number,
        default: 0,
    },
    sentOtpCount: {
        type: Number,
        default: 0,
    },
    sentOtpCountExpires: Date,
    reqId: String,  // request id for otp verification
    reqIdExpires: Date,

})



// method to generate otp (will bw used later for login/other purpose)
otpSchema.methods.generateOtp = function () {
    const otp = Math.floor(100000 + Math.random() * 900000).toString()
    this.otp = crypto.createHash('sha256')
        .update(otp)
        .digest('hex')
    this.otpExpires = Date.now() + 10 * 60 * 1000; // 10 mins

    return otp
}


// clear otp
otpSchema.methods.clearOtp = function () {
    this.otp = undefined;
    this.otpExpires = undefined;

    // clears reqId with clearing password

    // this.reqId = undefined;
    // this.reqIdExpires = undefined;
}


// generate req id
otpSchema.methods.createReqId = function () {
    const reqId = crypto.randomBytes(32).toString('hex')
    this.reqId = crypto
        .createHash('sha256')
        .update(reqId)
        .digest('hex')

    this.reqIdExpires = Date.now() + 10 * 60 * 1000;

    return reqId

}


// clear req id (OPTIONAL)
otpSchema.methods.clearReqId = function () {
    this.reqId = undefined;
    this.reqIdExpires = undefined;
}









const OTP = mongoose.models.OTP || mongoose.model(
    "OTP", otpSchema
)
export default OTP








// create a OTP document in signup route / mailer