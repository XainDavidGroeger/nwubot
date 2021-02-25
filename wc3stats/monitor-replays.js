let path = require ('path');
let printf = require ('printf');
let request = require ('request-promise');
let config = require ('./config');
let { colors, c2e } = require ('./lib/dict');
const Discord = require('discord.js');

function main (client)
{
  client.on ('message', async (m) => {
    if (m.attachments.length <= 0) return;

    for (let A of m.attachments.values ()) {
      let R;
      let E;
      let b;
      let e;
      let p;

      if (path.extname (A.name) == '.w3g') {
        printf (process.stdout, "Uploading replay [%s]\n", A.url);
        R = await upload (A.url);
        R = R.body;

        E = new Discord.MessageEmbed()
          .setURL ("https://wc3stats.com/games/" + R.id)
          .setTitle (R.data.game.name)
          .setColor (R.data.game.hasW3MMD ? colors.green : colors.red);
        m.channel.send (E);
      }
    }
  });
}

async function emoji (id, client) {
  id = id.replace (/[^a-z]/gi, '');

  let guild = await client.guilds.fetch (config.discord.emojis);
  let emoji = guild.emojis.cache.find (e => e.id == id || e.name == id);

  return (emoji);
}

async function upload (url)
{
  let F = { file: request (url) };
  return request.post ('https://api.wc3stats.com/upload', { formData: F, json: true });
}

module.exports = { main };





// import path from 'path';
// import { inArray } from 'scantron/util';
// import { matches } from 'scantron/discord';
// import { upload } from 'scantron/w3s';
// import logger from 'scantron/logger';
// import Module from 'scantron/Module';
// import View from 'scantron/View';

// /**
//  * Watches channels for uploaded replay files. When a replay is detected, it
//  * is uploaded to wc3stats.com and a game summary is posted.
//  */
// class ReplayWatcher extends Module
// {
//   constructor (client, config) {
//     super (client, config);

//     this.requireKeys ([
//       'watch'
//     ]);
//   }

//   async run ()
//   {
//     this.client.on (
//       'message',
//       this
//         .messageHandler
//         .bind (this)
//     );
//   }

//   async messageHandler (message)
//   {
//     if (
//       message.attachments.length <= 0 ||
//       !matches (message, this.config.watch)
//     ) {
//       return;
//     }

//     for (let attachment of message.attachments.values ()) {
//         if (
//           !inArray (
//             path.extname (attachment.filename),
//             this.config.allowedExtensions
//           )
//         ) {
//           return;
//         }

//         let res = await upload (attachment.url);
//         let embed = View.replay (res.body);

//         if (!embed) {
//           logger.error (`Failed to create view for replay upload response.`);
//         }

//         message
//           .channel
//           .send (embed);
//     }
//   }

//   async destroy ()
//   {
//   }
// }

// module.exports = ReplayWatcher;