module.exports = {
    name: 'unmute',
    description: 'unmutes a member',
    execute(client, message, args) {
        
        let role = message.guild.roles.cache.some(r => r.name === 'moderator' || r.name === 'moderator');

        if (role) {

            const target = message.mentions.users.first();

            if(target) {
                let mainRole = message.guild.roles.cache.find(r => r.name === 'member');
                let muteRole = message.guild.roles.cache.find(r => r.name === 'mute');

                let memberTarget = message.guild.members.cache.get(target.id);

                memberTarget.roles.remove(muteRole.id);
                memberTarget.roles.add(mainRole.id);

                message.channel.send(`<@${memberTarget.user.id}> has been unmuted`);

            } else {
                message.channel.send('That member doesnt exist.');
            }

        } else {
            message.channel.send('you arent a moderator');
        }

    }
}