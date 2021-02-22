module.exports = {
    name: 'reactionrole',
    description: "Sets up a reaction role message!",
    async execute(client, message, args, Discord) {
        const channel = process.env.GET_ROLES_CHANNEL_ID;
        const euRole = message.guild.roles.cache.find(role => role.name === config.roles.eu);
        const usaRole = message.guild.roles.cache.find(role => role.name === config.roles.us);
 
        const euEmoji = config.emojis.eu;
        const usEmoji = config.emojis.us;
 
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
 
        client.on('messageReactionAdd', async (reaction, user) => {
            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (user.bot) return;
            if (!reaction.message.guild) return;
 
            if (reaction.message.channel.id == channel) {
                if (reaction.emoji.name === euEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(euRole);
                }
                if (reaction.emoji.name === usEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(usaRole);
                }
            } else {
                return;
            }
 
        });
 
        client.on('messageReactionRemove', async (reaction, user) => {
 
            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (user.bot) return;
            if (!reaction.message.guild) return;
 
 
            if (reaction.message.channel.id == channel) {
                if (reaction.emoji.name === euEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(euRole);
                }
                if (reaction.emoji.name === blueTeamEmoji) {
                    await reaction.message.guild.usEmoji.cache.get(user.id).roles.remove(usaRole);
                }
            } else {
                return;
            }
        });
    }
 
}  