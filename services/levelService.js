const Discord = require('discord.js');
const UserRepository = require('../repositories/userRepository');
const config = require('../config.json');

function getLevelNameByLevel(level) {

    let levelName = null;
    switch (level) {
        case 1:
            levelName = process.env.LEVEL_ONE_NAME;
            break;
        case 2:
            levelName = process.env.LEVEL_TWO_NAME;
            break;
        case 3:
            levelName = process.env.LEVEL_THREE_NAME;
            break;
        case 4:
            levelName = process.env.LEVEL_FOUR_NAME;
            break;
        case 5:
            levelName = process.env.LEVEL_FIVE_NAME;
            break;
        case 6:
            levelName = process.env.LEVEL_SIX_NAME;
            break;
        case 7:
            levelName = process.env.LEVEL_SEVEN_NAME;
            break;
        case 8:
            levelName = process.env.LEVEL_EIGHT_NAME;
            break;
        default:
            levelName = process.env.LEVEL_ONE_NAME;
            break;
    }

    return `${levelName.charAt(0).toUpperCase()}${levelName.slice(1)}`;
}

function getLevelEmbedByUser(user, message) {

    let total = UserRepository.getNextLevelThresholdByCurrentLevel(user.level);
    let current = user.xp;

    return new Discord.MessageEmbed()
        .setColor('#80FFFF')
        .setTitle(`${message.author.username} | ${getLevelNameByLevel(user.level)}`)
        .addFields(
            { name: 'XP', value: `${user.xp} / ${UserRepository.getNextLevelThresholdByCurrentLevel(user.level)}` },
            { name: 'Level', value: `${user.level}` },
        )
        .setImage(config.images.levelImages[user.level])
        .setThumbnail(message.author.avatarURL())
}

module.exports = { getLevelNameByLevel, getLevelEmbedByUser };