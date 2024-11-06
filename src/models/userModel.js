import mongoose from "mongoose";
import bcryptjs from "bcryptjs"
import crypto from 'crypto'
import Profile from "@/models/profileModel";
import OTP from "@/models/OTPModel";

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
            required: [true, 'Please provide a password'],
            // minlength: [8, 'Password must be at least 8 characters long'],
            // validate: {
            //     validator: function (value) {
            //         return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value);
            //     },
            //     message: 'Password must include at least one uppercase letter, one lowercase letter, one number, and one special character.'
            // }
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
    try {
        if (!this.isModified('password')) {
            return next()
        }
        const salt = await bcryptjs.genSalt(10);
        this.password = await bcryptjs.hash(this.password, salt);
        // console.log("user created");
        next();

    } catch (error) {
        console.error("Error: ", error)
        next(error)
    }
})


// userSchema.post('save', async function (doc, next) {
//     try {
//         if (doc.isNew) {
//             console.log("Creating new profile and OTP...");
//             await OTP.create({
//                 userId: doc._id,
//                 // Add any other initial OTP fields here
//             });
//             await Profile.create({
//                 userId: doc._id,
//                 email: doc.email,
//                 // Add any other initial profile fields here
//             });
//             console.log("Profile and OTP created successfully.");
//         }
//     } catch (error) {
//         console.error("Error creating Profile or OTP:", error);
//     }
//     next();
// });


// userSchema.post('save', async function (doc, next) {
//     if (doc.isNew) {
//         // Create a new Profile for the newly created User

//     }
//     next();
// });




// userSchema.pre('save', async function (next) {
//     try {
//       // **Run validation**
//       await this.validate();

//       // **Skip if password is not modified**
//       if (!this.isModified('password')) {
//         return next();
//       }

//       // **Hash password**
//       const salt = await bcryptjs.genSalt(10);
//       this.password = await bcryptjs.hash(this.password, salt);

//       next();
//     } catch (error) {
//       next(error); // Pass validation or hashing errors to the next middleware
//     }
//   });

// check password validity during login

// check account status and email verification
userSchema.methods.comparePassword = async function (enteredPassword) {

    const result = await bcryptjs.compare(enteredPassword, this.password)

    return result
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


// clear tokens

userSchema.methods.clearEmailVerificationToken = function () {
    this.emailVerificationToken = undefined;
    this.emailVerificationTokenExpires = undefined;
}

userSchema.methods.clearPasswordResetToken = function () {
    this.passwordResetToken = undefined;
    this.passwordResetTokenExpires = undefined;
}

// set isEmailVerified = true
userSchema.methods.setEmailVerified = function () {
    this.isEmailVerified = true
}
userSchema.methods.setAccountStatus = function (status) {
    this.accountStatus = status
}



/**
 * more implementations...
 */



const User = mongoose.models.User || mongoose.model(
    "User", userSchema
)
export default User