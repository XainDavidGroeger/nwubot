const config = require('../config.json');
const UserRepository = require('../repositories/userRepository');
const xpService = require("../services/xpService");

module.exports = {
    name: 'roll',
    description: 'daily random shinobi roll',
    async execute(client, message, args, Discord) {

        let user = await UserRepository.createOrFindUser(message.author.id, message.channel, client);

        if (user.__v == 0) {
            let randomId =  Math.floor(Math.random() * 62); 
            let shinobi = client.config.heroes[randomId];
            await xpService.gainXp(shinobi.xp, message.author.id, message.channel, client);
    
            let embed = new Discord.MessageEmbed()
                .setColor('#80FFFF')
                .setTitle(`${message.author.username} you rolled ${shinobi.name}, you gained ${shinobi.xp} XP!`)
                .setImage(shinobi.image)
            ;
            message.channel.send(embed);

            user.__v = 1;
            await user.save()
            .then(result => console.log())
            .catch(err => console.log(err));
    
        } else {
            message.channel.send(`You already rolled today, try your luck again tomorrow!`);
        }
       
        return true;
    }

}
