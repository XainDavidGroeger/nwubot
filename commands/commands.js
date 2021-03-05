const config = require('../config.json');

module.exports = {
    name: 'commands',
    description: 'Displays all available bot commands',
    execute(client, message, args, Discord) {
      
        let embed = new Discord.MessageEmbed()
        .setColor('#80FFFF')
        .setTitle(``)
        .addFields(
            { name: '!rules', value: `Displays the server rules.` },
            { name: '!levelinfo', value: `Display info about all the levels.` },
            { name: '!level', value: `Display your current level status.` },
            { name: '!top', value: `Displays the top 10 players from the level system.` },
            { name: '!invite', value: `Creates a unique Invitelink for you. If someone follows your link to the server, you will receive some decent XP!` },
            { name: '!question YOUR_QUESTION', value: `Will bring up a question in the questions channel.` },
            { name: '!answer QUESTION_ID YOUR_ANSWER', value: `Answer an excisting question and if it helps the creator of the question you receive some nice XP!` },
            { name: '!xpinfo', value: `Display info about how to gain xp.` },
            { name: '!tosscoin', value: `Tosses a coin to randomly receive head or tails.` },
            { name: '!roll', value: `Roll one of 61 random Naruto characters in order to receive XP (can be only used once per day)` },
        )
        message.channel.send(embed);
    }
}