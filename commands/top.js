const UserRepository = require('../repositories/userRepository');
const LevelService = require('../services/levelService');
const User = require('../models/user');

module.exports = {
    name: 'top',
    description: 'Display the current top 10 level ranks.',
    async execute(client, message, args, Discord) {
       
        let topUsers = await User.find()
        .sort({xp: -1})
        .limit(10)
        .then(topUsers => {
          return topUsers;
        });

        var topEmbed = new Discord.MessageEmbed()
        .setColor('#80FFFF')
        .setTitle(`Top 10 Level Leaderboard`)

        let counter = 1;
        topUsers.forEach(function(user) {

            let guild = client.guilds.cache.get(process.env.GUILD_ID);
            let member = guild.members.cache.get(user.userId);
            if (typeof member !== 'undefined') {
                topEmbed.addField(
                    `#${counter}`, `${member.user.username} | XP: ${user.xp} | Level: ${client.config.roles.levelRoles[user.level]}` 
                )
                counter++;
            }

        });

        message.channel.send(topEmbed);
    }
}