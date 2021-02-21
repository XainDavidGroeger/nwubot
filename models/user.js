const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userId: String,
    xp: Number,
    level: Number,
    inviteLink: String,
    invitedBy: String,
    dailyMessageXp: Number,
    dailyQuestions: Number,
    joined: Number
});

module.exports = mongoose.model("User", userSchema);