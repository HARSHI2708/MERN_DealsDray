const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required."],
        minLength: [3, "Username must be at least 3 characters long."],
      },
      email: {
        type: String,
        required: [true, "Email is required."],
        unique: true,
        match: [
          /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
          "Invalid email format.",
        ],
      },
      password: {
        type: String,
        required: [true, "Password is required."],
        minLength: [6, "Password must be at least 6 characters long."],
      },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
