const config = require('../config.json');
const Question = require('../models/question');
const Answer = require('../models/answer');
const UserRepository = require('../repositories/userRepository');
const mongoose = require('mongoose');
const xpService = require('../services/xpService');

// TODO clean code
module.exports = {
    name: 'answer',
    description: 'Answers to a question',
    async execute(client, message, args, Discord) {

        const sendToMessageChannel = message.guild.channels.cache.get(process.env.QUESTION_CHANNEL_ID);

        if (!args[0]) return message.reply("You must enter the question code");
        if (!args[1]) return message.reply("You must enter an answer");

        var questions = await Question.find({ 'answerHash': args[0] }, function (err, questions) {
            if (err) return handleError(err);
            return questions;
        });

        let question = null;
        if (typeof questions[0] !== 'undefined') {
            question = questions[0];
        }

        if (question === null) {
            message.channel.send('The question were not found. Make sure to apply the correct hash.');
            return true;
        }

        if (question.answered === true) {
            message.channel.send('The question has already a positive marked question.');
            return true;
        }

        if (question.userId === message.author.id) {
            message.channel.send(`You can't answer your own questions.`);
            return true;
        }

        const goodAnswerEmoji = '👍';

        let answerText = message.content.split(" ");
        answerText[0] = "";
        answerText[1] = "";
        answerText = answerText.join(" ");;

        let embed = new Discord.MessageEmbed()
            .setColor('#80FFFF')
            .setTitle(`Answered by ${message.author.username}`)
            .setImage(config.images.answer)
            .setDescription('If it answered your question please use the following Emoji:.\n\n'
                + `${goodAnswerEmoji}`
            )
            .addFields(
                { name: 'Question', value: question.question },
                { name: 'Answer', value: answerText },
            );

        let messageEmbed = await sendToMessageChannel.send(embed);

        let answer = new Answer({
            _id: mongoose.Types.ObjectId(),
            userId: message.author.id,
            questionId: question.id,
            answer: message.content.substr(message.content.indexOf(" ") + 2),
            markedByQuestion: false,
            messageId: messageEmbed.id
        });

        await answer.save()
            .then(result => console.log())
            .catch(err => console.log());


        messageEmbed.react(goodAnswerEmoji);

    }
}