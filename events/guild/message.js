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
    messageContentArray.forEach(function(oneData) {
        let commata = " ";
        if (newMessage != "") {
            commata = " , ";
        }
        if (client.swearwords.includes(oneData)) {
            includesBadWords=true;
            newMessage = newMessage +  commata +  "****";
        } else {
            newMessage = newMessage + commata + oneData;
        }
    });
    

   console.log(message.content)
   console.log(includesBadWords)
   console.log(newMessage)

    if (!message.content.startsWith(prefix)
        && message.channel.id === process.env.GENERAL_CHANNEL
        && xpService.validateMessageForXp(message.content)
    ) {
        await xpService.gainXp(config.xp.message, message.author.id, message.channel, client);
    }

    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const cmd = args.shift().toLowerCase();

    const command = client.commands.get(cmd);


    if (command) command.execute(client, message, args, Discord);


    // delete swear message and send new message with **** instead of swear words
    if(includesBadWords) {
        message.channel.send(newMessage)
        message.delete();
    }

}

