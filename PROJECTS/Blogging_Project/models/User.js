const { createHmac, randomBytes } = require("crypto"); // hash the password
const { Schema, model } = require("mongoose");
const { createTokenForUser } = require("../services/authentication");

const UserSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    salt: {
      type: String,
      // required: true,
    },
    password: {
      type: String,
      required: true,
    },
    profileImageURL: {
      type: String,
      default: "/images/User1.jpg",
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) return;
  const salt = randomBytes(16).toString();
  const hashPassword = createHmac("sha256", salt)
    .update(user.password)
    .digest("hex");
  this.salt = salt;
  this.password = hashPassword;
  next();
});

UserSchema.static(
  "matchPasswordAndGenerateToken",
  async function (email, password) {
    const user = await this.findOne({ email });
    if (!user) throw new Error("User not found");

    const salt = user.salt;
    const hashpassword = user.password;

    const userProvideHash = createHmac("sha256", salt)
      .update(password)
      .digest("hex");

    if (hashpassword !== userProvideHash) throw new Error("Incorrect password");

    const token = createTokenForUser(user);
    return token;
  }
);

const User = model("User", UserSchema);
module.exports = User;
