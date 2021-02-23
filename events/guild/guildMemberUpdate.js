const { User } = require('discord.js');
const fs = require('fs');
const config = require('../../config.json');
const UserRepository = require('../../repositories/userRepository');
const xpService = require('../../services/xpService');

module.exports = async (Discord, client, oldMember, newMember) => {

    console.log(oldMember.pending)
    console.log(newMember.pending)

    if (oldMember.pending && !newMember.pending) {
        console.log(newMember.user.username)

        let userexists = await UserRepository.userExists(newMember.user.id);

        let invitedUser = await UserRepository.createOrFindUser(newMember.user.id, newMember.guild.channels.cache.get(process.env.GENERAL_CHANNEL), client);

        newMember.guild.fetchInvites().then(async guildInvites => {
            const oldInvites = client.invites;

            // Update the cached invites
            client.invites = guildInvites;

            // Look through the invites, find the one for which the uses went up.
            const invite = guildInvites.find(i => oldInvites.get(i.code).uses < i.uses);

            if (typeof invite.url !== 'undefined') {
                let user = await UserRepository.findByDiscordUrl(invite.url);

                if (user !== null) {
                    if (!userexists) {
                        await xpService.gainInviteXPByInviteUrl(invite.url, client.config.xp.invite, client);
                        newMember.guild.channels.cache.get(process.env.GENERAL_CHANNEL)
                            .send(`Gratulation <@${user.userId}> you successfully invited <@${invitedUser.userId}> to the server and gained ${client.config.xp.invite} XP!`)
                    } else {
                        newMember.guild.channels.cache.get(process.env.GENERAL_CHANNEL)
                            .send(`Gratulation <@${user.userId}> you successfully invited <@${invitedUser.userId}> to the server! Since he was already here once, you dont earn XP.`)
                    }
                    await UserRepository.setInvitedBy(invitedUser, user.userId);
                }
                return true;
            }
            
        })

        let welcomeRole = newMember.guild.roles.cache.find(role => role.name === config.roles.member);
        newMember.roles.add(welcomeRole);

        let level = xpService.getLevelByXp(invitedUser.xp);
        let role = newMember.guild.roles.cache.find(role => role.name === config.roles.levelRoles[level]);
        newMember.roles.add(role);

        let welcomeEmbed = new Discord.MessageEmbed()
            .setColor('#80FFFF')
            .setTitle(`Welcome ${newMember.user.username}!`)
            .setImage(config.images.welcome)
            .setThumbnail(newMember.user.avatarURL()
            );


        newMember.guild.channels.cache.get(process.env.WELCOME_CHANNEL_ID)
            .send(welcomeEmbed);
    }


}

