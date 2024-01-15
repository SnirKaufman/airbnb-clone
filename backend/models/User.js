const mongoose = require("mongoose");
const { Schema } = mongoose;
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please enter a name"],
    minlength: [2, "Minimum username length is 2 characters"],
  },
  email: {
    required: [true, "Please enter an email"],
    type: String,
    unique: true,
    lowercase: true,
    validate: [isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    minlength: [6, "Minimum password length is 6 characters"],
  },
});

userSchema.pre("save", async function (next) {
  const salt = bcrypt.genSaltSync();
  this.password = bcrypt.hashSync(this.password, salt);
  next();
});
userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = bcrypt.compareSync(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("Incorrect password");
  }
  throw Error("Incorrect email");
};

const User = mongoose.model("user", userSchema);

module.exports = User;
