const { config } = require("../config.json");

module.exports = {
    name: 'kick',
    description: 'kicks a member',
    execute(client, message, args) {
        let role = message.member.roles.cache.some(r => r.name === config.roles.moderator);
        if (role) {
        const member = message.mentions.users.first();
            if (member) {
                const memberTarger = message.guild.members.cache.get(member.id);
                memberTarger.kick();
                message.channel.send('User has been kicked');
            } else {
                message.channel.send('member doesnt exist, kick yourself ...')
            }
        } else {
            message.channel.send('you arent a moderator');
        }
    }
}