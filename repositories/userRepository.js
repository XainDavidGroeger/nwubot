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

        return user;    
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


module.exports = { createOrFindUser, userExists, setInvitedBy, findByDiscordUrl };