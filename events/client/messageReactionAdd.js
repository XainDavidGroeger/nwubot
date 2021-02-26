const memberCounter = require('../../counters/member-counter');
const Question = require('../../models/question');
const Answer = require('../../models/answer');
const UserRepository = require('../../repositories/userRepository');
const mongoose = require('mongoose');
const xpService = require('../../services/xpService');


module.exports = async (Discord, client, reaction, user) => {




    console.log(reaction)
    console.log(user)
    console.log("reaction was called");
    console.log(reaction.message.id);

    var questionUser = await UserRepository.createOrFindUser(user.id, reaction.message.channel, client);


    var answers = await Answer.find({ 'messageId': reaction.message.id }, function (err, questions) {
        if (err) return handleError(err);
        return answers;
    });


    const goodAnswerEmoji = '👍';

    var answer = null;
    if (typeof answers[0] !== 'undefined') {
        answer = answers[0];
    }

    if (answer !== null) {


        console.log("answer exists");


        var answerUser = client.guilds.cache.get(process.env.GUILD_ID).members.cache.get(answer.userId);

        var questions = await Question.find({ '_id': answer.questionId }, function (err, questions) {
            if (err) return handleError(err);
            return questions;
        });

        var question = null;
        if (typeof questions[0] !== 'undefined') {
            question = questions[0];
        }

        if (question !== null) {
            console.log("question  exists");


            if (questionUser.dailyQuestions < client.config.xp.questionBoostDailyLimit) {
                if (reaction.message.partial) await reaction.message.fetch();
                if (reaction.partial) await reaction.fetch();
                if (!reaction.message.guild) return;

                console.log("daily limit not reached");


                if (question.answered === false) {
                    if (reaction.emoji.name === goodAnswerEmoji) {

                        console.log("correct emoji used");

                        question.answered = true;
                        question.answeredBy = reaction.message.author.id;
                        question.answerId = reaction.message.id;

                        await question.save()
                            .then(result => console.log())
                            .catch(err => console.log());

                        answer.markedByQuestion = true;
                        await answer.save()
                            .then(result => console.log())
                            .catch(err => console.log());


                        await xpService.gainXp(client.config.xp.questionAnswered, answerUser.id, reaction.message.channel, client);
                        let successEmbed = new Discord.MessageEmbed()
                            .setColor('#80FFFF')
                            .setTitle(`Gratulation ${answerUser.username} your answer was marked by the creator and you gained ${client.config.xp.questionAnswered} XP!`)
                            .setImage(client.config.images.acceptedMentor)
                            .addFields(
                                { name: 'Question', value: question.question },
                                { name: 'Answer', value: answerText },
                                { name: 'Bonus XP', value: client.config.xp.questionAnswered },
                            );

                        questionUser.dailyQuestions++;
                        await questionUser.save()
                            .then(result => console.log())
                            .catch(err => console.log());

                        sendToMessageChannel.send(successEmbed);
                        answerUser.send(successEmbed);
                    }
                }
            }

        }

    }

}