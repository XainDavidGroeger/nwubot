const config = require('../config.json');

module.exports = {
    name: 'roll',
    description: 'daily random shinobi roll',
    execute(client, message, args, Discord) {
       


        let randomId =  Math.floor(Math.random() * 76); 


        let shinobi = client.config.heroes[randomId];

        console.log(shinobi)

        return true;

        
    }

}
