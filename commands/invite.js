const { MessageFlags } = require('discord.js');
const fs = require('fs');
const UserRepository = require('../repositories/userRepository');

module.exports = {
    name: 'invite',
    description: 'gives back your invitation link',
    async execute(client, message, args) {

        let user = await UserRepository.createOrFindUser(message.author.id, message.channel, client);

        let authorInvitationLink = user.inviteLink;

        message.channel.send(`<@${message.author.id}> this is your invitation Link:  ${authorInvitationLink}\n`
        + 'Send this to your friends, if they join the server you will gain XP!');

    }
}