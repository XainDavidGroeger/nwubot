const UserRepository = require('../repositories/userRepository');
const LevelService = require('../services/levelService');
const User = require('../models/user');

module.exports = {
    name: 'top',
    description: 'Display the current top 10 level ranks.',
    async execute(client, message, args, Discord) {
       
        let topUsers = await User.find()
        .sort({xp: 1})
        .limit(10)
        .then(topUsers => {
          return topUsers;
        });

        topUsers.forEach(function(user) {


            let guild = client.guilds.cache.get(process.env.GUILD_ID);
            let member = guild.members.cache.get(user.userId);


            if (typeof member !== 'undefined') {
                console.log("user " + member.user.username + " xp: " + user.xp + "");
            }

        });
    }
}