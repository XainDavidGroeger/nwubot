const mongoose = require("mongoose");
const { config } = require("../config.json");
const User = require("../models/user");

async function userExists(userId) {
    var users = await User.find({ 'userId': userId }, function (err, users) {
        if (err) {
            console.log(err);
        }
        return users;
    });

    if (typeof users[0] !== 'undefined') {
        return true;
    }

    return false;
}

async function createOrFindUser(userId, channel, client) {

    var users = await User.find({ 'userId': userId }, function (err, users) {
        if (err) {
            console.log(err);
        }
        return users;
    });

    if (typeof users[0] !== 'undefined') {
        return users[0];
    } else {
        const newInvite = await createNewInviteLink(channel);
        client.invites.set(newInvite.code, newInvite);
        user = new User({
            _id: mongoose.Types.ObjectId(),
            userId: userId,
            xp: 0,
            level: 1,
            joined: Date.now(),
            dailyMessageXp: 0,
            dailyQuestions: 0,
            inviteLink: newInvite.url
        });
        await user.save()
            .then(result => console.log())
            .catch(err => console.log(err));

            let guild = client.guilds.cache.get(process.env.GUILD_ID);

            let welcomeRole = guild.roles.cache.find(role => role.name === client.config.roles.member);
            guild.members.cache.get(userId).roles.add(welcomeRole);
    
            let level = getLevelByXp(user.xp, client.config);
            let role = guild.roles.cache.find(role => role.name === client.config.roles.levelRoles[level]);
            guild.members.cache.get(userId).roles.add(role);

        return user;    
    }
}

function getLevelByXp(xp, config) {
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

async function findByDiscordUrl(url) {

    var users = await User.find({ 'inviteLink': url }, function (err, users) {
        if (err) return handleError(err);
        return users;
        // 'athletes' contains the list of athletes that match the criteria.
    });

    if (typeof users[0] !== 'undefined') {
        user = users[0];
    } else {
        user = null;
    }

    return user;
}

async function createNewInviteLink(channel) {
    return await channel.createInvite({
        maxUses: 100, // After one use it will be void
        unique: true, // That tells the bot not to use an existing invite so that this will be unique
        maxAge: 0 // By default invites last 24 hours. If you want to change that, modify this (0 = lasts forever, time in seconds)
    });
}

async function setInvitedBy(user, inviterUserId) {
    user.invitedBy = inviterUserId;
    await user.save()
    .then(result => console.log())
    .catch(err => console.log());
}

async function getLevelRankByUserId(userId) {
    let topUsers = await User.find()
    .sort({xp: -1})
    .then(topUsers => {
      return topUsers;
    });

    var counter = 1;
    var rank = 0;
    topUsers.forEach(function(user) {
        let guild = client.guilds.cache.get(process.env.GUILD_ID);
        let member = guild.members.cache.get(user.userId);
        if (typeof member !== 'undefined') {
            if (user.userId === userId) {
                rank = counter;
                break;
            } 
            counter++;
        }
    });

    return rank;
}


module.exports = { createOrFindUser, userExists, setInvitedBy, findByDiscordUrl, getLevelRankByUserId };