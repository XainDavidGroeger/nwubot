const config = require('../config.json');
const Question = require('../models/question');
const mongoose = require('mongoose');

module.exports = {
    name: 'question',
    description: 'Creates a question from a member',
    async execute(client, message, args, Discord) {
    
        if (!args[0]) return message.reply("You must enter a question");

        const sendToMessageChannel = message.guild.channels.cache.get(process.env.QUESTION_CHANNEL_ID);

        let randomHash =  Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

        let question = new Question({
            _id: mongoose.Types.ObjectId(),
            userId: message.author.id,
            answered: false,
            question: message.content.substr(message.content.indexOf(" ") + 1),
            answeredBy: null,
            answerHash: randomHash,
            answerMessageId: message.id
        });

        await question.save()
            .then(result => console.log())
            .catch(err => console.log());

        let embed = new Discord.MessageEmbed()
            .setColor('#80FFFF')
            .setTitle(`Question by ${message.author.username}`)
            .setImage(config.images.question)
            .addFields(
                { name:  message.content.substr(message.content.indexOf(" ") + 1), value: `In order to answer the question you need to use the command:\n
                !answer ${question.answerHash} 'YOUR ANSWER'` },
            );

        sendToMessageChannel.send(embed);
    }
}