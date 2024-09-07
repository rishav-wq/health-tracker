const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true }, // Ensure email is unique
    password: String,
    isSAG: { type: Boolean, default: false } // Field to distinguish SAG users
});

const UserModel = mongoose.model("users", UserSchema);
module.exports = UserModel;
