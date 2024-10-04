import mongoose from "mongoose";
import bcryptjs from "bcryptjs"
import crypto from 'crypto'


const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, 'Please provide a username'],
            unique: true,
        },
        email: {
            type: String,
            required: [true, 'Please provide an email'],
            unique: true,
            lowercase: true,

        },
        password: {
            type: String,
            required: [true, 'Plaese provide a password']
        },
        isEmailVerified: {
            type: Boolean,
            default: false,
        },
        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user', // Role-based access control (RBAC)
        },

        passwordResetToken: String, // Token for password verification
        passwordResetTokenExpires: Date,
        emailVerificationToken: String,  // Token for email verification
        emailVerificationTokenExpires: Date,


        
        mfaSecret: String,

        accountStatus: {
            type: String,
            enum: ['active', 'inactive', 'suspended', 'deleted'],
            default: 'inactive',
        },
        lastLogin: Date, // Track last login time

        // track failed login
        failedLoginAttempts: {
            type: Number,
            default: 0,  // Track failed login attempts for security
        },

        // track number of otp sent
        otpCount: {
            type: Number,
            default: 0,
        }

        // implement more advanced schema, mfa enabled, lockAccount...

    }
)

// hash password before saving

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next()
    }
    const salt = await bcryptjs.genSalt(10);
    this.password = await bcryptjs.hash(this.password, salt);
    next();
})


// check password validity during login

// check account status and email verification
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcryptjs.compare(enteredPassword, this.password)
}


// generate password reset token
userSchema.methods.createPasswordResetToken = function () {

    const resetToken = crypto.randomBytes(32).toString('hex');

    // hash token and set to passwordResetToken
    this.passwordResetToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex')

    // token expiration (10 mins)
    this.passwordResetTokenExpires = Date.now() + 10 * 60 * 1000;

    // returns to user
    return resetToken;
}

// generate email verification token

userSchema.methods.createEmailVerificationToken = function () {
    const verificationToken = crypto.randomBytes(32).toString('hex')

    this.emailVerificationToken = crypto
        .createHash('sha256')
        .update(verificationToken)
        .digest('hex')

    // token expiration (10 mins)
    this.emailVerificationTokenExpires = Date.now() + 10 * 60 * 1000;

    // returns to user
    return verificationToken;
}

// generate reqId





// clear tokens

userSchema.methods.clearEmailVerificationToken = function () {
    this.emailVerificationToken = undefined;
    this.emailVerificationTokenExpires = undefined;
}

userSchema.methods.clearPasswordResetToken = function () {
    this.passwordResetToken = undefined;
    this.passwordResetTokenExpires = undefined;
}


/**
 * more implementations...
 */








const User = mongoose.models.User || mongoose.model(
    "User", userSchema
)
export default User