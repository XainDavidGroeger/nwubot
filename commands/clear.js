const config = require('../config.json');

module.exports = {
    name: 'clear',
    description: 'clear x messages',
    execute(client, message, args) {
        let role = message.member.roles.cache.some(r => r.name === config.roles.moderator);
        if (role) {
            if (!args[0]) return message.reply("You must enter the amount of messages you want to clear!");
            if (isNaN(args[0])) return message.reply('please enter a real number');
            if (args[0] > 100) return message.reply("you cant delete more than 100 messages!");
            if (args[0] < 1) return message.reply("you must delete atleast one message!");
    
            message.channel.messages.fetch({limit: args[0]}).then(messages => {
                message.channel.bulkDelete(messages);
            });
        }
        return true;
    }
}