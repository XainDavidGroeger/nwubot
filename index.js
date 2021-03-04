const Discord = require('discord.js');
const User = require('./models/user');
const UserRepository = require('./repositories/userRepository');
const mongoose = require('mongoose');
const schedule = require('node-schedule');
const config = require('./config.json');

require('dotenv').config();

const client = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"] });

const fs = require('fs');
const { env } = require('process');

client.commands = new Discord.Collection();
client.mongoose = mongoose;
client.config = config;
client.invites = [];
client.swearwords = [];


var filename = 'swear.txt';

fs.readFile(filename, 'utf8', function(err, data) {
  if (err) throw err;
  var lines = data.split(/\r?\n/);
  client.swearwords = lines;
});

['command_handler', 'event_handler'].forEach(handler => {
    require(`./handlers/${handler}`)(client, Discord);
});

client.mongoose.connect(process.env.MONGO_SRV, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => {
    console.log('connected mongodb');
}).catch((err) => {
    console.log(err);
});


// schedule jobs
// reset dailyMessageXp of all users to 0
const job = schedule.scheduleJob('0 0 * * *', async function () {
    await User.updateMany({
        dailyMessageXp: 0,
        dailyRollUsed: 0,
        dailyQuestions: 0,
        __v: 0,
    });
    client.guilds.cache.get(process.env.GUILD_ID).channels.cache.get(process.env.GENERAL_CHANNEL).send('Daily message XP was reset')
});


client.login(process.env.BOT_TOKEN);

