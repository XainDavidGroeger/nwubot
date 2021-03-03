module.exports = {
    name: 'ban',
    description: 'bans a member',
    execute(client, message, args) {
        const member = message.mentions.users.first();

        let role = message.guild.roles.cache.some(r => r.name === config.roles.moderator);

        if (role) {
            if (member) {
                const memberTarger = message.guild.members.cache.get(member.id);
                memberTarger.ban();
                message.channel.send('User has been kicked');
            } else {
                message.channel.send('member doesnt exist, ban yourself ...')
            }
        } else {
            message.channel.send('you arent a moderator');
        }
       
    }
}