const memberCounter = require('../../counters/member-counter');
const Question = require('../../models/question');
const Answer = require('../../models/answer');
const UserRepository = require('../../repositories/userRepository');
const mongoose = require('mongoose');
const xpService = require('../../services/xpService');
const config = require('../../config.json');


module.exports = async (Discord, client, reaction, user) => {

    if (user.bot) return;

    const goodAnswerEmoji = '👍';
    const euAnswerEmoji = '🇪';
    const usAnswerEmoji = '🇺';

    if (reaction.emoji.name === goodAnswerEmoji) {
        await checkQuestionAnswerLogic(Discord, client, reaction, user);
        return true;
    }

    if (reaction.emoji.name === euAnswerEmoji) {
        await checkAddEuRoleLogic(Discord, client, reaction, user);
        return true;
    }

    if (reaction.emoji.name === usAnswerEmoji) {
        await checkAddUsRoleLogic(Discord, client, reaction, user);
        return true;
    }
}

async function checkAddEuRoleLogic(Discord, client, reaction, user) {

    console.log(user);

    let euRole = reaction.message.guild.roles.cache.find(r => r.name === config.roles.eu);
    user.roles.add(euRole.id);
    return true;
}

async function checkAddUsRoleLogic(Discord, client, reaction, user) {
    let americaRole = reaction.message.guild.roles.cache.find(r => r.name === config.roles.us);
    user.roles.add(americaRole.id);
    return true;
}

async function checkQuestionAnswerLogic(Discord, client, reaction, user) {

    const sendToMessageChannel = reaction.message.guild.channels.cache.get(process.env.QUESTION_CHANNEL_ID);

    var questionUser = await UserRepository.createOrFindUser(user.id, reaction.message.channel, client);


    var answers = await Answer.find({ 'messageId': reaction.message.id }, function (err, questions) {
        if (err) return handleError(err);
        return answers;
    });

    var answer = null;
    if (typeof answers[0] !== 'undefined') {
        answer = answers[0];
    }

    if (answer !== null) {

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
            if (questionUser.dailyQuestions < client.config.xp.questionBoostDailyLimit) {
                if (reaction.message.partial) await reaction.message.fetch();
                if (reaction.partial) await reaction.fetch();
                if (!reaction.message.guild) return;

                if (question.answered === false) {

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
                            { name: 'Answer', value: answer.answer },
                            { name: 'Bonus XP', value: client.config.xp.questionAnswered },
                        );

                    questionUser.dailyQuestions++;
                    await questionUser.save()
                        .then(result => console.log())
                        .catch(err => console.log());

                    sendToMessageChannel.send(successEmbed);
                    answerUser.send(successEmbed);
                }
            } else {
                if (reaction.message.partial) await reaction.message.fetch();
                if (reaction.partial) await reaction.fetch();
                if (!reaction.message.guild) return;

                if (question.answered === false) {
                    if (reaction.emoji.name === goodAnswerEmoji) {

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


                        let successEmbed = new Discord.MessageEmbed()
                            .setColor('#80FFFF')
                            .setTitle(`Gratulation ${answerUser.username} your answer was marked by the creator. Since the creator already asked ${client.config.xp.questionBoostDailyLimit} today you dont earn extra XP, sorry!`)
                            .setImage(client.config.images.acceptedMentor)
                            .addFields(
                                { name: 'Question', value: question.question },
                                { name: 'Answer', value: answer.answer },
                                { name: 'Bonus XP', value: `none` },
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