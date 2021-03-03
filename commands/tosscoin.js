const config = require('../config.json');

module.exports = {
    name: 'tosscoin',
    description: 'Toss a coin, randomly picks head or tail',
    execute(client, message, args, Discord) {
       
        let tossedCoin =  Math.floor(Math.random() * 1); 
        console.log(tossedCoin);
        let image = "";
        let tossedName = "";
        if (tossedCoin == 0) {
            image = client.config.images.tossedhead;
            tossedName = "head";
        } else {
            image = client.config.images.tossedtail;
            tossedName = "tail";
        }

        let embed = new Discord.MessageEmbed()
            .setColor('#80FFFF')
            .setTitle(`${message.author.username} tossed ${tossedName}`)
            .setImage(image)
        ;
        message.channel.send(embed);
        
    }
}