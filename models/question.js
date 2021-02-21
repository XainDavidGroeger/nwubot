const mongoose = require("mongoose");

const questionSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userId: String,
    question: String,
    answered: Boolean,
    answer: String,
    answeredBy: String,
    answerHash: String,
    answerMessageId: String
});


module.exports = mongoose.model("Question", questionSchema);