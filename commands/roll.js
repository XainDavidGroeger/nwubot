const config = require('../config.json');
const UserRepository = require('../repositories/userRepository');
const xpService = require("../services/xpService");
const moment = require("moment");

module.exports = {
    name: 'roll',
    description: 'daily random shinobi roll',
    async execute(client, message, args, Discord) {

        let user = await UserRepository.createOrFindUser(message.author.id, message.channel, client);

        if (user.__v == 0) {
            let randomId =  Math.floor(Math.random() * 62); 
            let shinobi = client.config.heroes[randomId];
            await xpService.gainXp(client.config.xp.rollXp[shinobi.xp], message.author.id, message.channel, client);
    
            let embed = new Discord.MessageEmbed()
                .setColor('#80FFFF')
                .setTitle(`${message.author.username} you rolled ${shinobi.name}, you gained ${client.config.xp.rollXp[shinobi.xp]} XP!`)
                .setImage(shinobi.image)
            ;
            message.channel.send(embed);

            user.__v = 1;
            await user.save()
            .then(result => console.log())
            .catch(err => console.log(err));
    
        } else {
            message.channel.send(`You already rolled today, try your luck again tomorrow!`);


            var now = new Date();

            const today = new Date()
            const tomorrow = new Date(today)
            tomorrow.setDate(tomorrow.getDate() + 1)
            tomorrow.setHours(0);


            var start_date = moment(now, 'YYYY-MM-DD HH:mm:ss');
            var tomorrow = moment(tomorrow, 'YYYY-MM-DD HH:mm:ss');
            var duration = moment.duration(tomorrow.diff(start_date));

            console.log(duration.asHours())

        }
       
        return true;
    }

}
