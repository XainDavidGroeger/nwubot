const ms = require('ms');
const { config } = require('../config.json');
module.exports = {
    name: 'mute',
    description: 'mutes a member',
    execute(client, message, args) {

        let role = message.author.roles.cache.some(r => r.name === client.config.roles.moderator);

        if (message.member.roles.has(role.id)) {

            const target = message.mentions.users.first();

            if (target) {
                let mainRole = roles.cache.find(r => r.name === client.config.roles.member);
                let muteRole = roles.cache.find(r => r.name === client.config.roles.muted);
                let memberTarget = client.guilds.cache.get(process.env.GUILD_ID).members.cache.get(target.id);


                if (!args[1]) {
                    memberTarget.roles.remove(mainRole.id);
                    memberTarget.roles.add(muteRole.id);
                    message.channel.send(`<@${memberTarget.user.id}> has been muted`);
                    return;
                }

                memberTarget.roles.remove(mainRole.id);
                memberTarget.roles.add(muteRole.id);
                message.channel.send(`<@${memberTarget.user.id}> has been muted for ${ms(ms(args[1]))}`);

                setTimeout(function () {
                    memberTarget.roles.remove(muteRole.id);
                    memberTarget.roles.add(mainRole.id);
                    message.channel.send(`<@${memberTarget.user.id}> has been unmuted`);
                }, ms(args[1]));


            } else {
                message.channel.send('That member doesnt exist.');
            }

        } else {
            message.channel.send('you arent a moderator');
        }

    }
}