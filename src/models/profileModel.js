import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  email: {
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

const Profile =
  mongoose.models.Profile || mongoose.model("Profile", profileSchema);

export default Profile;
