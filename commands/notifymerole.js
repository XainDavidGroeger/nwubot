const config = require('../config.json');

module.exports = {
    name: 'notifymerole',
    description: "Sets up a reaction role message for notifyme roles!",
    async execute(client, message, args, Discord) {
        const notifyMeRole = message.guild.roles.cache.find(role => role.name === config.roles.notifyme);

        const notifyMeEmoji = '🔔';

        const embed = new Discord.MessageEmbed()
            .setColor('#80FFFF')
            .setTitle('Notify me when games are hosted')
            .setDescription('Do you want get notified if a game is hosted?\n\n'
                + `then react with ${notifyMeEmoji}`
            )
            .setImage(config.images.notifyMe);

        let messageEmbed = await message.channel.send(embed);
        messageEmbed.react(notifyMeEmoji);
    }
}  