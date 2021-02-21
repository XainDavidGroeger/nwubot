const UserRepository = require('../repositories/userRepository');
const LevelService = require('../services/levelService');

module.exports = {
    name: 'level',
    description: 'Display your current level status',
    async execute(client, message, args, Discord) {
        let user = await UserRepository.createOrFindUser(message.author.id, message.channel, client);
        const levelEmbed = LevelService.getLevelEmbedByUser(user, message);
        message.channel.send(levelEmbed);
    }
}