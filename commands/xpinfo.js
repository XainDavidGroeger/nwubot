const config = require('../config.json');

module.exports = {
    name: 'xpinfo',
    description: 'Display info about how to gain xp',
    execute(client, message, args, Discord) {
        let embed = new Discord.MessageEmbed()
        .setColor('#80FFFF')
        .setImage(config.images.levelinfo)
        .setFooter(`Inviting a playing using a link from the bot. "!invite" should give you this link to give out. They will need to be new to discord and need to accept the rules for exp to be given out.\n`
        + `Typing in #📣nwu-public-chat specifically (limited, do not spam)\n`
        + `Answering questions in #questions (look in channel for examples or ask @eGloryDave for more specifics if needed.). Answers have to be approved by the person who asked the question to get exp.\n`
        );
        message.channel.send(embed);
    }
}