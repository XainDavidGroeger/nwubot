const Discord = require('discord.js');
const UserRepository = require('../repositories/userRepository');
const config = require('../config.json');

function getLevelNameByLevel(level) {
    let levelName = config.roles.levelRoles[level];
    return `${levelName.charAt(0).toUpperCase()}${levelName.slice(1)}`;
}

async function getLevelEmbedByUser(user, message, client) {

    let total = client.config.xp.levelXp[user.level+1];
    let current = user.xp;

    let levelRank = await UserRepository.getLevelRankByUserId(user.userId);

    return new Discord.MessageEmbed()
        .setColor('#80FFFF')
        .setTitle(`${message.author.username} | ${getLevelNameByLevel(user.level)}`)
        .addFields(
            { name: 'XP', value: `${current} / ${total}` },
            { name: 'Level', value: `${user.level}` },
            { name: 'Rank', value: `#${levelRank}` },
        )
        .setImage(config.images.levelImages[user.level])
        .setThumbnail(message.author.avatarURL())
}

module.exports = { getLevelNameByLevel, getLevelEmbedByUser };