const config = require('../config.json');

module.exports = {
    name: 'levelinfo',
    description: 'Display info about all the levels',
    execute(client, message, args, Discord) {
        let embed = new Discord.MessageEmbed()
        .setColor('#80FFFF')
        .setImage(config.images.levelinfo)
        .setFooter(`${process.env.LEVEL_ONE_NAME} | XP needed: ${process.env.LEVEL_ONE_XP}\n`
        + `${process.env.LEVEL_TWO_NAME} | XP needed: ${process.env.LEVEL_TWO_XP}\n`
        + `${process.env.LEVEL_THREE_NAME} | XP needed: ${process.env.LEVEL_THREE_XP}\n`
        + `${process.env.LEVEL_FOUR_NAME} | XP needed: ${process.env.LEVEL_FOUR_XP}\n`
        + `${process.env.LEVEL_FIVE_NAME} | XP needed: ${process.env.LEVEL_FIVE_XP}\n`
        + `${process.env.LEVEL_SIX_NAME} | XP needed: ${process.env.LEVEL_SIX_XP}\n`
        + `${process.env.LEVEL_SEVEN_NAME} | XP needed: ${process.env.LEVEL_SEVEN_XP}\n`
        + `${process.env.LEVEL_EIGHT_NAME} | XP needed: ${process.env.LEVEL_EIGHT_XP}\n`
        );
        message.channel.send(embed);
    }
}