const mongoose = require("mongoose");

const answerSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userId: String,
    questionId: String,
    answer: String,
    markedByQuestion: Boolean,
    messageId: String
});


module.exports = mongoose.model("Answer", answerSchema);