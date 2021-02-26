const config = require('../config.json');

module.exports = {
    name: 'reactionrole',
    description: "Sets up a reaction role message!",
    async execute(client, message, args, Discord) {
        const channel = process.env.GET_ROLES_CHANNEL_ID;
        const euRole = message.guild.roles.cache.find(role => role.name === config.roles.eu);
        const usaRole = message.guild.roles.cache.find(role => role.name === config.roles.us);

        if (message.channel.id == channel) {

            const euEmoji = '🇪';
            const usEmoji = '🇺';
     
            const embed = new Discord.MessageEmbed()
                .setColor('#80FFFF')
                .setTitle('Where are you from?')
                .setDescription('Choosing your server will allow you to interact with other player from your region.\n\n'
                + `${euEmoji} for Europe\n`
                + `${usEmoji} for USA`
                )
                .setImage('https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/media/image/2019/12/warcraft-3-reforged.jpg');
     
            let messageEmbed = await message.channel.send(embed);
            messageEmbed.react(euEmoji);
            messageEmbed.react(usEmoji);

        }
    }
}  