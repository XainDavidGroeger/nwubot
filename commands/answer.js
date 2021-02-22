const config = require('../config.json');
const Question = require('../models/question');
const Answer = require('../models/answer');
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

        let answer = new Answer({
            _id: mongoose.Types.ObjectId(),
            userId: message.author.id,
            questionId: question.id,
            answer: message.content.substr(message.content.indexOf(" ") + 1),
            markedByQuestion: false,
            messageId: message.id
        });

        await answer.save()
            .then(result => console.log())
            .catch(err => console.log());


        const goodAnswerEmoji = config.emojis.goodAnswerEmoji;

        let answerText = message.content.split(" ");
        answerText[0] = "";
        answerText[1] = "";
        answerText = answerText.join(" ");;

        let embed = new Discord.MessageEmbed()
            .setColor('#80FFFF')
            .setTitle(`Answered by ${message.author.username}`)
            .setDescription('If it answered your question please use the following Emoji:.\n\n'
                + `${goodAnswerEmoji}`
            )
            .addFields(
                { name: 'Question', value: question.question },
                { name: 'Answer', value: answerText },
            );

        let messageEmbed = await sendToMessageChannel.send(embed);
        messageEmbed.react(goodAnswerEmoji);

        client.on('messageReactionAdd', async (reaction, user) => {
            if (user.dailyQUestions < config.xp.questionBoostDailyLimit) {
                if (reaction.message.partial) await reaction.message.fetch();
                if (reaction.partial) await reaction.fetch();
                if (user.bot) return;
                if (!reaction.message.guild) return;

                if (user.id === question.userId && question.answered === false) {
                    if (reaction.emoji.name === goodAnswerEmoji) {
                        question.answered = true;
                        question.answeredBy = message.author.id;
                        question.answerId = message.id;

                        await question.save()
                            .then(result => console.log())
                            .catch(err => console.log());

                        answer.markedByQuestion = true;
                        await answer.save()
                            .then(result => console.log())
                            .catch(err => console.log());


                        await xpService.gainXp(config.xp.questionAnswered, message.author.id, message.channel, client);
                        let successEmbed = new Discord.MessageEmbed()
                            .setColor('#80FFFF')
                            .setTitle(`Gratulation ${message.author.username} your answer was marked by the creator and you gained ${config.xp.questionAnswered} XP!`)
                            .addFields(
                                { name: 'Question', value: question.question },
                                { name: 'Answer', value: answerText },
                                { name: 'Bonus XP', value: config.xp.questionAnswered },
                            );

                        user.dailyQUestions++;
                        await user.save()
                        .then(result => console.log())
                        .catch(err => console.log());

                        sendToMessageChannel.send(successEmbed);
                        message.author.send(successEmbed);
                    }
                }
            }
        });

    }
}