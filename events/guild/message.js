const fs = require('fs');
const config = require('../../config.json');
const xpService = require("../../services/xpService");

module.exports = async (Discord, client, message) => {

    const prefix = config.prefix;
    if (message.author.bot) return;


    let messageContent = message.content;


    messageContentArray = messageContent.split(' ');

    let newMessage = "";
    let includesBadWords = false;
    messageContentArray.forEach(function (oneData) {
        if (client.swearwords.includes(oneData.toLowerCase())) {
            includesBadWords = true;
            newMessage = newMessage + " " + "$?!*";
        } else {
            newMessage = newMessage + " " + oneData;
        }
    });

    if (!message.content.startsWith(prefix)
        && message.channel.id === process.env.GENERAL_CHANNEL
        && xpService.validateMessageForXp(message.content)
    ) {
        await xpService.gainXp(config.xp.message, message.author.id, message.channel, client);
    }


    // delete swear message and send new message with **** instead of swear words
    if (includesBadWords) {
     //   message.channel.send(`Message by ${message.author.username}: ` + newMessage)
      //  message.channel.send(`<@${message.author.id}> please mind your words, i had to replace some of your dirty expressions.`);
     //   message.delete();
    } else {
        if (!message.content.startsWith(prefix)) return;

        const args = message.content.slice(prefix.length).split(/ +/);
        const cmd = args.shift().toLowerCase();

        const command = client.commands.get(cmd);


        if (command) command.execute(client, message, args, Discord);
    }


}

