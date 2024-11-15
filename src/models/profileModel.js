import mongoose from "mongoose";
import { type } from "os";

const profileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  // isEmailVerifiedL: {
  //   type: Boolean,
  //   required: true,
  // },
  email: {
    type: String,
    required: true,
  },
  fullname: {
    type: String,
    required: true,
  },
  image: String,
  profession: String,
  phone: String,
  website: String,
  about: {
    type: String,
    // maxlength: 500,
  },
});

profileSchema.methods.validatePhone = function (phone) {
  // will be improved later
  const phoneRegex = /^\+?[1-9]\d{1,14}$/; // E.164 format
  return phoneRegex.test(phone);
};

// profileSchema.post("save", async function (doc) {
//   if (!doc.image) {
//     // Default avatar logic
//     const defaultAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(doc.fullname)}&background=FF5733&color=ffffff&size=128`;
    
//     // Set the default avatar URL
//     doc.avatar = defaultAvatar;
    
//     // Save the updated document
//     await doc.save();
//   }
// })

const Profile =
  mongoose.models.Profile || mongoose.model("Profile", profileSchema);

export default Profile;
