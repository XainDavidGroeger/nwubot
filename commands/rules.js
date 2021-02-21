const config = require('../config.json');

module.exports = {
    name: 'rules',
    description: 'Displays the server rules',
    execute(client, message, args, Discord) {
      
        let embed = new Discord.MessageEmbed()
        .setColor('#80FFFF')
        .setTitle(``)
        
        .setFooter(`1. No racism, sexism, homophobic, misogynistic, transphobic behaviour or any other hateful speech or material.\n\n`
        +`2. No NSFW/NSFL media, including profile pictures and names.  If you think what you are posting would make others uncomfortable to look at then don't post it.  No lewd or horny talk on the server.\n\n`
        +`3. No discussion of illegal practices, including, but not limited to; sharing links for cracked/hacked programs, games or applications, anything that infringes on a company's TOS, for example, sharing, selling, buying steam or game accounts.\n\n`
        +`4. No posting of anyones personal information, including location, private messages or pictures without prior consent.  This includes bringing cross server drama to the server.\n\n`
        +`5. No trolling, baiting or flaming.  This includes, baiting someone into saying a banned word, calling someone names to win an argument, reaction/reply spamming all of someones messages, spam pinging people, bullying, harassment, both in DM and public channels.\n\n`
        +`6. No spamming - this includes pictures, long text, copypastas, ascii art.\n\n`
        +`7. Self-promotion is not allowed.  Joining the server with the sole purpose of advertising your own content will lead to a ban.\n\n`
        +`8. English is the official language of this server. Using another language to express something is fine as long as you don't take it too far and use appropriate channel.\n\n`
        +`9. Deep political discussions are not allowed. If you feel the need to discuss in depth with each other, use DM's or an actual political server.`)
        .setImage(config.images.rules)

        message.channel.send(embed);
    }
}