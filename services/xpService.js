const fs = require('fs');
const config = require('../config.json');
const Discord = require('discord.js');
const User = require('../models/user');
const UserRepository = require('../repositories/userRepository');

async function gainXp(amount, authorId, channel, client) {
    let user = await UserRepository.createOrFindUser(authorId, channel, client);
    if (user.dailyMessageXp + 1 <= config.xp.messageLimit) {
        let newEmbed = await levelUpMember(amount, user, client);
        if (newEmbed !== null) {
            client.guilds.cache.get(process.env.GUILD_ID).members.cache.get(authorId).user.send(newEmbed);
        }
    }
}

async function levelUpMember(amount, user, client) {

    user.xp = user.xp + amount;
    user.dailyMessageXp++;
    let currentLevel = user.level;
    let xp = user.xp;
    switch (true) {
        case xp >= parseInt(process.env.LEVEL_ONE_XP) && xp < parseInt(process.env.LEVEL_TWO_XP):
            user.level = 1;
            break;
        case xp >= parseInt(process.env.LEVEL_TWO_XP) && xp < parseInt(process.env.LEVEL_THREE_XP):
            user.level = 2;
            break;
        case xp >= parseInt(process.env.LEVEL_THREE_XP) && xp < parseInt(process.env.LEVEL_FOUR_XP):
            user.level = 3;
            break;
        case xp >= parseInt(process.env.LEVEL_FOUR_XP) && xp < parseInt(process.env.LEVEL_FIVE_XP):
            user.level = 4;
            break;
        case xp >= parseInt(process.env.LEVEL_FIVE_XP) && xp < parseInt(process.env.LEVEL_SIX_XP):
            user.level = 5;
            break;
        case xp >= parseInt(process.env.LEVEL_SIX_XP) && xp < parseInt(process.env.LEVEL_SEVEN_XP):
            user.level = 6;
            break;
        case xp >= parseInt(process.env.LEVEL_SEVEN_XP) && xp < parseInt(process.env.LEVEL_EIGHT_XP):
            user.level = 7;
            break;
        case xp >= parseInt(process.env.LEVEL_EIGHT_XP):
            user.level = 8;
            break;
        default:
            break;
    }


    await user.save()
        .then(result => console.log())
        .catch(err => console.log(err));

    if (currentLevel < user.level) {

        let newLevelName = getLevelName(user.level);
        let memberTarget = client.guilds.cache.get(process.env.GUILD_ID).members.cache.get(user.userId);

        const newEmbed = new Discord.MessageEmbed()
            .setColor('#80FFFF')
            .setTitle(`Gratulations ${memberTarget.user.username}!\n\n`
                + `You advanced to be a ${newLevelName.charAt(0).toUpperCase()}${newLevelName.slice(1)}.`)
            .setImage(config.images.levelImages[user.level])
            .setFooter('');

        return newEmbed;
    }

    return null;

}

function getLevelName(level) {
    switch (level) {
        case 1:
            return process.env.LEVEL_ONE_NAME;
        case 2:
            return process.env.LEVEL_TWO_NAME;
        case 3:
            return process.env.LEVEL_THREE_NAME;
        case 4:
            return process.env.LEVEL_FOUR_NAME;
        case 5:
            return process.env.LEVEL_FIVE_NAME;
        case 6:
            return process.env.LEVEL_SIX_NAME;
        case 7:
            return process.env.LEVEL_SEVEN_NAME;
        case 8:
            return process.env.LEVEL_EIGHT_NAME;
        default:
            break;
    }
}

function validateMessageForXp(message) {
    let messageWordCount = message.split(" ");

    if (message.length >= config.xp.messageLength
        && messageWordCount.length >= config.xp.messageWords) {
        return true;
    }
    return false;
}

module.exports = { gainXp, getLevelName, levelUpMember, validateMessageForXp };