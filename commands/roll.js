const config = require('../config.json');

module.exports = {
    name: 'roll',
    description: 'daily random shinobi roll',
    execute(client, message, args, Discord) {
       

        let randomId =  Math.floor(Math.random() * 76); 


        let shinobi = client.config.heroes[randomId];

        console.log(randomId)
        console.log(shinobi)

        let embed = new Discord.MessageEmbed()
            .setColor('#80FFFF')
            .setTitle(`${message.author.username} rolled ${shinobi.name}, you gain ${shinobi.xp}!`)
            .setImage(shinobi.image)
        ;
        message.channel.send(embed);

        return true;

        
    }

}
