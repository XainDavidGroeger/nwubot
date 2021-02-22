const config = require('../config.json');

module.exports = {
    name: 'levelinfo',
    description: 'Display info about all the levels',
    execute(client, message, args, Discord) {
        let embed = new Discord.MessageEmbed()
        .setColor('#80FFFF')
        .setImage(config.images.levelinfo)
        .setFooter(`${config.roles.levelRoles[1]} | XP needed: ${config.xp.levelXp[1]}\n`
        + `${config.roles.levelRoles[2]} | XP needed: ${config.xp.levelXp[2]}\n`
        + `${config.roles.levelRoles[3]} | XP needed: ${config.xp.levelXp[3]}\n`
        + `${config.roles.levelRoles[4]} | XP needed: ${config.xp.levelXp[1]}\n`
        + `${config.roles.levelRoles[5]}} | XP needed: ${config.xp.levelXp[5]}\n`
        + `${config.roles.levelRoles[6]} | XP needed: ${config.xp.levelXp[6]}\n`
        + `${config.roles.levelRoles[7]} | XP needed: ${config.xp.levelXp[7]}\n`
        + `${config.roles.levelRoles[8]} | XP needed: ${config.xp.levelXp[8]}\n`
        );
        message.channel.send(embed);
    }
}