const fs = require('fs');
const config = require('../config.json');
const Discord = require('discord.js');
const User = require('../models/user');
const UserRepository = require('../repositories/userRepository');

async function gainXp(amount, authorId, channel, client) {

    let user = await UserRepository.createOrFindUser(authorId, channel, client)
    if (user.dailyMessageXp + 1 <= config.xp.messageLimit) {
        let newEmbed = await levelUpMember(amount, user, client);
        if (newEmbed !== null) {
            client.guilds.cache.get(process.env.GUILD_ID).members.cache.get(authorId).user.send(newEmbed);
        }
    }
}

function getLevelByXp(xp) {
    switch (true) {
        case xp >= parseInt(config.xp.levelXp[1]) && xp < parseInt(config.xp.levelXp[2]):
            return 1;
        case xp >= parseInt(config.xp.levelXp[2]) && xp < parseInt(config.xp.levelXp[3]):
            return 2;
        case xp >= parseInt(config.xp.levelXp[3]) && xp < parseInt(config.xp.levelXp[4]):
            return 3;
        case xp >= parseInt(config.xp.levelXp[4]) && xp < parseInt(config.xp.levelXp[5]):
            return 4;
        case xp >= parseInt(config.xp.levelXp[5]) && xp < parseInt(config.xp.levelXp[6]):
            return 5;
        case xp >= parseInt(config.xp.levelXp[6]) && xp < parseInt(config.xp.levelXp[7]):
            return 6;
        case xp >= parseInt(config.xp.levelXp[7]) && xp < parseInt(config.xp.levelXp[8]):
            return 7;
        case xp >= parseInt(config.xp.levelXp[8]):
            return 8;
        default:
            return 8;
    }
}

async function levelUpMember(amount, user, client) {

    let oldXp = user.xp;
    user.xp = user.xp + amount;
    user.dailyMessageXp++;
    let currentLevel = user.level;
    let xp = user.xp;
    user.level = getLevelByXp(xp);

    await user.save()
        .then(result => console.log())
        .catch(err => console.log(err));

    if (currentLevel < user.level) {

        let oldLevel = getLevelByXp(oldXp);
        let oldRole = client.guilds.cache.get(process.env.GUILD_ID).roles.cache.find(role => role.name === client.config.roles.levelRoles[oldLevel]);
        let newRole = client.guilds.cache.get(process.env.GUILD_ID).roles.cache.find(role => role.name === client.config.roles.levelRoles[user.level]);
        client.guilds.cache.get(process.env.GUILD_ID).members.cache.get(user.userId).roles.remove(oldRole);
        client.guilds.cache.get(process.env.GUILD_ID).members.cache.get(user.userId).roles.add(newRole);

        let newLevelName = getLevelName(user.level, client);
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

function getLevelName(level, client) {
    return client.config.roles.levelRoles[level];
}

function validateMessageForXp(message) {
    let messageWordCount = message.split(" ");

    if (message.length >= config.xp.messageLength
        && messageWordCount.length >= config.xp.messageWords) {
        return true;
    }
    return false;
}

async function gainInviteXPByInviteUrl(url, amount, client) {

    let inviter = await UserRepository.findByDiscordUrl(url)

    if (inviter !== null) {

        let newEmbed = await levelUpMember(amount, inviter, client);
        if (newEmbed !== null) {
            client.guilds.cache.get(process.env.GUILD_ID).members.cache.get(inviter.userId).user.send(newEmbed);
        }

        await inviter.save()
            .then(result => console.log())
            .catch(err => console.log());

        return inviter;
    }

    return null;
}

module.exports = { gainXp, getLevelName, levelUpMember, gainInviteXPByInviteUrl, validateMessageForXp, getLevelByXp};