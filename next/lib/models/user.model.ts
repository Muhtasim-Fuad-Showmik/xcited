import mongoose from "mongoose";

/**
 * model definitions for user objects which will contain
 * - id: an identifier
 * - username: a unique username
 * - name: name of the user
 * - image: an image URL
 * - bio: a biodata description of the user
 * - onboarded: marks if the user has already been onboarded
 * - threads: a collection of thread references posted by the user
 * - communities: a collection of communities that the user belongs to
 */
const userSchema = new mongoose.Schema({
  id: { type: "string", required: true },
  username: { type: "string", required: true, unique: true },
  name: { type: "string", required: true },
  image: String,
  bio: String,
  onboarded: { type: Boolean, default: false },
  threads: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Thread",
    },
  ],
  communities: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Community",
    },
  ],
});

// Collects the user finalized model
// (creating a new one if one is not already prepared)
const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
