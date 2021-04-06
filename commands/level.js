const UserRepository = require('../repositories/userRepository');
const LevelService = require('../services/levelService');

module.exports = {
    name: 'level',
    description: 'Display your current level status',
    async execute(client, message, args, Discord) {
        const sendToMessageChannel = message.guild.channels.cache.get(process.env.LEVEL_UP_CHANNEL_ID);
        let user = await UserRepository.createOrFindUser(message.author.id, message.channel, client);
        const levelEmbed = await LevelService.getLevelEmbedByUser(user, message, client);
        sendToMessageChannel.send(levelEmbed);
    }
}